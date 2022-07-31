export interface VisualCrossingForecast {
    locations: {
        [locationKey: string]: Location,
    }
}

export interface Location {
    values: LocationValue[],
}

export interface LocationValue {
    datetime: number,
    temp: number,
}