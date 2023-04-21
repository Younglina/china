import{c as Y,m as F,n as B,p as H,V as W,T as ae,ai as Ce,d as J,aj as Ie,a as u,$ as E,I as N,w as Q,y as Ee,av as ie,O as U,aw as ke,ax as Pe,au as Te,as as Le,ad as Be,q as Me,x as Ae,v as q,Q as Re,b as D,R as _e,a2 as $e,z as De,N as z,D as Fe,K as Ne,ar as ee,ay as Oe,az as ze,S as We,ah as je,aA as qe}from"./index-002d2008.js";import{a as le}from"./function-call-85b48d00.js";import{u as Ke}from"./use-id-fff503f2.js";const[He,R]=Y("cell"),re={tag:F("div"),icon:String,size:String,title:B,value:B,label:B,center:Boolean,isLink:Boolean,border:H,required:Boolean,iconPrefix:String,valueClass:W,labelClass:W,titleClass:W,titleStyle:null,arrowDirection:String,clickable:{type:Boolean,default:null}},Ue=ae({},re,Ce);var Ye=J({name:He,props:Ue,setup(e,{slots:n}){const s=Ie(),d=()=>{if(n.label||E(e.label))return u("div",{class:[R("label"),e.labelClass]},[n.label?n.label():e.label])},i=()=>{var c;if(n.title||E(e.title)){const b=(c=n.title)==null?void 0:c.call(n);return Array.isArray(b)&&b.length===0?void 0:u("div",{class:[R("title"),e.titleClass],style:e.titleStyle},[b||u("span",null,[e.title]),d()])}},f=()=>{const c=n.value||n.default;if(c||E(e.value))return u("div",{class:[R("value"),e.valueClass]},[c?c():u("span",null,[e.value])])},M=()=>{if(n.icon)return n.icon();if(e.icon)return u(N,{name:e.icon,class:R("left-icon"),classPrefix:e.iconPrefix},null)},P=()=>{if(n["right-icon"])return n["right-icon"]();if(e.isLink){const c=e.arrowDirection&&e.arrowDirection!=="right"?`arrow-${e.arrowDirection}`:"arrow";return u(N,{name:c,class:R("right-icon")},null)}};return()=>{var c;const{tag:b,size:h,center:_,border:T,isLink:A,required:C}=e,k=(c=e.clickable)!=null?c:A,a={center:_,required:C,clickable:k,borderless:!T};return h&&(a[h]=!!h),u(b,{class:R(a),role:k?"button":void 0,tabindex:k?0:void 0,onClick:s},{default:()=>{var l;return[M(),i(),f(),P(),(l=n.extra)==null?void 0:l.call(n)]}})}}});const Je=Q(Ye),[Qe,Ge]=Y("form"),Xe={colon:Boolean,disabled:Boolean,readonly:Boolean,showError:Boolean,labelWidth:B,labelAlign:String,inputAlign:String,scrollToError:Boolean,validateFirst:Boolean,submitOnEnter:H,showErrorMessage:H,errorMessageAlign:String,validateTrigger:{type:[String,Array],default:"onBlur"}};var Ze=J({name:Qe,props:Xe,emits:["submit","failed"],setup(e,{emit:n,slots:s}){const{children:d,linkChildren:i}=Ee(ie),f=a=>a?d.filter(l=>a.includes(l.name)):d,M=a=>new Promise((l,v)=>{const S=[];f(a).reduce(($,j)=>$.then(()=>{if(!S.length)return j.validate().then(L=>{L&&S.push(L)})}),Promise.resolve()).then(()=>{S.length?v(S):l()})}),P=a=>new Promise((l,v)=>{const S=f(a);Promise.all(S.map(V=>V.validate())).then(V=>{V=V.filter(Boolean),V.length?v(V):l()})}),c=a=>{const l=d.find(v=>v.name===a);return l?new Promise((v,S)=>{l.validate().then(V=>{V?S(V):v()})}):Promise.reject()},b=a=>typeof a=="string"?c(a):e.validateFirst?M(a):P(a),h=a=>{typeof a=="string"&&(a=[a]),f(a).forEach(v=>{v.resetValidation()})},_=()=>d.reduce((a,l)=>(a[l.name]=l.getValidationStatus(),a),{}),T=(a,l)=>{d.some(v=>v.name===a?(v.$el.scrollIntoView(l),!0):!1)},A=()=>d.reduce((a,l)=>(l.name!==void 0&&(a[l.name]=l.formValue.value),a),{}),C=()=>{const a=A();b().then(()=>n("submit",a)).catch(l=>{n("failed",{values:a,errors:l}),e.scrollToError&&l[0].name&&T(l[0].name)})},k=a=>{U(a),C()};return i({props:e}),le({submit:C,validate:b,getValues:A,scrollToField:T,resetValidation:h,getValidationStatus:_}),()=>{var a;return u("form",{class:Ge(),onSubmit:k},[(a=s.default)==null?void 0:a.call(s)])}}});const dt=Q(Ze);function oe(e){return Array.isArray(e)?!e.length:e===0?!1:!e}function pe(e,n){if(oe(e)){if(n.required)return!1;if(n.validateEmpty===!1)return!0}return!(n.pattern&&!n.pattern.test(String(e)))}function et(e,n){return new Promise(s=>{const d=n.validator(e,n);if(Te(d)){d.then(s);return}s(d)})}function te(e,n){const{message:s}=n;return Le(s)?s(e,n):s||""}function tt({target:e}){e.composing=!0}function ne({target:e}){e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}function nt(e,n){const s=ke();e.style.height="auto";let d=e.scrollHeight;if(Be(n)){const{maxHeight:i,minHeight:f}=n;i!==void 0&&(d=Math.min(d,i)),f!==void 0&&(d=Math.max(d,f))}d&&(e.style.height=`${d}px`,Pe(s))}function at(e){return e==="number"?{type:"text",inputmode:"decimal"}:e==="digit"?{type:"tel",inputmode:"numeric"}:{type:e}}function I(e){return[...e].length}function K(e,n){return[...e].slice(0,n).join("")}const[it,w]=Y("field"),lt={id:String,name:String,leftIcon:String,rightIcon:String,autofocus:Boolean,clearable:Boolean,maxlength:B,formatter:Function,clearIcon:F("clear"),modelValue:Me(""),inputAlign:String,placeholder:String,autocomplete:String,errorMessage:String,enterkeyhint:String,clearTrigger:F("focus"),formatTrigger:F("onChange"),error:{type:Boolean,default:null},disabled:{type:Boolean,default:null},readonly:{type:Boolean,default:null}},rt=ae({},re,lt,{rows:B,type:F("text"),rules:Array,autosize:[Boolean,Object],labelWidth:B,labelClass:W,labelAlign:String,showWordLimit:Boolean,errorMessageAlign:String,colon:{type:Boolean,default:null}});var ot=J({name:it,props:rt,emits:["blur","focus","clear","keypress","clickInput","endValidate","startValidate","clickLeftIcon","clickRightIcon","update:modelValue"],setup(e,{emit:n,slots:s}){const d=Ke(),i=Ae({status:"unvalidated",focused:!1,validateMessage:""}),f=q(),M=q(),P=q(),{parent:c}=Re(ie),b=()=>{var t;return String((t=e.modelValue)!=null?t:"")},h=t=>{if(E(e[t]))return e[t];if(c&&E(c.props[t]))return c.props[t]},_=D(()=>{const t=h("readonly");if(e.clearable&&!t){const o=b()!=="",r=e.clearTrigger==="always"||e.clearTrigger==="focus"&&i.focused;return o&&r}return!1}),T=D(()=>P.value&&s.input?P.value():e.modelValue),A=t=>t.reduce((o,r)=>o.then(()=>{if(i.status==="failed")return;let{value:g}=T;if(r.formatter&&(g=r.formatter(g,r)),!pe(g,r)){i.status="failed",i.validateMessage=te(g,r);return}if(r.validator)return oe(g)&&r.validateEmpty===!1?void 0:et(g,r).then(m=>{m&&typeof m=="string"?(i.status="failed",i.validateMessage=m):m===!1&&(i.status="failed",i.validateMessage=te(g,r))})}),Promise.resolve()),C=()=>{i.status="unvalidated",i.validateMessage=""},k=()=>n("endValidate",{status:i.status,message:i.validateMessage}),a=(t=e.rules)=>new Promise(o=>{C(),t?(n("startValidate"),A(t).then(()=>{i.status==="failed"?(o({name:e.name,message:i.validateMessage}),k()):(i.status="passed",o(),k())})):o()}),l=t=>{if(c&&e.rules){const{validateTrigger:o}=c.props,r=ee(o).includes(t),g=e.rules.filter(m=>m.trigger?ee(m.trigger).includes(t):r);g.length&&a(g)}},v=t=>{var o;const{maxlength:r}=e;if(E(r)&&I(t)>r){const g=b();if(g&&I(g)===+r)return g;const m=(o=f.value)==null?void 0:o.selectionEnd;if(i.focused&&m){const y=[...t],x=y.length-+r;return y.splice(m-x,x),y.join("")}return K(t,+r)}return t},S=(t,o="onChange")=>{const r=t;t=v(t);const g=I(r)-I(t);if(e.type==="number"||e.type==="digit"){const y=e.type==="number";t=Oe(t,y,y)}let m=0;if(e.formatter&&o===e.formatTrigger){const{formatter:y,maxlength:x}=e;if(t=y(t),E(x)&&I(t)>x&&(t=K(t,+x)),f.value&&i.focused){const{selectionEnd:O}=f.value,p=K(r,O);m=I(y(p))-I(p)}}if(f.value&&f.value.value!==t)if(i.focused){let{selectionStart:y,selectionEnd:x}=f.value;if(f.value.value=t,E(y)&&E(x)){const O=I(t);g?(y-=g,x-=g):m&&(y+=m,x+=m),f.value.setSelectionRange(Math.min(y,O),Math.min(x,O))}}else f.value.value=t;t!==e.modelValue&&n("update:modelValue",t)},V=t=>{t.target.composing||S(t.target.value)},$=()=>{var t;return(t=f.value)==null?void 0:t.blur()},j=()=>{var t;return(t=f.value)==null?void 0:t.focus()},L=()=>{const t=f.value;e.type==="textarea"&&e.autosize&&t&&nt(t,e.autosize)},se=t=>{i.focused=!0,n("focus",t),z(L),h("readonly")&&$()},ce=t=>{h("readonly")||(i.focused=!1,S(b(),"onBlur"),n("blur",t),l("onBlur"),z(L),qe())},G=t=>n("clickInput",t),ue=t=>n("clickLeftIcon",t),de=t=>n("clickRightIcon",t),fe=t=>{U(t),n("update:modelValue",""),n("clear",t)},X=D(()=>{if(typeof e.error=="boolean")return e.error;if(c&&c.props.showError&&i.status==="failed")return!0}),ge=D(()=>{const t=h("labelWidth");if(t)return{width:_e(t)}}),me=t=>{t.keyCode===13&&(!(c&&c.props.submitOnEnter)&&e.type!=="textarea"&&U(t),e.type==="search"&&$()),n("keypress",t)},Z=()=>e.id||`${d}-input`,he=()=>i.status,be=()=>{const t=w("control",[h("inputAlign"),{error:X.value,custom:!!s.input,"min-height":e.type==="textarea"&&!e.autosize}]);if(s.input)return u("div",{class:t,onClick:G},[s.input()]);const o={id:Z(),ref:f,name:e.name,rows:e.rows!==void 0?+e.rows:void 0,class:t,disabled:h("disabled"),readonly:h("readonly"),autofocus:e.autofocus,placeholder:e.placeholder,autocomplete:e.autocomplete,enterkeyhint:e.enterkeyhint,"aria-labelledby":e.label?`${d}-label`:void 0,onBlur:ce,onFocus:se,onInput:V,onClick:G,onChange:ne,onKeypress:me,onCompositionend:ne,onCompositionstart:tt};return e.type==="textarea"?u("textarea",o,null):u("input",We(at(e.type),o),null)},ve=()=>{const t=s["left-icon"];if(e.leftIcon||t)return u("div",{class:w("left-icon"),onClick:ue},[t?t():u(N,{name:e.leftIcon,classPrefix:e.iconPrefix},null)])},ye=()=>{const t=s["right-icon"];if(e.rightIcon||t)return u("div",{class:w("right-icon"),onClick:de},[t?t():u(N,{name:e.rightIcon,classPrefix:e.iconPrefix},null)])},Se=()=>{if(e.showWordLimit&&e.maxlength){const t=I(b());return u("div",{class:w("word-limit")},[u("span",{class:w("word-num")},[t]),je("/"),e.maxlength])}},Ve=()=>{if(c&&c.props.showErrorMessage===!1)return;const t=e.errorMessage||i.validateMessage;if(t){const o=s["error-message"],r=h("errorMessageAlign");return u("div",{class:w("error-message",r)},[o?o({message:t}):t])}},we=()=>{const t=h("colon")?":":"";if(s.label)return[s.label(),t];if(e.label)return u("label",{id:`${d}-label`,for:Z()},[e.label+t])},xe=()=>[u("div",{class:w("body")},[be(),_.value&&u(N,{ref:M,name:e.clearIcon,class:w("clear")},null),ye(),s.button&&u("div",{class:w("button")},[s.button()])]),Se(),Ve()];return le({blur:$,focus:j,validate:a,formValue:T,resetValidation:C,getValidationStatus:he}),$e(ze,{customValue:P,resetValidation:C,validateWithTrigger:l}),De(()=>e.modelValue,()=>{S(b()),C(),l("onChange"),z(L)}),Fe(()=>{S(b(),e.formatTrigger),z(L)}),Ne("touchstart",fe,{target:D(()=>{var t;return(t=M.value)==null?void 0:t.$el})}),()=>{const t=h("disabled"),o=h("labelAlign"),r=ve(),g=()=>{const m=we();return o==="top"?[r,m].filter(Boolean):m||[]};return u(Je,{size:e.size,class:w({error:X.value,disabled:t,[`label-${o}`]:o}),center:e.center,border:e.border,isLink:e.isLink,clickable:e.clickable,titleStyle:ge.value,valueClass:w("value"),titleClass:[w("label",[o,{required:e.required}]),e.labelClass],arrowDirection:e.arrowDirection},{icon:r&&o!=="top"?()=>r:null,title:g,value:xe,extra:s.extra})}}});const ft=Q(ot);export{ft as F,dt as a};