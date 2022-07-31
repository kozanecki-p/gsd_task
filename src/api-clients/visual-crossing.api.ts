import { injectable } from "inversify";
import axios from "axios";

@injectable()
export class VisualCrossingApi {
    public async getWeatherForLocation (latitude: number, longitude: number) {

        const options = {
            method: 'GET',
            url: `${process.env["VISUAL_CROSSING_URL"]}/forecast`,
            params: {
              location: `${latitude},${longitude}`,
              aggregateHours: '1',
              shortColumnNames: '0',
              unitGroup: 'metric',
              contentType: 'json'
            },
            headers: {
                'X-RapidAPI-Key': process.env["VISUAL_CROSSING_API_KEY"] || "",
                'X-RapidAPI-Host': process.env["VISUAL_CROSSING_API_HOST"] || ""
            }
        };
          
        const response = await axios.request(options);
        return response;
    }
}