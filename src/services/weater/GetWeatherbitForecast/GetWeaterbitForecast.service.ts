import { inject, injectable } from "inversify";
import { WeatherbitForecast } from "../../../api-clients/weaterbit/contracts/output/GetWeatherForLocation";
import { WeatherbitApi } from "../../../api-clients/weaterbit/weatherbit.api";
import { Forecast } from "../contracts/output/forecast";

@injectable()
export class GetWeaterbitForecast {
    constructor (
        @inject(WeatherbitApi) private readonly _weaterbitApi: WeatherbitApi
    ) {}

    public async getForecast (latitude: number, longitude: number) : Promise<Forecast> {
        const apiData = await this._weaterbitApi.getWeatherForLocation(latitude, longitude);
        return this._mapForecast(apiData);
    }

    private _mapForecast (apiData: WeatherbitForecast[]): Forecast {
        const weatherInAnHour = apiData[apiData.length - 1];
        return {
            temperature: weatherInAnHour.temp
        };
    }
}