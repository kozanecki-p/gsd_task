import { injectable } from "inversify";
import axios from "axios";
import { WeatherbitForecast } from "./contracts/output/GetWeatherForLocation";

@injectable()
export class WeatherbitApi {
    public async getWeatherForLocation (latitude: number, longitude: number): Promise<WeatherbitForecast> {
        const options = {
            method: 'GET',
            url: `${process.env["WEATHERBIT_URL"]}/forecast/minutely`,
            params: {lat: `${latitude}`, lon: `${longitude}`},
            headers: {
              'X-RapidAPI-Key': process.env["WEATHERBIT_API_KEY"] || "",
              'X-RapidAPI-Host': process.env["WEATHERBIT_API_HOST"] || ""
            }
          };
          
        const response = await axios.request(options);
        return response.data;
    }
}


