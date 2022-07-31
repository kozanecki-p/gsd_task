import { injectable } from "inversify";
import axios from "axios";
import { AerisForecast } from "../aeris/contracts/output/get-weather-for-location";

@injectable()
export class ArerisApi {
    public async getWeatherForLocation (latitude: number, longitude: number) : Promise<AerisForecast[]> {

        const options = {
            method: 'GET',
            url: `${process.env["AERIS_URL"]}/forecasts/${latitude},${longitude}`,
            params: {to: '2022-08-01', filter: '1hr', from: '2022-07-31'},
            headers: {
              'X-RapidAPI-Key': process.env["AERIS_API_KEY"] || "",
              'X-RapidAPI-Host': process.env["AERIS_API_HOST"] || ""
            }
          };
          
        const response = await axios.request(options);
        return response.data.response;
    }
}