(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"KY7+":function(e,i,a){"use strict";a.r(i);a("Zi+Q");var t=a("q1tI"),c=a.n(t),l=a("TSYQ"),s=a.n(l),n=a("Wbzz"),r=a("lU33"),o=a("Bl7J"),d=a("vrFN"),m=a("hmaj"),b=a("M55E"),u=a.n(b),f=a("t1PT"),p=new u.a.Converter;i.default=function(e){var i=e.location,a=Object(n.useStaticQuery)("2506647734"),l=a.glossaryData,b=a.allRules,u=Object(t.useState)(""),h=u[0],v=u[1];return c.a.createElement(o.a,{location:i},c.a.createElement(r.a,{queries:{small:"(max-width: 599px)",medium:"(min-width: 600px) and (max-width: 1199px)",large:"(min-width: 1200px)"},onChange:function(e){return e.small?v("sm"):e.medium?v("md"):v("lg")}}),c.a.createElement(d.a,{title:"Glossary"}),c.a.createElement("section",{className:"page-glossary"},c.a.createElement("h1",null,"Glossary"),c.a.createElement("section",{className:s()("listing",h)},l.edges.map((function(e){var i=e.node,a=i.frontmatter,t=i.html,l=function(e){for(var i=[],a=0,t=Object.entries(f);a<t.length;a++){var c=t[a],l=c[0];c[1].includes(e)&&i.push(l)}return i}("#"+a.key),s=b.edges.filter((function(e){return l.includes(e.node.frontmatter.id)}));return c.a.createElement("article",{key:a.key},c.a.createElement("section",null,c.a.createElement("a",{id:a.key,href:"#"+a.key},c.a.createElement("h2",null,a.title)),c.a.createElement("div",{dangerouslySetInnerHTML:{__html:t}})),c.a.createElement(m.a,{cls:"used-rules",headingTemplate:function(){return c.a.createElement("h3",null,"Used In Rules: (",s?s.length:"0",")")},itemTemplate:function(e){return c.a.createElement("li",{key:e.node.frontmatter.id},c.a.createElement("a",{href:"/rules/"+e.node.frontmatter.id},c.a.createElement("span",{dangerouslySetInnerHTML:{__html:p.makeHtml(e.node.frontmatter.name)}})))},items:s}))})))))}},"Zi+Q":function(e,i,a){},hmaj:function(e,i,a){"use strict";var t=a("q1tI"),c=a.n(t),l=function(e){var i=e.cls,a=e.headingTemplate,t=e.itemTemplate,l=e.items,s=void 0===l?[]:l;return c.a.createElement("div",{className:i},a(),(!s||!s.length)&&c.a.createElement("div",{className:"note"},"No Data"),s.length>0&&c.a.createElement("ul",null,s.map((function(e){return t(e)}))))};l.defaultProps={cls:"",heading:"",items:[]},i.a=l},t1PT:function(e){e.exports=JSON.parse('{"5f99a7":["#wai-aria-specifications"],"6cfa84":["#attribute-value","#focusable","#visible"],"ff89c9":["#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#owned-by","#semantic-role","#wai-aria-specifications"],"bc4a75":["#attribute-value","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#owned-by","#semantic-role","#wai-aria-specifications"],"5c01ea":["#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#wai-aria-specifications"],"6a7281":["#wai-aria-specifications"],"e6952f":[],"afb423":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#visible"],"80f0bf":["#attribute-value","#instrument-to-achieve-an-objective","#outcome","#web-page-html"],"e7aa44":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#outcome","#visible"],"2eb176":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#visible"],"aaa1bf":["#attribute-value"],"4c31df":["#accessible-name","#attribute-value","#focusable","#included-in-the-accessibility-tree","#instrument-to-achieve-an-objective","#visible","#web-page-html","#whitespace"],"efbfc7":["#clearly-labeled-location","#instrument-to-achieve-an-objective","#semantic-role","#user-interaction","#visible","#visible-text-content","#web-page-html"],"73f2c2":["#appropriate-field-for-the-form-control","#attribute-value","#correct-autocomplete-field","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#visible"],"97a4e1":["#accessible-name","#attribute-value","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#wai-aria-specifications"],"b33eff":["#visible"],"5effbb":["#accessible-name","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatically-determined-link-context","#semantic-role"],"c249d5":["#changes-in-content","#clearly-labeled-location","#instrument-to-achieve-an-objective","#semantic-role","#web-page-html"],"7677a9":["#changes-in-content","#clearly-labeled-location","#instrument-to-achieve-an-objective","#semantic-role","#web-page-html"],"de46e4":["#valid-language-tag"],"46ca7f":["#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role"],"7d6734":["#accessible-name","#explicit-role","#focusable","#included-in-the-accessibility-tree","#wai-aria-specifications"],"80af7b":["#focusable","#outcome"],"ebe86a":["#focusable","#included-in-the-accessibility-tree","#standard-keyboard-navigation","#visible"],"a1b64e":["#focusable","#standard-keyboard-navigation"],"cc0f0a":["#accessible-name","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatic-label","#semantic-role","#visible","#visual-context","#wai-aria-specifications"],"e086e5":["#accessible-name","#attribute-value","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#programmatic-label","#semantic-role","#visible","#wai-aria-specifications"],"b49b2e":["#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#visible"],"ffd0e9":["#accessible-name","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#visible","#wai-aria-specifications"],"b5c3f8":[],"ucwvc8":["#accessible-name","#attribute-value","#default-page-language","#included-in-the-accessibility-tree","#valid-language-tag","#visible","#web-page-html"],"bf051a":["#valid-language-tag"],"5b7ae0":["#valid-language-tag"],"2779a5":["#whitespace"],"c4a8a4":["#whitespace"],"3ea0c8":["#focusable","#included-in-the-accessibility-tree","#programmatic-label","#visible"],"4b1c6c":["#accessible-name","#equivalent-resource","#focusable","#included-in-the-accessibility-tree","#matching-characters","#same-resource","#web-page-html"],"cae760":["#accessible-name","#explicit-role","#focusable","#included-in-the-accessibility-tree","#wai-aria-specifications","#whitespace"],"qt1vmo":["#accessible-name","#focusable","#included-in-the-accessibility-tree","#visible"],"59796f":["#accessibility-support","#accessible-name","#focusable","#included-in-the-accessibility-tree",null],"9eb3f6":["#accessible-name","#explicit-role","#filename","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#whitespace"],"23a2a8":["#accessible-name","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#wai-aria-specifications"],"e88epe":["#accessible-name","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#visible","#wai-aria-specifications"],"36b590":["#accessible-name","#explicit-role","#focusable","#form-field-error-indicator","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#visible"],"c487ae":["#accessible-name","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#wai-aria-specifications"],"b20e66":["#accessible-name","#equivalent-resource","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#matching-characters","#same-resource","#semantic-role","#wai-aria-specifications","#web-page-html"],"fd3a94":["#accessible-name","#equivalent-resource","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#matching-characters","#programmatically-determined-link-context","#same-resource","#semantic-role","#wai-aria-specifications","#web-page-html"],"bc659a":[],"b4f0c3":["#visible"],"8fc3b6":["#accessible-name","#focusable","#included-in-the-accessibility-tree"],"ffbc54":["#blocked-event","#changes-in-content","#clearly-labeled-location","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#instrument-to-achieve-an-objective","#marked-as-decorative","#printable-characters","#same-key-events","#semantic-role","#set-of-clearly-labeled-instruments","#web-page-html"],"674b10":["#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#wai-aria-specifications","#whitespace"],"4e8ab6":["#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#wai-aria-specifications"],"0ssw9k":["#scrollable-element","#visible"],"d0f69e":["#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#visible","#wai-aria-specifications"],"a25f45":["#focusable","#included-in-the-accessibility-tree","#visible"],"afw4f7":["#accessible-name","#background-colors-of-text","#bounding-box-around-text","#disabled-element","#explicit-role","#focusable","#foreground-colors-of-text","#hidden-state","#highest-possible-contrast","#implicit-role","#included-in-the-accessibility-tree","#large-scale-text","#marked-as-decorative","#semantic-role","#visible"],"eac66b":["#non-streaming-media-element","#outcome","#visible"],"c5a4ea":["#non-streaming-media-element","#outcome","#visible"],"ab4d13":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#visible"],"1ea59c":["#non-streaming-media-element","#visible"],"f51b46":["#audio-output","#non-streaming-media-element","#visible"],"f196ce":["#attribute-value","#non-streaming-media-element","#visible"],"c3232f":["#non-streaming-media-element","#outcome","#visible"],"fd26cf":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#visible"],"d7ba54":["#non-streaming-media-element","#visible"],"ac7dc6":["#attribute-value","#non-streaming-media-element","#visible"],"ee13b5":["#focusable","#included-in-the-accessibility-tree","#non-streaming-media-element","#visible"],"1ec09b":["#non-streaming-media-element","#outcome","#visible"],"1a02b0":["#non-streaming-media-element","#visible"],"2ee8b8":["#accessible-name","#explicit-role","#focusable","#hidden-state","#implicit-role","#included-in-the-accessibility-tree","#marked-as-decorative","#semantic-role","#visible","#visible-text-content","#whitespace"],"59br37":["#attribute-value","#clipped-by-overflow","#viewport-size","#visible"]}')}}]);
//# sourceMappingURL=component---src-pages-glossary-js-734e9087187f3466bcc2.js.map