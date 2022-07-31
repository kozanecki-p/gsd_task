export interface AerisForecast {
    response: AerisForecastResponse[]
}

export interface AerisForecastResponse {
    periods: Period[]
}

export interface Period {
    timestamp: number,
    avgTempC: number,
}