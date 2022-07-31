require("reflect-metadata");
const { GetWeaterbitForecast } = require("./GetWeaterbitForecast.service");

let weatherbitApiMock;
let _getWeatgerbitForecast;

describe("GetAerisForecast service", () => {
    beforeAll(() => {
        weatherbitApiMock = {
            getWeatherForLocation: jest.fn().mockResolvedValue({data: [
                { temp: 12 },
                { temp: 13 },
                { temp: 14 },
                { temp: 15 },
                { temp: 16 },
            ]})
        };
        _getWeatgerbitForecast = new GetWeaterbitForecast(weatherbitApiMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("reurns a valid forecast", async () => {
        const result = await _getWeatgerbitForecast.getForecast(12, 20);
        expect(result).toEqual({ temperature: 16 });
    });

    it("calls Aeris service with relevant arguments", async () => {
        await _getWeatgerbitForecast.getForecast(12, 20);
        expect(weatherbitApiMock.getWeatherForLocation).toHaveBeenCalledWith(12, 20);
    });
});