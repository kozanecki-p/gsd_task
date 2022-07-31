import "reflect-metadata";

import { controller, httpGet, queryParam } from "inversify-express-utils";
import { inject } from "inversify";
import { GetWeaterbitForecast } from "../../services/weater/GetWeatherbitForecast/GetWeaterbitForecast.service";
import { GetAerisForecast } from "../../services/weater/GetAerisForecast/GetAerisForecast.service";
import { GetVisualCrossingForecast } from "../../services/weater/GetVisualCrossingForecast/GetVisualCrossingForecast.service";

@controller("/weather")
export class WeatherController{

    constructor (
        @inject(GetWeaterbitForecast) private readonly _getWeatherbitForecast: GetWeaterbitForecast,
        @inject(GetAerisForecast) private readonly _getAerisForecast: GetAerisForecast,
        @inject(GetVisualCrossingForecast) private readonly _getVisualCrossingForecast: GetVisualCrossingForecast,
    ) {}

    @httpGet("/")
    async getWeather (@queryParam("lat") latitude: number, @queryParam("lon") longitude: number) {

        const weather = await Promise.all([
            this._getWeatherbitForecast.getForecast(latitude, longitude),
            this._getAerisForecast.getForecast(latitude, longitude),
            this._getVisualCrossingForecast.getForecast(latitude, longitude),
        ]);

        return weather;
    }
}