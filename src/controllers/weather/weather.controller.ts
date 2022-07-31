import "reflect-metadata";

import { WeatherbitApi } from "../../api-clients/weatherbit.api";
import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { ArerisApi } from "../../api-clients/aeris.api";
import { VisualCrossingApi } from "../../api-clients/visual-crossing.api";

@controller("/weather")
export class WeatherController{

    constructor (
        @inject(VisualCrossingApi) private readonly _weatherbitApi: VisualCrossingApi
    ) {}

    @httpGet("/")
    async getWeather () {
        const weather = await this._weatherbitApi.getWeatherForLocation(35, -78);

        return weather.data;
    }
}