import { injectable } from "inversify";
import axios from "axios";

@injectable()
export class ArerisApi {
    public async getWeatherForLocation (latitude: number, longitude: number) {

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
        return response;
    }
}