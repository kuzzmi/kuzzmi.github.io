(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[263],{6034:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[locale]/blog",function(){return t(6414)}])},2122:function(e,n,t){"use strict";var a=t(5893),c=t(6024),r=t(7966),s=t(7160),l=t.n(s);n.Z=function(e){var n=e.article,t=n.type,s=n.slug,i=n.title,o=n.tags,u=n.description,_=(0,c.$G)().t;return(0,a.jsxs)("div",{className:l().post,children:[(0,a.jsx)(r.Z,{href:"/".concat(t,"/").concat(s),children:(0,a.jsx)("a",{className:l().postTitle,children:(0,a.jsx)("h2",{children:i})})}),(0,a.jsx)("p",{children:o.map((function(e){return(0,a.jsx)(r.Z,{href:"/".concat(t,"/").concat(s),children:(0,a.jsx)("a",{className:l().tag,children:(0,a.jsx)("small",{children:(0,a.jsx)("i",{children:_("tags.".concat(e),e)})})})},e)}))}),(0,a.jsx)("p",{className:l().description,children:(0,a.jsx)("small",{children:u})}),(0,a.jsx)(r.Z,{href:"/".concat(t,"/").concat(s),children:(0,a.jsx)("a",{children:(0,a.jsxs)("small",{children:[_("home.read")," \u2192"]})})})]})}},7966:function(e,n,t){"use strict";var a=t(5893),c=(t(7294),t(1664)),r=t(1163);function s(e,n){if(null==e)return{};var t,a,c=function(e,n){if(null==e)return{};var t,a,c={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(c[t]=e[t]);return c}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(c[t]=e[t])}return c}n.Z=function(e){var n=e.children,t=e.skipLocaleHandling,l=s(e,["children","skipLocaleHandling"]),i=(0,r.useRouter)(),o=l.locale||i.query.locale||"",u=l.href||i.asPath;return 0===u.indexOf("http")&&(t=!0),o&&!t&&(u=u?"/".concat(o).concat(u):i.pathname.replace("[locale]",o)),(0,a.jsx)(c.default,{href:u,children:n})}},193:function(e,n,t){"use strict";t.d(n,{Z:function(){return f}});var a=t(5893),c=t(7294),r=t(1163),s=t(6024),l=t(7966),i=t(3857),o=t(1664);function u(e,n){if(null==e)return{};var t,a,c=function(e,n){if(null==e)return{};var t,a,c={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(c[t]=e[t]);return c}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(c[t]=e[t])}return c}var _=function(e){var n=e.locale,t=u(e,["locale"]),c=(0,r.useRouter)(),s=t.href||c.asPath,l=c.pathname;return Object.keys(c.query).forEach((function(e){l="locale"!==e?l.replace("[".concat(e,"]"),c.query[e]):l.replace("[".concat(e,"]"),n)})),n&&(s=t.href?"/".concat(n).concat(t.href):l),(0,a.jsx)(o.default,{href:s,children:(0,a.jsx)("a",{className:t.className,onClick:function(){return i.Z.cache(n)},children:"ua"===n?"\ud83c\uddfa\ud83c\udde6":"\ud83c\uddec\ud83c\udde7"})})},h=t(6017),d=t.n(h),m=function(e){var n=e.href,t=e.strict,c=e.children,s=(0,r.useRouter)(),i=t?"/[locale]"===s.pathname:s.pathname.includes(n);return(0,a.jsx)("li",{className:i?null:d().inactive,children:(0,a.jsx)(l.Z,{href:n,children:(0,a.jsx)("a",{children:c})})})},f=function(e){var n=e.children,t=(0,s.$G)(),l=t.t,i=(t.i18n,(0,r.useRouter)()),o="/"===i.pathname,u=(0,c.useState)(!1),h=u[0],f=u[1],x=i.query.locale;return(0,a.jsxs)("main",{className:"".concat(d().page_container," ").concat(h?d().menu_open:""),children:[(0,a.jsx)("menu",{className:d().menu_container,children:(0,a.jsxs)("ul",{children:[(0,a.jsx)(m,{href:"/",strict:!0,children:l("menu.home")}),(0,a.jsx)(m,{href:"/blog",children:l("menu.blog")}),(0,a.jsx)(m,{href:"/thoughts",children:l("menu.thoughts")})]})}),(0,a.jsxs)("section",{className:d().content_container,children:[(0,a.jsxs)("header",{className:d().header_container,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:d().menu_button,children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24px",height:"24px",onClick:function(){return f(!h)},children:(0,a.jsx)("path",{fill:"none",stroke:"#000000",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"2",d:"M3 12L21 12M3 6L21 6M3 18L21 18"})})}),(0,a.jsx)("p",{className:d().name,children:o&&l("common.name")})]}),(0,a.jsxs)("div",{className:d().lang_switcher,children:[(0,a.jsxs)("p",{className:d().version,children:[l("common.version"),":"]}),(0,a.jsxs)("div",{className:d().langs,children:[(0,a.jsx)(_,{className:"ua"===x?d().active:"",locale:"ua"}),(0,a.jsx)(_,{className:"en"===x?d().active:"",locale:"en"})]})]})]}),(0,a.jsx)("article",{className:d().content,children:n})]}),(0,a.jsxs)("div",{className:d().flag,children:[(0,a.jsx)("div",{className:d().blue}),(0,a.jsx)("div",{className:d().yellow})]})]})}},3857:function(e,n,t){"use strict";var a=t(9515),c=t(1463),r=t.n(c);n.Z=(0,a.Z)({supportedLngs:r().i18n.locales,fallbackLng:r().i18n.defaultLocale})},1463:function(e){"use strict";e.exports={i18n:{defaultLocale:"en",locales:["en","ua"]}}},6414:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return u},default:function(){return _}});var a=t(5893),c=(t(7294),t(9008)),r=t(6024),s=t(193),l=t(2122),i=t(7160),o=t.n(i),u=!0;function _(e){var n=e.articles,t=(0,r.$G)().t;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c.default,{children:(0,a.jsxs)("title",{children:[t("menu.blog")," | ",t("common.name")]})}),(0,a.jsxs)(s.Z,{children:[(0,a.jsxs)("div",{className:o().summary,children:[(0,a.jsx)("h1",{className:o().title,children:t("menu.blog")}),(0,a.jsx)("br",{}),(0,a.jsx)("p",{children:t("blog.description")})]}),(0,a.jsxs)("div",{className:o().recents,children:[(0,a.jsxs)("h6",{children:[t("home.recents"),":"]}),n.map((function(e){return(0,a.jsx)(l.Z,{article:e},e.slug)}))]})]})]})}},6017:function(e){e.exports={page_container:"PageLayout_page_container__M8QGN",menu_container:"PageLayout_menu_container__La6NU",inactive:"PageLayout_inactive__g2bTn",header_container:"PageLayout_header_container__Y6dbq",lang_switcher:"PageLayout_lang_switcher___L3bH",version:"PageLayout_version__2_iha",name:"PageLayout_name__xhUaP",langs:"PageLayout_langs__z_SxD",content_container:"PageLayout_content_container__1IMZI",content:"PageLayout_content__6Pdc3",flag:"PageLayout_flag__XuZGa",blue:"PageLayout_blue__CUemv",yellow:"PageLayout_yellow__R8WIm",active:"PageLayout_active__UxQoO",menu_button:"PageLayout_menu_button__vWi4y",menu_open:"PageLayout_menu_open__4Jr7u"}},7160:function(e){e.exports={title:"Home_title__T09hD",subtitle:"Home_subtitle__j4GMd",summary:"Home_summary__Yrr34",recents:"Home_recents__jceHK",post:"Home_post__K8_r2",postTitle:"Home_postTitle__gfBp3",tag:"Home_tag__I3HDD",description:"Home_description__41Owk",grid:"Home_grid__GxQ85"}}},function(e){e.O(0,[47,774,888,179],(function(){return n=6034,e(e.s=n);var n}));var n=e.O();_N_E=n}]);