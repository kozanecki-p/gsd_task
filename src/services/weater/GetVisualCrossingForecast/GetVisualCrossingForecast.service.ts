import { inject, injectable } from "inversify";
import moment from "moment";
import { VisualCrossingForecast } from "../../../api-clients/visual-crossing/contracts/output/get-weather-for-location";
import { VisualCrossingApi } from "../../../api-clients/visual-crossing/visual-crossing.api";
import { Forecast } from "../contracts/output/forecast";

@injectable()
export class GetVisualCrossingForecast {
    constructor (
        @inject(VisualCrossingApi) private readonly _vsApi: VisualCrossingApi
    ) {}

    public async getForecast (latitude: number, longitude: number) : Promise<Forecast> {
        const apiData = await this._vsApi.getWeatherForLocation(latitude, longitude);
        return this._mapForecast(apiData);
    }

    private _mapForecast (apiData: VisualCrossingForecast): Forecast {
        const locationData = Object.values(apiData.locations)[0];
        const weatherInAnHour = locationData.values.find(location => {
            return location.datetime > moment().add(1, "hour").unix();
        })
        return {
            temperature: weatherInAnHour?.temp
        };
    }
}