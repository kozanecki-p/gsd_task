export interface AerisForecast {
    periods: Period[]
}

export interface Period {
    timestamp: number,
    avgTempC: number,
}