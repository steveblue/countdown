import { Component, html, css, CustomElement } from "@readymade/core";
import { TimeCode } from "../types";
import { convertTimeCodeToDate, fetchDjAppConfig } from "../util";

type Direction = "forward" | "reverse";

const style = css`
  :host {
    display: flex;
    font-size: 12rem;
    width: 100%;
    gap: 1rem;
  }
  span {
    display: block;
  }
`;

const template = html`
  <span class="hour">00</span><span>:</span> <span class="minute">00</span
  ><span>:</span><span class="second">00</span>
`;

@Component({
  selector: "count-down",
  style,
  template,
})
class CountdownElement extends CustomElement {
  startTime: number = 0;
  endTime: number = 0;
  preventOverride: boolean = true;
  isCounting: boolean = false;
  direction: Direction = "reverse";
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["direction", "endtime"];
  }
  public attributeChangedCallback(
    attr: string, // @ts-ignore
    lastValue: string,
    currentValue: string
  ) {
    if (attr === "direction") {
      this.direction = currentValue as Direction;
    }
    if (attr === "endtime") {
      const timecode: TimeCode = JSON.parse(currentValue);
      if (this.isCounting && !this.preventOverride) {
        this.init(timecode);
      } else {
        this.init(timecode);
      }
    }
  }
  init(endTime: TimeCode) {
    const config = fetchDjAppConfig();
    this.startTime = convertTimeCodeToDate(config.startTime).getTime();
    this.endTime = convertTimeCodeToDate(endTime).getTime();
    console.log(
      convertTimeCodeToDate(config.startTime),
      convertTimeCodeToDate(endTime)
    );
    this.step();
  }
  step() {
    this.isCounting = true;
    if (this.direction === "reverse") {
      this.reverse();
    }
    if (this.direction === "forward") {
      this.forward();
    }
  }
  forward() {
    if (this.now < this.endTime) {
      const time = new Date(this.now - this.startTime);
      const hours = time.getUTCHours();
      const minutes = time.getUTCMinutes();
      const seconds = time.getUTCSeconds();
      this.inject(hours, minutes, seconds);
      this.frame();
    } else {
      this.isCounting = false;
    }
  }
  reverse() {
    const remainingTime = this.endTime - this.now;
    if (remainingTime > 0) {
      const time = new Date(remainingTime);
      const hours = time.getUTCHours();
      const minutes = time.getUTCMinutes();
      const seconds = time.getUTCSeconds();
      this.inject(hours, minutes, seconds);
      this.frame();
    } else {
      this.isCounting = false;
    }
  }
  inject(hours: number, minutes: number, seconds: number) {
    this.hourElement.innerText =
      hours < 10 ? `${"0" + hours.toString()}` : hours.toString();
    this.minuteElement.innerText =
      minutes < 10 ? `${"0" + minutes.toString()}` : minutes.toString();
    this.secondElement.innerText =
      seconds < 10 ? `${"0" + seconds.toString()}` : seconds.toString();
  }
  frame() {
    window.requestAnimationFrame(this.step.bind(this));
  }
  get now() {
    return new Date().getTime();
  }
  get hourElement() {
    return this.shadowRoot?.querySelector(".hour") as HTMLSpanElement;
  }
  get minuteElement() {
    return this.shadowRoot?.querySelector(".minute") as HTMLSpanElement;
  }
  get secondElement() {
    return this.shadowRoot?.querySelector(".second") as HTMLSpanElement;
  }
}

export { CountdownElement };
