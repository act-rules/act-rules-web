(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"KY7+":function(e,i,a){"use strict";a.r(i);a("Zi+Q");var t=a("q1tI"),l=a.n(t),c=a("TSYQ"),n=a.n(c),r=a("Wbzz"),s=a("lU33"),o=a("Bl7J"),m=a("vrFN"),d=a("hmaj"),b=a("M55E"),u=a.n(b),p=a("t1PT"),h=new u.a.Converter;i.default=function(e){var i=e.location,a=Object(r.useStaticQuery)("2506647734"),c=a.glossaryData,b=a.allRules,u=Object(t.useState)(""),f=u[0],v=u[1];return l.a.createElement(o.a,{location:i},l.a.createElement(s.a,{queries:{small:"(max-width: 599px)",medium:"(min-width: 600px) and (max-width: 1199px)",large:"(min-width: 1200px)"},onChange:function(e){return e.small?v("sm"):e.medium?v("md"):v("lg")}}),l.a.createElement(m.a,{title:"Glossary"}),l.a.createElement("section",{className:"page-glossary"},l.a.createElement("h1",null,"Glossary"),l.a.createElement("section",{className:n()("listing",f)},c.edges.map((function(e){var i=e.node,a=i.frontmatter,t=i.html,c=function(e){for(var i=[],a=0,t=Object.entries(p);a<t.length;a++){var l=t[a],c=l[0];l[1].includes(e)&&i.push(c)}return i}("#"+a.key),n=b.edges.filter((function(e){return c.includes(e.node.frontmatter.id)}));return l.a.createElement("article",{key:a.key},l.a.createElement("section",null,l.a.createElement("a",{id:a.key,href:"#"+a.key},l.a.createElement("h2",null,a.title)),l.a.createElement("div",{dangerouslySetInnerHTML:{__html:t}})),l.a.createElement(d.a,{cls:"used-rules",headingTemplate:function(){return l.a.createElement("h3",null,"Used In Rules: (",n?n.length:"0",")")},itemTemplate:function(e){return l.a.createElement("li",{key:e.node.frontmatter.id},l.a.createElement("a",{href:"/rules/"+e.node.frontmatter.id},l.a.createElement("span",{dangerouslySetInnerHTML:{__html:h.makeHtml(e.node.frontmatter.name)}})))},items:n}))})))))}},"Zi+Q":function(e,i,a){},hmaj:function(e,i,a){"use strict";var t=a("q1tI"),l=a.n(t),c=function(e){var i=e.cls,a=e.headingTemplate,t=e.itemTemplate,c=e.items,n=void 0===c?[]:c;return l.a.createElement("div",{className:i},a(),(!n||!n.length)&&l.a.createElement("div",{className:"note"},"No Data"),n.length>0&&l.a.createElement("ul",null,n.map((function(e){return t(e)}))))};c.defaultProps={cls:"",heading:"",items:[]},i.a=c},t1PT:function(e){e.exports=JSON.parse('{"5f99a7":["#wai-aria-specifications"],"6cfa84":["#attribute-value","#focusable","#visible"],"ff89c9":["#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#namespaced-element","#programmatically-hidden","#semantic-role","#wai-aria-specifications"],"bc4a75":["#attribute-value","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#namespaced-element","#owned-by","#programmatically-hidden","#semantic-role","#wai-aria-specifications"],"5c01ea":["#attribute-value","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#namespaced-element","#programmatically-hidden","#semantic-role","#wai-aria-specifications"],"6a7281":["#namespaced-element","#wai-aria-specifications"],"e6952f":[],"afb423":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#programmatically-hidden","#visible"],"80f0bf":["#attribute-value","#instrument-to-achieve-an-objective","#outcome","#web-page-html"],"e7aa44":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#outcome","#programmatically-hidden","#visible"],"2eb176":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#programmatically-hidden","#visible"],"aaa1bf":["#attribute-value"],"4c31df":["#accessible-name","#attribute-value","#focusable","#included-in-the-accessibility-tree","#instrument-to-achieve-an-objective","#programmatically-hidden","#visible","#web-page-html","#whitespace"],"efbfc7":["#clearly-labeled-location","#instrument-to-achieve-an-objective","#semantic-role","#user-interaction","#visible","#visible-text-content","#web-page-html"],"73f2c2":["#appropriate-field-for-the-form-control","#attribute-value","#correct-autocomplete-field","#disabled-element","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role","#visible"],"3e12e1":["#block-of-content","#block-of-repeated-content","#equivalent-resource","#focusable","#included-in-the-accessibility-tree","#instrument-to-achieve-an-objective","#non-repeated-content","#perceivable-content","#programmatically-hidden","#visible","#web-page-html"],"97a4e1":["#accessible-name","#attribute-value","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role","#wai-aria-specifications"],"cf77f2":["#block-of-content","#block-of-repeated-content","#equivalent-resource","#focusable","#included-in-the-accessibility-tree","#instrument-to-achieve-an-objective","#just-before","#non-repeated-content","#perceivable-content","#programmatically-hidden","#semantic-role","#visible","#web-page-html"],"b33eff":["#visible"],"c249d5":["#blocked-event","#changes-in-content","#clearly-labeled-location","#instrument-to-achieve-an-objective","#set-of-clearly-labeled-instruments","#web-page-html"],"7677a9":["#changes-in-content","#clearly-labeled-location","#instrument-to-achieve-an-objective","#semantic-role","#web-page-html"],"047fe0":["#block-of-content","#block-of-repeated-content","#equivalent-resource","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#instrument-to-achieve-an-objective","#marked-as-decorative","#non-repeated-content","#perceivable-content","#programmatically-hidden","#semantic-role","#visible","#web-page-html"],"ye5d6e":["#block-of-content","#block-of-repeated-content","#equivalent-resource","#included-in-the-accessibility-tree","#instrument-to-achieve-an-objective","#just-before","#non-repeated-content","#perceivable-content","#semantic-role","#visible","#web-page-html"],"b40fd1":["#block-of-content","#block-of-repeated-content","#equivalent-resource","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#inheriting-semantic","#instrument-to-achieve-an-objective","#marked-as-decorative","#non-repeated-content","#perceivable-content","#programmatically-hidden","#semantic-role","#visible","#web-page-html"],"off6ek":["#accessible-name","#attribute-value","#focusable","#included-in-the-accessibility-tree","#most-common-element-language","#programmatically-hidden","#text-inheriting-language","#valid-language-tag","#visible"],"de46e4":["#accessible-name","#attribute-value","#focusable","#included-in-the-accessibility-tree","#programmatically-hidden","#text-inheriting-language","#valid-language-tag","#visible","#whitespace"],"46ca7f":["#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role"],"7d6734":["#accessible-name","#explicit-role","#focusable","#included-in-the-accessibility-tree","#programmatically-hidden","#wai-aria-specifications"],"80af7b":["#focusable","#namespaced-element","#outcome"],"ebe86a":["#focusable","#included-in-the-accessibility-tree","#namespaced-element","#programmatically-hidden","#standard-keyboard-navigation","#visible"],"a1b64e":["#focusable","#namespaced-element","#standard-keyboard-navigation"],"cc0f0a":["#accessible-name","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatic-label","#programmatically-hidden","#semantic-role","#visible","#visual-context","#wai-aria-specifications"],"e086e5":["#accessible-name","#attribute-value","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatic-label","#programmatically-hidden","#semantic-role","#visible","#wai-aria-specifications"],"b49b2e":["#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role","#visible"],"ffd0e9":["#accessible-name","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role","#visible","#wai-aria-specifications"],"b5c3f8":[],"ucwvc8":["#attribute-value","#default-page-language","#most-common-element-language","#valid-language-tag","#web-page-html"],"bf051a":["#valid-language-tag"],"5b7ae0":["#valid-language-tag"],"2779a5":["#whitespace"],"c4a8a4":["#whitespace"],"3ea0c8":["#focusable","#included-in-the-accessibility-tree","#namespaced-element","#programmatic-label","#programmatically-hidden","#visible"],"4b1c6c":["#accessible-name","#equivalent-resource","#focusable","#included-in-the-accessibility-tree","#matching-characters","#programmatically-hidden","#same-resource","#web-page-html"],"cae760":["#accessible-name","#explicit-role","#focusable","#included-in-the-accessibility-tree","#programmatically-hidden","#wai-aria-specifications","#whitespace"],"akn7bn":["#attribute-value","#visible"],"qt1vmo":["#accessible-name","#focusable","#included-in-the-accessibility-tree","#programmatically-hidden","#visible"],"59796f":["#accessibility-support","#accessible-name","#attribute-value","#focusable","#included-in-the-accessibility-tree","#programmatically-hidden",null],"9eb3f6":["#accessible-name","#explicit-role","#filename","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role","#whitespace"],"0va7u6":["#attribute-value","#embedded-image","#rendered-image-resource","#visible","#web-page-html"],"23a2a8":["#accessible-name","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role","#wai-aria-specifications"],"e88epe":["#accessible-name","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role","#visible","#wai-aria-specifications"],"36b590":["#accessible-name","#explicit-role","#focusable","#form-field-error-indicator","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role","#visible"],"24afc2":["#visible"],"78fd32":["#visible"],"aizyf1":["#accessible-name","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#inheriting-semantic","#marked-as-decorative","#programmatically-hidden","#semantic-role","#wai-aria-specifications"],"5effbb":["#accessible-name","#expectation","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#inheriting-semantic","#marked-as-decorative","#programmatically-determined-link-context","#programmatically-hidden","#semantic-role",null],"c487ae":["#accessible-name","#attribute-value","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role","#wai-aria-specifications"],"b20e66":["#accessible-name","#equivalent-resource","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#inheriting-semantic","#marked-as-decorative","#matching-characters","#namespaced-element","#programmatically-hidden","#same-resource","#semantic-role","#wai-aria-specifications","#web-page-html"],"fd3a94":["#accessible-name","#equivalent-resource","#expectation","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#inheriting-semantic","#marked-as-decorative","#matching-characters","#namespaced-element","#programmatically-determined-link-context","#programmatically-hidden","#same-resource","#semantic-role","#wai-aria-specifications","#web-page-html",null],"m6b1q3":["#accessible-name","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role"],"bc659a":["#attribute-value","#expectation",null],"bisz58":["#attribute-value"],"b4f0c3":["#visible"],"9bd38c":["#accessible-name","#focusable","#included-in-the-accessibility-tree","#programmatically-hidden","#visible","#visible-text-content","#visual-reference-words"],"8fc3b6":["#accessible-name","#explicit-role","#focusable","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden"],"307n5z":["#accessible-name","#attribute-value","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#namespaced-element","#programmatically-hidden","#semantic-role"],"ffbc54":["#blocked-event","#changes-in-content","#clearly-labeled-location","#inheriting-semantic","#instrument-to-achieve-an-objective","#printable-characters","#same-key-events","#semantic-role","#set-of-clearly-labeled-instruments","#web-page-html"],"674b10":["#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#namespaced-element","#programmatically-hidden","#semantic-role","#wai-aria-specifications","#whitespace"],"4e8ab6":["#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#namespaced-element","#programmatically-hidden","#semantic-role","#wai-aria-specifications"],"0ssw9k":["#attribute-value","#scrollable-element","#visible"],"oj04fd":["#focusable","#focused"],"d0f69e":["#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#inheriting-semantic","#marked-as-decorative","#programmatically-hidden","#semantic-role","#visible","#wai-aria-specifications"],"a25f45":["#attribute-value","#focusable","#included-in-the-accessibility-tree","#programmatically-hidden","#visible"],"afw4f7":["#accessible-name","#attribute-value","#background-colors-of-text","#bounding-box-around-text","#disabled-element","#expectation","#explicit-role","#focusable","#foreground-colors-of-text","#highest-possible-contrast","#implicit-role","#included-in-the-accessibility-tree","#inheriting-semantic","#large-scale-text","#marked-as-decorative","#programmatically-hidden","#semantic-role","#visible",null],"09o5cg":["#accessible-name","#attribute-value","#background-colors-of-text","#bounding-box-around-text","#disabled-element","#explicit-role","#focusable","#foreground-colors-of-text","#highest-possible-contrast","#implicit-role","#included-in-the-accessibility-tree","#inheriting-semantic","#large-scale-text","#marked-as-decorative","#programmatically-hidden","#semantic-role","#visible"],"eac66b":["#non-streaming-media-element","#outcome","#visible"],"c5a4ea":["#expectation","#non-streaming-media-element","#outcome","#visible",null],"ab4d13":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#programmatically-hidden","#visible"],"1ea59c":["#non-streaming-media-element","#visible"],"f51b46":["#audio-output","#non-streaming-media-element","#visible"],"f196ce":["#attribute-value","#non-streaming-media-element","#visible"],"c3232f":["#non-streaming-media-element","#outcome","#visible"],"fd26cf":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#programmatically-hidden","#visible"],"d7ba54":["#non-streaming-media-element","#visible"],"ac7dc6":["#attribute-value","#non-streaming-media-element","#visible"],"ee13b5":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#programmatically-hidden","#visible"],"1ec09b":["#non-streaming-media-element","#outcome","#visible"],"1a02b0":["#non-streaming-media-element","#visible"],"2ee8b8":["#accessible-name","#explicit-role","#focusable","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-hidden","#semantic-role","#visible","#visible-text-content","#whitespace"],"9e45ec":["#visible"],"59br37":["#attribute-value","#clipped-by-overflow","#viewport-size","#visible"]}')}}]);
//# sourceMappingURL=component---src-pages-glossary-js-33f8e80c00b9202217c0.js.map