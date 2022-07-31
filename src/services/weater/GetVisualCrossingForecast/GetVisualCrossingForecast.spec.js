require("reflect-metadata");
const moment = require("moment");
const GetVisualCrossingForecast = require("./GetVisualCrossingForecast.service").GetVisualCrossingForecast;

let vcApiMock;
let _getVcForecast;

describe("GetVisualCrossingForecast service", () => {
    beforeAll(() => {
        vcApiMock = {
            getWeatherForLocation: jest.fn().mockResolvedValue({
                locations: {
                    "12,20": {
                        values: [
                           { datetime: moment().subtract(2, "hours").unix(), temp: 12 }, 
                           { datetime: moment().subtract(1, "hours").unix(), temp: 13 }, 
                           { datetime: moment().unix(), temp: 14 }, 
                           { datetime: moment().add(1, "hours").unix(), temp: 15 }, 
                           { datetime: moment().add(2, "hours").unix(), temp: 16 }, 
                        ]
                    }
                }
            })
        };
        _getVcForecast = new GetVisualCrossingForecast(vcApiMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("reurns a valid forecast", async () => {
        const result = await _getVcForecast.getForecast(12, 20);
        expect(result).toEqual({ temperature: 16 });
    });

    it("calls Aeris service with relevant arguments", async () => {
        await _getVcForecast.getForecast(12, 20);
        expect(vcApiMock.getWeatherForLocation).toHaveBeenCalledWith(12, 20);
    });
});