(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"0bF7":function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r),i=n("Wbzz"),l=n("M55E"),o=n.n(l);n("Lxk9");t.a=function(e){var t=e.ruleId,n=e.ruleName,r=e.children,l=new o.a.Converter;return a.a.createElement("div",{className:"ruleHeader"},a.a.createElement(i.Link,{to:"/rules/"+t},a.a.createElement("h2",{id:"id-"+t,dangerouslySetInnerHTML:{__html:l.makeHtml(n)}})),a.a.createElement("div",{className:"childContainer"},r))}},"7VC1":function(e,t,n){"use strict";var r=n("XKFU"),a=n("Lgjv"),i=n("ol8x"),l=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);r(r.P+r.F*l,"String",{padEnd:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0,!1)}})},AD4l:function(e,t,n){"use strict";n.r(t),n.d(t,"query",(function(){return m})),n.d(t,"filterByConsistency",(function(){return d}));n("Z2Ku"),n("L9s1"),n("dRSK"),n("f3/d");var r=n("q1tI"),a=n.n(r),i=n("Bl7J"),l=n("vrFN"),o=n("qFzy"),c=n("0bF7"),u=n("qJ7i"),s=n("JPpi");n("wcru");t.default=function(e){var t=e.location,n=e.data,r=n.sitePage.context.implementerData,m=JSON.parse(r),f=m.organisation,p=m.toolName,v=m.actMapping,E=m.description,h="Implementation report of "+p+" ("+f+")",y=d(v,["consistent","partially-consistent"]),b=d(v,["inconsistent"]);return y&&y.length?a.a.createElement(i.a,{location:t},a.a.createElement(l.a,{title:h}),a.a.createElement("section",{className:"page-implementer"},a.a.createElement("h1",null,h),E&&a.a.createElement("p",null,E),n.allRules.edges.map((function(e){var t=e.node.frontmatter,n=t.id,r=t.name,i=t.rule_type,l=y.find((function(e){return e.ruleId===n})),s=b.find((function(e){return e.ruleId===n}));return!l&&s?null:l?a.a.createElement("div",{className:"cardItem",key:n,"data-rule-id":n},a.a.createElement(c.a,{ruleId:n,ruleName:r},a.a.createElement(u.a,{title:"Id:",value:n}),a.a.createElement(u.a,{title:"Type:",value:i}),a.a.createElement(u.a,{title:"Consistency:",value:l.consistency})),a.a.createElement(o.a,{mapping:[l],showIncomplete:!1})):null})))):a.a.createElement(i.a,{location:t},a.a.createElement(l.a,{title:h}),a.a.createElement("section",{className:"page-implementer"},a.a.createElement("h1",null,h),a.a.createElement(s.a,{title:"Insufficient implementation data",body:"There are no known implementations. This is likely because the rule has been updated and the implementation report has not yet been updated."})))};var m="2915212007";function d(e,t){return e.filter((function(e){var n=e.consistency;return t.includes(n)}))}},FLlr:function(e,t,n){var r=n("XKFU");r(r.P,"String",{repeat:n("l0Rn")})},JPpi:function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r),i=n("TSYQ"),l=n.n(i);n("wNCM");t.a=function(e){var t=e.cls,n=void 0===t?"":t,r=e.title,i=void 0===r?"":r,o=e.body,c=void 0===o?"":o;return a.a.createElement("div",{className:l()("note",n)},a.a.createElement("b",null,i),a.a.createElement("p",null,c))}},Lgjv:function(e,t,n){var r=n("ne8i"),a=n("l0Rn"),i=n("vhPU");e.exports=function(e,t,n,l){var o=String(i(e)),c=o.length,u=void 0===n?" ":String(n),s=r(t);if(s<=c||""==u)return o;var m=s-c,d=a.call(u,Math.ceil(m/u.length));return d.length>m&&(d=d.slice(0,m)),l?d+o:o+d}},Lxk9:function(e,t,n){},Ppnf:function(e,t,n){n("KKXr");e.exports=function(e,t){void 0===t&&(t=!0);var n=e.split(" ").join("-");return t?n.toLowerCase():n}},Tze0:function(e,t,n){"use strict";n("qncB")("trim",(function(e){return function(){return e(this,3)}}))},UExd:function(e,t,n){var r=n("nh4g"),a=n("DVgA"),i=n("aCFj"),l=n("UqcF").f;e.exports=function(e){return function(t){for(var n,o=i(t),c=a(o),u=c.length,s=0,m=[];u>s;)n=c[s++],r&&!l.call(o,n)||m.push(e?[n,o[n]]:o[n]);return m}}},VbrR:function(e,t,n){},hhXQ:function(e,t,n){var r=n("XKFU"),a=n("UExd")(!1);r(r.S,"Object",{values:function(e){return a(e)}})},l0Rn:function(e,t,n){"use strict";var r=n("RYi7"),a=n("vhPU");e.exports=function(e){var t=String(a(this)),n="",i=r(e);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(t+=t))1&i&&(n+=t);return n}},qFzy:function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r),i=(n("rE2o"),n("ioFf"),n("XfO3"),n("HEwt"),n("f3/d"),n("a1Th"),n("91GP"),n("rGqo"),n("yt8O"),n("Btvt"),n("hhXQ"),n("Wbzz")),l=n("Ppnf"),o=n.n(l);function c(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var s=function(e){var t=e.ruleId,n=e.implementations,r=void 0===n?[]:n,l=e.filter,u=void 0===l?m:l;return a.a.createElement("table",null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"Testcase Url"),a.a.createElement("th",null,"Expected"),r.map((function(e,t){var n=e.implementationId;return a.a.createElement("th",{key:n+"- "+t},n)})))),a.a.createElement("tbody",null,Object.values(function(e,t,n){for(var r,a={},i=c(t.filter(n));!(r=i()).done;)for(var l,u=r.value,s=u.implementationId,m=c(u.findings);!(l=m()).done;){var d,f,p=l.value,v=p.url,E=p.testcase,h=p.expected,y=p.actual;if(a[E])a[E]=Object.assign({},a[E],{actuals:Object.assign({},a[E].actuals,(d={},d[s]=y,d))});else a[E]={url:v,testcase:E,relativeUrl:"/rules/"+e+"/#"+o()(E),expected:h,actuals:(f={},f[s]=y,f)}}return a}(t,r,u)).map((function(e,t){var n=e.testcase,l=e.url,o=e.relativeUrl,c=e.expected,u=e.actuals;return a.a.createElement("tr",{key:l+"-"+t},a.a.createElement("td",null,a.a.createElement(i.Link,{to:o},n)),a.a.createElement("td",null,c),r.map((function(e,t){var n=e.implementationId;return a.a.createElement("td",{key:n+"-"+l+"="+t},u[n])})))}))))};function m(){return!0}var d=n("JPpi");t.a=function(e){var t=e.mapping,n=void 0===t?[]:t,r=e.showIncomplete,i=void 0!==r&&r;return a.a.createElement("div",null,n.map((function(e){var t=e.ruleId,n=void 0===t?"":t,r=e.implementations;return a.a.createElement("div",{key:n},function(e,t,n){if(!e||!e.length)return a.a.createElement(d.a,{cls:"invalid",title:"No Implementations",body:"No complete implemenations are provided. Kindly submit a new or amended implementation report."});return a.a.createElement(a.a.Fragment,null,t?a.a.createElement(a.a.Fragment,null,a.a.createElement(d.a,{cls:"invalid",title:"Incomplete Implementation",body:"Listed below are the incomplete assertions. Kindly submit an amended implementation report."}),a.a.createElement(s,{ruleId:n,implementations:e,filter:function(e){return"inconsistent"===e.consistency}})):a.a.createElement(s,{ruleId:n,implementations:e,filter:function(e){return"inconsistent"!==e.consistency}}))}(r,i,n))})))}},qJ7i:function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r);n("VbrR");t.a=function(e){var t=e.title,n=e.value;return a.a.createElement("div",{className:"badge"},a.a.createElement("span",{className:"title"},t),a.a.createElement("span",null,n))}},wNCM:function(e,t,n){},wcru:function(e,t,n){}}]);
//# sourceMappingURL=component---src-templates-implementer-js-588ef48c6f845d6c2def.js.map