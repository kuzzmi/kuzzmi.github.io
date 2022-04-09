exports.id = 245;
exports.ids = [245];
exports.modules = {

/***/ 3531:
/***/ ((module) => {

// Exports
module.exports = {
	"page_container": "PageLayout_page_container__M8QGN",
	"menu_container": "PageLayout_menu_container__La6NU",
	"inactive": "PageLayout_inactive__g2bTn",
	"header_container": "PageLayout_header_container__Y6dbq",
	"lang_switcher": "PageLayout_lang_switcher___L3bH",
	"version": "PageLayout_version__2_iha",
	"name": "PageLayout_name__xhUaP",
	"langs": "PageLayout_langs__z_SxD",
	"content_container": "PageLayout_content_container__1IMZI",
	"content": "PageLayout_content__6Pdc3",
	"flag": "PageLayout_flag__XuZGa",
	"blue": "PageLayout_blue__CUemv",
	"yellow": "PageLayout_yellow__R8WIm",
	"active": "PageLayout_active__UxQoO",
	"menu_button": "PageLayout_menu_button__vWi4y",
	"menu_open": "PageLayout_menu_open__4Jr7u"
};


/***/ }),

/***/ 7940:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_languageDetector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3857);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_languageDetector__WEBPACK_IMPORTED_MODULE_2__]);
_lib_languageDetector__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const LanguageSwitchLink = ({ locale , ...rest })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    let href = rest.href || router.asPath;
    let pName = router.pathname;
    Object.keys(router.query).forEach((k)=>{
        if (k === "locale") {
            pName = pName.replace(`[${k}]`, locale);
            return;
        }
        pName = pName.replace(`[${k}]`, router.query[k]);
    });
    if (locale) {
        href = rest.href ? `/${locale}${rest.href}` : pName;
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_4__["default"], {
        href: href,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            className: rest.className,
            onClick: ()=>_lib_languageDetector__WEBPACK_IMPORTED_MODULE_2__/* ["default"].cache */ .Z.cache(locale)
            ,
            children: locale === "ua" ? "\uD83C\uDDFA\uD83C\uDDE6" : "\uD83C\uDDEC\uD83C\uDDE7"
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LanguageSwitchLink);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7966:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);




const LinkComponent = ({ children , skipLocaleHandling , ...rest })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const locale = rest.locale || router.query.locale || "";
    let href = rest.href || router.asPath;
    if (href.indexOf("http") === 0) skipLocaleHandling = true;
    if (locale && !skipLocaleHandling) {
        href = href ? `/${locale}${href}` : router.pathname.replace("[locale]", locale);
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
        href: href,
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkComponent);


/***/ }),

/***/ 2006:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1377);
/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7966);
/* harmony import */ var _components_LangSwitchLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7940);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3531);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_index_module_css__WEBPACK_IMPORTED_MODULE_6__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_LangSwitchLink__WEBPACK_IMPORTED_MODULE_5__]);
_components_LangSwitchLink__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const MenuLink = ({ href , strict , children  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const isActive = strict ? router.pathname === `/[locale]` : router.pathname.includes(href);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
        className: !isActive ? (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().inactive) : null,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Link__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
            href: href,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                children: children
            })
        })
    });
};
/*
    <MenuLink href="/podcast">{tr("menu.podcast")}</MenuLink>
    <MenuLink href="/projects">{tr("menu.projects")}</MenuLink>
    <MenuLink href="/about">{tr("menu.about")}</MenuLink>
 */ const PageLayout = ({ children  })=>{
    const { t: tr , i18n  } = (0,next_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const isHome = router.pathname === "/";
    const { 0: menuOpen , 1: setMenuOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const locale = router.query.locale;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
        className: `${(_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().page_container)} ${menuOpen ? (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().menu_open) : ""}`,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("menu", {
                className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().menu_container),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MenuLink, {
                            href: "/",
                            strict: true,
                            children: tr("menu.home")
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MenuLink, {
                            href: "/blog",
                            children: tr("menu.blog")
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MenuLink, {
                            href: "/thoughts",
                            children: tr("menu.thoughts")
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().content_container),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().header_container),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().menu_button),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 24 24",
                                            width: "24px",
                                            height: "24px",
                                            onClick: ()=>setMenuOpen(!menuOpen)
                                            ,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                fill: "none",
                                                stroke: "#000000",
                                                strokeLinecap: "round",
                                                strokeMiterlimit: "10",
                                                strokeWidth: "2",
                                                d: "M3 12L21 12M3 6L21 6M3 18L21 18"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().name),
                                        children: isHome && tr("common.name")
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().lang_switcher),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().version),
                                        children: [
                                            tr("common.version"),
                                            ":"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().langs),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_LangSwitchLink__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                                className: locale === "ua" ? (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().active) : "",
                                                locale: "ua"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_LangSwitchLink__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                                className: locale === "en" ? (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().active) : "",
                                                locale: "en"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("article", {
                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().content),
                        children: children
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().flag),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().blue)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().yellow)
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageLayout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 218:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jR": () => (/* binding */ getSlugFromFilename),
/* harmony export */   "Zz": () => (/* binding */ getArticles),
/* harmony export */   "fq": () => (/* binding */ getArticle)
/* harmony export */ });
/* unused harmony exports getArticleSlugs, getArticleSlugsWithLocale */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9066);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yaml__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5165);
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(showdown__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var showdown_highlight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4012);
/* harmony import */ var showdown_highlight__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(showdown_highlight__WEBPACK_IMPORTED_MODULE_3__);




const getSlugFromFilename = (fileName)=>{
    // fileName is yyyy-mm-dd-slug.md
    const article = fileName.slice(0, fileName.indexOf(".md"));
    const slug = article.slice(11);
    return slug;
};
const getArticles = (root)=>{
    const files = fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(`articles/${root}`);
    const allTags = [];
    const articles = files.reverse().map((file)=>{
        const slug = getSlugFromFilename(file);
        const content = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(`articles/${root}/${file}`, "utf8");
        const converter = new showdown__WEBPACK_IMPORTED_MODULE_2__.Converter({
            metadata: true
        });
        converter.makeHtml(content);
        const metaRaw = converter.getMetadata(true);
        const meta = yaml__WEBPACK_IMPORTED_MODULE_1___default().parse(metaRaw);
        const tags = Array.isArray(meta.tags) ? meta.tags : [
            meta.tags
        ];
        tags.forEach((t)=>{
            if (!allTags.includes(t)) {
                allTags.push(t);
            }
        });
        return {
            slug,
            type: root,
            title: meta.title,
            layout: meta.layout,
            description: meta.description || "",
            tags,
            date: meta.date
        };
    });
    // console.log(allTags);
    return articles;
};
const getArticleSlugs = (root)=>{
    const files = fs.readdirSync(`articles/${root}`);
    const slugs = files.reverse().map((file)=>{
        return {
            params: {
                slug: getSlugFromFilename(file)
            }
        };
    });
    return {
        paths: slugs,
        fallback: false
    };
};
const getArticleSlugsWithLocale = (root)=>{
    const files = fs.readdirSync(`articles/${root}`);
    const slugs = files.reverse().map((file)=>{
        return getSlugFromFilename(file);
    });
    const localePaths = [
        "en",
        "ua"
    ].map((locale)=>{
        return slugs.map((slug)=>({
                params: {
                    locale,
                    slug
                }
            })
        );
    }).flat();
    return {
        paths: localePaths,
        fallback: false
    };
};
const getArticle = (root, slug)=>{
    const files = fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(`articles/${root}`);
    const [file1] = files.reverse().filter((file)=>{
        return getSlugFromFilename(file) === slug;
    });
    if (file1) {
        const converter = new showdown__WEBPACK_IMPORTED_MODULE_2__.Converter({
            metadata: true,
            extensions: [
                showdown_highlight__WEBPACK_IMPORTED_MODULE_3___default()({
                    // Whether to add the classes to the <pre> tag
                    pre: true
                }), 
            ]
        });
        const content = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(`articles/${root}/${file1}`, "utf8");
        const html = converter.makeHtml(content);
        const metaRaw = converter.getMetadata(true);
        const meta = yaml__WEBPACK_IMPORTED_MODULE_1___default().parse(metaRaw);
        return {
            html,
            type: root,
            meta: {
                slug,
                title: meta.title,
                layout: meta.layout,
                lang: meta.lang,
                description: meta.description || "",
                tags: Array.isArray(meta.tags) ? meta.tags : [
                    meta.tags
                ],
                date: meta.date
            }
        };
    }
    return null;
};


/***/ }),

/***/ 4741:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fe": () => (/* binding */ getStaticPaths),
/* harmony export */   "Cx": () => (/* binding */ getI18nProps)
/* harmony export */ });
/* unused harmony exports getI18nPaths, makeStaticProps */
/* harmony import */ var next_i18next_serverSideTranslations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5460);
/* harmony import */ var next_i18next_serverSideTranslations__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_i18next_serverSideTranslations__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _next_i18next_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1463);
/* harmony import */ var _next_i18next_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_next_i18next_config__WEBPACK_IMPORTED_MODULE_1__);


const getI18nPaths = ()=>_next_i18next_config__WEBPACK_IMPORTED_MODULE_1___default().i18n.locales.map((lng)=>({
            params: {
                locale: lng
            }
        })
    )
;
const getStaticPaths = ()=>({
        fallback: false,
        paths: getI18nPaths()
    })
;
async function getI18nProps(ctx) {
    var ref;
    const locale = ctx === null || ctx === void 0 ? void 0 : (ref = ctx.params) === null || ref === void 0 ? void 0 : ref.locale;
    let props = {
        ...await (0,next_i18next_serverSideTranslations__WEBPACK_IMPORTED_MODULE_0__.serverSideTranslations)(locale, [
            "common"
        ])
    };
    return props;
}
function makeStaticProps() {
    return async function getStaticProps(ctx) {
        return {
            props: await getI18nProps(ctx)
        };
    };
}


/***/ }),

/***/ 3857:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_language_detector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3707);
/* harmony import */ var _next_i18next_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1463);
/* harmony import */ var _next_i18next_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_next_i18next_config__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_language_detector__WEBPACK_IMPORTED_MODULE_0__]);
next_language_detector__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_language_detector__WEBPACK_IMPORTED_MODULE_0__["default"])({
    supportedLngs: (_next_i18next_config__WEBPACK_IMPORTED_MODULE_1___default().i18n.locales),
    fallbackLng: (_next_i18next_config__WEBPACK_IMPORTED_MODULE_1___default().i18n.defaultLocale)
}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1463:
/***/ ((module) => {

"use strict";

module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: [
            "en",
            "ua"
        ]
    }
};


/***/ })

};
;