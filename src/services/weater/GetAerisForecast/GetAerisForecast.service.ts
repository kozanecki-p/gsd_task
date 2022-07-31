import { inject, injectable } from "inversify";
import moment from "moment";
import { ArerisApi } from "../../../api-clients/aeris/aeris.api";
import { AerisForecast } from "../../../api-clients/aeris/contracts/output/get-weather-for-location";
import { Forecast } from "../contracts/output/forecast";

@injectable()
export class GetAerisForecast {
    constructor (
        @inject(ArerisApi) private readonly _aerisApi: ArerisApi
    ) {}

    public async getForecast (latitude: number, longitude: number) : Promise<Forecast> {
        const apiData = await this._aerisApi.getWeatherForLocation(latitude, longitude);
        return this._mapForecast(apiData);
    }

    private _mapForecast (apiData: AerisForecast[]): Forecast {
        const weatherInAnHour = apiData[0].periods.find(period => {
            return period.timestamp > moment().unix();
        })
        return {
            temperature: weatherInAnHour?.avgTempC
        };
    }
}