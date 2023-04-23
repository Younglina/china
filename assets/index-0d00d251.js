import{c as G,ar as L,as as $,d as V,n as J,am as X,a as i,I as F,g as D,$ as H,a6 as K,T as z,q as A,m as P,p as I,ao as Q,v as W,J as Y,at as Z,a0 as ee,a1 as ae,au as te,aa as k,S as ne,x as le,w as ie}from"./index-021851cb.js";import{L as re,a as oe}from"./function-call-4f99f67f.js";import{I as se,s as ce}from"./index-f1a030fb.js";const[ue,r,de]=G("uploader");function R(e,t){return new Promise(o=>{if(t==="file"){o();return}const c=new FileReader;c.onload=v=>{o(v.target.result)},t==="dataUrl"?c.readAsDataURL(e):t==="text"&&c.readAsText(e)})}function O(e,t){return L(e).some(o=>o.file?$(t)?t(o.file):o.file.size>t:!1)}function fe(e,t){const o=[],c=[];return e.forEach(v=>{O(v,t)?c.push(v):o.push(v)}),{valid:o,invalid:c}}const ve=/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i,me=e=>ve.test(e);function B(e){return e.isImage?!0:e.file&&e.file.type?e.file.type.indexOf("image")===0:e.url?me(e.url):typeof e.content=="string"?e.content.indexOf("data:image")===0:!1}var ge=V({props:{name:J,item:X(Object),index:Number,imageFit:String,lazyLoad:Boolean,deletable:Boolean,previewSize:[Number,String,Array],beforeDelete:Function},emits:["delete","preview"],setup(e,{emit:t,slots:o}){const c=()=>{const{status:n,message:u}=e.item;if(n==="uploading"||n==="failed"){const w=n==="failed"?i(F,{name:"close",class:r("mask-icon")},null):i(re,{class:r("loading")},null),f=H(u)&&u!=="";return i("div",{class:r("mask")},[w,f&&i("div",{class:r("mask-message")},[u])])}},v=n=>{const{name:u,item:w,index:f,beforeDelete:x}=e;n.stopPropagation(),K(x,{args:[w,{name:u,index:f}],done:()=>t("delete")})},m=()=>t("preview"),h=()=>{if(e.deletable&&e.item.status!=="uploading"){const n=o["preview-delete"];return i("div",{role:"button",class:r("preview-delete",{shadow:!n}),tabindex:0,"aria-label":de("delete"),onClick:v},[n?n():i(F,{name:"cross",class:r("preview-delete-icon")},null)])}},b=()=>{if(o["preview-cover"]){const{index:n,item:u}=e;return i("div",{class:r("preview-cover")},[o["preview-cover"](z({index:n},u))])}},y=()=>{const{item:n,lazyLoad:u,imageFit:w,previewSize:f}=e;return B(n)?i(se,{fit:w,src:n.content||n.url,class:r("preview-image"),width:Array.isArray(f)?f[0]:f,height:Array.isArray(f)?f[1]:f,lazyLoad:u,onClick:m},{default:b}):i("div",{class:r("file"),style:D(e.previewSize)},[i(F,{class:r("file-icon"),name:"description"},null),i("div",{class:[r("file-name"),"van-ellipsis"]},[n.file?n.file.name:n.url]),b()])};return()=>i("div",{class:r("preview")},[y(),c(),h()])}});const we={name:A(""),accept:P("image/*"),capture:String,multiple:Boolean,disabled:Boolean,readonly:Boolean,lazyLoad:Boolean,maxCount:A(1/0),imageFit:P("cover"),resultType:P("dataUrl"),uploadIcon:P("photograph"),uploadText:String,deletable:I,afterRead:Function,showUpload:I,modelValue:Q(),beforeRead:Function,beforeDelete:Function,previewSize:[Number,String,Array],previewImage:I,previewOptions:Object,previewFullImage:I,maxSize:{type:[Number,String,Function],default:1/0}};var pe=V({name:ue,props:we,emits:["delete","oversize","clickUpload","closePreview","clickPreview","update:modelValue"],setup(e,{emit:t,slots:o}){const c=W(),v=[],m=(a=e.modelValue.length)=>({name:e.name,index:a}),h=()=>{c.value&&(c.value.value="")},b=a=>{if(h(),O(a,e.maxSize))if(Array.isArray(a)){const l=fe(a,e.maxSize);if(a=l.valid,t("oversize",l.invalid,m()),!a.length)return}else{t("oversize",a,m());return}a=le(a),t("update:modelValue",[...e.modelValue,...L(a)]),e.afterRead&&e.afterRead(a,m())},y=a=>{const{maxCount:l,modelValue:d,resultType:s}=e;if(Array.isArray(a)){const g=+l-d.length;a.length>g&&(a=a.slice(0,g)),Promise.all(a.map(p=>R(p,s))).then(p=>{const _=a.map((q,S)=>{const U={file:q,status:"",message:""};return p[S]&&(U.content=p[S]),U});b(_)})}else R(a,s).then(g=>{const p={file:a,status:"",message:""};g&&(p.content=g),b(p)})},n=a=>{const{files:l}=a.target;if(e.disabled||!l||!l.length)return;const d=l.length===1?l[0]:[].slice.call(l);if(e.beforeRead){const s=e.beforeRead(d,m());if(!s){h();return}if(te(s)){s.then(g=>{y(g||d)}).catch(h);return}}y(d)};let u;const w=()=>t("closePreview"),f=a=>{if(e.previewFullImage){const l=e.modelValue.filter(B),d=l.map(s=>(s.file&&!s.url&&s.status!=="failed"&&(s.url=URL.createObjectURL(s.file),v.push(s.url)),s.url)).filter(Boolean);u=ce(z({images:d,startPosition:l.indexOf(a),onClose:w},e.previewOptions))}},x=()=>{u&&u.close()},j=(a,l)=>{const d=e.modelValue.slice(0);d.splice(l,1),t("update:modelValue",d),t("delete",a,m(l))},N=(a,l)=>{const d=["imageFit","deletable","previewSize","beforeDelete"],s=z(k(e,d),k(a,d,!0));return i(ge,ne({item:a,index:l,onClick:()=>t("clickPreview",a,m(l)),onDelete:()=>j(a,l),onPreview:()=>f(a)},k(e,["name","lazyLoad"]),s),k(o,["preview-cover","preview-delete"]))},E=()=>{if(e.previewImage)return e.modelValue.map(N)},C=a=>t("clickUpload",a),T=()=>{if(e.modelValue.length>=e.maxCount)return;const a=e.readonly?null:i("input",{ref:c,type:"file",class:r("input"),accept:e.accept,capture:e.capture,multiple:e.multiple,disabled:e.disabled,onChange:n},null);return o.default?i("div",{class:r("input-wrapper"),onClick:C},[o.default(),a]):ee(i("div",{class:r("upload",{readonly:e.readonly}),style:D(e.previewSize),onClick:C},[i(F,{name:e.uploadIcon,class:r("upload-icon")},null),e.uploadText&&i("span",{class:r("upload-text")},[e.uploadText]),a]),[[ae,e.showUpload]])},M=()=>{c.value&&!e.disabled&&c.value.click()};return Y(()=>{v.forEach(a=>URL.revokeObjectURL(a))}),oe({chooseFile:M,closeImagePreview:x}),Z(()=>e.modelValue),()=>i("div",{class:r()},[i("div",{class:r("wrapper",{disabled:e.disabled})},[E(),T()])])}});const Pe=ie(pe);export{Pe as U};