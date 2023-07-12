import { Component, html, css, CustomElement } from "@readymade/core";
import { TimeCode } from "../types";
import {
  fetchDjAppConfig,
  hasDjAppConfig,
  parse,
  saveDjAppConfig,
} from "../util";

const style = css`
  :host {
    display: flex;
    font-size: 1rem;
    gap: 0.5rem;
    align-items: center;
  }
`;

const template = html`
  <span>
    <rd-dropdown control="hour">
      <select>
        <option>01</option>
        <option>02</option>
        <option>03</option>
        <option>04</option>
        <option>05</option>
        <option>06</option>
        <option>07</option>
        <option>08</option>
        <option>09</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
      </select>
    </rd-dropdown></span
  >:<span
    ><rd-dropdown control="minute">
      <select>
        <option>00</option>
        <option>01</option>
        <option>02</option>
        <option>03</option>
        <option>04</option>
        <option>05</option>
        <option>06</option>
        <option>07</option>
        <option>08</option>
        <option>09</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
        <option>13</option>
        <option>14</option>
        <option>15</option>
        <option>16</option>
        <option>17</option>
        <option>18</option>
        <option>19</option>
        <option>20</option>
        <option>21</option>
        <option>22</option>
        <option>23</option>
        <option>24</option>
        <option>25</option>
        <option>26</option>
        <option>27</option>
        <option>28</option>
        <option>29</option>
        <option>30</option>
        <option>31</option>
        <option>32</option>
        <option>33</option>
        <option>34</option>
        <option>35</option>
        <option>36</option>
        <option>37</option>
        <option>38</option>
        <option>39</option>
        <option>40</option>
        <option>41</option>
        <option>42</option>
        <option>43</option>
        <option>44</option>
        <option>45</option>
        <option>46</option>
        <option>47</option>
        <option>48</option>
        <option>49</option>
        <option>50</option>
        <option>51</option>
        <option>52</option>
        <option>53</option>
        <option>54</option>
        <option>55</option>
        <option>56</option>
        <option>57</option>
        <option>58</option>
        <option>59</option>
      </select>
    </rd-dropdown></span
  >:<span
    ><rd-dropdown control="second">
      <select>
        <option>00</option>
        <option>01</option>
        <option>02</option>
        <option>03</option>
        <option>04</option>
        <option>05</option>
        <option>06</option>
        <option>07</option>
        <option>08</option>
        <option>09</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
        <option>13</option>
        <option>14</option>
        <option>15</option>
        <option>16</option>
        <option>17</option>
        <option>18</option>
        <option>19</option>
        <option>20</option>
        <option>21</option>
        <option>22</option>
        <option>23</option>
        <option>24</option>
        <option>25</option>
        <option>26</option>
        <option>27</option>
        <option>28</option>
        <option>29</option>
        <option>30</option>
        <option>31</option>
        <option>32</option>
        <option>33</option>
        <option>34</option>
        <option>35</option>
        <option>36</option>
        <option>37</option>
        <option>38</option>
        <option>39</option>
        <option>40</option>
        <option>41</option>
        <option>42</option>
        <option>43</option>
        <option>44</option>
        <option>45</option>
        <option>46</option>
        <option>47</option>
        <option>48</option>
        <option>49</option>
        <option>50</option>
        <option>51</option>
        <option>52</option>
        <option>53</option>
        <option>54</option>
        <option>55</option>
        <option>56</option>
        <option>57</option>
        <option>58</option>
        <option>59</option>
      </select>
    </rd-dropdown></span
  >
  <span>
    <rd-dropdown control="anteMeridiem">
      <select>
        <option>AM</option>
        <option>PM</option>
      </select>
    </rd-dropdown>
  </span>
`;

@Component({
  selector: "schedule-time",
  style,
  template,
})
class SchedulerElement extends CustomElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.controls.forEach((elem) =>
      elem.addEventListener("change", this.onControlChange.bind(this))
    );
  }
  static get observedAttributes() {
    return ["timecode"];
  }
  public attributeChangedCallback(
    attr: string, // @ts-ignore
    lastValue: string,
    currentValue: string
  ) {
    if (attr === "timecode") {
      const timecode: TimeCode = parse(currentValue);
      this.inject(timecode);
    }
  }
  onControlChange(ev: Event) {
    const elem = ev.target as HTMLSelectElement;
    const controlName = (elem.parentNode as HTMLElement).getAttribute(
      "control"
    );
    const value = elem.value;
    const storageKey = this.getAttribute("control") as "startTime" | "endTime";
    if (hasDjAppConfig()) {
      const config = fetchDjAppConfig();
      if (controlName) {
        const timecode = {
          ...config[storageKey],
          [controlName]: value,
        };
        config[storageKey] = timecode;
        saveDjAppConfig(config);
      }
    }
  }
  inject(timecode: TimeCode) {
    this.hourElement.value = timecode.hour;
    this.minuteElement.value = timecode.minute;
    this.secondElement.value = timecode.second;
    this.antiMeridiemElement.value = timecode.anteMeridiem as string;
  }
  get controls(): Array<Element> {
    return Array.from(this.shadowRoot!.querySelectorAll("[control]"));
  }
  get hourElement() {
    return this.shadowRoot
      ?.querySelector('[control="hour"]')
      ?.querySelector("select") as HTMLSelectElement;
  }
  get minuteElement() {
    return this.shadowRoot
      ?.querySelector('[control="minute"]')
      ?.querySelector("select") as HTMLSelectElement;
  }
  get secondElement() {
    return this.shadowRoot
      ?.querySelector('[control="second"]')
      ?.querySelector("select") as HTMLSelectElement;
  }
  get antiMeridiemElement() {
    return this.shadowRoot
      ?.querySelector('[control="anteMeridiem"]')
      ?.querySelector("select") as HTMLSelectElement;
  }
}

export { SchedulerElement };
