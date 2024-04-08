export interface Data {
    properties: Properties;
}

export interface Properties {
    updated:           Date;
    units:             string;
    forecastGenerator: string;
    generatedAt:       Date;
    updateTime:        Date;
    validTimes:        string;
    elevation:         Elevation;
    periods:           Period[];
}

export interface Elevation {
    unitCode: UnitCode;
    value:    number | null;
}

export enum UnitCode {
    WmoUnitDegC = "wmoUnit:degC",
    WmoUnitM = "wmoUnit:m",
    WmoUnitPercent = "wmoUnit:percent",
}

export interface Period {
    number:                     number;
    name:                       string;
    startTime:                  Date;
    endTime:                    Date;
    isDaytime:                  boolean;
    temperature:                number;
    temperatureUnit:            TemperatureUnit;
    temperatureTrend:           null;
    probabilityOfPrecipitation: Elevation;
    dewpoint:                   Elevation;
    relativeHumidity:           Elevation;
    windSpeed:                  string;
    windDirection:              string;
    icon:                       string;
    shortForecast:              string;
    detailedForecast:           string;
}

export enum TemperatureUnit {
    F = "F",
}
