(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"0bF7":function(e,t,n){"use strict";var a=n("q1tI"),r=n.n(a),l=n("Wbzz"),i=n("M55E"),c=n.n(i);n("Lxk9");t.a=function(e){var t=e.ruleId,n=e.ruleName,a=e.children,i=new c.a.Converter;return r.a.createElement("div",{className:"ruleHeader"},r.a.createElement(l.Link,{to:"/rules/"+t},r.a.createElement("h2",{id:"id-"+t,dangerouslySetInnerHTML:{__html:i.makeHtml(n)}})),r.a.createElement("div",{className:"childContainer"},a))}},AD4l:function(e,t,n){"use strict";n.r(t),n.d(t,"filterByConsistency",(function(){return p}));var a=n("q1tI"),r=n.n(a),l=n("M55E"),i=n.n(l),c=n("Bl7J"),o=n("vrFN"),u=n("qFzy"),m=n("0bF7"),s=n("qJ7i"),d=n("JPpi");n("wcru");t.default=function(e){var t=e.location,n=e.data,a=n.sitePage.context.implementerData,l=JSON.parse(a),f=l.organisation,v=l.toolName,E=l.actMapping,y=l.description,b=new i.a.Converter,h="Implementation report of "+v+" ("+f+")",I=p(E,["consistent","partially-consistent"]),g=p(E,["inconsistent"]);return I&&I.length?r.a.createElement(c.a,{location:t},r.a.createElement(o.a,{title:h}),r.a.createElement("section",{className:"page-implementer"},r.a.createElement("h1",null,h),y&&r.a.createElement("section",{dangerouslySetInnerHTML:{__html:b.makeHtml(y)}}),n.allRules.edges.map((function(e){var t=e.node.frontmatter,n=t.id,a=t.name,l=t.rule_type,i=I.find((function(e){return e.ruleId===n})),c=g.find((function(e){return e.ruleId===n}));return!i&&c?null:i?r.a.createElement("div",{className:"cardItem",key:n,"data-rule-id":n},r.a.createElement(m.a,{ruleId:n,ruleName:a},r.a.createElement(s.a,{title:"Id:",value:n}),r.a.createElement(s.a,{title:"Type:",value:l}),r.a.createElement(s.a,{title:"Consistency:",value:i.consistency})),r.a.createElement(u.a,{mapping:[i],showIncomplete:!1})):null})))):r.a.createElement(c.a,{location:t},r.a.createElement(o.a,{title:h}),r.a.createElement("section",{className:"page-implementer"},r.a.createElement("h1",null,h),r.a.createElement(d.a,{title:"Insufficient implementation data",body:"There are no known implementations. This is likely because the rule has been updated and the implementation report has not yet been updated."})))};function p(e,t){return e.filter((function(e){var n=e.consistency;return t.includes(n)}))}},JPpi:function(e,t,n){"use strict";var a=n("q1tI"),r=n.n(a),l=n("TSYQ"),i=n.n(l);n("wNCM");t.a=function(e){var t=e.cls,n=void 0===t?"":t,a=e.title,l=void 0===a?"":a,c=e.body,o=void 0===c?"":c;return r.a.createElement("div",{className:i()("note",n)},r.a.createElement("b",null,l),r.a.createElement("p",null,o))}},Lxk9:function(e,t,n){},Ppnf:function(e,t){e.exports=function(e,t){void 0===t&&(t=!0);var n=e.split(" ").join("-");return t?n.toLowerCase():n}},VbrR:function(e,t,n){},qFzy:function(e,t,n){"use strict";var a=n("q1tI"),r=n.n(a),l=n("Wbzz"),i=n("Ppnf"),c=n.n(i);function o(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var m=function(e){var t=e.ruleId,n=e.implementations,a=void 0===n?[]:n,i=e.filter,u=void 0===i?s:i;return r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Testcase Url"),r.a.createElement("th",null,"Expected"),a.map((function(e,t){var n=e.implementationId;return r.a.createElement("th",{key:n+"- "+t},n)})))),r.a.createElement("tbody",null,Object.values(function(e,t,n){for(var a,r={},l=o(t.filter(n));!(a=l()).done;)for(var i,u=a.value,m=u.implementationId,s=o(u.findings);!(i=s()).done;){var d,p,f=i.value,v=f.url,E=f.testcase,y=f.expected,b=f.actual;if(r[E])r[E]=Object.assign({},r[E],{actuals:Object.assign({},r[E].actuals,(d={},d[m]=b,d))});else r[E]={url:v,testcase:E,relativeUrl:"/rules/"+e+"/#"+c()(E),expected:y,actuals:(p={},p[m]=b,p)}}return r}(t,a,u)).map((function(e,t){var n=e.testcase,i=e.url,c=e.relativeUrl,o=e.expected,u=e.actuals;return r.a.createElement("tr",{key:i+"-"+t},r.a.createElement("td",null,r.a.createElement(l.Link,{to:c},n)),r.a.createElement("td",null,o),a.map((function(e,t){var n=e.implementationId;return r.a.createElement("td",{key:n+"-"+i+"="+t},u[n])})))}))))};function s(){return!0}var d=n("JPpi");t.a=function(e){var t=e.mapping,n=void 0===t?[]:t,a=e.showIncomplete,l=void 0!==a&&a;return r.a.createElement("div",null,n.map((function(e){var t=e.ruleId,n=void 0===t?"":t,a=e.implementations;return r.a.createElement("div",{key:n},function(e,t,n){if(!e||!e.length)return r.a.createElement(d.a,{cls:"invalid",title:"No Implementations",body:"No complete implemenations are provided. Kindly submit a new or amended implementation report."});return r.a.createElement(r.a.Fragment,null,t?r.a.createElement(r.a.Fragment,null,r.a.createElement(d.a,{cls:"invalid",title:"Incomplete Implementation",body:"Listed below are the incomplete assertions. Kindly submit an amended implementation report."}),r.a.createElement(m,{ruleId:n,implementations:e,filter:function(e){return"inconsistent"===e.consistency}})):r.a.createElement(m,{ruleId:n,implementations:e,filter:function(e){return"inconsistent"!==e.consistency}}))}(a,l,n))})))}},qJ7i:function(e,t,n){"use strict";var a=n("q1tI"),r=n.n(a);n("VbrR");t.a=function(e){var t=e.title,n=e.value;return r.a.createElement("div",{className:"badge"},r.a.createElement("span",{className:"title"},t),r.a.createElement("span",null,n))}},wNCM:function(e,t,n){},wcru:function(e,t,n){}}]);
//# sourceMappingURL=component---src-templates-implementer-js-277643159836f6ec1be7.js.map