import { Component, html, css, CustomElement } from "@readymade/core";
import { TimeCode } from "./types";
import { convertTimeCodeToDate } from "./util";

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
  <span class="hour">00</span><span>:</span><span class="minute">00</span
  ><span>:</span><span class="second">00</span>
`;

@Component({
  selector: "count-down",
  style,
  template,
})
class CountdownElement extends CustomElement {
  endTime: number = 0;
  preventOverride: boolean = true;
  isCounting: boolean = false;
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["endtime"];
  }
  public attributeChangedCallback(
    attr: string,
    lastValue: string,
    currentValue: string
  ) {
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
    this.endTime = convertTimeCodeToDate(endTime).getTime();
    this.step();
  }
  step() {
    this.isCounting = true;
    const remainingTime = this.endTime - this.now;
    if (remainingTime > 0) {
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      // TODO: set elements
      this.hourElement.innerText =
        hours < 10 ? `${"0" + hours.toString()}` : hours.toString();
      this.minuteElement.innerText =
        minutes < 10 ? `${"0" + minutes.toString()}` : minutes.toString();
      this.secondElement.innerText =
        seconds < 10 ? `${"0" + seconds.toString()}` : seconds.toString();
      this.frame();
    } else {
      this.isCounting = false;
    }
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
