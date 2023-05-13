export type TimeCode = {
  hour: string;
  minute: string;
  second: string;
  anteMeridiem?: "AM" | "PM";
};

export type DjAppConfig = {
  startTime: TimeCode | null;
  endTime: TimeCode | null;
};
