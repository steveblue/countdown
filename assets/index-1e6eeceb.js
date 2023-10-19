(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();function a(e,t,o,i){var n=arguments.length,r=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,o,i);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(r=(n<3?s(r):n>3?s(t,o,r):s(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}class N{constructor(t,o){this.target=t,this.channels={default:new BroadcastChannel("default")},o&&this.setChannel(o),this.events={}}get(t){return this.events[t]}set(t,o){return this.events[t]=o,this.get(t)}emit(t){typeof t=="string"&&(t=this.events[t]),this.target.dispatchEvent(t)}broadcast(t,o){typeof t=="string"&&(t=this.events[t]),this.target.dispatchEvent(t);const i={bubbles:t.bubbles,cancelBubble:t.cancelBubble,cancelable:t.cancelable,defaultPrevented:t.defaultPrevented,detail:t.detail,timeStamp:t.timeStamp,type:t.type};o?this.channels[o].postMessage(i):this.channels.default.postMessage(i)}setChannel(t){this.channels[t]=new BroadcastChannel(t),this.channels[t].onmessage=o=>{for(const i in this.target.elementMeta.eventMap)i.includes(t)&&i.includes(o.data.type)&&this.target[this.target.elementMeta.eventMap[i].handler](o.data)}}removeChannel(t){this.channels[t].close(),delete this.channels[t]}}function J(e,t){const o=e.attachShadow(t||{}),i=document.createElement("template");i.innerHTML=e.template,o.appendChild(i.content.cloneNode(!0)),e.bindTemplate()}typeof process=="object"&&String(process);function X(){this.bindState&&this.bindState()}function Y(e,t){e.style||(e.style=""),e.template||(e.template=""),t.prototype.elementMeta=Object.assign(t.elementMeta?t.elementMeta:{},e),t.prototype.elementMeta.eventMap={},t.prototype.template=`<style>${e.style}</style>${e.template}`,t.prototype.bindTemplate=X}const E="$emit",T="$listen",m=(...e)=>e,b=(...e)=>e;function g(e){if(!e){console.error("Component must include ElementMeta to compile");return}return t=>(Y(e,t),e.autoDefine===void 0&&(e.autoDefine=!0),e.autoDefine===!0&&customElements.get(e.selector)===void 0&&(e.selector&&!e.custom?customElements.define(e.selector,t):e.selector&&e.custom?customElements.define(e.selector,t,e.custom):customElements.define(e.selector,t)),t)}function k(e,t,o){return function(n,r,s){const l=o||"default";let c="";e?c=E+l+e:c=E+l;function h(d,f){this.emitter||(this.emitter=new N(this,f)),d&&this.emitter.set(d,new CustomEvent(d,t||{})),f&&!this.emitter.channels[f]&&this.emitter.setChannel(f)}function v(){for(const d in this)d.includes(E)&&this[d].call(this)}n[c]||(n[c]=function(){h.call(this,e,o)}),n.bindEmitters=function(){v.call(this)}}}function x(e,t){return function(i,n,r){const s=Symbol(n);let l="";t?l=T+e+t:l=T+e;function c(d,f){const W=this[s]=(...B)=>{r.value.apply(this,B)};this.emitter||(this.emitter=new N(this,f||null)),this.elementMeta.eventMap[l]={key:d,handler:n},this.addEventListener(d,W)}function h(){this.removeEventListener(e,this[s])}function v(){for(const d in this)d.includes(T)&&this[d].onListener.call(this)}i[l]||(i[l]={},i[l].onListener=function(){c.call(this,e,t)},i[l].onDestroyListener=function(){h.call(this,e,t)}),i.bindListeners=function(){v.call(this)}}}let G=class extends HTMLElement{constructor(){super(),J(this,{mode:this.elementMeta.mode||"open",delegatesFocus:this.elementMeta.delegatesFocus||!1}),this.bindEmitters&&this.bindEmitters(),this.bindListeners&&this.bindListeners(),this.onInit&&this.onInit()}};class y extends G{constructor(){super(),this.$internals=this.attachInternals()}static get formAssociated(){return!0}}let M=class extends y{constructor(){super()}static get observedAttributes(){return["type"]}attributeChangedCallback(t,o,i){switch(t){case"type":this.type=i;break;case"value":this.value=i;break}}formDisabledCallback(t){this.$elem.disabled=t}connectedCallback(){this.$elem.onchange=t=>{console.log(t),this.emitter.emit(new CustomEvent("change",{bubbles:!0,composed:!0,detail:"composed"})),this.onchange&&this.onchange(t)}}get form(){return this.$internals.form}get name(){return this.getAttribute("name")}checkValidity(){return this.$internals.checkValidity()}get validity(){return this.$internals.validity}get validationMessage(){return this.$internals.validationMessage}get type(){return this.$elem.type||"button"}set type(t){this.$elem.type=t}get value(){return this.$elem.value}set value(t){this.$elem.value=t}get $elem(){return this.shadowRoot.querySelector("button")}};a([k("change")],M.prototype,"connectedCallback",null);M=a([g({selector:"rd-button",delegatesFocus:!0,style:b`:host{display:inline-block;outline:0}:host button{width:72px;height:36px;border:2px solid var(--color-border);background-color:var(--color-bg);border-radius:14px;color:var(--color-default);cursor:pointer;display:flex;align-items:center;justify-content:center}:host button .icon{display:block;width:22px;height:22px}:host button.is--small{min-height:18px;border-radius:8px}:host button.is--small .icon{display:inline-block;width:12px;height:12px}:host button.is--medium{min-height:32px;border-radius:14px}:host button.is--medium .icon{display:inline-block;width:22px;height:22px}:host button.is--large{min-height:44px;border-radius:18px}:host button.is--large .icon{display:inline-block;width:32px;height:32px}:host button:hover{background-color:var(--color-bg);border:2px solid var(--color-highlight)}:host button:focus{outline:0;outline-offset:0;background-color:var(--color-bg);border:2px solid var(--color-highlight)}:host button:active{outline:0;outline-offset:0;background-color:var(--color-selected);border:2px solid var(--color-highlight)}:host button[disabled]{opacity:var(--opacity-disabled);background:var(--color-disabled);cursor:not-allowed}:host button[disabled]:active,:host button[disabled]:focus,:host button[disabled]:hover{border:2px solid var(--color-border);outline:0;box-shadow:none}`,template:m`<button><span class="icon"><slot name="icon"></slot></span><span class="label"><slot name="label"></slot></span></button>`})],M);let $=class extends y{constructor(){super()}static get observedAttributes(){return["checked"]}attributeChangedCallback(t,o,i){switch(t){case"checked":this.checked=i==="true"||i==="";break}}formDisabledCallback(t){this.$elem.disabled=t}formResetCallback(){this.$elem.checked=!1}onValidate(){this.hasAttribute("required")&&this.value===!1?(this.$internals.setValidity({customError:!0},"required"),this.$elem.classList.add("required")):(this.$internals.setValidity({}),this.$elem.classList.remove("required"))}connectedCallback(){this.$elem.onchange=t=>{this.onchange?this.onchange(t):this.emitter.emit(new CustomEvent("change",{bubbles:!0,composed:!0,detail:"composed"}))},this.$elem.onblur=t=>{this.onValidate()}}get type(){return"checkbox"}get form(){return this.$internals.form}get name(){return this.getAttribute("name")}checkValidity(){return this.$internals.checkValidity()}get validity(){return this.$internals.validity}get validationMessage(){return this.$internals.validationMessage}get willValidate(){return this.$internals.willValidate}get checked(){return this.$elem.checked}set checked(t){this.$elem.checked=t}get value(){return this.$elem.checked}set value(t){typeof t=="boolean"&&(this.$elem.checked=t)}get $elem(){return this.shadowRoot.querySelector("input")}};a([k("change")],$.prototype,"connectedCallback",null);$=a([g({selector:"rd-checkbox",delegatesFocus:!0,style:b`:host{display:inline-block;width:28px;height:28px;outline:0}:host input[type=checkbox]{-moz-appearance:none;-webkit-appearance:none;appearance:none;margin:0}:host input[type=checkbox]:before{content:'';display:block;width:24px;height:24px;border:2px solid var(--color-border);border-radius:6px;background:var(--color-bg)}:host input[type=checkbox]:checked:before{background-image:var(--icon-check);background-repeat:no-repeat;background-position:center}:host input[type=checkbox]:active,:host input[type=checkbox]:focus{outline:0;outline-offset:0}:host input[type=checkbox]:active:before,:host input[type=checkbox]:focus:before,:host input[type=checkbox]:hover:before{border:2px solid var(--color-highlight)}:host input[type=checkbox][disabled]:before{opacity:var(--opacity-disabled);background:var(--color-disabled);cursor:not-allowed}:host input[type=checkbox][disabled]:checked:before{background-image:var(--icon-check);background-repeat:no-repeat;background-position:center}:host input[type=checkbox][disabled]:active:before,:host input[type=checkbox][disabled]:focus:before,:host input[type=checkbox][disabled]:hover:before{border:2px solid var(--color-border);outline:0;box-shadow:none}:host input[type=checkbox].required:active:before,:host input[type=checkbox].required:before,:host input[type=checkbox].required:focus:before,:host input[type=checkbox].required:hover:before{border:2px solid var(--color-error);outline:0;box-shadow:none}`,template:m`<input type="checkbox">`})],$);let I=class extends ${constructor(){super()}};I=a([g({selector:"rd-switch",delegatesFocus:!0,style:b`:host{display:inline-block;width:72px;height:36px;outline:0}:host input[type=checkbox]{display:flex;width:72px;height:36px;-moz-appearance:none;-webkit-appearance:none;appearance:none;margin:0}:host input[type=checkbox]:before{content:'';width:100%;border:2px solid var(--color-border);background-color:var(--color-bg);border-radius:1em;color:var(--color-default);padding:1px 0;background-image:var(--icon-switch);background-size:22px 22px;background-repeat:no-repeat;background-position:left 2px top 50%}:host input[type=checkbox]:checked:before{background-image:var(--icon-switch);background-size:22px 22px;background-repeat:no-repeat;background-position:right 2px top 50%}:host input[type=checkbox]:active:before,:host input[type=checkbox]:focus:before,:host input[type=checkbox]:hover:before{border:2px solid var(--color-highlight)}:host input[type=checkbox]:active,:host input[type=checkbox]:focus{outline:0;outline-offset:0}:host input[type=checkbox]:active:before{background-color:var(--color-selected);border:2px solid var(--color-highlight)}:host input[type=checkbox][disabled]:before{opacity:var(--opacity-disabled);background:var(--color-disabled);background-image:var(--icon-switch);background-size:22px 22px;background-repeat:no-repeat;background-position:left 2px top 50%;cursor:not-allowed}:host input[type=checkbox][disabled]:checked:before{background-image:var(--icon-switch);background-size:22px 22px;background-repeat:no-repeat;background-position:right 2px top 50%}:host input[type=checkbox][disabled]:active:before,:host input[type=checkbox][disabled]:focus:before,:host input[type=checkbox][disabled]:hover:before{border:2px solid var(--color-border);outline:0;box-shadow:none}:host input[type=checkbox].required:active:before,:host input[type=checkbox].required:before,:host input[type=checkbox].required:focus:before,:host input[type=checkbox].required:hover:before{border:2px solid var(--color-error);outline:0;box-shadow:none}`,template:m`<input type="checkbox">`})],I);let C=class extends y{constructor(){super()}connectedCallback(){this.$elem.onchange=t=>{this.emitter.emit(new CustomEvent("change",{bubbles:!0,composed:!0,detail:"composed"})),this.onchange&&this.onchange(t)},this.$elem.oninput=t=>{this.oninput&&this.oninput(t)},this.$elem.onblur=t=>{this.onValidate()}}formDisabledCallback(t){this.$elem.disabled=t}formResetCallback(){this.value="",this.$internals.setFormValue("")}onValidate(){this.hasAttribute("required")&&this.value.length<=0?(this.$internals.setValidity({customError:!0},"required"),this.$elem.classList.add("required")):(this.$internals.setValidity({}),this.$elem.classList.remove("required"))}get type(){return"text"}get form(){return this.$internals.form}get name(){return this.getAttribute("name")}checkValidity(){return this.$internals.checkValidity()}get validity(){return this.$internals.validity}get validationMessage(){return this.$internals.validationMessage}get willValidate(){return this.$internals.willValidate}get value(){return this.$elem.value}set value(t){this.$elem.value=t}get $elem(){return this.shadowRoot.querySelector("input")}};a([k("change")],C.prototype,"connectedCallback",null);C=a([g({selector:"rd-input",delegatesFocus:!0,style:b`:host{display:inline-block;outline:0}:host input{width:100%;background-color:var(--color-bg);border:2px solid var(--color-border);border-radius:1em;color:var(--color-default);font:var(--font-family);min-height:2em;padding:0 1em}:host input:active,:host input:focus,:host input:hover{border:2px solid var(--color-highlight);outline:0;box-shadow:none}:host input[disabled]{opacity:var(--opacity-disabled);background:var(--color-disabled);cursor:not-allowed}:host input[disabled]:active,:host input[disabled]:focus,:host input[disabled]:hover{border:2px solid var(--color-border);outline:0;box-shadow:none}:host input.required,:host input.required:active,:host input.required:focus,:host input.required:hover{border:2px solid var(--color-error);outline:0;box-shadow:none}`,template:m`<input type="text">`})],C);let V=class extends y{constructor(){super()}connectedCallback(){this.$elem.forEach(t=>{t.onblur=o=>{this.onValidate()}})}formDisabledCallback(t){this.$elem.forEach(o=>o.disabled=t)}formResetCallback(){this.$elem.forEach(t=>t.checked=!1),this.$internals.setFormValue("")}checkValidity(){return this.$internals.checkValidity()}onValidate(){this.hasAttribute("required")&&(!this.value||this.value.length<=0)?(this.$internals.setValidity({customError:!0},"required"),this.$group.classList.add("required")):(this.$internals.setValidity({}),this.$group.classList.remove("required"))}get value(){if(this.$elem.filter(o=>o.checked)[0])return this.$elem.filter(o=>o.checked)[0].value}set value(t){this.$elem.forEach(o=>{o.value===t?o.checked=!0:o.checked=!1})}get $group(){return this.shadowRoot.querySelector(".group")}get $elem(){return this.shadowRoot.querySelector("slot").assignedNodes().filter(t=>t.tagName==="INPUT"&&t.type==="radio")}};V=a([g({selector:"rd-radiogroup",style:b`:host{display:inline-block}::slotted(input[type=radio]){-moz-appearance:none;-webkit-appearance:none;appearance:none;margin:0 4px 0 0;transform:translateY(4px)}::slotted(input[type=radio]):before{content:'';display:block;width:16px;height:16px;border:2px solid var(--color-border);border-radius:50%;background:var(--color-bg)}::slotted(input[type=radio]:checked):before{background:radial-gradient(var(--color-border) 0,var(--color-border) 50%,transparent 50%,transparent);border-color:var(--color-highlight)}::slotted(input[type=radio]:active),::slotted(input[type=radio]:focus){outline:0;outline-offset:0}::slotted(input[type=radio]:active):before,::slotted(input[type=radio]:focus):before,::slotted(input[type=radio]:hover):before{border:2px solid var(--color-highlight)}::slotted(input[type=radio][disabled]):before{opacity:var(--opacity-disabled);background:var(--color-disabled);cursor:not-allowed}::slotted(input[type=radio][disabled]:active):before,::slotted(input[type=radio][disabled]:focus):before,::slotted(input[type=radio][disabled]:hover):before{border:2px solid var(--color-border);outline:0;box-shadow:none}::slotted(label){margin-right:8px}.group{box-sizing:border-box: border: 2px solid transparent;padding:12px;border-radius:14px}.group.required{border:2px solid var(--color-error)}.group.required ::slotted(input[type=radio]){transform:translateX(-1px) translateY(3px)}`,template:m`<div class="group"><slot></slot></div>`})],V);let _=class extends C{constructor(){super()}get $elem(){return this.shadowRoot.querySelector("textarea")}};_=a([g({selector:"rd-textarea",delegatesFocus:!0,style:b`:host{display:inline-block;outline:0}:host textarea{background-color:var(--color-bg);border:2px solid var(--color-border);border-radius:1em;color:var(--color-default);font:var(--font-family);outline:0;overflow:auto;padding:1em;-moz-appearance:none;-webkit-appearance:none;appearance:none;background-image:var(--icon-expand);background-position:bottom .5em right .5em;background-repeat:no-repeat}:host textarea:active,:host textarea:focus,:host textarea:hover{border:2px solid var(--color-highlight);outline:0;box-shadow:none}:host textarea[disabled]{opacity:var(--opacity-disabled);background:var(--color-disabled);cursor:not-allowed}:host textarea[disabled]:active,:host textarea[disabled]:focus,:host textarea[disabled]:hover{border:2px solid var(--color-border);outline:0;box-shadow:none}:host textarea.required,:host textarea.required:active,:host textarea.required:focus,:host textarea.required:hover{border:2px solid var(--color-error);outline:0;box-shadow:none}textarea::-webkit-resizer{display:none}`,template:m`<textarea></textarea>`})],_);let q=class extends y{constructor(){super()}connectedCallback(){this.$elem.onselect=t=>{this.emitter.emit(new CustomEvent("select",{bubbles:!0,composed:!0,detail:"composed"})),this.onselect&&this.onselect(t)},this.$elem.onblur=t=>{this.onValidate()}}formDisabledCallback(t){this.$elem.disabled=t}formResetCallback(){this.$elem.selectedIndex=-1,this.$internals.setFormValue("")}onValidate(){this.hasAttribute("required")&&this.value.length<=0?(this.$internals.setValidity({customError:!0},"required"),this.$elem.classList.add("required")):(this.$internals.setValidity({}),this.$elem.classList.remove("required"))}get form(){return this.$internals.form}get name(){return this.getAttribute("name")}checkValidity(){return this.$internals.checkValidity()}get validity(){return this.$internals.validity}get validationMessage(){return this.$internals.validationMessage}get willValidate(){return this.$internals.willValidate}get value(){return this.$elem.value}set value(t){this.$elem.value=t}get $elem(){return this.shadowRoot.querySelector("slot").assignedNodes().filter(t=>t.tagName==="SELECT")[0]}};a([k("select")],q.prototype,"connectedCallback",null);q=a([g({selector:"rd-dropdown",delegatesFocus:!0,style:b`:host{display:inline-block;outline:0}::slotted(select){display:block;width:100%;background-color:var(--color-bg);border:2px solid var(--color-border);border-radius:1em;color:var(--color-default);font:var(--font-family);line-height:1.3;padding:.3em 1.6em .3em .8em;height:36px;box-sizing:border-box;margin:0;-moz-appearance:none;-webkit-appearance:none;appearance:none;background-image:var(--icon-menu);background-repeat:no-repeat;background-position:right .7em top 50%,0 0;background-size:10px 9px}::slotted(select:active),::slotted(select:focus),::slotted(select:hover){border:2px solid var(--color-highlight);outline:0;box-shadow:none}:root:lang(ar) ::slotted(select),:root:lang(iw) ::slotted(select),[dir=rtl] ::slotted(select){background-position:left .7em top 50%,0 0;padding:.3em .8em .3em 1.4em}::slotted(select::-ms-expand){display:none}::slotted(select[disabled]){opacity:var(--opacity-disabled);background:var(--color-disabled);background-image:var(--icon-menu);background-repeat:no-repeat;background-position:right .7em top 50%,0 0;background-size:10px 9px;cursor:not-allowed}::slotted(select[disabled]:active),::slotted(select[disabled]:focus),::slotted(select[disabled]:hover){border:2px solid var(--color-border);outline:0;box-shadow:none}::slotted(select.required),::slotted(select.required:active),::slotted(select.required:focus),::slotted(select.required:hover){border:2px solid var(--color-error);outline:0;box-shadow:none}`,template:m`<slot></slot>`})],q);let p=class extends y{constructor(){super()}static get observedAttributes(){return["type","size","control"]}attributeChangedCallback(t,o,i){switch(t){case"type":this.shadowRoot.querySelector(".slider").classList.add(i);break;case"size":this.shadowRoot.querySelector(".slider").classList.add(i);break;case"control":i.startsWith("{{")||(this.control=JSON.parse(i),this.onSliderInit());break}}formDisabledCallback(t){t?this.$elem.setAttribute("disabled","true"):this.$elem.removeAttribute("disabled")}formResetCallback(){this.onSliderInit()}onValidate(){this.hasAttribute("required")?(this.$internals.setValidity({customError:!0},"required"),this.$elem.classList.add("required")):(this.$internals.setValidity({}),this.$elem.classList.remove("required"))}get form(){return this.$internals.form}get name(){return this.getAttribute("name")}get validity(){return this.$internals.validity}get validationMessage(){return this.$internals.validationMessage}get willValidate(){return this.$internals.willValidate}get value(){return this.control.currentValue}set value(t){this.updateControl(t)}get $elem(){return this.shadowRoot.querySelector(".draggable")}get $handle(){return this.shadowRoot.querySelector(".handle")}onSliderInit(){this._touchItem=null,this.control.height=this.clientHeight,this.control.width=this.clientWidth,this.control.orient==="is--hor"?(this.style.maxWidth="200px",this.control.currentValue=0,this.control.position="translate(0px,0px)"):this.control.orient==="is--vert"?(this.style.height="200px",this.control.currentValue=0,this.control.position="translate(0px,0px)"):this.control.orient==="is--joystick"&&(this.style.maxWidth="200px",this.style.maxHeight="200px",this.control.currentValue=[0,0],this.control.x=this.control.y=76,this.control.position="translate(76px,76px)"),this._lastPos={transform:this.control.position},this.setActualPosition(this.control.position)}onMouseLeave(t){}onMouseEnter(t){this.control.isActive&&(this.control.hasUserInput=!0)}onTouchStart(t){this.control.hasUserInput=!0,this.onTouchDown(t)}onTouchDown(t){t.preventDefault(),this.control.isActive=!0,this.control.hasUserInput=!0,this.$elem.classList.add("active"),this._rect=this.getBoundingClientRect(),this.control.height=this.clientHeight,this.control.width=this.clientWidth,this.addEventListener("touchmove",this.onTouchMove.bind(this)),this.addEventListener("touchend",this.onMouseUp.bind(this)),this._touchItem===null&&(this._touchItem=t.touches.length-1),this.control.x=t.touches[this._touchItem].pageX-this._rect.left-this.$handle.clientWidth/2,this.control.y=t.touches[this._touchItem].pageY-this._rect.top-this.$handle.clientWidth/2,this.setPosition(this.control.x,this.control.y)}onMouseDown(t){t.preventDefault(),this.control.isActive=!0,this.control.hasUserInput=!0,this.$elem.classList.add("active"),this._rect=this.getBoundingClientRect(),this.control.height=this.clientHeight,this.control.width=this.clientWidth,this.control.orient==="is--joystick"&&(this.control.x=t.offsetX,this.control.y=t.offsetY),this.addEventListener("mousemove",this.onMouseMove.bind(this)),this.addEventListener("mouseup",this.onMouseUp.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),window.addEventListener("mouseup",this.onMouseUp.bind(this)),this.setPosition(this.control.x,this.control.y)}onTouchMove(t){t.preventDefault(),this._touchItem===null&&(this._touchItem=t.touches.length-1),this.control.x=t.touches[this._touchItem].pageX-this._rect.left-this.$handle.getBoundingClientRect().width/2,this.control.y=t.touches[this._touchItem].pageY-this._rect.top-this.$handle.getBoundingClientRect().height/2,this.control.hasUserInput&&this.control.isActive&&(this.setPosition(this.control.x,this.control.y),this.mapValue(),this.control.timeStamp=t.timeStamp,this.onEvent())}onMouseMove(t){this.control.isActive&&(this.$elem.classList.add("active"),this.control.orient==="is--joystick"&&(this.control.x=(this.getBoundingClientRect().left-t.pageX)*-1,this.control.y=(this.offsetTop-t.pageY)*-1),this.control.orient==="is--hor"&&(this.control.x=(this.getBoundingClientRect().left-t.pageX)*-1-this.$handle.getBoundingClientRect().width/2,this.control.y=0),this.control.orient==="is--vert"&&(this.control.x=0,this.control.y=(this.offsetTop-t.pageY)*-1-this.$handle.getBoundingClientRect().height/2),this.control.hasUserInput&&this.control.isActive&&(this.setPosition(this.control.x,this.control.y),this.mapValue(),this.control.timeStamp=t.timeStamp,this.onEvent()))}onMouseUp(t){if(this.control.isActive=!1,this.control.hasUserInput=!1,this.$elem.classList.remove("active"),"ontouchstart"in document.documentElement?this._touchItem=null:(this.removeEventListener("mousemove",this.onMouseMove.bind(this)),this.removeEventListener("mouseup",this.onMouseUp.bind(this))),this.control.orient==="is--joystick"&&this.control.snapToCenter===!0){const o=this.getCenter([0,this.control.width-this.$handle.offsetWidth],[0,this.control.height-this.$handle.offsetHeight]);this.control.x=o[0],this.control.y=o[1],this.setPosition(o[0],o[1])}}onTouchEnd(t){this.onMouseUp(t)}onEvent(){const t=new CustomEvent("input",{bubbles:!0,composed:!0,detail:this.control});this.emitter.emit(t),this.onchange&&this.onchange(t)}getCenter(t,o){const i=t[1]-(t[1]-t[0])/2,n=o[1]-(o[1]-o[0])/2;return[i,n]}distance(t,o){const i=t[0],n=t[1],r=o[0],s=o[1];return Math.sqrt(Math.pow(i-r,2)+Math.pow(n-s,2))}scale(t,o,i,n,r){return(t-o)/(i-o)*(r-n)+n}circularBounds(t,o,i,n){const r=this.getCenter(i,n),s=this.distance([t,o],r),l=i[1]-r[0];if(s<=l)return[t,o];{t=t-r[0],o=o-r[1];const c=Math.atan2(o,t);return[Math.cos(c)*l+r[0],Math.sin(c)*l+r[1]]}}clamp(t,o){return Math.max(Math.min(t,o[1]),o[0])}setActualPosition(t){const o=new RegExp(/(\d+(\.\d+)?)/g),i=t.match(o);i&&(this.$handle.style.transform="matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,"+i[0]+","+i[1]+",0,1)")}clampSlider(t){return t<this.control.min?this.control.min:t>this.control.max?this.control.max:t}clampJoystickX(t){return t<this.control.min[0]?this.control.min[0]:t>this.control.max[0]?this.control.max[0]:t}clampJoystickY(t){return t<this.control.min[1]?this.control.min[1]:t>this.control.max[1]?this.control.max[1]:t}mapValue(){this.control.orient==="is--hor"&&(this.control.currentValue=this.clampSlider(this.scale(this.control.x,0,this.control.width-44,this.control.min,this.control.max))),this.control.orient==="is--vert"&&(this.control.currentValue=this.clampSlider(this.scale(this.control.y,0,this.control.height-44,this.control.min,this.control.max))),this.control.orient==="is--joystick"&&(this.control.currentValue=[this.clampJoystickX(this.scale(this.control.x,0,this.control.width-44,this.control.min[0],this.control.max[0])),this.clampJoystickY(this.scale(this.control.y,0,this.control.height,this.control.min[1],this.control.max[1]))])}setPosition(t,o){const i=n=>(n<0&&(n=0),n);this.control.orient==="is--joystick"?(this._joystickPos=this.circularBounds(this.control.x,this.control.y,[0,this.control.width-this.$handle.offsetWidth],[0,this.control.height-this.$handle.offsetHeight]),this.control.x=this.clamp(this._joystickPos[0],[0,this.control.width-this.$handle.offsetWidth]),this.control.y=this.clamp(this._joystickPos[1],[0,this.control.height-this.$handle.offsetHeight]),this.control.position="translate("+this.control.x+"px,"+this.control.y+"px)",this.setActualPosition(this.control.position)):(t<=0?this.control.x=0:t>this.clientWidth-this.$handle.offsetWidth?this.control.x=this.clientWidth-this.$handle.offsetWidth:this.control.x=t,o<=0?this.control.y=0:o>this.clientHeight-this.$handle.offsetHeight?this.control.y=this.clientHeight-this.$handle.offsetHeight:this.control.y=o,this.control.position="translate("+i(this.control.x)+"px,"+i(this.control.y)+"px)",this.setActualPosition(this.control.position))}updateControl(t){this.control.orient==="is--joystick"&&(this.control.x=this.scale(t[0],this.control.min[0],this.control.max[0],0,this.clientWidth),this.control.y=this.scale(t[1],this.control.min[1],this.control.max[1],0,this.clientHeight)),this.control.orient==="is--hor"&&(this.control.x=this.scale(t,this.control.min,this.control.max,0,this.clientWidth),this.control.y=0),this.control.orient==="is--vert"&&(this.control.x=0,this.control.y=this.scale(t,this.control.min,this.control.max,0,this.clientHeight)),this.setPosition(this.control.x,this.control.y),this.mapValue()}};a([k("input")],p.prototype,"onSliderInit",null);a([x("mouseleave")],p.prototype,"onMouseLeave",null);a([x("mouseenter")],p.prototype,"onMouseEnter",null);a([x("touchstart")],p.prototype,"onTouchStart",null);a([x("mousedown")],p.prototype,"onMouseDown",null);a([x("mouseup")],p.prototype,"onMouseUp",null);a([x("touchend")],p.prototype,"onTouchEnd",null);p=a([g({selector:"rd-slider",style:b`:host{display:block}:host:after{content:'';display:table;clear:both}.draggable{display:block;z-index:1000;background-color:var(--color-bg);border:2px solid var(--color-border)}.draggable .range{width:100%;height:100%;overflow:hidden}.draggable .handle{width:32px;height:32px;border-radius:50%;background:var(--icon-joy);background-repeat:no-repeat;transition:transform .175;pointer-events:none}.slider{position:relative}.slider.small .draggable{border:none}.slider.small .draggable.active{border:none}.slider.hor{width:100%;max-width:280px}.slider.hor .draggable{width:100%;border-radius:14px}.slider.hor .draggable .handle{background:var(--icon-hor);background-position:50% 0;background-repeat:no-repeat;background-size:100% 100%;height:32px;width:32px}.slider.hor.small{width:100%;height:12px}.slider.hor.small .draggable{width:100%;height:12px;border-radius:6px}.slider.vert{width:32px;height:100%}.slider.vert .draggable{width:32px;height:100%;min-height:208px;border-radius:14px}.slider.vert .draggable .handle{background:var(--icon-vert);background-position:0 50%;background-repeat:no-repeat;height:32px;width:32px}.slider.vert.small{width:12px;height:100%}.slider.vert.small .draggable{width:12px;height:100%;border-radius:6px}.slider.joystick{width:200px;height:200px}.slider.joystick .draggable{width:200px;height:200px;border-radius:50%;cursor:var(--icon-handle-bg) 0 0,pointer}.slider.joystick .draggable .handle{position:absolute;background-size:44px 44px;width:44px;height:44px}.slider .draggable.active,.slider .draggable:hover{border:2px solid var(--color-highlight);outline:0;box-shadow:none}.slider .draggable.active .handle,.slider .draggable:hover .handle{-webkit-filter:grayscale(100%) brightness(5);filter:grayscale(100%) brightness(5)}.slider .draggable[disabled]{opacity:var(--opacity-disabled);background:var(--color-disabled);cursor:not-allowed}.slider .draggable[disabled].active,.slider .draggable[disabled]:hover{border:2px solid var(--color-border);outline:0;box-shadow:none}:host.required .slider .draggable,:host.required .slider .draggable[disabled].active,:host.required .slider .draggable[disabled]:hover{border:2px solid var(--color-error);outline:0;box-shadow:none}`,template:m`<div class="slider"><div class="draggable"><div class="range"><div class="handle"></div></div></div></div>`})],p);function K(e,t){const o=e.attachShadow(t||{}),i=document.createElement("template");i.innerHTML=e.template,o.appendChild(i.content.cloneNode(!0)),e.bindTemplate()}typeof process=="object"&&String(process);function Q(){this.bindState&&this.bindState()}function Z(e,t){e.style||(e.style=""),e.template||(e.template=""),t.prototype.elementMeta=Object.assign(t.elementMeta?t.elementMeta:{},e),t.prototype.elementMeta.eventMap={},t.prototype.template=`<style>${e.style}</style>${e.template}`,t.prototype.bindTemplate=Q}const L=(...e)=>e,A=(...e)=>e;function D(e){if(!e){console.error("Component must include ElementMeta to compile");return}return t=>(Z(e,t),e.autoDefine===void 0&&(e.autoDefine=!0),e.autoDefine===!0&&customElements.get(e.selector)===void 0&&(e.selector&&!e.custom?customElements.define(e.selector,t):e.selector&&e.custom?customElements.define(e.selector,t,e.custom):customElements.define(e.selector,t)),t)}class R extends HTMLElement{constructor(){super(),K(this,{mode:this.elementMeta.mode||"open",delegatesFocus:this.elementMeta.delegatesFocus||!1}),this.bindEmitters&&this.bindEmitters(),this.bindListeners&&this.bindListeners(),this.onInit&&this.onInit()}}const P="DJ-APP-CONFIG",tt={startTime:{hour:"12",minute:"00",second:"00",anteMeridiem:"PM"},endTime:{hour:"12",minute:"59",second:"59",anteMeridiem:"PM"}};function u(e){const t=new Date(Date.now()).toDateString();return new Date(`${t} ${e.anteMeridiem==="AM"?e.hour:Number(e.hour)+12}:${e.minute}:${e.second}`)}function F(e){localStorage.setItem(P,JSON.stringify(e)),window.dispatchEvent(new CustomEvent("DJAppConfigChange",{detail:w()}))}function w(){return z()||F(tt),U(localStorage.getItem(P))}function z(){return!!localStorage.getItem(P)}function S(e){return JSON.stringify(e)}function U(e){return JSON.parse(e)}var et=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,it=(e,t,o,i)=>{for(var n=i>1?void 0:i?ot(t,o):t,r=e.length-1,s;r>=0;r--)(s=e[r])&&(n=(i?s(t,o,n):s(n))||n);return i&&n&&et(t,o,n),n};const nt=A`
  :host {
    display: flex;
    font-size: 12rem;
    width: 100%;
    gap: 1rem;
  }
  span {
    display: block;
  }
`,rt=L`
  <span class="hour">00</span><span>:</span> <span class="minute">00</span
  ><span>:</span><span class="second">00</span>
`;let j=class extends R{constructor(){super(),this.startTime=0,this.endTime=0,this.preventOverride=!0,this.isCounting=!1,this.direction="reverse"}static get observedAttributes(){return["direction","endtime"]}attributeChangedCallback(e,t,o){if(e==="direction"&&(this.direction=o),e==="endtime"){const i=JSON.parse(o);this.isCounting&&!this.preventOverride?this.init(i):this.init(i)}}init(e){const t=w();this.startTime=u(t.startTime).getTime(),this.endTime=u(e).getTime(),console.log(u(t.startTime),u(e)),this.step()}step(){this.isCounting=!0,this.direction==="reverse"&&this.reverse(),this.direction==="forward"&&this.forward()}forward(){if(this.now<this.endTime){const e=new Date(this.now-this.startTime),t=e.getUTCHours(),o=e.getUTCMinutes(),i=e.getUTCSeconds();this.inject(t,o,i),this.frame()}else this.isCounting=!1}reverse(){const e=this.endTime-this.now;if(e>0){const t=new Date(e),o=t.getUTCHours(),i=t.getUTCMinutes(),n=t.getUTCSeconds();this.inject(o,i,n),this.frame()}else this.isCounting=!1}inject(e,t,o){this.hourElement.innerText=e<10?`${"0"+e.toString()}`:e.toString(),this.minuteElement.innerText=t<10?`${"0"+t.toString()}`:t.toString(),this.secondElement.innerText=o<10?`${"0"+o.toString()}`:o.toString(),document.title=this.hourElement.innerText+":"+this.minuteElement.innerText+":"+this.secondElement.innerText}frame(){window.requestAnimationFrame(this.step.bind(this))}get now(){return new Date().getTime()}get hourElement(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector(".hour")}get minuteElement(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector(".minute")}get secondElement(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector(".second")}};j=it([D({selector:"count-down",style:nt,template:rt})],j);var st=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,at=(e,t,o,i)=>{for(var n=i>1?void 0:i?lt(t,o):t,r=e.length-1,s;r>=0;r--)(s=e[r])&&(n=(i?s(t,o,n):s(n))||n);return i&&n&&st(t,o,n),n};const ct=A`
  :host {
    display: flex;
    font-size: 1rem;
    gap: 0.5rem;
    align-items: center;
  }
`,dt=L`
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
`;let O=class extends R{constructor(){super()}connectedCallback(){this.controls.forEach(e=>e.addEventListener("change",this.onControlChange.bind(this)))}static get observedAttributes(){return["timecode"]}attributeChangedCallback(e,t,o){if(e==="timecode"){const i=U(o);this.inject(i)}}onControlChange(e){const t=e.target,o=t.parentNode.getAttribute("control"),i=t.value,n=this.getAttribute("control");if(z()){const r=w();if(o){const s={...r[n],[o]:i};r[n]=s,F(r)}}}inject(e){this.hourElement.value=e.hour,this.minuteElement.value=e.minute,this.secondElement.value=e.second,this.antiMeridiemElement.value=e.anteMeridiem}get controls(){return Array.from(this.shadowRoot.querySelectorAll("[control]"))}get hourElement(){var e,t;return(t=(e=this.shadowRoot)==null?void 0:e.querySelector('[control="hour"]'))==null?void 0:t.querySelector("select")}get minuteElement(){var e,t;return(t=(e=this.shadowRoot)==null?void 0:e.querySelector('[control="minute"]'))==null?void 0:t.querySelector("select")}get secondElement(){var e,t;return(t=(e=this.shadowRoot)==null?void 0:e.querySelector('[control="second"]'))==null?void 0:t.querySelector("select")}get antiMeridiemElement(){var e,t;return(t=(e=this.shadowRoot)==null?void 0:e.querySelector('[control="anteMeridiem"]'))==null?void 0:t.querySelector("select")}};O=at([D({selector:"schedule-time",style:ct,template:dt})],O);function ht(e){let t="";const o={},i=[],n={meta:{}};let r=!1;for(var s=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:function(c){return NodeFilter.FILTER_ACCEPT}},!1),l=s.currentNode;l;)l=s.nextNode(),l&&(l.textContent==="Tracks"&&Array.from(l.nextSibling.nextSibling.children).forEach(c=>{c.nodeName==="key"&&(t=c.textContent,o[t]={}),c.nodeName==="dict"&&Array.from(c.children).forEach(h=>{h.nodeName==="key"&&(o[t][h.textContent.toString()]=h.nextSibling.textContent)})}),l.textContent==="Playlists"&&(r=!0),r&&(l.textContent==="Name"||l.textContent==="Description"||l.textContent==="Playlist ID"||l.textContent==="Playlist Persistent ID")&&(n.meta[l.textContent]=l.nextSibling.textContent),r&&l.textContent==="Track ID"&&i.push({index:Array.from(l.parentNode.parentNode.children).indexOf(l.parentNode)+1,id:l.nextSibling.textContent,meta:o[l.nextSibling.textContent]}));return n.sequence=i,n.tracks=o,n}function pt(e){const t=new DOMParser,o=e.innerHTML.toString().replace(/<\!--\?xml\sversion="1.0"\sencoding="UTF-8"\?--\>/gm,""),i=t.parseFromString(o,"application/xml");return ht(i)}function ut(e){return e.replace(/\w\S*/g,function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()})}function mt(e){var o=(parseInt(e)/1e3).toFixed(0),i=Math.floor(o/60),n="";return i>59&&(n=Math.floor(i/60),n=n>=10?n:"0"+n,i=i-n*60,i=i>=10?i:"0"+i),o=Math.floor(o%60),o=o>=10?o:"0"+o,n!=""?n+":"+i+":"+o:i+":"+o}class bt extends HTMLElement{constructor(){super(),this.playlist=[];const t=this.attachShadow({mode:"open"}),o=document.createElement("template");o.innerHTML=`
        <style>
        :host {
            width: 100%;
            line-height: 1.5em;
        }
        :host, :host *, :host *:before, :host *:after {
            box-sizing: border-box;
        }
        .title {
            font-size: 1.5em;
        }
        .track {
            font-size: 1em;
            width: 100%;
            padding-bottom: 1em;
        }
        .track span {
            margin-right: 0.5em;
        }
        .track span:first-child {
            display: inline-block;
            width: 20px;
        }
        .track span:nth-child(2) {
            font-weight: bold;
        }
        </style>
        <div class="container"></div>
        `,t.appendChild(o.content.cloneNode(!0))}static get observedAttributes(){return["xml-selector"]}attributeChangedCallback(t,o,i){switch(t){case"xml-selector":this.parse(i)}}parse(t){const o=document.querySelectorAll(t);this.playlists=Array.from(o).map(i=>pt(i)),this.playlists.forEach(i=>this.render(i))}render(t){const o=this.shadowRoot.querySelector(".container");o.innerHTML="";const i=document.createElement("h3");i.classList.add("title"),i.innerText=t.meta.Name;const n=document.createElement("div");n.classList.add("tracks");for(let r=0;r<t.sequence.length;r++){const s=document.createElement("div");s.classList.add("track");const l=document.createElement("span"),c=document.createElement("span"),h=document.createElement("span"),v=document.createElement("span");l.innerHTML=`${t.sequence[r].index.toString()}&#32;`,h.innerHTML=`${t.sequence[r].meta.Artist}&#32;&#44;`,c.innerHTML=`${ut(t.sequence[r].meta.Name)}&#32;`,v.innerHTML=`${mt(t.sequence[r].meta["Total Time"])}&#32;`,s.appendChild(l),s.appendChild(h),s.appendChild(c),s.appendChild(v),n.appendChild(s)}o.appendChild(i),o.appendChild(n)}}customElements.define("apple-playlist",bt);var gt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,vt=(e,t,o,i)=>{for(var n=i>1?void 0:i?ft(t,o):t,r=e.length-1,s;r>=0;r--)(s=e[r])&&(n=(i?s(t,o,n):s(n))||n);return i&&n&&gt(t,o,n),n};const xt=A`
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
`,yt=L`
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
`;let H=class extends R{constructor(){super(),this.startTime=0,this.endTime=0,this.isTriggered=!1,this.config=w(),this.reset()}connectedCallback(){window.addEventListener("DJAppConfigChange",this.reset.bind(this)),this.directionUpControl.addEventListener("click",this.handleDirectionChange.bind(this)),this.directionDownControl.addEventListener("click",this.handleDirectionChange.bind(this))}handleDirectionChange(e){const o=e.target.getAttribute("direction");this.timerElement.setAttribute("direction",o)}setDuration(){var e,t;(e=this.startTimeElement)==null||e.setAttribute("timecode",S(this.config.startTime)),(t=this.endTimeElement)==null||t.setAttribute("timecode",S(this.config.endTime)),this.startTime=u(this.config.startTime).getTime(),this.endTime=u(this.config.endTime).getTime()}step(){this.now>=this.startTime&&this.now<this.endTime?(this.isTriggered=!0,this.timerElement.setAttribute("endtime",S(this.config.endTime))):this.isTriggered===!1&&this.frame()}frame(){window.requestAnimationFrame(this.step.bind(this))}reset(){this.config=w();const e=u(this.config.startTime).getTime(),t=u(this.config.endTime).getTime();this.setDuration(),this.now>=e&&this.now<=t&&this.config.startTime&&this.config.endTime&&this.step()}get now(){return new Date().getTime()}get startTimeElement(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector('[control="startTime"]')}get endTimeElement(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector('[control="endTime"]')}get timerElement(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector('[control="timer"]')}get directionUpControl(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector(".arrow-left")}get directionDownControl(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector(".arrow-right")}};H=vt([D({selector:"dj-app",style:xt,template:yt})],H);