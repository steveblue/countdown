import { Component, html, css, CustomElement } from "@readymade/core";
import { DjAppConfig, TimeCode } from "./types";
import { CountdownElement, SchedulerElement } from ".";
import { convertTimeCodeToDate } from "./util";

function stringify(value: any) {
  return JSON.stringify(value);
}

const style = css`
  :host {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .scheduler {
    display: flex;
    gap: 2rem;
    align-items: center;
    margin-bottom: 2rem;
  }
`;

const template = html`
  <header>
    <div><count-down control="timer"></count-down></div>
    <div class="scheduler">
      <span>Start Time</span><schedule-time control="startTime"></schedule-time>
    </div>
    <div class="scheduler">
      <span>End Time</span><schedule-time control="endTime"></schedule-time>
    </div>
  </header>
`;

@Component({
  selector: "dj-app",
  style,
  template,
})
class DjApp extends CustomElement {
  config: DjAppConfig = {
    startTime: null,
    endTime: null,
  };
  startTime: number = 0;
  endTime: number = 0;
  isTriggered: boolean = false;
  constructor() {
    super();
    if (!localStorage.getItem("DJ-APP-CONFIG")) {
      localStorage.setItem(
        "DJ-APP-CONFIG",
        JSON.stringify({
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
        })
      );
    }
    this.config = JSON.parse(localStorage.getItem("DJ-APP-CONFIG") as string);
    if (this.config.startTime && this.config.endTime) {
      this.setDuration();
      window.addEventListener("djResetCountdown", () => {
        this.isTriggered = false;
        this.step();
      });
      this.step();
    }
  }
  setDuration() {
    this.startTimeElement?.setAttribute(
      "timecode",
      stringify(this.config.startTime)
    );
    this.endTimeElement?.setAttribute(
      "timecode",
      stringify(this.config.endTime)
    );
    this.startTime = convertTimeCodeToDate(
      this.config.startTime as TimeCode
    ).getTime();
    this.endTime = convertTimeCodeToDate(
      this.config.endTime as TimeCode
    ).getTime();
  }
  step() {
    if (this.now >= this.startTime && this.now < this.endTime) {
      this.isTriggered = true;
      this.timerElement.setAttribute("endtime", stringify(this.config.endTime));
    } else if (this.isTriggered === false) {
      this.frame();
    }
  }
  frame() {
    window.requestAnimationFrame(this.step.bind(this));
  }
  get now() {
    return new Date().getTime();
  }
  get startTimeElement() {
    return this.shadowRoot?.querySelector(
      '[control="startTime"]'
    ) as SchedulerElement;
  }
  get endTimeElement() {
    return this.shadowRoot?.querySelector(
      '[control="endTime"]'
    ) as SchedulerElement;
  }
  get timerElement() {
    return this.shadowRoot?.querySelector(
      '[control="timer"]'
    ) as CountdownElement;
  }
}

export { DjApp };
