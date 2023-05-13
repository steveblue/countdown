import { TimeCode } from "./types";

function convertTimeCodeToDate(timecode: TimeCode): Date {
  // TODO: adjust for eclipse after 12am
  const today = new Date(Date.now()).toDateString();
  return new Date(
    `${today} ${
      timecode.anteMeridiem === "AM"
        ? timecode.hour
        : Number(timecode.hour) + 12
    }:${timecode.minute}:${timecode.second}`
  );
}

export { convertTimeCodeToDate };
