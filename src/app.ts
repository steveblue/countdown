import { Component, html, css, CustomElement } from "@readymade/core";
import { DjAppConfig, TimeCode } from "./types";
import { CountdownElement, SchedulerElement } from ".";
import { convertTimeCodeToDate, fetchDjAppConfig, stringify } from "./util";

const style = css`
  :host {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .countdown {
    display: flex;
    align-items: center;
  }
  .controls {
    display: flex;
    flex-direction: horizontal;
  }
  .direction-controls {
    margin-left: 2rem;
  }
  .direction-control {
    cursor: pointer;
  }
  .direction-control:first-child {
    margin-right: 1rem;
  }
  .scheduler-controls {
    gap: 2rem;
  }
  .scheduler {
    display: flex;
    gap: 2rem;
    align-items: center;
    margin-bottom: 2rem;
  }
  .scheduler h2 {
    font-size: 1rem;
  }
  .arrow-left {
    width: 0;
    height: 0;
    border-right: 12px solid var(--color-default);
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
  }
  .arrow-right {
    width: 0;
    height: 0;
    border-left: 12px solid var(--color-default);
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
  }
`;

const template = html`
  <header>
    <div class="countdown">
      <count-down control="timer"></count-down>
      <span class="controls direction-controls">
        <div
          class="direction-control arrow-left"
          title="Elapsed"
          direction="forward"
          role="button"
        ></div>
        <div
          class="direction-control arrow-right"
          title="Remaining"
          direction="reverse"
          role="button"
        ></div>
      </span>
    </div>
    <span class="controls scheduler-controls">
    <div class="scheduler">
      <h2>Start Time</h2><schedule-time control="startTime"></schedule-time>
    </div>
    <div class="scheduler">
      <h2>End Time</h2><schedule-time control="endTime"></schedule-time>
    </div>
    </div>
  </header>
`;

@Component({
  selector: "dj-app",
  style,
  template,
})
class DjApp extends CustomElement {
  config: DjAppConfig;
  startTime: number = 0;
  endTime: number = 0;
  isTriggered: boolean = false;
  constructor() {
    super();
    this.config = fetchDjAppConfig();
    this.reset();
  }
  connectedCallback() {
    window.addEventListener("DJAppConfigChange", this.reset.bind(this));
    this.directionUpControl.addEventListener(
      "click",
      this.handleDirectionChange.bind(this)
    );
    this.directionDownControl.addEventListener(
      "click",
      this.handleDirectionChange.bind(this)
    );
  }
  handleDirectionChange(ev: Event) {
    const elem = ev.target as HTMLDivElement;
    const direction = elem.getAttribute("direction");
    this.timerElement.setAttribute("direction", direction as string);
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
  reset() {
    this.config = fetchDjAppConfig();
    const startTime = convertTimeCodeToDate(
      this.config.startTime as TimeCode
    ).getTime();
    const endTime = convertTimeCodeToDate(
      this.config.endTime as TimeCode
    ).getTime();
    this.setDuration();
    if (
      this.now >= startTime &&
      this.now <= endTime &&
      this.config.startTime &&
      this.config.endTime
    ) {
      this.step();
    }
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
  get directionUpControl() {
    return this.shadowRoot?.querySelector(".arrow-left") as HTMLDivElement;
  }
  get directionDownControl() {
    return this.shadowRoot?.querySelector(".arrow-right") as HTMLDivElement;
  }
}

export { DjApp };
