(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},2:function(e,t,n){e.exports={Home:"Home_Home__jw9yQ",HomeLogo:"Home_HomeLogo__3qjOs","Home-logo-spin":"Home_Home-logo-spin__-aFHo",HomeHeader:"Home_HomeHeader__1n3dH",HomeLink:"Home_HomeLink__1HuIq",Editor:"Home_Editor__21Dn4",InputControl:"Home_InputControl__3Tsx-",EditorButton:"Home_EditorButton__zFo1w",EditorWrap1:"Home_EditorWrap1__3lMId",EditorWrap2:"Home_EditorWrap2__Nb8LP",EditorBlock3:"Home_EditorBlock3__2Ix30",EditorWrap3:"Home_EditorWrap3__3fC6H"}},20:function(e,t,n){e.exports=n(31)},25:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(15),c=n.n(r),l=(n(25),n(17)),i=n(6),s=n(9),u=n(16),d=n.n(u),m=n(2),p=n.n(m),f=function(){return(f=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};var E={editor:"styles_editor__9lmdU"};!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!==typeof document){var o=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===n&&o.firstChild?o.insertBefore(a,o.firstChild):o.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}("/* add css styles here (optional) */\n\n.styles_editor__9lmdU {\n  white-space: pre-wrap;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  outline: 0; /* can be weird  overflowed */\n}\n\n.styles_editor__9lmdU:empty:before {\n  content: attr(data-placeholder);\n  color: #b4b4c7;\n  cursor: text;\n}\n");var h=function(e){e.focus();var t=window.getSelection();t&&t.rangeCount>0&&(t.selectAllChildren(e),t.collapseToEnd())},g=o.forwardRef,v=o.useRef,H=o.useLayoutEffect,b=o.useCallback,_=o.useImperativeHandle,w=g(function(e,t){var n=e.value,a=e.className,r=e.placeholder,c=e.allowInWebDrop,l=e.processHTML,i=e.processText,s=e.onFocus,u=e.onBlur,d=e.onChange,m=e.onDrop,p=(e.onPaste,function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n}(e,["value","className","placeholder","allowInWebDrop","processHTML","processText","onFocus","onBlur","onChange","onDrop","onPaste"])),g=v(null),w=v(null),y=b(function(){var e=function(){var e=window.getSelection();return e&&e.rangeCount>0?e.getRangeAt(0):null}();w.current=e},[]),C=b(function(){var e=w.current;if(e)!function(e){var t=window.getSelection();t&&(t.removeAllRanges(),t.addRange(e))}(e);else{var t=g.current;t&&h(t)}},[]),x=b(function(){var e=g.current;e&&e.focus()},[]),O=b(function(e){x(),l&&(e=l(e)),document.execCommand("insertHTML",!1,e)},[l]),T=b(function(e){x(),i&&(e=i(e)),document.execCommand("insertHTML",!1,e)},[i]),N=b(function(){var e=g.current;if(e){e&&"\n"===e.innerText&&(e.innerHTML="");var t=e.innerHTML;d&&d(t)}},[]),j=b(function(e){C(),s&&s(e)},[]),L=b(function(e){y(),u&&u(e)},[]),k=b(function(e){var t=e.dataTransfer.files||[];t.length<=0&&!c&&e.preventDefault(),t.length>=1&&e.preventDefault(),m&&m(e)},[c]),B=b(function(e){},[O,T]);return _(t,function(){return{focus:x,insertHTML:O,insertText:T}},[O,T]),H(function(){var e=g.current;if(e&&void 0!==n&&n!==e.innerHTML){var t=n;l&&(t=l(t)),e.innerHTML=t,h(e)}},[n,l]),Object(o.createElement)("div",f({ref:g,contentEditable:!0,"data-placeholder":r,className:[E.editor,a].filter(Boolean).join(" "),onFocus:j,onBlur:L,onDrop:k,onPaste:B,onInput:N},p))}),y=function(e){return e},C=function(e){return e},x=function(){var e=Object(o.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)(""),l=Object(s.a)(c,2),i=l[0],u=l[1],m=Object(o.useState)("40px"),f=Object(s.a)(m,2),E=f[0],h=f[1],g=Object(o.useRef)(null),v=Object(o.useCallback)(function(){r(String(Math.random()))},[]),H=Object(o.useCallback)(function(){var e=g.current;e&&e.insertText("\b\ud83d\ude01")},[]),b=Object(o.useCallback)(function(){var e=g.current;e&&e.insertHTML('<img src="./static/media/logo.5d5d9eef.svg">')},[]),_=Object(o.useCallback)(function(e){h(e.target.value)},[]);return a.a.createElement("div",{className:p.a.Home},a.a.createElement("style",null,".".concat(p.a.Editor," img { height: ").concat(E," }")),a.a.createElement("header",{className:p.a.HomeHeader},a.a.createElement("img",{src:d.a,className:p.a.HomeLogo,alt:"logo"}),a.a.createElement("a",{className:p.a.HomeLink,href:"https://github.com/fritx/react-editor",target:"_blank",rel:"noopener noreferrer"},"react-editor")),a.a.createElement("section",{className:p.a.EditorBlock3},a.a.createElement("div",null,a.a.createElement("button",{className:p.a.EditorButton,onClick:v},"Set Random"),a.a.createElement("button",{className:p.a.EditorButton,onClick:H},"Insert Emoji"),a.a.createElement("button",{className:p.a.EditorButton,onClick:b},"Insert HTML"),a.a.createElement("input",{type:"text",className:p.a.InputControl,value:E,onChange:_})),a.a.createElement("div",{className:p.a.EditorWrap3},a.a.createElement(w,{ref:g,placeholder:"Controlled Component",allowInWebDrop:!0,className:p.a.Editor,processHTML:C,processText:y,value:n,onChange:r}))),a.a.createElement("section",{className:p.a.EditorWrap1},a.a.createElement(w,{title:i,placeholder:"Uncontrolled Component",className:p.a.Editor,onChange:u})),a.a.createElement("section",{className:p.a.EditorWrap1},a.a.createElement(w,{placeholder:"Fixed Height",className:p.a.Editor})),a.a.createElement("section",{className:p.a.EditorWrap2},a.a.createElement(w,{placeholder:"Auto Size",className:p.a.Editor})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(function(){return a.a.createElement(l.a,null,a.a.createElement(i.c,null,a.a.createElement(i.a,{path:"/",exact:!0},a.a.createElement(x,null))))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.53e79536.chunk.js.map