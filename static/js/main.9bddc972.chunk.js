(this["webpackJsonpreact-editor-repo"]=this["webpackJsonpreact-editor-repo"]||[]).push([[0],{16:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},2:function(e,t,n){e.exports={Home:"Home_Home__jw9yQ",HomeLogo:"Home_HomeLogo__3qjOs","Home-logo-spin":"Home_Home-logo-spin__-aFHo",HomeHeader:"Home_HomeHeader__1n3dH",HomeLink:"Home_HomeLink__1HuIq",Editor:"Home_Editor__21Dn4",InputControl:"Home_InputControl__3Tsx-",EditorButton:"Home_EditorButton__zFo1w",EditorWrap1:"Home_EditorWrap1__3lMId",EditorWrap2:"Home_EditorWrap2__Nb8LP",EditorBlock3:"Home_EditorBlock3__2Ix30",EditorWrap3:"Home_EditorWrap3__3fC6H"}},20:function(e,t,n){e.exports=n(31)},30:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(15),c=n.n(r),l=n(17),i=n(6),s=n(9),u=function(){return(u=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};var d=function(e){e.focus();var t=window.getSelection();t&&t.rangeCount>0&&(t.selectAllChildren(e),t.collapseToEnd())};var m={editor:"styles_editor__9lmdU"};!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!==typeof document){var o=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===n&&o.firstChild?o.insertBefore(a,o.firstChild):o.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}("/* add css styles here (optional) */\n\n.styles_editor__9lmdU {\n  white-space: pre-wrap;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  outline: 0; /* can be weird  overflowed */\n}\n\n.styles_editor__9lmdU:empty:before {\n  content: attr(data-placeholder);\n  color: #b4b4c7;\n  cursor: text;\n}\n");var f=o.forwardRef,p=o.useRef,E=o.useState,v=o.useLayoutEffect,h=o.useCallback,H=o.useImperativeHandle,g=f((function(e,t){var n,a=e.value,r=e.defaultValue,c=e.className,l=e.placeholder,i=e.allowInWebDrop,s=e.processHTML,f=e.processText,g=e.onFocus,b=e.onBlur,_=e.onChange,w=e.onDrop,C=e.onPaste,y=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&(n[o[a]]=e[o[a]])}return n}(e,["value","defaultValue","className","placeholder","allowInWebDrop","processHTML","processText","onFocus","onBlur","onChange","onDrop","onPaste"]),T=(n=E(!1))[0],x=n[1],O=p(null),L=p(null),N=h((function(){var e=function(){var e=window.getSelection();return e&&e.rangeCount>0?e.getRangeAt(0):null}();L.current=e}),[]),j=h((function(){var e=L.current;if(e)!function(e){var t=window.getSelection();t&&(t.removeAllRanges(),t.addRange(e))}(e);else{var t=O.current;t&&d(t)}}),[]),k=h((function(){var e=O.current;e&&e.focus()}),[]),M=h((function(e){k(),s&&(e=s(e)),document.execCommand("insertHTML",!1,e)}),[s]),B=h((function(e){k(),f&&(e=f(e)),document.execCommand("insertHTML",!1,e)}),[f]),W=h((function(){var e=O.current;if(e){e&&"<div><br></div>"===e.innerHTML&&(e.innerHTML=""),x(!0);var t=e.innerHTML;_&&_(t)}}),[]),I=h((function(e){j(),g&&g(e)}),[]),S=h((function(e){N(),b&&b(e)}),[]),D=h((function(e){var t=e.dataTransfer.files||[];t.length<=0&&!i&&e.preventDefault(),t.length>=1&&e.preventDefault(),w&&w(e)}),[i]),P=h((function(e){C&&C(e)}),[M,B]);return H(t,(function(){return{focus:k,insertHTML:M,insertText:B}}),[M,B]),v((function(){var e=O.current;if(e&&void 0!==a&&a!==e.innerHTML){var t=a;s&&(t=s(t)),e.innerHTML=t,d(e)}}),[a,s]),v((function(){var e=O.current;if(e&&!T&&void 0===a&&void 0!==r&&r!==e.innerHTML){var t=r;s&&(t=s(t)),e.innerHTML=t,d(e)}}),[a,s,r,T]),Object(o.createElement)("div",u({ref:O,contentEditable:!0,"data-placeholder":l,className:[m.editor,c].filter(Boolean).join(" "),onFocus:I,onBlur:S,onDrop:D,onPaste:P,onInput:W},y))})),b=n(2),_=n.n(b),w=n(16),C=n.n(w),y=function(e){return e},T=function(e){return e},x=function(){var e=Object(o.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)(""),l=Object(s.a)(c,2),i=l[0],u=l[1],d=Object(o.useState)("40px"),m=Object(s.a)(d,2),f=m[0],p=m[1],E=Object(o.useRef)(null),v=Object(o.useCallback)((function(){r(String(Math.random()))}),[]),h=Object(o.useCallback)((function(){var e=E.current;e&&e.insertText("\b\ud83d\ude01")}),[]),H=Object(o.useCallback)((function(){var e=E.current;e&&e.insertHTML('<img src="./static/media/logo.5d5d9eef.svg">')}),[]),b=Object(o.useCallback)((function(e){p(e.target.value)}),[]);return Object(o.useEffect)((function(){document.title="react-editor"}),[]),a.a.createElement("div",{className:_.a.Home},a.a.createElement("style",null,".".concat(_.a.Editor," img { height: ").concat(f," }")),a.a.createElement("header",{className:_.a.HomeHeader},a.a.createElement("img",{src:C.a,className:_.a.HomeLogo,alt:"logo"}),a.a.createElement("a",{className:_.a.HomeLink,href:"https://github.com/fritx/react-editor",target:"_blank",rel:"noopener noreferrer"},"react-editor")),a.a.createElement("section",{className:_.a.EditorBlock3},a.a.createElement("div",null,a.a.createElement("button",{className:_.a.EditorButton,onClick:v},"Set Random"),a.a.createElement("button",{className:_.a.EditorButton,onClick:h},"Insert Emoji"),a.a.createElement("button",{className:_.a.EditorButton,onClick:H},"Insert HTML"),a.a.createElement("input",{type:"text",className:_.a.InputControl,value:f,onChange:b})),a.a.createElement("div",{className:_.a.EditorWrap3},a.a.createElement(g,{ref:E,placeholder:"Controlled Component",allowInWebDrop:!0,className:_.a.Editor,processHTML:T,processText:y,value:n,onChange:r}))),a.a.createElement("section",{className:_.a.EditorWrap1},a.a.createElement(g,{title:i,placeholder:"Uncontrolled Component",className:_.a.Editor,onChange:u})),a.a.createElement("section",{className:_.a.EditorWrap1},a.a.createElement(g,{placeholder:"Fixed Height",className:_.a.Editor})),a.a.createElement("section",{className:_.a.EditorWrap2},a.a.createElement(g,{placeholder:"Auto Size",className:_.a.Editor})))};n(30),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement((function(){return a.a.createElement(l.a,null,a.a.createElement(i.c,null,a.a.createElement(i.a,{path:"/",exact:!0},a.a.createElement(x,null))))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[20,1,2]]]);
//# sourceMappingURL=main.9bddc972.chunk.js.map