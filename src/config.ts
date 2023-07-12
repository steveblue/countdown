import { DjAppConfig } from "./types";

const APP_CONFIG_ID = "DJ-APP-CONFIG";

const DEFAULT_DJ_APP_CONFIG: DjAppConfig = {
  startTime: {
    hour: "12",
    minute: "00",
    second: "00",
    anteMeridiem: "PM",
  },
  endTime: {
    hour: "12",
    minute: "59",
    second: "59",
    anteMeridiem: "PM",
  },
};

export { APP_CONFIG_ID, DEFAULT_DJ_APP_CONFIG };
