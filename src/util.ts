import { APP_CONFIG_ID, DEFAULT_DJ_APP_CONFIG } from "./config";
import { DjAppConfig, TimeCode } from "./types";

function convertTimeCodeToDate(timecode: TimeCode): Date {
  const today = new Date(Date.now()).toDateString();
  return new Date(
    `${today} ${
      timecode.anteMeridiem === "AM"
        ? timecode.hour
        : Number(timecode.hour) + 12
    }:${timecode.minute}:${timecode.second}`
  );
}
function saveDjAppConfig(config: DjAppConfig) {
  localStorage.setItem(APP_CONFIG_ID, JSON.stringify(config));
  window.dispatchEvent(
    new CustomEvent("DJAppConfigChange", { detail: fetchDjAppConfig() })
  );
}

function fetchDjAppConfig(): DjAppConfig {
  if (!hasDjAppConfig()) {
    saveDjAppConfig(DEFAULT_DJ_APP_CONFIG);
  }
  return parse(localStorage.getItem(APP_CONFIG_ID)) as DjAppConfig;
}

function hasDjAppConfig(): boolean {
  return !!localStorage.getItem(APP_CONFIG_ID);
}

function stringify(value: any): string {
  return JSON.stringify(value);
}

function parse(value: any): any {
  return JSON.parse(value);
}

export {
  convertTimeCodeToDate,
  hasDjAppConfig,
  saveDjAppConfig,
  fetchDjAppConfig,
  parse,
  stringify,
};
