require("reflect-metadata");
const moment = require("moment");
const GetAerisForecast = require("./GetAerisForecast.service").GetAerisForecast;

let aerisApiMock;
let _getAerisForecast;

describe("GetAerisForecast service", () => {
    beforeAll(() => {
        aerisApiMock = {
            getWeatherForLocation: jest.fn().mockResolvedValue([
                {
                    periods: [
                        {
                            timestamp: moment().subtract(2, "hours").unix(),
                            avgTempC: 12,
                        },
                        {
                            timestamp: moment().subtract(1, "hours").unix(),
                            avgTempC: 13,
                        },
                        {
                            timestamp: moment().unix(),
                            avgTempC: 14,
                        },
                        {
                            timestamp: moment().add(1, "hours").unix(),
                            avgTempC: 15,
                        },
                        {
                            timestamp: moment().add(2, "hours").unix(),
                            avgTempC: 16,
                        },
                    ]
                }
            ])
        };
        _getAerisForecast = new GetAerisForecast(aerisApiMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("reurns a valid forecast", async () => {
        const result = await _getAerisForecast.getForecast(12, 20);
        expect(result).toEqual({ temperature: 16 });
    });

    it("calls Aeris service with relevant arguments", async () => {
        await _getAerisForecast.getForecast(12, 20);
        expect(aerisApiMock.getWeatherForLocation).toHaveBeenCalledWith(12, 20);
    });
});