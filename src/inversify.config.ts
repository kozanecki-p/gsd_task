import { Container } from "inversify";

import { ArerisApi } from "./api-clients/aeris/aeris.api";
import { VisualCrossingApi } from "./api-clients/visualCrossing/visualCrossing.api";
import { WeatherbitApi } from "./api-clients/weaterbit/weatherbit.api";

import { GetAerisForecast } from "./services/weater/GetAerisForecast/GetAerisForecast.service";
import { GetVisualCrossingForecast } from "./services/weater/GetVisualCrossingForecast/GetVisualCrossingForecast.service";
import { GetWeaterbitForecast } from "./services/weater/GetWeatherbitForecast/GetWeaterbitForecast.service";

export function inversifyConfig(container: Container) {
    container.bind(WeatherbitApi).toSelf();
    container.bind(ArerisApi).toSelf();
    container.bind(VisualCrossingApi).toSelf();
  
    container.bind(GetWeaterbitForecast).toSelf();
    container.bind(GetAerisForecast).toSelf();
    container.bind(GetVisualCrossingForecast).toSelf();
}