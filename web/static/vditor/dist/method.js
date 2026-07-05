/*!
 * Vditor v0.0.42 - A markdown editor written in TypeScript.
 *
 * MIT License
 *
 * Copyright (c) 2018-present B3log 开源, b3log.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vditor"] = factory();
	else
		root["Vditor"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 145:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ Constants)
/* harmony export */ });
/* unused harmony export VDITOR_VERSION */
var _VDITOR_VERSION = (/* unused pure expression or super */ null && ("0.0.42"));

var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.ZWSP = "\u200b";
    Constants.DROP_EDITOR = "application/editor";
    Constants.MOBILE_WIDTH = 520;
    Constants.CLASS_MENU_DISABLED = "vditor-menu--disabled";
    Constants.EDIT_TOOLBARS = [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "list",
        "ordered-list",
        "outdent",
        "indent",
        "check",
        "line",
        "quote",
        "code",
        "inline-code",
        "insert-after",
        "insert-before",
        "upload",
        "record",
        "table",
    ];
    Constants.CODE_THEME = [
        "a11y-dark",
        "agate",
        "an-old-hope",
        "androidstudio",
        "arta",
        "atom-one-dark",
        "atom-one-dark-reasonable",
        "base16/3024",
        "base16/apathy",
        "base16/apprentice",
        "base16/ashes",
        "base16/atelier-cave",
        "base16/atelier-dune",
        "base16/atelier-estuary",
        "base16/atelier-forest",
        "base16/atelier-heath",
        "base16/atelier-lakeside",
        "base16/atelier-plateau",
        "base16/atelier-savanna",
        "base16/atelier-seaside",
        "base16/atelier-sulphurpool",
        "base16/atlas",
        "base16/bespin",
        "base16/black-metal",
        "base16/black-metal-bathory",
        "base16/black-metal-burzum",
        "base16/black-metal-dark-funeral",
        "base16/black-metal-gorgoroth",
        "base16/black-metal-immortal",
        "base16/black-metal-khold",
        "base16/black-metal-marduk",
        "base16/black-metal-mayhem",
        "base16/black-metal-nile",
        "base16/black-metal-venom",
        "base16/brewer",
        "base16/bright",
        "base16/brogrammer",
        "base16/brush-trees-dark",
        "base16/chalk",
        "base16/circus",
        "base16/classic-dark",
        "base16/codeschool",
        "base16/colors",
        "base16/danqing",
        "base16/darcula",
        "base16/dark-violet",
        "base16/darkmoss",
        "base16/darktooth",
        "base16/decaf",
        "base16/default-dark",
        "base16/dracula",
        "base16/edge-dark",
        "base16/eighties",
        "base16/embers",
        "base16/equilibrium-dark",
        "base16/equilibrium-gray-dark",
        "base16/espresso",
        "base16/eva",
        "base16/eva-dim",
        "base16/flat",
        "base16/framer",
        "base16/gigavolt",
        "base16/google-dark",
        "base16/grayscale-dark",
        "base16/green-screen",
        "base16/gruvbox-dark-hard",
        "base16/gruvbox-dark-medium",
        "base16/gruvbox-dark-pale",
        "base16/gruvbox-dark-soft",
        "base16/hardcore",
        "base16/harmonic16-dark",
        "base16/heetch-dark",
        "base16/helios",
        "base16/hopscotch",
        "base16/horizon-dark",
        "base16/humanoid-dark",
        "base16/ia-dark",
        "base16/icy-dark",
        "base16/ir-black",
        "base16/isotope",
        "base16/kimber",
        "base16/london-tube",
        "base16/macintosh",
        "base16/marrakesh",
        "base16/materia",
        "base16/material",
        "base16/material-darker",
        "base16/material-palenight",
        "base16/material-vivid",
        "base16/mellow-purple",
        "base16/mocha",
        "base16/monokai",
        "base16/nebula",
        "base16/nord",
        "base16/nova",
        "base16/ocean",
        "base16/oceanicnext",
        "base16/onedark",
        "base16/outrun-dark",
        "base16/papercolor-dark",
        "base16/paraiso",
        "base16/pasque",
        "base16/phd",
        "base16/pico",
        "base16/pop",
        "base16/porple",
        "base16/qualia",
        "base16/railscasts",
        "base16/rebecca",
        "base16/ros-pine",
        "base16/ros-pine-moon",
        "base16/sandcastle",
        "base16/seti-ui",
        "base16/silk-dark",
        "base16/snazzy",
        "base16/solar-flare",
        "base16/solarized-dark",
        "base16/spacemacs",
        "base16/summercamp",
        "base16/summerfruit-dark",
        "base16/synth-midnight-terminal-dark",
        "base16/tango",
        "base16/tender",
        "base16/tomorrow-night",
        "base16/twilight",
        "base16/unikitty-dark",
        "base16/vulcan",
        "base16/windows-10",
        "base16/windows-95",
        "base16/windows-high-contrast",
        "base16/windows-nt",
        "base16/woodland",
        "base16/xcode-dusk",
        "base16/zenburn",
        "codepen-embed",
        "dark",
        "devibeans",
        "far",
        "felipec",
        "github-dark",
        "github-dark-dimmed",
        "gml",
        "gradient-dark",
        "hybrid",
        "ir-black",
        "isbl-editor-dark",
        "kimbie-dark",
        "lioshi",
        "monokai",
        "monokai-sublime",
        "night-owl",
        "nnfx-dark",
        "nord",
        "obsidian",
        "panda-syntax-dark",
        "paraiso-dark",
        "pojoaque",
        "qtcreator-dark",
        "rainbow",
        "shades-of-purple",
        "srcery",
        "stackoverflow-dark",
        "sunburst",
        "tomorrow-night-blue",
        "tomorrow-night-bright",
        "tokyo-night-dark",
        "vs2015",
        "xt256",
        "ant-design",
        "a11y-light",
        "arduino-light",
        "ascetic",
        "atom-one-light",
        "base16/atelier-cave-light",
        "base16/atelier-dune-light",
        "base16/atelier-estuary-light",
        "base16/atelier-forest-light",
        "base16/atelier-heath-light",
        "base16/atelier-lakeside-light",
        "base16/atelier-plateau-light",
        "base16/atelier-savanna-light",
        "base16/atelier-seaside-light",
        "base16/atelier-sulphurpool-light",
        "base16/brush-trees",
        "base16/classic-light",
        "base16/cupcake",
        "base16/cupertino",
        "base16/default-light",
        "base16/dirtysea",
        "base16/edge-light",
        "base16/equilibrium-gray-light",
        "base16/equilibrium-light",
        "base16/fruit-soda",
        "base16/github",
        "base16/google-light",
        "base16/grayscale-light",
        "base16/gruvbox-light-hard",
        "base16/gruvbox-light-medium",
        "base16/gruvbox-light-soft",
        "base16/harmonic16-light",
        "base16/heetch-light",
        "base16/humanoid-light",
        "base16/horizon-light",
        "base16/ia-light",
        "base16/material-lighter",
        "base16/mexico-light",
        "base16/one-light",
        "base16/papercolor-light",
        "base16/ros-pine-dawn",
        "base16/sagelight",
        "base16/shapeshifter",
        "base16/silk-light",
        "base16/solar-flare-light",
        "base16/solarized-light",
        "base16/summerfruit-light",
        "base16/synth-midnight-terminal-light",
        "base16/tomorrow",
        "base16/unikitty-light",
        "base16/windows-10-light",
        "base16/windows-95-light",
        "base16/windows-high-contrast-light",
        "brown-paper",
        "base16/windows-nt-light",
        "color-brewer",
        "docco",
        "foundation",
        "github",
        "googlecode",
        "gradient-light",
        "grayscale",
        "idea",
        "intellij-light",
        "isbl-editor-light",
        "kimbie-light",
        "lightfair",
        "magula",
        "mono-blue",
        "nnfx-light",
        "panda-syntax-light",
        "paraiso-light",
        "purebasic",
        "qtcreator-light",
        "routeros",
        "school-book",
        "stackoverflow-light",
        "tokyo-night-light",
        "vs",
        "xcode",
        "default",
    ];
    Constants.ALIAS_CODE_LANGUAGES = [
        // 自定义
        "abc",
        "plantuml",
        "mermaid",
        "flowchart",
        "echarts",
        "mindmap",
        "graphviz",
        "math",
        "markmap",
        "smiles",
        // 别名
        "js",
        "ts",
        "html",
        "toml",
        "c#",
        "bat",
    ];
    Constants.CDN = "https://webcdn.wujieai.com/vditor@".concat("0.0.42");
    Constants.MARKDOWN_OPTIONS = {
        autoSpace: false,
        gfmAutoLink: true,
        codeBlockPreview: true,
        fixTermTypo: false,
        footnotes: true,
        linkBase: "",
        linkPrefix: "",
        listStyle: false,
        mark: false,
        mathBlockPreview: true,
        paragraphBeginningSpace: false,
        sanitize: true,
        sub: false,
        sup: false,
        toc: false,
    };
    Constants.HLJS_OPTIONS = {
        enable: true,
        lineNumber: false,
        defaultLang: "",
        style: "github",
    };
    Constants.MATH_OPTIONS = {
        engine: "MathJax",
        inlineDigit: true,
        // 默认宏：补充常见但部分引擎未内置的符号/算子
        // oiint: 关闭曲面积分（∯），在 MathJax 下通过 unicode 宏渲染
        // 说明：KaTeX 若不支持 \unicode，将退化为普通 \iint（由 mathRender 保证）
        // 以下算子使用 \operatorname / \operatorname* 统一排版为直立体
        macros: {
            oiint: "\\unicode{x222F}",
            // 常用数系
            N: "\\mathbb{N}",
            Z: "\\mathbb{Z}",
            Q: "\\mathbb{Q}",
            R: "\\mathbb{R}",
            C: "\\mathbb{C}",
            // 双曲函数
            sech: "\\operatorname{sech}",
            csch: "\\operatorname{csch}",
            coth: "\\operatorname{coth}",
            // 常见优化 / 线代算子
            argmin: "\\operatorname*{argmin}",
            argmax: "\\operatorname*{argmax}",
            rank: "\\operatorname{rank}",
            diag: "\\operatorname{diag}",
            tr: "\\operatorname{tr}",
            // 概率统计
            Var: "\\operatorname{Var}",
            Cov: "\\operatorname{Cov}",
            Std: "\\operatorname{Std}",
            E: "\\mathbb{E}",
            Pr: "\\mathbb{P}",
            Normal: "\\mathcal{N}",
            Bern: "\\operatorname{Bern}",
            Poiss: "\\operatorname{Poiss}",
            iid: "\\stackrel{\\text{i.i.d.}}{\\sim}",
            indep: "\\perp\\!\\!\\!\\perp",
            // 其他常见记号
            sgn: "\\operatorname{sgn}",
            supp: "\\operatorname{supp}",
            Span: "\\operatorname{span}",
            ker: "\\operatorname{ker}",
            im: "\\operatorname{im}",
            spec: "\\operatorname{spec}",
            // 逻辑
            implies: "\\Rightarrow",
            iff: "\\Leftrightarrow",
        },
    };
    Constants.THEME_OPTIONS = {
        current: "light",
        list: {
            "ant-design": "Ant Design",
            dark: "Dark",
            light: "Light",
            wechat: "WeChat",
        },
        path: "".concat(Constants.CDN, "/dist/css/content-theme"),
    };
    return Constants;
}());



/***/ }),

/***/ 825:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ SMILESRender)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(413);
/* harmony import */ var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
/* harmony import */ var _util_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(494);




var SMILESRender = function (element, cdn, theme) {
    if (element === void 0) { element = document; }
    if (cdn === void 0) { cdn = _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN; }
    var SMILESElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.SMILESRenderAdapter.getElements(element);
    if (SMILESElements.length > 0) {
        (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdn, "/dist/js/smiles-drawer/smiles-drawer.min.js?v=2.1.7"), "vditorAbcjsScript").then(function () {
            var sd = new SmiDrawer({}, {});
            SMILESElements.forEach(function (item) {
                var code = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.SMILESRenderAdapter.getCode(item).trim();
                if (item.getAttribute("data-processed") === "true" || code.trim() === "") {
                    return;
                }
                var id = "smiles" + (0,_util_function__WEBPACK_IMPORTED_MODULE_3__/* .genUUID */ .Wb)();
                item.innerHTML = "<svg id=\"".concat(id, "\"></svg>");
                sd.draw(code, '#' + id, theme === "dark" ? "dark" : undefined);
                item.setAttribute("data-processed", "true");
            });
        });
    }
};


/***/ }),

/***/ 135:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Q": () => (/* binding */ abcRender)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(413);
/* harmony import */ var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);



var abcRender = function (element, cdn) {
    if (element === void 0) { element = document; }
    if (cdn === void 0) { cdn = _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN; }
    var abcElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.abcRenderAdapter.getElements(element);
    if (abcElements.length > 0) {
        (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdn, "/dist/js/abcjs/abcjs_basic.min.js"), "vditorAbcjsScript").then(function () {
            abcElements.forEach(function (item) {
                if (item.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                    item.parentElement.classList.contains("vditor-ir__marker--pre")) {
                    return;
                }
                if (item.getAttribute("data-processed") === "true") {
                    return;
                }
                ABCJS.renderAbc(item, _adapterRender__WEBPACK_IMPORTED_MODULE_1__.abcRenderAdapter.getCode(item).trim());
                item.style.overflowX = "auto";
                item.setAttribute("data-processed", "true");
            });
        });
    }
};


/***/ }),

/***/ 840:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mathRenderAdapter": () => (/* binding */ mathRenderAdapter),
/* harmony export */   "SMILESRenderAdapter": () => (/* binding */ SMILESRenderAdapter),
/* harmony export */   "mermaidRenderAdapter": () => (/* binding */ mermaidRenderAdapter),
/* harmony export */   "markmapRenderAdapter": () => (/* binding */ markmapRenderAdapter),
/* harmony export */   "mindmapRenderAdapter": () => (/* binding */ mindmapRenderAdapter),
/* harmony export */   "chartRenderAdapter": () => (/* binding */ chartRenderAdapter),
/* harmony export */   "abcRenderAdapter": () => (/* binding */ abcRenderAdapter),
/* harmony export */   "graphvizRenderAdapter": () => (/* binding */ graphvizRenderAdapter),
/* harmony export */   "flowchartRenderAdapter": () => (/* binding */ flowchartRenderAdapter),
/* harmony export */   "plantumlRenderAdapter": () => (/* binding */ plantumlRenderAdapter)
/* harmony export */ });
/* harmony import */ var _util_hasClosest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(106);
var mathRenderAdapter = {
    getCode: function (el) { return el.textContent; },
    getElements: function (element) { return element.querySelectorAll(".language-math"); },
};
var SMILESRenderAdapter = {
    getCode: function (el) { return el.textContent; },
    getElements: function (element) { return element.querySelectorAll(".language-smiles"); },
};
var mermaidRenderAdapter = {
    /** 不仅要返回code，并且需要将 code 设置为 el 的 innerHTML */
    getCode: function (el) { return el.textContent; },
    getElements: function (element) { return element.querySelectorAll(".language-mermaid"); },
};
var markmapRenderAdapter = {
    getCode: function (el) { return el.textContent; },
    getElements: function (element) { return element.querySelectorAll(".language-markmap"); },
};
var mindmapRenderAdapter = {
    getCode: function (el) { return el.getAttribute("data-code"); },
    getElements: function (el) { return el.querySelectorAll(".language-mindmap"); },
};

/**
 * ECharts 渲染适配器：获取/定位 `.language-echarts` 代码块与相关元素。
 */
var chartRenderAdapter = {
    getCode: function (el) { return el.innerText; },
    getElements: function (el) { return el.querySelectorAll(".language-echarts"); },
    /**
     * 更新同级别的 Markdown 源代码（vditor-wysiwyg__pre > code），并进行“一个字段一行”的轻量格式化。
     * 不修改渲染区域（canvas），避免过度格式化数组/内层对象。
     * @param el 预览区域中的 `.language-echarts` 元素或其子孙节点
     * @param code 新的 ECharts 配置文本（JSON/JS 字符串）
     */
    setCode: function (el, code) {
        // 轻量格式化：顶层字段一行，数组与子对象保持紧凑（单行 JSON）
        var formatTopLevelOneLine = function (obj) {
            try {
                var keys = Object.keys(obj);
                var lines = keys.map(function (key) {
                    var val = obj[key];
                    var vStr = "";
                    if (Array.isArray(val)) {
                        vStr = JSON.stringify(val);
                    }
                    else if (val && typeof val === "object") {
                        vStr = JSON.stringify(val);
                    }
                    else {
                        vStr = JSON.stringify(val);
                    }
                    return "\"".concat(key, "\": ").concat(vStr);
                });
                return "{\n".concat(lines.join(",\n"), "\n}");
            }
            catch (_a) {
                return JSON.stringify(obj);
            }
        };
        var finalText = code !== null && code !== void 0 ? code : "";
        try {
            var parsed = JSON.parse(code);
            finalText = formatTopLevelOneLine(parsed);
        }
        catch (_a) {
        }
        // 寻找同级 vditor-wysiwyg__block，然后定位源代码 pre > code
        var block = (0,_util_hasClosest__WEBPACK_IMPORTED_MODULE_0__/* .hasClosestByClassName */ .fb)(el, "vditor-wysiwyg__block");
        if (block) {
            var sourcePre = block.firstElementChild;
            if (sourcePre && sourcePre.classList.contains("vditor-wysiwyg__pre")) {
                var sourceCode = sourcePre.querySelector("code");
                if (sourceCode) {
                    sourceCode.textContent = finalText;
                    sourceCode.classList.add("language-echarts");
                    return;
                }
            }
        }
    },
};
var abcRenderAdapter = {
    getCode: function (el) { return el.textContent; },
    getElements: function (el) { return el.querySelectorAll(".language-abc"); },
};
var graphvizRenderAdapter = {
    getCode: function (el) { return el.textContent; },
    getElements: function (el) { return el.querySelectorAll(".language-graphviz"); },
};
var flowchartRenderAdapter = {
    getCode: function (el) { return el.textContent; },
    getElements: function (el) { return el.querySelectorAll(".language-flowchart"); },
};
var plantumlRenderAdapter = {
    getCode: function (el) { return el.textContent; },
    getElements: function (el) { return el.querySelectorAll(".language-plantuml"); },
};


/***/ }),

/***/ 775:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p": () => (/* binding */ chartRender)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(413);
/* harmony import */ var _util_addStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(290);
/* harmony import */ var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
/* harmony import */ var _util_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(494);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var chartRender = function (element, cdn, theme) {
    if (element === void 0) { element = document; }
    if (cdn === void 0) { cdn = _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN; }
    var echartsElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.chartRenderAdapter.getElements(element);
    if (echartsElements.length > 0) {
        (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdn, "/dist/js/echarts/echarts.min.js?v=5.5.1"), "vditorEchartsScript").then(function () {
            echartsElements.forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () {
                var text, option, ensureDefaultSeriesColors, chart, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (e.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                                e.parentElement.classList.contains("vditor-ir__marker--pre")) {
                                return [2 /*return*/];
                            }
                            text = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.chartRenderAdapter.getCode(e).trim();
                            if (!text) {
                                return [2 /*return*/];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            if (e.getAttribute("data-processed") === "true") {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, (0,_util_function__WEBPACK_IMPORTED_MODULE_3__/* .looseJsonParse */ .Qf)(text)];
                        case 2:
                            option = _a.sent();
                            ensureDefaultSeriesColors = function (opt) {
                                var palette = [
                                    "#5470C6",
                                    "#91CC75",
                                    "#FAC858",
                                    "#EE6666",
                                    "#73C0DE",
                                    "#3CA9CF",
                                    "#FC8452",
                                    "#9A60B4",
                                    "#ea7ccc",
                                ];
                                if (!Array.isArray(opt === null || opt === void 0 ? void 0 : opt.color) ||
                                    opt.color.length === 0) {
                                    opt.color = palette.slice();
                                }
                                var series = Array.isArray(opt === null || opt === void 0 ? void 0 : opt.series)
                                    ? opt.series
                                    : [];
                                series.forEach(function (s, idx) {
                                    if (!s || typeof s !== "object")
                                        return;
                                    var type = s.type;
                                    if (type === "line" ||
                                        type === "bar" ||
                                        type === "scatter" ||
                                        type === "effectScatter" ||
                                        type === "radar") {
                                        var color = palette[idx % palette.length];
                                        s.itemStyle = s.itemStyle || {};
                                        if (!s.itemStyle.color) {
                                            s.itemStyle.color = color;
                                        }
                                        if (type === "radar") {
                                            s.lineStyle = s.lineStyle || {};
                                            if (!s.lineStyle.color) {
                                                s.lineStyle.color = s.itemStyle.color;
                                            }
                                        }
                                    }
                                });
                            };
                            ensureDefaultSeriesColors(option);
                            chart = echarts.init(e, theme === "dark" ? "dark" : undefined);
                            chart.setOption(option);
                            attachEchartsContextMenu(e, option, chart, cdn);
                            e.setAttribute("data-processed", "true");
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            e.className = "vditor-reset--error";
                            e.innerHTML = "echarts render error: <br>".concat(error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        });
    }
};
/**
 * 为 ECharts 容器添加右键菜单与颜色选择面板，仅针对 language-echarts 类型。
 * 点击菜单后弹出颜色面板，
 * 选择颜色立即更新对应系列的 itemStyle.color 并刷新显示。
 * @param el 图表容器元素
 * @param option ECharts 的配置项，需包含 series 数组
 * @param chart ECharts 实例，用于实时更新配置
 */
var attachEchartsContextMenu = function (el, option, chart, cdn) {
    var _a, _b, _c, _d;
    // 防重复绑定
    if (el.getAttribute("data-context-menu") === "true") {
        return;
    }
    el.setAttribute("data-context-menu", "true");
    /**
     * 在预览模式或分屏预览（SV）模式禁用图表右键菜单
     * 通过 DOM 位置判断：位于 .vditor-preview 或 .vditor-sv 下的渲染内容视为预览环境
     */
    var inPreview = !!(el.closest(".vditor-preview") || el.closest(".vditor-sv"));
    if (inPreview) {
        return;
    }
    // 解析 series 数据映射
    var seriesList = Array.isArray(option === null || option === void 0 ? void 0 : option.series)
        ? option.series
        : [];
    var seriesMap = {};
    seriesList.forEach(function (s) {
        if (s && typeof s.name === "string") {
            seriesMap[s.name] = s;
        }
    });
    /**
     * 检测图表类型：
     * - 当存在 pie 系列时优先走饼图专项处理；
     * - 若存在 radar 系列则走雷达专项处理；
     * - 若存在 funnel 系列则走漏斗专项处理；
     * - 若存在 scatter 系列则走散点专项处理；
     * - 否则统一走 line/bar 默认处理。
     */
    var chartType = (function () {
        var hasPie = seriesList.some(function (s) { return s && s.type === "pie"; });
        if (hasPie)
            return "pie";
        var hasRadar = seriesList.some(function (s) { return s && s.type === "radar"; });
        if (hasRadar)
            return "radar";
        var hasFunnel = seriesList.some(function (s) { return s && s.type === "funnel"; });
        if (hasFunnel)
            return "funnel";
        var hasScatter = seriesList.some(function (s) { return s && (s.type === "scatter" || s.type === "effectScatter"); });
        return hasScatter ? "scatter" : "default";
    })();
    // 饼图支持：优先使用 legend.data 或 series.data[].name 生成菜单项
    var pieSeries = seriesList.find(function (s) { return s && s.type === "pie" && Array.isArray(s.data); });
    var labelIndexMap = {};
    var pieMenuLabels = [];
    if (pieSeries) {
        var legendData = Array.isArray((_a = option === null || option === void 0 ? void 0 : option.legend) === null || _a === void 0 ? void 0 : _a.data)
            ? option.legend.data.filter(function (d) { return typeof d === "string"; })
            : [];
        var dataNames = pieSeries.data
            .map(function (d) { return (d && typeof d.name === "string" ? d.name : null); })
            .filter(function (n) { return !!n; });
        // 构建 name -> index 映射
        dataNames.forEach(function (name, idx) {
            labelIndexMap[name] = idx;
        });
        // 菜单项优先 legend.data，否则用数据项名称
        pieMenuLabels = legendData.length > 0 ? legendData : dataNames;
    }
    // 雷达图支持：优先使用 legend.data 或 radarSeries.data[].name 生成菜单项
    var radarSeries = seriesList.find(function (s) { return s && s.type === "radar" && Array.isArray(s.data); });
    var radarMenuLabels = [];
    if (radarSeries) {
        var legendData = Array.isArray((_b = option === null || option === void 0 ? void 0 : option.legend) === null || _b === void 0 ? void 0 : _b.data)
            ? option.legend.data.filter(function (d) { return typeof d === "string"; })
            : [];
        var dataNames = radarSeries.data
            .map(function (d) { return (d && typeof d.name === "string" ? d.name : null); })
            .filter(function (n) { return !!n; });
        // 构建 name -> index 映射（与饼图共享）
        dataNames.forEach(function (name, idx) {
            labelIndexMap[name] = idx;
        });
        radarMenuLabels = legendData.length > 0 ? legendData : dataNames;
    }
    // 漏斗图支持：优先使用 legend.data 或各漏斗系列 data[].name 的并集生成菜单项
    var funnelSeriesList = seriesList.filter(function (s) { return s && s.type === "funnel" && Array.isArray(s.data); });
    var funnelMenuLabels = [];
    if (funnelSeriesList.length > 0) {
        var legendData = Array.isArray((_c = option === null || option === void 0 ? void 0 : option.legend) === null || _c === void 0 ? void 0 : _c.data)
            ? option.legend.data.filter(function (d) { return typeof d === "string"; })
            : [];
        var nameSet_1 = new Set();
        funnelSeriesList.forEach(function (fs) {
            fs.data.forEach(function (d, idx) {
                if (d && typeof d.name === "string") {
                    nameSet_1.add(d.name);
                }
            });
        });
        var dataNames = Array.from(nameSet_1);
        // 构建 name -> index 映射（以第一个漏斗系列为准，其他系列按名称查找）
        if (funnelSeriesList[0]) {
            funnelSeriesList[0].data.forEach(function (d, idx) {
                if (d && typeof d.name === "string") {
                    labelIndexMap[d.name] = idx;
                }
            });
        }
        funnelMenuLabels = legendData.length > 0 ? legendData : dataNames;
    }
    /**
     * 散点图支持：当系列为 scatter 时，生成菜单标签与 label -> seriesIndex 映射。
     * 优先 legend.data，其次使用系列 name；若都缺失，则按出现顺序生成 "散点系列N"。
     */
    var scatterMenuLabels = [];
    if (chartType === "scatter") {
        var legendData = Array.isArray((_d = option === null || option === void 0 ? void 0 : option.legend) === null || _d === void 0 ? void 0 : _d.data)
            ? option.legend.data.filter(function (d) { return typeof d === "string"; })
            : [];
        // 收集所有散点系列的索引与名称
        var scatterIndices_1 = [];
        var scatterNames_1 = [];
        seriesList.forEach(function (s, idx) {
            if (s && (s.type === "scatter" || s.type === "effectScatter")) {
                scatterIndices_1.push(idx);
                scatterNames_1.push(s && typeof s.name === "string" ? s.name : null);
            }
        });
        if (legendData.length > 0) {
            var used_1 = 0;
            legendData.forEach(function (label) {
                var nameIdx = scatterNames_1.findIndex(function (n) { return n === label; });
                if (nameIdx >= 0) {
                    labelIndexMap[label] = scatterIndices_1[nameIdx];
                }
                else if (used_1 < scatterIndices_1.length) {
                    labelIndexMap[label] = scatterIndices_1[used_1++];
                }
            });
            scatterMenuLabels.push.apply(scatterMenuLabels, legendData);
        }
        else if (scatterNames_1.filter(Boolean).length > 0) {
            scatterNames_1.forEach(function (n, i) {
                if (n) {
                    scatterMenuLabels.push(n);
                    labelIndexMap[n] = scatterIndices_1[i];
                }
            });
        }
        else {
            scatterIndices_1.forEach(function (si, i) {
                var label = "\u6563\u70B9\u7CFB\u5217".concat(i + 1);
                scatterMenuLabels.push(label);
                labelIndexMap[label] = si;
            });
        }
    }
    // 创建菜单 DOM（按需创建）
    var menuEl = null;
    var pickerEl = null;
    var pickerInstance = null;
    var currentSeriesName = null;
    // 记录打开 color-picker 时的原始颜色，以及滑动选择中的待确认颜色
    var openingOriginalColor = null;
    // 点击外部隐藏的全局处理器（在菜单或面板显示时注册，隐藏后移除）
    var outsideHandler = null;
    /**
     * 注册点击外部隐藏菜单与颜色面板。
     * 当在面板外点击时，若正在选择颜色，则还原为打开面板时的原始颜色（等同 clear）。
     */
    var ensureOutsideHandler = function () {
        if (outsideHandler)
            return;
        outsideHandler = function (ev) {
            var target = ev.target;
            if (!target)
                return;
            // 如果点击在菜单或面板内部，则不隐藏
            if (menuEl &&
                menuEl.style.display !== "none" &&
                menuEl.contains(target))
                return;
            if (pickerEl &&
                pickerEl.style.display !== "none" &&
                pickerEl.contains(target))
                return;
            // 外部点击时，若色板处于展示且记录了原始颜色，恢复原色
            try {
                if (pickerEl &&
                    pickerEl.style.display !== "none" &&
                    currentSeriesName &&
                    openingOriginalColor) {
                    var targetSeries = seriesMap[currentSeriesName];
                    if (targetSeries) {
                        targetSeries.itemStyle = targetSeries.itemStyle || {};
                        targetSeries.itemStyle.color = openingOriginalColor;
                    }
                    chart.setOption({
                        series: [
                            {
                                name: currentSeriesName,
                                itemStyle: { color: openingOriginalColor },
                            },
                        ],
                    });
                }
            }
            catch (_a) { }
            hidePicker();
            hideMenu();
        };
        document.addEventListener("mousedown", outsideHandler, true);
        document.addEventListener("touchstart", outsideHandler, true);
    };
    /**
     * 展示右键菜单
     * @param x 页面 X 坐标
     * @param y 页面 Y 坐标
     */
    var showMenu = function (x, y) {
        if (!menuEl) {
            menuEl = document.createElement("div");
            menuEl.className = "vditor-echarts-context-menu";
            menuEl.style.position = "fixed";
            menuEl.style.zIndex = "9999";
            menuEl.style.background = "#fff";
            menuEl.style.border = "1px solid #e5e7eb";
            menuEl.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
            menuEl.style.borderRadius = "4px";
            menuEl.style.padding = "4px 0";
            menuEl.style.fontSize = "12px";
            menuEl.style.minWidth = "120px";
            // 阻止菜单内的鼠标事件冒泡到 document
            menuEl.addEventListener("mousedown", function (ev) {
                ev.stopPropagation();
            });
            // 菜单项：根据图表类型选择来源
            var items = [];
            switch (chartType) {
                case "pie":
                    items = pieMenuLabels;
                    break;
                case "radar":
                    items = radarMenuLabels;
                    break;
                case "funnel":
                    items = funnelMenuLabels;
                    break;
                case "scatter":
                    items = scatterMenuLabels;
                    break;
                default:
                    items = Array.from(new Set(seriesList
                        .map(function (s) {
                        return s && typeof s.name === "string"
                            ? s.name
                            : null;
                    })
                        .filter(function (n) { return !!n && n.length > 0; })));
            }
            items.forEach(function (label) {
                var item = document.createElement("div");
                item.textContent = "\u4FEE\u6539".concat(label, "\u914D\u8272");
                item.style.padding = "6px 12px";
                item.style.cursor = "pointer";
                item.style.userSelect = "none";
                item.addEventListener("mouseenter", function () {
                    item.style.background = "#f5f7fa";
                });
                item.addEventListener("mouseleave", function () {
                    item.style.background = "transparent";
                });
                item.addEventListener("mousedown", function (ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                });
                item.addEventListener("click", function (ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    var r = ev.currentTarget.getBoundingClientRect();
                    var x = r.right + 8;
                    var y = r.top;
                    showColorPicker(label, x, y);
                });
                menuEl.appendChild(item);
            });
            document.body.appendChild(menuEl);
        }
        menuEl.style.left = "".concat(x, "px");
        menuEl.style.top = "".concat(y, "px");
        menuEl.style.display = "block";
        ensureOutsideHandler();
    };
    /**
     * 隐藏右键菜单
     */
    var hideMenu = function () {
        if (menuEl) {
            menuEl.style.display = "none";
            // 若两者都隐藏，移除外部点击处理器
            if (pickerEl &&
                pickerEl.style.display === "none" &&
                outsideHandler) {
                document.removeEventListener("mousedown", outsideHandler, true);
                document.removeEventListener("touchstart", outsideHandler, true);
                outsideHandler = null;
            }
        }
    };
    /**
     * 确保引入 Color Picker 的 CSS/JS 资源
     * @param cdnRoot 静态资源根路径
     */
    var ensureColorPickerAssets = function (cdnRoot) {
        var cssUrl = "".concat(cdnRoot, "/dist/js/color-picker/color-picker.nano.css");
        var jsUrl = "".concat(cdnRoot, "/dist/js/color-picker/color-picker.nano.js");
        (0,_util_addStyle__WEBPACK_IMPORTED_MODULE_4__/* .addStyle */ .c)(cssUrl, "vditorColorPickerStyle");
        return new Promise(function (resolve) {
            if (window.Pickr) {
                resolve();
                return;
            }
            (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)(jsUrl, "vditorColorPickerScript").then(function () { return resolve(); });
        });
    };
    /**
     * 确保加载中文 i18n（使用本项目 CDN 的 zh_CN.js）。
     * 若全局已有 `window.VditorI18n`，则直接使用，否则动态加载。
     * @param cdnRoot 静态资源根路径
     */
    var ensureI18nAssets = function (cdnRoot) {
        return new Promise(function (resolve) {
            if (window.VditorI18n) {
                resolve();
                return;
            }
            (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdnRoot, "/dist/js/i18n/zh_CN.js"), "vditorI18nScriptzh_CN").then(function () { return resolve(); });
        });
    };
    /** 派发编辑器输入事件 */
    var dispatchEditorInput = function () {
        var _a;
        var root = el.closest(".vditor-ir, .vditor-sv, .vditor-wysiwyg");
        if (!root)
            return;
        var target = null;
        if (root.classList.contains("vditor-ir")) {
            target = root.querySelector("pre.vditor-reset");
        }
        else if (root.classList.contains("vditor-sv")) {
            target = root;
        }
        else {
            target = root.querySelector("pre.vditor-reset");
        }
        try {
            (_a = (target || root)) === null || _a === void 0 ? void 0 : _a.focus();
            var sel = getSelection();
            if (sel && sel.rangeCount === 0) {
                var range = document.createRange();
                var anchor = (target || root);
                range.selectNodeContents(anchor);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
        catch (_b) { }
        var ev = new InputEvent("input", {
            bubbles: true,
            cancelable: true,
            data: "",
            inputType: "insertText",
        });
        (target || root).dispatchEvent(ev);
    };
    /**
     * 显示颜色选择面板（2x4 网格，含动画与边界处理）。
     * @param seriesName 目标系列名称
     * @param x 页面坐标 X
     * @param y 页面坐标 Y
     */
    var showColorPicker = function (seriesName, x, y) {
        // 并行加载 Color Picker 与中文 i18n 资源
        Promise.all([ensureColorPickerAssets(cdn), ensureI18nAssets(cdn)]).then(function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
            if (!pickerEl) {
                pickerEl = document.createElement("div");
                pickerEl.className = "vditor-echarts-color-picker";
                pickerEl.style.position = "fixed";
                pickerEl.style.zIndex = "10000";
                pickerEl.style.background = "#fff";
                pickerEl.style.border = "1px solid #e5e7eb";
                pickerEl.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                pickerEl.style.borderRadius = "6px";
                pickerEl.style.padding = "8px";
                pickerEl.style.display = "none";
                pickerEl.style.opacity = "0";
                pickerEl.style.transform = "scale(0.96)";
                pickerEl.style.transition =
                    "opacity 120ms ease, transform 120ms ease";
                pickerEl.tabIndex = -1;
                pickerEl.addEventListener("mousedown", function (ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                });
                var pickerContainer = document.createElement("div");
                pickerEl.appendChild(pickerContainer);
                document.body.appendChild(pickerEl);
                try {
                    var PickrAny = window.Pickr;
                    if (!PickrAny || !PickrAny.create) {
                        throw new Error("Pickr 未正确加载");
                    }
                    // 记录当前目标项与原始颜色
                    currentSeriesName = seriesName;
                    switch (chartType) {
                        case "pie": {
                            var idx = labelIndexMap[seriesName];
                            try {
                                var colorFn = (_a = pieSeries === null || pieSeries === void 0 ? void 0 : pieSeries.itemStyle) === null || _a === void 0 ? void 0 : _a.color;
                                if (typeof colorFn === "function") {
                                    openingOriginalColor = colorFn({
                                        dataIndex: idx,
                                        data: pieSeries.data[idx],
                                    });
                                }
                                else {
                                    openingOriginalColor =
                                        ((_d = (_c = (_b = pieSeries === null || pieSeries === void 0 ? void 0 : pieSeries.data) === null || _b === void 0 ? void 0 : _b[idx]) === null || _c === void 0 ? void 0 : _c.itemStyle) === null || _d === void 0 ? void 0 : _d.color) || null;
                                }
                            }
                            catch (_y) {
                                openingOriginalColor = null;
                            }
                            break;
                        }
                        case "radar": {
                            var idx = labelIndexMap[seriesName];
                            try {
                                var d = (_e = radarSeries === null || radarSeries === void 0 ? void 0 : radarSeries.data) === null || _e === void 0 ? void 0 : _e[idx];
                                openingOriginalColor =
                                    ((_f = d === null || d === void 0 ? void 0 : d.itemStyle) === null || _f === void 0 ? void 0 : _f.color) ||
                                        ((_g = d === null || d === void 0 ? void 0 : d.lineStyle) === null || _g === void 0 ? void 0 : _g.color) ||
                                        null;
                            }
                            catch (_z) {
                                openingOriginalColor = null;
                            }
                            break;
                        }
                        case "funnel": {
                            var idx = labelIndexMap[seriesName];
                            try {
                                var first = funnelSeriesList[0];
                                var d = (_h = first === null || first === void 0 ? void 0 : first.data) === null || _h === void 0 ? void 0 : _h[idx];
                                if (!d && first) {
                                    d = first.data.find(function (it) { return (it === null || it === void 0 ? void 0 : it.name) === seriesName; });
                                }
                                if ((_j = d === null || d === void 0 ? void 0 : d.itemStyle) === null || _j === void 0 ? void 0 : _j.color) {
                                    openingOriginalColor =
                                        d.itemStyle.color;
                                }
                                else if (Array.isArray(option === null || option === void 0 ? void 0 : option.color) &&
                                    typeof idx === "number") {
                                    var palette = option.color;
                                    openingOriginalColor =
                                        palette[idx] || null;
                                }
                                else {
                                    openingOriginalColor = null;
                                }
                            }
                            catch (_0) {
                                openingOriginalColor = null;
                            }
                            break;
                        }
                        case "scatter": {
                            var si = labelIndexMap[seriesName];
                            try {
                                var s = seriesList[si];
                                openingOriginalColor =
                                    ((_k = s === null || s === void 0 ? void 0 : s.itemStyle) === null || _k === void 0 ? void 0 : _k.color) || null;
                            }
                            catch (_1) {
                                openingOriginalColor = null;
                            }
                            break;
                        }
                        default:
                            openingOriginalColor =
                                ((_m = (_l = seriesMap[seriesName]) === null || _l === void 0 ? void 0 : _l.itemStyle) === null || _m === void 0 ? void 0 : _m.color) ||
                                    null;
                    }
                    // 组装 Pickr 中文文案（使用 zh_CN.js 映射）
                    var dict = window.VditorI18n || {};
                    var pickerI18n = {
                        // 对话标题：Pickr 内部用于 aria 文案
                        "ui:dialog": "颜色选择",
                        // 保存、取消、清除按钮文案映射
                        "btn:save": dict["confirm"] || "确定",
                        "btn:cancel": dict["close"] || "取消",
                        "btn:clear": dict["remove"] || "清除",
                    };
                    // 初始化 Pickr（Nano 主题）
                    pickerInstance = PickrAny.create({
                        el: pickerContainer,
                        theme: "nano",
                        default: openingOriginalColor || "#409EFF",
                        inline: true,
                        useAsButton: true,
                        i18n: pickerI18n,
                        swatches: [
                            "#F44336",
                            "#E91E63",
                            "#9C27B0",
                            "#673AB7",
                            "#3F51B5",
                            "#2196F3",
                            "#03A9F4",
                            "#00BCD4",
                            "#009688",
                            "#4CAF50",
                            "#8BC34A",
                            "#CDDC39",
                            "#FFEB3B",
                            "#FFC107",
                        ],
                        components: {
                            preview: true,
                            opacity: true,
                            hue: true,
                            interaction: {
                                hex: false,
                                rgba: false,
                                hsla: false,
                                hsva: false,
                                cmyk: false,
                                input: true,
                                clear: true,
                                save: true,
                            },
                        },
                    });
                    (_o = pickerInstance === null || pickerInstance === void 0 ? void 0 : pickerInstance.show) === null || _o === void 0 ? void 0 : _o.call(pickerInstance);
                    /**
                     * 将当前 option 序列化并写回同级别的源代码（vditor-wysiwyg__pre > code）。
                     * 只更新源码，不直接改动渲染区域。
                     */
                    var updateMdCodeFromOption_1 = function () {
                        try {
                            // 使用适配器的 setCode，确保“一个字段一行”的格式化且只更新源代码
                            var updated = JSON.stringify(option);
                            _adapterRender__WEBPACK_IMPORTED_MODULE_1__.chartRenderAdapter.setCode(el, updated);
                        }
                        catch (_a) { }
                    };
                    /**
                     * 应用当前系列颜色到 ECharts，并记录到元素 dataset
                     * @param colorHex 颜色十六进制值，如 #409EFF
                     * @param finalize 是否为最终提交（保存/点击色块），用于必要时收起面板
                     */
                    var applySeriesColor_1 = function (colorHex, finalize, persist) {
                        var _a;
                        if (finalize === void 0) { finalize = false; }
                        if (persist === void 0) { persist = false; }
                        if (!currentSeriesName || !colorHex)
                            return;
                        switch (chartType) {
                            case "pie": {
                                // 饼图：更新对应数据项的颜色
                                var idx = labelIndexMap[currentSeriesName];
                                var d = pieSeries.data[idx];
                                if (d) {
                                    d.itemStyle = d.itemStyle || {};
                                    d.itemStyle.color = colorHex;
                                }
                                break;
                            }
                            case "radar": {
                                // 雷达图：更新对应数据项颜色（线条与点）
                                var idx = labelIndexMap[currentSeriesName];
                                var d = (_a = radarSeries === null || radarSeries === void 0 ? void 0 : radarSeries.data) === null || _a === void 0 ? void 0 : _a[idx];
                                if (d) {
                                    d.itemStyle = d.itemStyle || {};
                                    d.lineStyle = d.lineStyle || {};
                                    d.itemStyle.color = colorHex;
                                    d.lineStyle.color = colorHex;
                                    // 若存在面积色，保留透明度并替换 RGB
                                    if (d.areaStyle &&
                                        typeof d.areaStyle === "object") {
                                        var prev = d.areaStyle
                                            .color;
                                        var m = typeof prev === "string" &&
                                            prev.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)$/);
                                        if (m) {
                                            var alpha = m[4];
                                            var hex = colorHex.replace("#", "");
                                            var r = parseInt(hex.substring(0, 2), 16);
                                            var g = parseInt(hex.substring(2, 4), 16);
                                            var b = parseInt(hex.substring(4, 6), 16);
                                            d.areaStyle.color = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
                                        }
                                    }
                                }
                                break;
                            }
                            case "funnel": {
                                // 漏斗图：对所有漏斗系列中匹配名称的数据项应用颜色
                                funnelSeriesList.forEach(function (fs) {
                                    var _a;
                                    var idx = labelIndexMap[currentSeriesName];
                                    // 保障不同系列内索引不一致时的名称查找
                                    if ((idx == null ||
                                        ((_a = fs.data[idx]) === null || _a === void 0 ? void 0 : _a.name) !==
                                            currentSeriesName) &&
                                        Array.isArray(fs.data)) {
                                        idx = fs.data.findIndex(function (it) {
                                            return it &&
                                                it.name ===
                                                    currentSeriesName;
                                        });
                                    }
                                    if (idx != null && idx >= 0) {
                                        var d = fs.data[idx];
                                        if (d) {
                                            d.itemStyle = d.itemStyle || {};
                                            d.itemStyle.color = colorHex;
                                        }
                                    }
                                });
                                break;
                            }
                            case "scatter": {
                                // 散点图：按系列更新颜色（数据点继承系列颜色）
                                var si = labelIndexMap[currentSeriesName];
                                var s = seriesList[si];
                                if (s) {
                                    s.itemStyle = s.itemStyle || {};
                                    s.itemStyle.color = colorHex;
                                }
                                break;
                            }
                            default: {
                                // line/bar：默认更新系列颜色
                                var target = seriesMap[currentSeriesName];
                                if (target) {
                                    target.itemStyle =
                                        target.itemStyle || {};
                                    target.itemStyle.color = colorHex;
                                }
                                break;
                            }
                        }
                        if (persist) {
                            try {
                                var key = "data-echarts-colors";
                                var raw = el.getAttribute(key);
                                var saved = raw
                                    ? JSON.parse(raw)
                                    : {};
                                saved[currentSeriesName] = colorHex;
                                el.setAttribute(key, JSON.stringify(saved));
                            }
                            catch (_b) { }
                        }
                        // 更新图表
                        switch (chartType) {
                            case "pie":
                                chart.setOption({
                                    series: [
                                        {
                                            name: pieSeries.name,
                                            type: "pie",
                                            data: pieSeries.data,
                                        },
                                    ],
                                });
                                break;
                            case "radar":
                                chart.setOption({
                                    series: [
                                        {
                                            name: radarSeries === null || radarSeries === void 0 ? void 0 : radarSeries.name,
                                            type: "radar",
                                            data: radarSeries === null || radarSeries === void 0 ? void 0 : radarSeries.data,
                                        },
                                    ],
                                });
                                break;
                            case "funnel":
                                // 漏斗图：直接刷新整个 series 数组，确保多系列同时生效
                                chart.setOption({ series: option.series });
                                break;
                            case "scatter":
                                // 散点图：直接刷新整个 series 数组，确保无 name 时也能匹配
                                chart.setOption({ series: option.series });
                                break;
                            default:
                                chart.setOption({
                                    series: [
                                        {
                                            name: currentSeriesName,
                                            itemStyle: { color: colorHex },
                                        },
                                    ],
                                });
                        }
                        if (finalize) {
                            // 结束一次选择交互，收起面板与菜单
                            hidePicker();
                            hideMenu();
                        }
                    };
                    // 轻量节流：拖动过程中每帧最多一次更新，保证实时且不拖慢
                    var rafPendingColor_1 = null;
                    var rafId_1 = null;
                    var scheduleFrameUpdate_1 = function () {
                        if (rafId_1 != null)
                            return;
                        rafId_1 = requestAnimationFrame(function () {
                            if (rafPendingColor_1) {
                                applySeriesColor_1(rafPendingColor_1, false, false);
                                rafPendingColor_1 = null;
                            }
                            rafId_1 = null;
                        });
                    };
                    // 事件：滑动变化实时更新
                    pickerInstance.on("change", function (color) {
                        try {
                            var hex = color.toHEXA().toString();
                            rafPendingColor_1 = hex;
                            scheduleFrameUpdate_1();
                        }
                        catch (_a) { }
                    });
                    // 事件：点击预设色块应用但不关闭面板与菜单
                    pickerInstance.on("swatchselect", function (color) {
                        try {
                            var hex = color.toHEXA().toString();
                            applySeriesColor_1(hex, false, false);
                        }
                        catch (_a) { }
                    });
                    // 事件：保存按钮，确认当前选择
                    pickerInstance.on("save", function (color) {
                        var _a, _b, _c;
                        try {
                            var hex = (_c = (_a = color === null || color === void 0 ? void 0 : color.toHEXA) === null || _a === void 0 ? void 0 : (_b = _a.call(color)).toString) === null || _c === void 0 ? void 0 : _c.call(_b);
                            if (hex) {
                                applySeriesColor_1(hex, true, true);
                                updateMdCodeFromOption_1();
                                dispatchEditorInput();
                            }
                            else if (openingOriginalColor) {
                                applySeriesColor_1(openingOriginalColor, true, true);
                                updateMdCodeFromOption_1();
                                dispatchEditorInput();
                            }
                            else {
                                hidePicker();
                                hideMenu();
                            }
                        }
                        catch (_d) {
                            hidePicker();
                            hideMenu();
                        }
                    });
                    pickerInstance.on("cancel", function () {
                        try {
                            if (openingOriginalColor && currentSeriesName) {
                                applySeriesColor_1(openingOriginalColor, true, false);
                            }
                            else {
                                hidePicker();
                                hideMenu();
                            }
                        }
                        catch (_a) {
                            hidePicker();
                            hideMenu();
                        }
                    });
                    // 事件：清空（等同取消），恢复原色但不持久、不触发事件
                    pickerInstance.on("clear", function () {
                        if (openingOriginalColor) {
                            applySeriesColor_1(openingOriginalColor, true, false);
                        }
                        hidePicker();
                        hideMenu();
                    });
                }
                catch (err) {
                    pickerContainer.innerHTML = "<div class=\"vditor-reset--error\">Color Picker \u52A0\u8F7D\u5931\u8D25\uFF1A".concat(err, "</div>");
                }
            }
            // 记录当前目标系列名与打开时的原始颜色，并清空待确认色
            currentSeriesName = seriesName;
            try {
                switch (chartType) {
                    case "pie": {
                        var idx = labelIndexMap[seriesName];
                        var colorFn = (_p = pieSeries === null || pieSeries === void 0 ? void 0 : pieSeries.itemStyle) === null || _p === void 0 ? void 0 : _p.color;
                        if (typeof colorFn === "function") {
                            openingOriginalColor = colorFn({
                                dataIndex: idx,
                                data: pieSeries.data[idx],
                            });
                        }
                        else {
                            openingOriginalColor =
                                ((_s = (_r = (_q = pieSeries === null || pieSeries === void 0 ? void 0 : pieSeries.data) === null || _q === void 0 ? void 0 : _q[idx]) === null || _r === void 0 ? void 0 : _r.itemStyle) === null || _s === void 0 ? void 0 : _s.color) ||
                                    null;
                        }
                        break;
                    }
                    case "radar": {
                        var idx = labelIndexMap[seriesName];
                        var d = (_t = radarSeries === null || radarSeries === void 0 ? void 0 : radarSeries.data) === null || _t === void 0 ? void 0 : _t[idx];
                        openingOriginalColor =
                            ((_u = d === null || d === void 0 ? void 0 : d.itemStyle) === null || _u === void 0 ? void 0 : _u.color) ||
                                ((_v = d === null || d === void 0 ? void 0 : d.lineStyle) === null || _v === void 0 ? void 0 : _v.color) ||
                                null;
                        break;
                    }
                    case "funnel": {
                        var idx = labelIndexMap[seriesName];
                        var first = funnelSeriesList[0];
                        var d = (_w = first === null || first === void 0 ? void 0 : first.data) === null || _w === void 0 ? void 0 : _w[idx];
                        if (!d && first) {
                            d = first.data.find(function (it) { return (it === null || it === void 0 ? void 0 : it.name) === seriesName; });
                        }
                        if ((_x = d === null || d === void 0 ? void 0 : d.itemStyle) === null || _x === void 0 ? void 0 : _x.color) {
                            openingOriginalColor = d.itemStyle.color;
                        }
                        else if (Array.isArray(option === null || option === void 0 ? void 0 : option.color) &&
                            typeof idx === "number") {
                            var palette = option.color;
                            openingOriginalColor = palette[idx] || null;
                        }
                        else {
                            openingOriginalColor = null;
                        }
                        break;
                    }
                    case "scatter": {
                        var si = labelIndexMap[seriesName];
                        var s = seriesList[si];
                        openingOriginalColor =
                            (s && s.itemStyle && s.itemStyle.color) || null;
                        break;
                    }
                    default: {
                        var origin_1 = seriesMap[seriesName];
                        openingOriginalColor =
                            (origin_1 &&
                                origin_1.itemStyle &&
                                origin_1.itemStyle.color) ||
                                null;
                        break;
                    }
                }
            }
            catch (_2) {
                openingOriginalColor = null;
            }
            pickerEl.style.left = "".concat(x, "px");
            pickerEl.style.top = "".concat(y, "px");
            pickerEl.style.display = "block";
            // 重新激活时确保内部元素渲染与当前色值
            try {
                if (pickerInstance && pickerInstance.show) {
                    pickerInstance.show();
                    if (openingOriginalColor) {
                        pickerInstance.setColor(openingOriginalColor, true);
                    }
                }
            }
            catch (_3) { }
            ensureOutsideHandler();
            var rect = pickerEl.getBoundingClientRect();
            var adjustLeft = x;
            var adjustTop = y;
            if (rect.right > window.innerWidth) {
                adjustLeft = Math.max(8, window.innerWidth - rect.width - 8);
            }
            if (rect.bottom > window.innerHeight) {
                adjustTop = Math.max(8, window.innerHeight - rect.height - 8);
            }
            pickerEl.style.left = "".concat(adjustLeft, "px");
            pickerEl.style.top = "".concat(adjustTop, "px");
            requestAnimationFrame(function () {
                pickerEl.style.opacity = "1";
                pickerEl.style.transform = "scale(1)";
            });
        });
    };
    /** 隐藏颜色面板（含收起动画） */
    var hidePicker = function () {
        var _a;
        if (pickerEl && pickerEl.style.display !== "none") {
            // 调用 Pickr 的隐藏方法，确保内部状态一致
            try {
                (_a = pickerInstance === null || pickerInstance === void 0 ? void 0 : pickerInstance.hide) === null || _a === void 0 ? void 0 : _a.call(pickerInstance);
            }
            catch (_b) { }
            pickerEl.style.opacity = "0";
            pickerEl.style.transform = "scale(0.96)";
            window.setTimeout(function () {
                if (pickerEl) {
                    pickerEl.style.display = "none";
                    // 若两者都隐藏，移除外部点击处理器
                    if (menuEl &&
                        menuEl.style.display === "none" &&
                        outsideHandler) {
                        document.removeEventListener("mousedown", outsideHandler, true);
                        document.removeEventListener("touchstart", outsideHandler, true);
                        outsideHandler = null;
                    }
                }
            }, 120);
        }
    };
    // 判断是否开启自定义右键：仅支持 pie / radar / funnel / scatter / line / bar
    var supportedTypes = new Set([
        "pie",
        "radar",
        "funnel",
        "scatter",
        "effectScatter",
        "line",
        "bar",
    ]);
    var isCustomMenuSupported = seriesList.length > 0 &&
        seriesList.every(function (s) { return s && supportedTypes.has(s.type); });
    // 绑定右键事件，仅在图表区域生效；不支持时保留原生右键
    el.addEventListener("contextmenu", function (event) {
        if (!isCustomMenuSupported) {
            // 不拦截，使用浏览器原生右键菜单
            return;
        }
        event.preventDefault();
        // 使用视口坐标，配合 position:fixed，避免产生滚动相关问题
        var x = event.clientX;
        var y = event.clientY;
        showMenu(x, y);
    });
};


/***/ }),

/***/ 428:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ codeRender)
/* harmony export */ });
/* harmony import */ var _util_code160to32__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(105);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);


/**
 * 为预览区域中的代码块添加辅助操作：
 * - 复制按钮：一键复制代码文本
 * - 运行按钮：当启用 runCode 时，向外部回调当前代码块的 HTML 字符串
 */
var codeRender = function (element, option, runCode) {
    Array.from(element.querySelectorAll("pre > code"))
        .filter(function (e, index) {
        if (e.parentElement.classList.contains("vditor-wysiwyg__pre") ||
            e.parentElement.classList.contains("vditor-ir__marker--pre")) {
            return false;
        }
        if (e.classList.contains("language-mermaid") ||
            e.classList.contains("language-flowchart") ||
            e.classList.contains("language-echarts") ||
            e.classList.contains("language-mindmap") ||
            e.classList.contains("language-plantuml") ||
            e.classList.contains("language-markmap") ||
            e.classList.contains("language-abc") ||
            e.classList.contains("language-graphviz") ||
            e.classList.contains("language-math") ||
            e.classList.contains("language-smiles")) {
            return false;
        }
        if (e.style.maxHeight.indexOf("px") > -1) {
            return false;
        }
        // 避免预览区在渲染后由于代码块过多产生性能问题 https://github.com/b3log/vditor/issues/67
        if (element.classList.contains("vditor-preview") && index > 5) {
            return false;
        }
        return true;
    })
        .forEach(function (e) {
        var _a, _b, _c, _d;
        var codeText = e.innerText;
        if (e.classList.contains("highlight-chroma")) {
            var codeElement = e.cloneNode(true);
            codeElement
                .querySelectorAll(".highlight-ln")
                .forEach(function (item) {
                item.remove();
            });
            codeText = codeElement.innerText;
        }
        else if (codeText.endsWith("\n")) {
            codeText = codeText.substr(0, codeText.length - 1);
        }
        var iconHTML = '<svg><use xlink:href="#vditor-icon-copy"></use></svg>';
        if (!document.getElementById("vditorIconScript")) {
            iconHTML =
                '<svg viewBox="0 0 32 32"><path d="M22.545-0h-17.455c-1.6 0-2.909 1.309-2.909 2.909v20.364h2.909v-20.364h17.455v-2.909zM26.909 5.818h-16c-1.6 0-2.909 1.309-2.909 2.909v20.364c0 1.6 1.309 2.909 2.909 2.909h16c1.6 0 2.909-1.309 2.909-2.909v-20.364c0-1.6-1.309-2.909-2.909-2.909zM26.909 29.091h-16v-20.364h16v20.364z"></path></svg>';
        }
        var playIconHTML = document.getElementById("vditorIconScript")
            ? '<svg><use xlink:href="#vditor-icon-run"></use></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-play-icon lucide-circle-play"><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"/><circle cx="12" cy="12" r="10"/></svg>';
        var divElement = document.createElement("div");
        divElement.className = "vditor-copy";
        var textarea = document.createElement("textarea");
        textarea.value = (0,_util_code160to32__WEBPACK_IMPORTED_MODULE_1__/* .code160to32 */ .X)(codeText);
        divElement.appendChild(textarea);
        var langMatch = e.className.match(/language-([^\s]+)/);
        var lang = langMatch ? langMatch[1] : "";
        var allowRun = !!(runCode === null || runCode === void 0 ? void 0 : runCode.enable) &&
            (!runCode.items || (lang && runCode.items.includes(lang)));
        if (allowRun) {
            var runSpan = document.createElement("span");
            runSpan.setAttribute("aria-label", ((_a = window.VditorI18n) === null || _a === void 0 ? void 0 : _a.run) || runCode.run || "运行");
            runSpan.setAttribute("onmouseover", "this.setAttribute('aria-label', '".concat(((_b = window.VditorI18n) === null || _b === void 0 ? void 0 : _b.run) || runCode.run || "运行", "')"));
            runSpan.className =
                "vditor-copy__item vditor-tooltipped vditor-tooltipped__w";
            runSpan.innerHTML = runCode.runCodeLabelHTML || playIconHTML;
            runSpan.addEventListener("click", function (evt) {
                var _a;
                evt.stopPropagation();
                (_a = runCode === null || runCode === void 0 ? void 0 : runCode.callback) === null || _a === void 0 ? void 0 : _a.call(runCode, {
                    code: (0,_util_code160to32__WEBPACK_IMPORTED_MODULE_1__/* .code160to32 */ .X)(codeText),
                    lang: lang,
                });
            });
            divElement.appendChild(runSpan);
        }
        var copySpan = document.createElement("span");
        copySpan.setAttribute("aria-label", ((_c = window.VditorI18n) === null || _c === void 0 ? void 0 : _c.copy) || "复制");
        copySpan.setAttribute("onmouseover", "this.setAttribute('aria-label', '".concat(((_d = window.VditorI18n) === null || _d === void 0 ? void 0 : _d.copy) || "复制", "')"));
        copySpan.className =
            "vditor-copy__item vditor-tooltipped vditor-tooltipped__w";
        copySpan.addEventListener("click", function (evt) {
            var _a;
            evt.stopPropagation();
            var ta = divElement.querySelector("textarea");
            if (ta) {
                ta.select();
                document.execCommand("copy");
                copySpan.setAttribute("aria-label", ((_a = window.VditorI18n) === null || _a === void 0 ? void 0 : _a.copied) || "已复制");
                ta.blur();
            }
        });
        copySpan.innerHTML = iconHTML;
        divElement.appendChild(copySpan);
        if (option && option.renderMenu) {
            option.renderMenu(e, divElement);
        }
        e.before(divElement);
        e.style.maxHeight = 300 + "px";
        // https://github.com/Vanessa219/vditor/issues/1356
        e.insertAdjacentHTML("afterend", "<span style=\"position: absolute\">".concat(_constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.ZWSP */ .g.ZWSP, "</span>"));
    });
};


/***/ }),

/***/ 325:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ flowchartRender)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(413);
/* harmony import */ var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);



var flowchartRender = function (element, cdn) {
    if (cdn === void 0) { cdn = _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN; }
    var flowchartElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.flowchartRenderAdapter.getElements(element);
    if (flowchartElements.length === 0) {
        return;
    }
    (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdn, "/dist/js/flowchart.js/flowchart.min.js"), "vditorFlowchartScript").then(function () {
        flowchartElements.forEach(function (item) {
            if (item.getAttribute("data-processed") === "true") {
                return;
            }
            var flowchartObj = flowchart.parse(_adapterRender__WEBPACK_IMPORTED_MODULE_1__.flowchartRenderAdapter.getCode(item));
            item.innerHTML = "";
            flowchartObj.drawSVG(item);
            item.setAttribute("data-processed", "true");
        });
    });
};


/***/ }),

/***/ 210:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ getMarkdown)
/* harmony export */ });
/* harmony import */ var _util_code160to32__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(105);

var getMarkdown = function (vditor) {
    if (vditor.currentMode === "sv") {
        return (0,_util_code160to32__WEBPACK_IMPORTED_MODULE_0__/* .code160to32 */ .X)("".concat(vditor.sv.element.textContent, "\n").replace(/\n\n$/, "\n"));
    }
    else if (vditor.currentMode === "wysiwyg") {
        return vditor.lute.VditorDOM2Md(vditor.wysiwyg.element.innerHTML);
    }
    else if (vditor.currentMode === "ir") {
        return vditor.lute.VditorIRDOM2Md(vditor.ir.element.innerHTML);
    }
    return "";
};


/***/ }),

/***/ 483:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v": () => (/* binding */ graphvizRender)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(413);
/* harmony import */ var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);



var graphvizRender = function (element, cdn) {
    if (cdn === void 0) { cdn = _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN; }
    var graphvizElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.graphvizRenderAdapter.getElements(element);
    if (graphvizElements.length === 0) {
        return;
    }
    (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdn, "/dist/js/graphviz/viz.js"), "vditorGraphVizScript").then(function () {
        graphvizElements.forEach(function (e) {
            var code = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.graphvizRenderAdapter.getCode(e);
            if (e.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                e.parentElement.classList.contains("vditor-ir__marker--pre")) {
                return;
            }
            if (e.getAttribute("data-processed") === "true" || code.trim() === "") {
                return;
            }
            try {
                var blob = new Blob(["importScripts('".concat(document.getElementById("vditorGraphVizScript").src.replace("viz.js", "full.render.js"), "');")], { type: "application/javascript" });
                var url = window.URL || window.webkitURL;
                var blobUrl = url.createObjectURL(blob);
                var worker = new Worker(blobUrl);
                new Viz({ worker: worker })
                    .renderSVGElement(code).then(function (result) {
                    e.innerHTML = result.outerHTML;
                }).catch(function (error) {
                    e.innerHTML = "graphviz render error: <br>".concat(error);
                    e.className = "vditor-reset--error";
                });
            }
            catch (e) {
                console.error("graphviz error", e);
            }
            e.setAttribute("data-processed", "true");
        });
    });
};


/***/ }),

/***/ 999:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ highlightRender)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(413);
/* harmony import */ var _util_addStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(290);



var highlightRender = function (hljsOption, element, cdn) {
    if (element === void 0) { element = document; }
    if (cdn === void 0) { cdn = _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN; }
    var style = hljsOption.style;
    if (!_constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CODE_THEME.includes */ .g.CODE_THEME.includes(style)) {
        style = "github";
    }
    var vditorHljsStyle = document.getElementById("vditorHljsStyle");
    var href = "".concat(cdn, "/dist/js/highlight.js/styles/").concat(style, ".min.css");
    if (vditorHljsStyle && vditorHljsStyle.getAttribute('href') !== href) {
        vditorHljsStyle.remove();
    }
    (0,_util_addStyle__WEBPACK_IMPORTED_MODULE_1__/* .addStyle */ .c)("".concat(cdn, "/dist/js/highlight.js/styles/").concat(style, ".min.css"), "vditorHljsStyle");
    if (hljsOption.enable === false) {
        return;
    }
    var codes = element.querySelectorAll("pre > code");
    if (codes.length === 0) {
        return;
    }
    (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdn, "/dist/js/highlight.js/highlight.min.js?v=11.7.0"), "vditorHljsScript").then(function () {
        (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdn, "/dist/js/highlight.js/third-languages.js?v=1.0.1"), "vditorHljsThirdScript").then(function () {
            element.querySelectorAll("pre > code").forEach(function (block) {
                // ir & wysiwyg 区域不渲染
                if (block.parentElement.classList.contains("vditor-ir__marker--pre") ||
                    block.parentElement.classList.contains("vditor-wysiwyg__pre")) {
                    return;
                }
                if (block.classList.contains("language-mermaid") || block.classList.contains("language-flowchart") ||
                    block.classList.contains("language-echarts") || block.classList.contains("language-mindmap") ||
                    block.classList.contains("language-plantuml") || block.classList.contains("language-smiles") ||
                    block.classList.contains("language-abc") || block.classList.contains("language-graphviz") ||
                    block.classList.contains("language-math")) {
                    return;
                }
                if (hljsOption.defaultLang !== "" && block.className.indexOf("language-") === -1) {
                    block.classList.add("language-" + hljsOption.defaultLang);
                }
                var language = block.className.replace("language-", "");
                if (!window.hljs.getLanguage(language)) {
                    language = "plaintext";
                }
                block.innerHTML = window.hljs.highlight(block.textContent, {
                    language: language,
                    ignoreIllegals: true
                }).value;
                block.classList.add("hljs");
                if (!hljsOption.lineNumber) {
                    return;
                }
                block.classList.add("vditor-linenumber");
                var linenNumberTemp = block.querySelector(".vditor-linenumber__temp");
                if (!linenNumberTemp) {
                    linenNumberTemp = document.createElement("div");
                    linenNumberTemp.className = "vditor-linenumber__temp";
                    block.insertAdjacentElement("beforeend", linenNumberTemp);
                }
                var whiteSpace = getComputedStyle(block).whiteSpace;
                var isSoftWrap = false;
                if (whiteSpace === "pre-wrap" || whiteSpace === "pre-line") {
                    isSoftWrap = true;
                }
                var lineNumberHTML = "";
                var lineList = block.textContent.split(/\r\n|\r|\n/g);
                lineList.pop();
                lineList.map(function (line) {
                    var lineHeight = "";
                    if (isSoftWrap) {
                        linenNumberTemp.textContent = line || "\n";
                        lineHeight = " style=\"height:".concat(linenNumberTemp.getBoundingClientRect().height, "px\"");
                    }
                    lineNumberHTML += "<span".concat(lineHeight, "></span>");
                });
                linenNumberTemp.style.display = "none";
                lineNumberHTML = "<span class=\"vditor-linenumber__rows\">".concat(lineNumberHTML, "</span>");
                block.insertAdjacentHTML("beforeend", lineNumberHTML);
            });
        });
    });
};


/***/ }),

/***/ 11:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ markmapRender)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(413);
/* harmony import */ var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);



var enabled = {};
var transform = function (transformer, content) {
    var result = transformer.transform(content);
    var keys = Object.keys(result.features).filter(function (key) { return !enabled[key]; });
    keys.forEach(function (key) {
        enabled[key] = true;
    });
    var _a = transformer.getAssets(keys), styles = _a.styles, scripts = _a.scripts;
    var markmap = window.markmap;
    if (styles)
        markmap.loadCSS(styles);
    if (scripts)
        markmap.loadJS(scripts);
    return result;
};
var init = function (el, code) {
    var _a = window.markmap, Transformer = _a.Transformer, Markmap = _a.Markmap, deriveOptions = _a.deriveOptions, globalCSS = _a.globalCSS;
    var transformer = new Transformer();
    el.innerHTML = '<svg style="width:100%"></svg>';
    var svg = el.firstChild;
    var mm = Markmap.create(svg, null);
    var _b = transform(transformer, code), root = _b.root, frontmatter = _b.frontmatter;
    var markmapOptions = frontmatter === null || frontmatter === void 0 ? void 0 : frontmatter.markmap;
    var frontmatterOptions = deriveOptions(markmapOptions);
    mm.setData(root, frontmatterOptions);
    mm.fit();
};
var markmapRender = function (element, cdn) {
    if (element === void 0) { element = document; }
    if (cdn === void 0) { cdn = _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN; }
    var markmapElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.markmapRenderAdapter.getElements(element);
    if (markmapElements.length === 0) {
        return;
    }
    (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdn, "/dist/js/markmap/markmap.min.js"), "vditorMarkerScript").then(function () {
        markmapElements.forEach(function (item) {
            var code = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.markmapRenderAdapter.getCode(item);
            if (item.getAttribute("data-processed") === "true" || code.trim() === "") {
                return;
            }
            var render = document.createElement("div");
            render.className = "language-markmap";
            item.parentNode.appendChild(render);
            init(render, code);
            if (item.parentNode.childNodes[0].nodeName == "CODE") {
                item.parentNode.removeChild(item.parentNode.childNodes[0]);
            }
        });
    });
};


/***/ }),

/***/ 284:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xX": () => (/* binding */ bindMathContextMenu)
/* harmony export */ });
/* unused harmony exports bindMathCopyInterceptor, bindMathInteractionsInContainer */
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(413);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/**
 * 初始化并管理数学公式自定义右键菜单。
 * 提供：导出 MathML、复制 TeX、复制 SVG 代码 三项操作。
 */
var MathContextMenu = /** @class */ (function () {
    function MathContextMenu() {
        this.menuEl = null;
        this.hideTimer = null;
    }
    /**
     * 创建菜单 DOM 并插入到 body，同时注入样式。
     */
    MathContextMenu.prototype.init = function () {
        var _this = this;
        if (this.menuEl)
            return;
        this.menuEl = document.createElement("div");
        this.menuEl.className = "vditor-math-menu";
        this.menuEl.style.display = "none";
        this.menuEl.innerHTML = "\n          <div class=\"vditor-math-menu__item\" data-action=\"mml\">\u590D\u5236 MathML</div>\n          <div class=\"vditor-math-menu__item\" data-action=\"tex\">\u590D\u5236 Tex Commands</div>\n          <div class=\"vditor-math-menu__item\" data-action=\"svg\">\u590D\u5236 SVG \u4EE3\u7801</div>\n        ";
        // 阻止菜单内的鼠标事件冒泡到 document，以避免立即关闭
        this.menuEl.addEventListener("mousedown", function (ev) {
            ev.stopPropagation();
        });
        this.menuEl.addEventListener("touchstart", function (ev) {
            ev.stopPropagation();
        }, { passive: true });
        this.menuEl.addEventListener("click", function (e) {
            var target = e.target;
            var action = target.getAttribute("data-action");
            var mathEl = _this.menuEl.dataset.targetId
                ? document.querySelector("[data-math-id=\"".concat(_this.menuEl.dataset.targetId, "\"]"))
                : null;
            if (!action || !mathEl)
                return;
            _this.onAction(action, mathEl);
            // 点击后隐藏主菜单
            _this.hide();
        });
        document.body.appendChild(this.menuEl);
        // 删除子菜单逻辑：不再提供“复制文本”预览面板
        // 外部点击/触摸关闭：仅在点击目标不在菜单内时隐藏
        document.addEventListener("mousedown", function (ev) {
            var _a;
            var target = ev.target;
            var menuOpen = _this.menuEl && _this.menuEl.style.display !== "none";
            var submenuOpen = false;
            if (!menuOpen)
                return;
            if (target && ((_a = _this.menuEl) === null || _a === void 0 ? void 0 : _a.contains(target)))
                return;
            _this.hide();
        }, true);
        document.addEventListener("touchstart", function (ev) {
            var _a;
            var target = ev.target || null;
            var menuOpen = _this.menuEl && _this.menuEl.style.display !== "none";
            var submenuOpen = false;
            if (!menuOpen)
                return;
            if (target && ((_a = _this.menuEl) === null || _a === void 0 ? void 0 : _a.contains(target)))
                return;
            _this.hide();
        }, { capture: true, passive: true });
        document.addEventListener("scroll", function () { return _this.hide(); }, {
            capture: true,
        });
        window.addEventListener("resize", function () { return _this.hide(); });
    };
    /**
     * 显示菜单到指定位置，并绑定当前目标元素。
     */
    MathContextMenu.prototype.show = function (x, y, targetEl) {
        if (!this.menuEl)
            return;
        this.menuEl.style.display = "block";
        // 边缘自适应定位，避免超出视口
        var margin = 8;
        // 先设置到点击位置以获得宽高
        this.menuEl.style.left = "".concat(x, "px");
        this.menuEl.style.top = "".concat(y, "px");
        var mw = this.menuEl.offsetWidth;
        var mh = this.menuEl.offsetHeight;
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var px = x;
        var py = y;
        if (px + mw + margin > vw) {
            px = Math.max(margin, vw - mw - margin);
        }
        if (py + mh + margin > vh) {
            py = Math.max(margin, vh - mh - margin);
        }
        this.menuEl.style.left = "".concat(px, "px");
        this.menuEl.style.top = "".concat(py, "px");
        // 记录目标 id 以便点击时处理
        var id = targetEl.getAttribute("data-math-id");
        if (!id) {
            id = "mjx-".concat(Date.now(), "-").concat(Math.floor(Math.random() * 10000));
            targetEl.setAttribute("data-math-id", id);
        }
        this.menuEl.dataset.targetId = id;
        if (this.hideTimer) {
            window.clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }
    };
    /**
     * 隐藏菜单。
     */
    MathContextMenu.prototype.hide = function () {
        if (!this.menuEl)
            return;
        this.menuEl.style.display = "none";
        this.menuEl.dataset.targetId = "";
        // 无子菜单，无需额外清理
    };
    /**
     * 处理菜单点击动作：导出 MathML / 复制 TeX / 复制文本。
     */
    /**
     * 菜单动作处理：MathML / TeX / SVG
     * - MathML：优先使用 KaTeX 生成 MathML；若不可用则使用 MathJax；失败时回退为 TeX
     * - TeX：直接复制 data-math
     * - SVG：若 MathJax SVG 转换可用（tex2svg），生成并复制 <svg> 源码；否则提示不可用
     */
    /**
     * 菜单动作处理（异步）
     * - MathML：KaTeX 优先，其次 MathJax，失败回退 TeX
     * - TeX：直接复制原始 data-math
     * - SVG：若未加载 MathJax SVG 能力，按需动态加载，再生成并复制
     */
    MathContextMenu.prototype.onAction = function (action, mathEl) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tex, mml, display, pureMml, MJ, display, container, svg, svgHtml, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tex = mathEl.getAttribute("data-math") || "";
                        if (!(action === "mml")) return [3 /*break*/, 1];
                        // 通过 KaTeX 或 MathJax 将 TeX 转为 MathML，并复制到剪贴板
                        try {
                            mml = "";
                            display = mathEl.tagName === "DIV";
                            if (typeof katex !== "undefined") {
                                mml = katex.renderToString(tex, {
                                    displayMode: display,
                                    output: "mathml",
                                });
                            }
                            else if ((_a = window.VditorMathJax) === null || _a === void 0 ? void 0 : _a.tex2mml) {
                                mml = window.VditorMathJax.tex2mml(tex, {
                                    display: display,
                                });
                            }
                            pureMml = this.normalizeMathML(mml || tex);
                            this.copyText(pureMml);
                            this.toast("MathML 已复制到剪贴板");
                        }
                        catch (e) {
                            this.copyText(tex);
                            this.toast("MathML 转换失败，已复制 TeX");
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(action === "tex")) return [3 /*break*/, 2];
                        this.copyText(tex);
                        this.toast("TeX 已复制到剪贴板");
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(action === "svg")) return [3 /*break*/, 6];
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.ensureMathJaxSvg()];
                    case 4:
                        MJ = _c.sent();
                        if (MJ === null || MJ === void 0 ? void 0 : MJ.tex2svg) {
                            display = mathEl.tagName === "DIV";
                            container = MJ.tex2svg(tex, { display: display });
                            svg = container.querySelector("svg");
                            if (svg) {
                                if (!svg.getAttribute("xmlns")) {
                                    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                                }
                                svgHtml = svg.outerHTML;
                                this.copySvg(svgHtml);
                                return [2 /*return*/];
                            }
                        }
                        this.toast("当前引擎不支持 SVG 导出");
                        return [3 /*break*/, 6];
                    case 5:
                        _b = _c.sent();
                        this.toast("SVG 导出失败");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 确保 MathJax SVG 转换能力可用
     * - 已存在 `MathJax.tex2svg`：直接返回 MathJax
     * - 不存在：按需加载 `/js/mathjax/tex-svg-full.js`，加载完成后返回 MathJax
     */
    MathContextMenu.prototype.ensureMathJaxSvg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var MJ;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MJ = window.VditorMathJax;
                        if (MJ === null || MJ === void 0 ? void 0 : MJ.tex2svg) {
                            return [2 /*return*/, MJ];
                        }
                        return [4 /*yield*/, (0,_util_addScript__WEBPACK_IMPORTED_MODULE_0__/* .addScript */ .G)("/js/mathjax/tex-svg-full.js", "protyleMathJaxSvgScript")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, window.VditorMathJax];
                }
            });
        });
    };
    /**
     * 规范化 MathML 字符串
     * - 若包含 KaTeX 包裹的 <span class="katex*">，仅提取其中的 <math> ... </math>
     * - 若直接为 <math> 片段，原样返回
     */
    MathContextMenu.prototype.normalizeMathML = function (mml) {
        try {
            var doc = new DOMParser().parseFromString(mml, "text/html");
            var math = doc.querySelector("math");
            if (math) {
                return math.outerHTML;
            }
        }
        catch (_a) { }
        // 正则降级：去除外层 span 包裹，保留中间的 <math>
        var re = /^<span[^>]*>\s*(<math[\s\S]*?<\/math>)\s*<\/span>$/i;
        var match = mml.match(re);
        if (match && match[1]) {
            return match[1];
        }
        return mml;
    };
    /**
     * 复制 SVG 图片到剪贴板：
     * 1) 首选使用 ClipboardItem 写入 image/svg+xml（支持的浏览器将以图片形式粘贴）。
     * 2) 若不支持或失败，则降级为复制 SVG 源码文本。
     */
    MathContextMenu.prototype.copySvg = function (svgHtml) {
        // 直接复制 SVG 源码到剪贴板
        this.copyText(svgHtml);
        this.toast("SVG 源码已复制到剪贴板");
    };
    /**
     * 展示“复制文本”的二级菜单：
     * - 复制可视文本
     * - 复制公式 HTML 渲染
     * 并在面板中显示可复制的 HTML 代码。
     */
    // 删除文本预览子菜单函数
    // 删除 CHTML 加载与文本提取相关方法
    /**
     * 将 HTML 字符串进行转义，用于安全展示在代码块中。
     */
    MathContextMenu.prototype.escapeHTML = function (html) {
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    };
    /**
     * 文本复制到剪贴板，支持降级。
     */
    MathContextMenu.prototype.copyText = function (text) {
        var _this = this;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(text)
                .catch(function () { return _this.fallbackCopy(text); });
        }
        else {
            this.fallbackCopy(text);
        }
    };
    /**
     * 复制降级实现。
     */
    MathContextMenu.prototype.fallbackCopy = function (text) {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand("copy");
        }
        catch (_a) { }
        document.body.removeChild(ta);
    };
    /**
     * 简易提示气泡。
     */
    MathContextMenu.prototype.toast = function (message) {
        var el = document.createElement("div");
        el.textContent = message;
        el.style.position = "fixed";
        el.style.bottom = "16px";
        el.style.right = "16px";
        el.style.background = "#fff";
        el.style.color = "#333";
        el.style.border = "1px solid #e5e7eb";
        el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
        el.style.padding = "6px 10px";
        el.style.borderRadius = "4px";
        el.style.fontSize = "12px";
        el.style.zIndex = "10000";
        document.body.appendChild(el);
        setTimeout(function () {
            if (el.parentNode)
                el.parentNode.removeChild(el);
        }, 1600);
    };
    return MathContextMenu;
}());
var menu = new MathContextMenu();
/**
 * 绑定指定数学元素的右键事件，展示自定义菜单。
 */
var bindMathContextMenu = function (mathEl) {
    /**
     * 绑定数学元素右键菜单
     * - 在编辑模式下启用
     * - 在预览模式或分屏预览（SV）模式下禁用自定义右键
     * - 避免重复绑定：通过 data-context-menu 标记
     */
    var inPreview = !!(mathEl.closest(".vditor-preview") || mathEl.closest(".vditor-sv"));
    if (inPreview) {
        return;
    }
    if (mathEl.getAttribute("data-context-menu") === "true") {
        return;
    }
    menu.init();
    mathEl.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === "function") {
            e.stopImmediatePropagation();
        }
        var x = e.clientX;
        var y = e.clientY;
        menu.show(x, y, mathEl);
    }, { capture: true });
    mathEl.setAttribute("data-context-menu", "true");
};
/**
 * 为数学元素绑定复制拦截：选区完全在数学容器内时，仅复制可见文本
 * 保持与 WYSIWYG 模式一致的行为
 * @param mathEl 数学公式容器（.language-math）
 */
var bindMathCopyInterceptor = function (mathEl) {
    if (mathEl.getAttribute("data-copy-bound") === "true") {
        return;
    }
    mathEl.addEventListener("copy", function (event) {
        var sel = getSelection();
        if (!sel || sel.rangeCount === 0) {
            return;
        }
        var range = sel.getRangeAt(0);
        var container = mathEl.closest(".language-math");
        if (container &&
            container.contains(range.startContainer) &&
            container.contains(range.endContainer)) {
            event.stopPropagation();
            event.preventDefault();
            var text = range.toString();
            event.clipboardData.setData("text/plain", text);
            event.clipboardData.setData("text/html", "");
        }
    });
    mathEl.setAttribute("data-copy-bound", "true");
};
/**
 * 在指定容器内批量为 IR/WYSIWYG 的数学元素绑定交互（右键菜单 + 复制拦截）
 * - 预览/分屏预览容器内的元素会被跳过
 * - 自动避免重复绑定
 * @param container 扫描范围容器（例如 vditor.ir.element 或 vditor.wysiwyg.element）
 */
var bindMathInteractionsInContainer = function (container) {
    var nodes = container.querySelectorAll(".language-math");
    nodes.forEach(function (el) {
        var mathEl = el;
        var inPreview = !!(mathEl.closest(".vditor-preview") || mathEl.closest(".vditor-sv"));
        if (inPreview)
            return;
        bindMathContextMenu(mathEl);
        bindMathCopyInterceptor(mathEl);
    });
};


/***/ }),

/***/ 472:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ mathRender)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(413);
/* harmony import */ var _util_addStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(290);
/* harmony import */ var _util_code160to32__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(105);
/* harmony import */ var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
/* harmony import */ var _mathContextMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(284);






/**
 * 规范化 TeX 字符串，避免因控制序列与后续字母粘连导致解析失败。
 * 例如 "\\vdotsa" 会被视作未知命令，将其修正为 "\\vdots{}a"。
 */
var normalizeTex = function (tex) {
    // 覆盖常见 dots 命令及 amsmath 变体，避免与后续字母/数字/下划线粘连
    var DOT_MACROS = [
        "vdots",
        "ddots",
        "ldots",
        "cdots",
        "dots",
        "dotsc",
        "dotsb",
        "dotsm",
        "dotsi",
        "dotso",
    ];
    var pattern = new RegExp("\\\\(?:".concat(DOT_MACROS.join("|"), ")(?=[A-Za-z0-9_])"), "g");
    return tex.replace(pattern, function (m) { return "".concat(m, "{}"); });
};
/**
 * 数学公式渲染入口
 *
 * 默认使用 KaTeX 渲染，并在需要时按需加载相关脚本与样式。
 * 支持通过 options.math.engine 切换为 MathJax。
 *
 * 参数说明：
 * - element: 需要进行数学渲染的根容器（默认 document）
 * - options: 包含 cdn 路径与 math 相关设置（engine、inlineDigit、macros 等）
 */
var mathRender = function (element, options) {
    if (element === void 0) { element = document; }
    var mathElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.mathRenderAdapter.getElements(element);
    if (mathElements.length === 0) {
        return;
    }
    var defaultOptions = {
        cdn: _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN,
        math: {
            engine: "KaTeX",
            inlineDigit: true,
            macros: {},
        },
    };
    if (options && options.math) {
        options.math = Object.assign({}, defaultOptions.math, options.math);
    }
    options = Object.assign({}, defaultOptions, options);
    if (options.math.engine === "KaTeX") {
        (0,_util_addStyle__WEBPACK_IMPORTED_MODULE_3__/* .addStyle */ .c)("".concat(options.cdn, "/dist/js/katex/katex.min.css?v=0.16.9"), "vditorKatexStyle");
        (0,_util_addScript__WEBPACK_IMPORTED_MODULE_4__/* .addScript */ .G)("".concat(options.cdn, "/dist/js/katex/katex.min.js?v=0.16.9"), "vditorKatexScript").then(function () {
            (0,_util_addScript__WEBPACK_IMPORTED_MODULE_4__/* .addScript */ .G)("".concat(options.cdn, "/dist/js/katex/mhchem.min.js?v=0.16.9"), "vditorKatexChemScript").then(function () {
                mathElements.forEach(function (mathElement) {
                    if (mathElement.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                        mathElement.parentElement.classList.contains("vditor-ir__marker--pre")) {
                        return;
                    }
                    if (mathElement.getAttribute("data-math")) {
                        return;
                    }
                    var math = normalizeTex((0,_util_code160to32__WEBPACK_IMPORTED_MODULE_5__/* .code160to32 */ .X)(_adapterRender__WEBPACK_IMPORTED_MODULE_1__.mathRenderAdapter.getCode(mathElement)));
                    mathElement.setAttribute("data-math", math);
                    try {
                        // KaTeX 不完全支持 \unicode，提供降级宏以避免报错
                        var katexMacros = Object.assign({ oiint: "\\iint" }, options.math.macros || {});
                        var inPreviewPre = mathElement.parentElement &&
                            mathElement.parentElement.tagName === "PRE";
                        mathElement.innerHTML = katex.renderToString(math, {
                            displayMode: inPreviewPre || mathElement.tagName === "DIV",
                            output: "html",
                            macros: katexMacros,
                        });
                        if (inPreviewPre) {
                            var pre = mathElement.parentElement;
                            pre.classList.add("vditor-wysiwyg__preview--math");
                        }
                    }
                    catch (e) {
                        // 渲染失败时按普通文本展示原始内容
                        var raw = (0,_util_code160to32__WEBPACK_IMPORTED_MODULE_5__/* .code160to32 */ .X)(_adapterRender__WEBPACK_IMPORTED_MODULE_1__.mathRenderAdapter.getCode(mathElement));
                        mathElement.textContent = raw;
                        // 保留原有类名，移除错误态
                        mathElement.className = "language-math";
                    }
                    mathElement.addEventListener("copy", function (event) {
                        event.stopPropagation();
                        event.preventDefault();
                        var vditorMathElement = event.currentTarget.closest(".language-math");
                        event.clipboardData.setData("text/html", vditorMathElement.innerHTML);
                        event.clipboardData.setData("text/plain", vditorMathElement.getAttribute("data-math"));
                    });
                    // 绑定自定义右键菜单（编辑区生效，预览区自动跳过）
                    (0,_mathContextMenu__WEBPACK_IMPORTED_MODULE_2__/* .bindMathContextMenu */ .xX)(mathElement);
                });
            });
        });
    }
    else if (options.math.engine === "MathJax") {
        var chainAsync_1 = function (fns) {
            if (fns.length === 0) {
                return;
            }
            var curr = 0;
            var last = fns[fns.length - 1];
            var next = function () {
                var fn = fns[curr++];
                fn === last ? fn() : fn(next);
            };
            next();
        };
        if (!window.VditorMathJax) {
            window.VditorMathJax = {
                loader: {
                    paths: { mathjax: "".concat(options.cdn, "/dist/js/mathjax") },
                },
                startup: {
                    typeset: false,
                    elements: element instanceof HTMLElement ? [element] : [],
                },
                tex: {
                    macros: options.math.macros,
                },
            };
            // https://github.com/Vanessa219/vditor/issues/1453 额外配置（packages、inlineMath、displayMath 等）由调用方通过 mathJaxOptions 传入
            Object.assign(window.VditorMathJax, options.math.mathJaxOptions);
        }
        (0,_util_addScript__WEBPACK_IMPORTED_MODULE_4__/* .addScriptSync */ .J)("".concat(options.cdn, "/dist/js/mathjax/tex-svg-full.js"), "protyleMathJaxScript");
        var renderMath_1 = function (mathElement, next) {
            var rawText = (0,_util_code160to32__WEBPACK_IMPORTED_MODULE_5__/* .code160to32 */ .X)(mathElement.textContent).trim();
            var math = normalizeTex(rawText);
            var inPreviewPre = mathElement.parentElement &&
                mathElement.parentElement.tagName === "PRE";
            var mathOptions = window.VditorMathJax.getMetricsFor(mathElement);
            mathOptions.display = inPreviewPre || mathElement.tagName === "DIV";
            window.VditorMathJax.tex2svgPromise(math, mathOptions).then(function (node) {
                mathElement.innerHTML = "";
                mathElement.setAttribute("data-math", math);
                mathElement.append(node);
                if (inPreviewPre) {
                    var pre = mathElement.parentElement;
                    pre.classList.add("vditor-wysiwyg__preview--math");
                }
                (0,_mathContextMenu__WEBPACK_IMPORTED_MODULE_2__/* .bindMathContextMenu */ .xX)(mathElement);
                var startup = window.VditorMathJax.startup;
                var prevElements = startup.elements;
                if (element instanceof HTMLElement) {
                    startup.elements = [element];
                }
                startup.document.clear();
                startup.document.updateDocument();
                startup.elements =
                    prevElements !== undefined ? prevElements : [];
                var errorTextElement = node.querySelector('[data-mml-node="merror"]');
                if (errorTextElement &&
                    errorTextElement.textContent.trim() !== "") {
                    mathElement.innerHTML =
                        errorTextElement.textContent.trim();
                    mathElement.className =
                        "language-math vditor-reset--error";
                }
                if (next) {
                    next();
                }
            });
        };
        window.VditorMathJax.startup.promise.then(function () {
            if (window.VditorMathJax.startup) {
                window.VditorMathJax.startup.typeset = true;
                window.VditorMathJax.startup.elements =
                    element instanceof HTMLElement ? [element] : [];
            }
            var chains = [];
            var _loop_1 = function (i) {
                var mathElement = mathElements[i];
                if (!mathElement.parentElement.classList.contains("vditor-wysiwyg__pre") &&
                    !mathElement.parentElement.classList.contains("vditor-ir__marker--pre") &&
                    !mathElement.getAttribute("data-math") &&
                    (0,_util_code160to32__WEBPACK_IMPORTED_MODULE_5__/* .code160to32 */ .X)(mathElement.textContent).trim()) {
                    chains.push(function (next) {
                        if (i === mathElements.length - 1) {
                            renderMath_1(mathElement);
                        }
                        else {
                            renderMath_1(mathElement, next);
                        }
                    });
                }
            };
            for (var i = 0; i < mathElements.length; i++) {
                _loop_1(i);
            }
            chainAsync_1(chains);
        });
    }
};


/***/ }),

/***/ 280:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ mediaRender)
/* harmony export */ });
/* harmony import */ var _util_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(494);

var videoRender = function (element, url) {
    element.insertAdjacentHTML("afterend", "<video controls=\"controls\" src=\"".concat(url, "\"></video>"));
    element.remove();
};
var audioRender = function (element, url) {
    element.insertAdjacentHTML("afterend", "<audio controls=\"controls\" src=\"".concat(url, "\"></audio>"));
    element.remove();
};
var iframeRender = function (element, url) {
    var youtubeMatch = url.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?/);
    var youkuMatch = url.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/);
    var qqMatch = url.match(/\/\/v\.qq\.com\/x\/cover\/.*\/([^\/]+)\.html\??.*/);
    var coubMatch = url.match(/(?:www\.|\/\/)coub\.com\/view\/(\w+)/);
    var facebookMatch = url.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/);
    var dailymotionMatch = url.match(/.+dailymotion.com\/(video|hub)\/(\w+)\?/);
    var bilibiliMatch = url.match(/(?:www\.|\/\/)bilibili\.com\/video\/(\w+)/);
    var tedMatch = url.match(/(?:www\.|\/\/)ted\.com\/talks\/(\w+)/);
    if (youtubeMatch && youtubeMatch[1].length === 11) {
        element.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\" src=\"//www.youtube.com/embed/".concat(youtubeMatch[1] +
            (youtubeMatch[2] ? "?start=" + youtubeMatch[2] : ""), "\"></iframe>"));
        element.remove();
    }
    else if (youkuMatch && youkuMatch[1]) {
        element.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\" src=\"//player.youku.com/embed/".concat(youkuMatch[1], "\"></iframe>"));
        element.remove();
    }
    else if (qqMatch && qqMatch[1]) {
        element.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\" src=\"https://v.qq.com/txp/iframe/player.html?vid=".concat(qqMatch[1], "\"></iframe>"));
        element.remove();
    }
    else if (coubMatch && coubMatch[1]) {
        element.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\"\n src=\"//coub.com/embed/".concat(coubMatch[1], "?muted=false&autostart=false&originalSize=true&startWithHD=true\"></iframe>"));
        element.remove();
    }
    else if (facebookMatch && facebookMatch[0]) {
        element.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\"\n src=\"https://www.facebook.com/plugins/video.php?href=".concat(encodeURIComponent(facebookMatch[0]), "\"></iframe>"));
        element.remove();
    }
    else if (dailymotionMatch && dailymotionMatch[2]) {
        element.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\"\n src=\"https://www.dailymotion.com/embed/video/".concat(dailymotionMatch[2], "\"></iframe>"));
        element.remove();
    }
    else if (url.indexOf("bilibili.com") > -1 && (url.indexOf("bvid=") > -1 || (bilibiliMatch && bilibiliMatch[1]))) {
        var params_1 = {
            bvid: (0,_util_function__WEBPACK_IMPORTED_MODULE_0__/* .getSearch */ .on)("bvid", url) || (bilibiliMatch && bilibiliMatch[1]),
            page: "1",
            high_quality: "1",
            as_wide: "1",
            allowfullscreen: "true",
            autoplay: "0"
        };
        new URL(url.startsWith("http") ? url : "https:" + url).search.split("&").forEach(function (item, index) {
            if (!item) {
                return;
            }
            if (index === 0) {
                item = item.substr(1);
            }
            var keyValue = item.split("=");
            params_1[keyValue[0]] = keyValue[1];
        });
        var src_1 = "https://player.bilibili.com/player.html?";
        var keys_1 = Object.keys(params_1);
        keys_1.forEach(function (key, index) {
            src_1 += "".concat(key, "=").concat(params_1[key]);
            if (index < keys_1.length - 1) {
                src_1 += "&";
            }
        });
        element.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\" src=\"".concat(src_1, "\"></iframe>"));
        element.remove();
    }
    else if (tedMatch && tedMatch[1]) {
        element.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\" src=\"//embed.ted.com/talks/".concat(tedMatch[1], "\"></iframe>"));
        element.remove();
    }
};
var mediaRender = function (element) {
    if (!element) {
        return;
    }
    element.querySelectorAll("a").forEach(function (aElement) {
        var url = aElement.getAttribute("href");
        if (!url) {
            return;
        }
        if (url.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/)) {
            videoRender(aElement, url);
        }
        else if (url.match(/^.+.(mp3|wav|flac)$/)) {
            audioRender(aElement, url);
        }
        else {
            iframeRender(aElement, url);
        }
    });
};


/***/ }),

/***/ 637:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ mermaidRender)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(413);
/* harmony import */ var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);
/* harmony import */ var _util_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(494);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var mermaidRender = function (element, cdn, theme) {
    if (element === void 0) { element = document; }
    if (cdn === void 0) { cdn = _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN; }
    var mermaidElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.mermaidRenderAdapter.getElements(element);
    if (mermaidElements.length === 0) {
        return;
    }
    (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdn, "/dist/js/mermaid/mermaid.min.js?v=11.12.2"), "vditorMermaidScript").then(function () {
        var config = {
            securityLevel: "loose",
            altFontFamily: "sans-serif",
            fontFamily: "sans-serif",
            startOnLoad: false,
            flowchart: {
                htmlLabels: true,
                useMaxWidth: !0,
            },
            sequence: {
                useMaxWidth: true,
                diagramMarginX: 8,
                diagramMarginY: 8,
                boxMargin: 8,
                showSequenceNumbers: true, // Mermaid 时序图增加序号 https://github.com/siyuan-note/siyuan/pull/6992 https://mermaid.js.org/syntax/sequenceDiagram.html#sequencenumbers
            },
            gantt: {
                leftPadding: 75,
                rightPadding: 20,
            },
        };
        if (theme === "dark") {
            config.theme = "dark";
        }
        mermaid.initialize(config);
        mermaidElements.forEach(function (item) { return __awaiter(void 0, void 0, void 0, function () {
            var code, id, mermaidData, e_1, errorElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        code = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.mermaidRenderAdapter.getCode(item);
                        if (item.getAttribute("data-processed") === "true" ||
                            code.trim() === "") {
                            return [2 /*return*/];
                        }
                        id = "mermaid" + (0,_util_function__WEBPACK_IMPORTED_MODULE_3__/* .genUUID */ .Wb)();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, mermaid.render(id, item.textContent)];
                    case 2:
                        mermaidData = _a.sent();
                        item.innerHTML = mermaidData.svg;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        errorElement = document.querySelector("#" + id);
                        item.innerHTML = "\n<div class=\"mermaid-error\">\n<div class=\"mermaid-error-icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-bug-icon lucide-bug\"><path d=\"M12 20v-9\"/><path d=\"M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z\"/><path d=\"M14.12 3.88 16 2\"/><path d=\"M21 21a4 4 0 0 0-3.81-4\"/><path d=\"M21 5a4 4 0 0 1-3.55 3.97\"/><path d=\"M22 13h-4\"/><path d=\"M3 21a4 4 0 0 1 3.81-4\"/><path d=\"M3 5a4 4 0 0 0 3.55 3.97\"/><path d=\"M6 13H2\"/><path d=\"m8 2 1.88 1.88\"/><path d=\"M9 7.13V6a3 3 0 1 1 6 0v1.13\"/></svg></div>\n<div class=\"mermaid-error-title\">\u56FE\u8868\u52A0\u8F7D\u5931\u8D25</div>\n<div class=\"mermaid-error-message\">".concat(e_1.message.replace(/\n/, "<br>"), "</div>\n</div>");
                        errorElement.parentElement.remove();
                        return [3 /*break*/, 4];
                    case 4:
                        item.setAttribute("data-processed", "true");
                        return [2 /*return*/];
                }
            });
        }); });
    });
};


/***/ }),

/***/ 194:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ mindmapRender)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(413);
/* harmony import */ var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);



var mindmapRender = function (element, cdn, theme) {
    if (element === void 0) { element = document; }
    if (cdn === void 0) { cdn = _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN; }
    var mindmapElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.mindmapRenderAdapter.getElements(element);
    if (mindmapElements.length > 0) {
        (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdn, "/dist/js/echarts/echarts.min.js?v=5.5.1"), "vditorEchartsScript").then(function () {
            mindmapElements.forEach(function (e) {
                if (e.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                    e.parentElement.classList.contains("vditor-ir__marker--pre")) {
                    return;
                }
                var text = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.mindmapRenderAdapter.getCode(e);
                if (!text) {
                    return;
                }
                try {
                    if (e.getAttribute("data-processed") === "true") {
                        return;
                    }
                    echarts.init(e, theme === "dark" ? "dark" : undefined).setOption({
                        series: [
                            {
                                data: [JSON.parse(decodeURIComponent(text))],
                                initialTreeDepth: -1,
                                itemStyle: {
                                    borderWidth: 0,
                                    color: "#4285f4",
                                },
                                label: {
                                    backgroundColor: "#f6f8fa",
                                    borderColor: "#d1d5da",
                                    borderRadius: 5,
                                    borderWidth: 0.5,
                                    color: "#586069",
                                    lineHeight: 20,
                                    offset: [-5, 0],
                                    padding: [0, 5],
                                    position: "insideRight",
                                },
                                lineStyle: {
                                    color: "#d1d5da",
                                    width: 1,
                                },
                                roam: true,
                                symbol: function (value, params) {
                                    var _a;
                                    if ((_a = params === null || params === void 0 ? void 0 : params.data) === null || _a === void 0 ? void 0 : _a.children) {
                                        return "circle";
                                    }
                                    else {
                                        return "path://";
                                    }
                                },
                                type: "tree",
                            },
                        ],
                        tooltip: {
                            trigger: "item",
                            triggerOn: "mousemove",
                        },
                    });
                    e.setAttribute("data-processed", "true");
                }
                catch (error) {
                    e.className = "vditor-reset--error";
                    e.innerHTML = "mindmap render error: <br>".concat(error);
                }
            });
        });
    }
};


/***/ }),

/***/ 436:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ outlineRender)
/* harmony export */ });
/* harmony import */ var _util_hasClosestByHeadings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(771);
/* harmony import */ var _mathRender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(472);


var outlineRender = function (contentElement, targetElement, vditor) {
    var tocHTML = "";
    var ids = [];
    Array.from(contentElement.children).forEach(function (item, index) {
        if ((0,_util_hasClosestByHeadings__WEBPACK_IMPORTED_MODULE_1__/* .hasClosestByHeadings */ .W)(item)) {
            if (vditor) {
                var lastIndex = item.id.lastIndexOf("_");
                item.id = item.id.substring(0, lastIndex === -1 ? undefined : lastIndex) + "_" + index;
            }
            ids.push(item.id);
            tocHTML += item.outerHTML.replace("<wbr>", "");
        }
    });
    if (tocHTML === "") {
        targetElement.innerHTML = "";
        return "";
    }
    var tempElement = document.createElement("div");
    if (vditor) {
        vditor.lute.SetToC(true);
        if (vditor.currentMode === "wysiwyg" && !vditor.preview.element.contains(contentElement)) {
            tempElement.innerHTML = vditor.lute.SpinVditorDOM("<p>[ToC]</p>" + tocHTML);
        }
        else if (vditor.currentMode === "ir" && !vditor.preview.element.contains(contentElement)) {
            tempElement.innerHTML = vditor.lute.SpinVditorIRDOM("<p>[ToC]</p>" + tocHTML);
        }
        else {
            tempElement.innerHTML = vditor.lute.HTML2VditorDOM("<p>[ToC]</p>" + tocHTML);
        }
        vditor.lute.SetToC(vditor.options.preview.markdown.toc);
    }
    else {
        targetElement.classList.add("vditor-outline");
        var lute = Lute.New();
        lute.SetToC(true);
        tempElement.innerHTML = lute.HTML2VditorDOM("<p>[ToC]</p>" + tocHTML);
    }
    var headingsElement = tempElement.firstElementChild.querySelectorAll("li > span[data-target-id]");
    headingsElement.forEach(function (item, index) {
        if (item.nextElementSibling && item.nextElementSibling.tagName === "UL") {
            var iconHTML = "<svg class='vditor-outline__action'><use xlink:href='#vditor-icon-down'></use></svg>";
            if (!document.getElementById("vditorIconScript")) {
                iconHTML = '<svg class="vditor-outline__action" viewBox="0 0 32 32"><path d="M3.76 6.12l12.24 12.213 12.24-12.213 3.76 3.76-16 16-16-16 3.76-3.76z"></path></svg>';
            }
            item.innerHTML = "".concat(iconHTML, "<span>").concat(item.innerHTML, "</span>");
        }
        else {
            item.innerHTML = "<svg></svg><span>".concat(item.innerHTML, "</span>");
        }
        item.setAttribute("data-target-id", ids[index]);
    });
    tocHTML = tempElement.firstElementChild.innerHTML;
    if (headingsElement.length === 0) {
        targetElement.innerHTML = "";
        return tocHTML;
    }
    targetElement.innerHTML = tocHTML;
    if (vditor) {
        (0,_mathRender__WEBPACK_IMPORTED_MODULE_0__/* .mathRender */ .H)(targetElement, {
            cdn: vditor.options.cdn,
            math: vditor.options.preview.math,
        });
    }
    targetElement.firstElementChild.addEventListener("click", function (event) {
        var target = event.target;
        while (target && !target.isEqualNode(targetElement)) {
            if (target.classList.contains("vditor-outline__action")) {
                if (target.classList.contains("vditor-outline__action--close")) {
                    target.classList.remove("vditor-outline__action--close");
                    target.parentElement.nextElementSibling.setAttribute("style", "display:block");
                }
                else {
                    target.classList.add("vditor-outline__action--close");
                    target.parentElement.nextElementSibling.setAttribute("style", "display:none");
                }
                event.preventDefault();
                event.stopPropagation();
                break;
            }
            else if (target.getAttribute("data-target-id")) {
                event.preventDefault();
                event.stopPropagation();
                var idElement = document.getElementById(target.getAttribute("data-target-id"));
                if (!idElement) {
                    return;
                }
                if (vditor) {
                    if (vditor.options.height === "auto") {
                        var windowScrollY = idElement.offsetTop + vditor.element.offsetTop;
                        if (!vditor.options.toolbarConfig.pin) {
                            windowScrollY += vditor.toolbar.element.offsetHeight;
                        }
                        window.scrollTo(window.scrollX, windowScrollY);
                    }
                    else {
                        if (vditor.element.offsetTop < window.scrollY) {
                            window.scrollTo(window.scrollX, vditor.element.offsetTop);
                        }
                        if (vditor.preview.element.contains(contentElement)) {
                            contentElement.parentElement.scrollTop = idElement.offsetTop;
                        }
                        else {
                            contentElement.scrollTop = idElement.offsetTop;
                        }
                    }
                }
                else {
                    window.scrollTo(window.scrollX, idElement.offsetTop);
                }
                break;
            }
            target = target.parentElement;
        }
    });
    return tocHTML;
};


/***/ }),

/***/ 229:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ plantumlRender)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(413);
/* harmony import */ var _adapterRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(840);



var plantumlRender = function (element, cdn) {
    if (element === void 0) { element = document; }
    if (cdn === void 0) { cdn = _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN; }
    var plantumlElements = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.plantumlRenderAdapter.getElements(element);
    if (plantumlElements.length === 0) {
        return;
    }
    (0,_util_addScript__WEBPACK_IMPORTED_MODULE_2__/* .addScript */ .G)("".concat(cdn, "/dist/js/plantuml/plantuml-encoder.min.js"), "vditorPlantumlScript").then(function () {
        plantumlElements.forEach(function (e) {
            if (e.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                e.parentElement.classList.contains("vditor-ir__marker--pre")) {
                return;
            }
            var text = _adapterRender__WEBPACK_IMPORTED_MODULE_1__.plantumlRenderAdapter.getCode(e).trim();
            if (!text) {
                return;
            }
            try {
                e.innerHTML = "<object type=\"image/svg+xml\" data=\"https://www.plantuml.com/plantuml/svg/~1".concat(plantumlEncoder.encode(text), "\"/>");
            }
            catch (error) {
                e.className = "vditor-reset--error";
                e.innerHTML = "plantuml render error: <br>".concat(error);
            }
        });
    });
};


/***/ }),

/***/ 616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V": () => (/* binding */ selectionRender)
/* harmony export */ });
/**
 * 渲染 selection 代码块为文件选择标签
 */
var selectionRender = function (element) {
    element.querySelectorAll("pre > code.language-selection").forEach(function (codeElement) {
        var preElement = codeElement.parentElement;
        var content = codeElement.textContent.trim();
        var lines = content.split('\n');
        var tags = lines.map(function (line) {
            var match = line.trim().match(/^(.+?)\s+(\d+-\d+)$/);
            if (match) {
                var filename = match[1], lineRange = match[2];
                return "<div class=\"vditor-selection-tag\">\n                    <span class=\"vditor-selection-tag__file\">".concat(filename, "</span>\n                    <span class=\"vditor-selection-tag__lines\">").concat(lineRange, "</span>\n                </div>");
            }
            return '';
        }).filter(function (tag) { return tag; }).join('');
        if (tags) {
            var container = document.createElement('div');
            container.innerHTML = tags;
            preElement.parentNode.replaceChild(container, preElement);
        }
    });
};


/***/ }),

/***/ 214:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ setLute)
/* harmony export */ });
var setLute = function (options) {
    var lute = Lute.New();
    lute.PutEmojis(options.emojis);
    lute.SetEmojiSite(options.emojiSite);
    lute.SetHeadingAnchor(options.headingAnchor);
    lute.SetInlineMathAllowDigitAfterOpenMarker(options.inlineMathDigit);
    lute.SetAutoSpace(options.autoSpace);
    lute.SetToC(options.toc);
    lute.SetFootnotes(options.footnotes);
    lute.SetFixTermTypo(options.fixTermTypo);
    lute.SetVditorCodeBlockPreview(options.codeBlockPreview);
    lute.SetVditorMathBlockPreview(options.mathBlockPreview);
    lute.SetSanitize(options.sanitize);
    lute.SetChineseParagraphBeginningSpace(options.paragraphBeginningSpace);
    lute.SetRenderListStyle(options.listStyle);
    lute.SetLinkBase(options.linkBase);
    lute.SetLinkPrefix(options.linkPrefix);
    lute.SetMark(options.mark);
    lute.SetGFMAutoLink(options.gfmAutoLink);
    if (options.lazyLoadImage) {
        lute.SetImageLazyLoading(options.lazyLoadImage);
    }
    lute.SetSup(options.sup);
    lute.SetSub(options.sub);
    return lute;
};


/***/ }),

/***/ 190:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ previewImage)
/* harmony export */ });
var previewImage = function (oldImgElement, lang, theme) {
    if (lang === void 0) { lang = "zh_CN"; }
    if (theme === void 0) { theme = "classic"; }
    var oldImgRect = oldImgElement.getBoundingClientRect();
    var height = 36;
    document.body.insertAdjacentHTML("beforeend", "<div class=\"vditor vditor-img".concat(theme === "dark" ? " vditor--dark" : "", "\">\n    <div class=\"vditor-img__bar\">\n      <span class=\"vditor-img__btn\" data-deg=\"0\">\n        <svg><use xlink:href=\"#vditor-icon-redo\"></use></svg>\n        ").concat(window.VditorI18n.spin, "\n      </span>\n      <span class=\"vditor-img__btn\"  onclick=\"this.parentElement.parentElement.outerHTML = '';document.body.style.overflow = ''\">\n        X &nbsp;").concat(window.VditorI18n.close, "\n      </span>\n    </div>\n    <div class=\"vditor-img__img\" onclick=\"this.parentElement.outerHTML = '';document.body.style.overflow = ''\">\n      <img style=\"width: ").concat(oldImgElement.width, "px;height:").concat(oldImgElement.height, "px;transform: translate3d(").concat(oldImgRect.left, "px, ").concat(oldImgRect.top - height, "px, 0)\" src=\"").concat(oldImgElement.getAttribute("src"), "\">\n    </div>\n</div>"));
    document.body.style.overflow = "hidden";
    // 图片从原始位置移动到预览正中间的动画效果
    var imgElement = document.querySelector(".vditor-img img");
    var translate3d = "translate3d(".concat(Math.max(0, window.innerWidth - oldImgElement.naturalWidth) / 2, "px, ").concat(Math.max(0, window.innerHeight - height - oldImgElement.naturalHeight) / 2, "px, 0)");
    setTimeout(function () {
        imgElement.setAttribute("style", "transition: transform .3s ease-in-out;transform: ".concat(translate3d));
        setTimeout(function () {
            imgElement.parentElement.scrollTo((imgElement.parentElement.scrollWidth - imgElement.parentElement.clientWidth) / 2, (imgElement.parentElement.scrollHeight - imgElement.parentElement.clientHeight) / 2);
        }, 400);
    });
    // 旋转
    var btnElement = document.querySelector(".vditor-img__btn");
    btnElement.addEventListener("click", function () {
        var deg = parseInt(btnElement.getAttribute("data-deg"), 10) + 90;
        if ((deg / 90) % 2 === 1 && oldImgElement.naturalWidth > imgElement.parentElement.clientHeight) {
            imgElement.style.transform = "translate3d(".concat(Math.max(0, window.innerWidth - oldImgElement.naturalWidth) / 2, "px, ").concat(oldImgElement.naturalWidth / 2 - oldImgElement.naturalHeight / 2, "px, 0) rotateZ(").concat(deg, "deg)");
        }
        else {
            imgElement.style.transform = "".concat(translate3d, " rotateZ(").concat(deg, "deg)");
        }
        btnElement.setAttribute("data-deg", deg.toString());
        setTimeout(function () {
            imgElement.parentElement.scrollTo((imgElement.parentElement.scrollWidth - imgElement.parentElement.clientWidth) / 2, (imgElement.parentElement.scrollHeight - imgElement.parentElement.clientHeight) / 2);
        }, 400);
    });
};


/***/ }),

/***/ 580:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ setCodeTheme)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _util_addStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(290);


var setCodeTheme = function (codeTheme, cdn) {
    if (cdn === void 0) { cdn = _constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CDN */ .g.CDN; }
    if (!_constants__WEBPACK_IMPORTED_MODULE_0__/* .Constants.CODE_THEME.includes */ .g.CODE_THEME.includes(codeTheme)) {
        codeTheme = "github";
    }
    var vditorHljsStyle = document.getElementById("vditorHljsStyle");
    var href = "".concat(cdn, "/dist/js/highlight.js/styles/").concat(codeTheme, ".min.css");
    if (!vditorHljsStyle) {
        (0,_util_addStyle__WEBPACK_IMPORTED_MODULE_1__/* .addStyle */ .c)(href, "vditorHljsStyle");
    }
    else if (vditorHljsStyle.getAttribute('href') !== href) {
        vditorHljsStyle.remove();
        (0,_util_addStyle__WEBPACK_IMPORTED_MODULE_1__/* .addStyle */ .c)(href, "vditorHljsStyle");
    }
};


/***/ }),

/***/ 538:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ setContentTheme)
/* harmony export */ });
/* harmony import */ var _util_addStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(290);

var setContentTheme = function (contentTheme, path) {
    if (!contentTheme || !path) {
        return;
    }
    var vditorContentTheme = document.getElementById("vditorContentTheme");
    var cssPath = "".concat(path, "/").concat(contentTheme, ".css");
    if (!vditorContentTheme) {
        (0,_util_addStyle__WEBPACK_IMPORTED_MODULE_0__/* .addStyle */ .c)(cssPath, "vditorContentTheme");
    }
    else if (vditorContentTheme.getAttribute("href") !== cssPath) {
        vditorContentTheme.remove();
        (0,_util_addStyle__WEBPACK_IMPORTED_MODULE_0__/* .addStyle */ .c)(cssPath, "vditorContentTheme");
    }
};


/***/ }),

/***/ 413:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ addScriptSync),
/* harmony export */   "G": () => (/* binding */ addScript)
/* harmony export */ });
var addScriptSync = function (path, id) {
    if (document.getElementById(id)) {
        return false;
    }
    var xhrObj = new XMLHttpRequest();
    xhrObj.open("GET", path, false);
    xhrObj.setRequestHeader("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01");
    xhrObj.send("");
    var scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.text = xhrObj.responseText;
    scriptElement.id = id;
    document.head.appendChild(scriptElement);
};
var addScript = function (path, id) {
    return new Promise(function (resolve, reject) {
        if (document.getElementById(id)) {
            // 脚本加载后再次调用直接返回
            resolve(true);
            return false;
        }
        var scriptElement = document.createElement("script");
        scriptElement.src = path;
        scriptElement.async = true;
        // 循环调用时 Chrome 不会重复请求 js
        document.head.appendChild(scriptElement);
        scriptElement.onerror = function (event) {
            reject(event);
        };
        scriptElement.onload = function () {
            if (document.getElementById(id)) {
                // 循环调用需清除 DOM 中的 script 标签
                scriptElement.remove();
                resolve(true);
                return false;
            }
            scriptElement.id = id;
            resolve(true);
        };
    });
};


/***/ }),

/***/ 290:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ addStyle)
/* harmony export */ });
var addStyle = function (url, id) {
    if (!document.getElementById(id)) {
        var styleElement = document.createElement("link");
        styleElement.id = id;
        styleElement.rel = "stylesheet";
        styleElement.type = "text/css";
        styleElement.href = url;
        document.getElementsByTagName("head")[0].appendChild(styleElement);
    }
};


/***/ }),

/***/ 626:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* binding */ attachLineNumbersToBlocks),
/* harmony export */   "g": () => (/* binding */ attachLineNumbersToBlocksThrottled)
/* harmony export */ });
/**
 * 功能：为编辑区域批量添加行号与列表/表格标记（O(n)）
 * - 块级：为所有 `data-block` 写入 `data-linenumber`
 * - 列表：为 `ul/ol > li` 写入 `data-linenumber`、`data-list-level`、`data-list-number`
 * - 表格：为 `table` 的 `tr` 写入 `data-linenumber`（不为 `th` 设置）
 * - 性能：一次解析 Markdown 建索引，批量收集并一次性更新属性，缓存避免重复计算
 * - 精度：支持嵌套列表、换行列表项、多级序号；表格跨页连续行号，容忍合并单元格
 */
var attachLineNumbersToBlocks = function (root, sourceMarkdown) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (!root || !sourceMarkdown) {
        return;
    }
    var t0 = performance.now();
    var computeHash = function (s) {
        var h = 0;
        for (var i = 0; i < s.length; i++) {
            h = (h * 31 + s.charCodeAt(i)) | 0;
        }
        return "".concat(s.length, ":").concat(h);
    };
    var GLOBAL_CACHE = globalThis.__VDITOR_LINE_CACHE__ || new Map();
    globalThis.__VDITOR_LINE_CACHE__ = GLOBAL_CACHE;
    var ZWSP = "\u200b";
    var normalize = function (text) {
        return text
            .replace(/\r\n|\r/g, "\n")
            .replace(new RegExp(ZWSP, "g"), "")
            .replace(/\u00a0/g, " ")
            .replace(/\u2006/g, "")
            .replace(/[\t\f\v ]+/g, " ");
    };
    var srcNorm = normalize(sourceMarkdown);
    var tNorm = performance.now();
    var hash = computeHash(srcNorm);
    var cached = GLOBAL_CACHE.get(hash);
    var srcLines = (_a = cached === null || cached === void 0 ? void 0 : cached.srcLines) !== null && _a !== void 0 ? _a : srcNorm.split("\n");
    var stripInlineMD = function (text) {
        return (text
            .replace(/\\([*_`~])/g, "$1")
            .replace(/\*\*|__/g, "")
            .replace(/\*|_/g, "")
            .replace(/~~/g, "")
            .replace(/`+/g, "")
            // 数学行内分隔符：保留内容，仅移除分隔符
            .replace(/\\\(/g, "(")
            .replace(/\\\)/g, ")")
            .replace(/\\\[/g, "[")
            .replace(/\\\]/g, "]")
            .replace(/\$/g, "")
            .trim());
    };
    var stripInlineForList = function (text) {
        return (stripInlineMD(text)
            // 移除 $...$（行内公式整体）
            .replace(/\$(?:\\.|[^$])*\$/g, "")
            // 移除 \(...\)、\[...\]（行内/行间公式整体）
            .replace(/\\\([^)]*\\\)/g, "")
            .replace(/\\\[[^\]]*\\\]/g, "")
            // 去除通用 TeX 命令，如 \alpha、\mathbf 等
            .replace(/\\[a-zA-Z]+/g, "")
            // 去除多余大括号
            .replace(/[{}]/g, "")
            .trim());
    };
    var strippedLines = (_b = cached === null || cached === void 0 ? void 0 : cached.strippedLines) !== null && _b !== void 0 ? _b : srcLines.map(function (l) { return stripInlineMD(l); });
    var lineLookup = (_c = cached === null || cached === void 0 ? void 0 : cached.lineLookup) !== null && _c !== void 0 ? _c : new Map();
    if (!cached) {
        for (var i = 0; i < strippedLines.length; i++) {
            var key = strippedLines[i];
            if (!lineLookup.has(key)) {
                lineLookup.set(key, [i + 1]);
            }
            else {
                lineLookup.get(key).push(i + 1);
            }
        }
    }
    var usedLines = new Set();
    var pickFirstUnused = function (candidates) {
        if (!candidates || candidates.length === 0)
            return -1;
        for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
            var ln = candidates_1[_i];
            if (!usedLines.has(ln))
                return ln;
        }
        return -1;
    };
    var findLineNumberByText = function (text) {
        var stripped = stripInlineMD(text);
        var ln = pickFirstUnused(lineLookup.get(stripped));
        if (ln !== -1)
            return ln;
        for (var i = 0; i < strippedLines.length; i++) {
            if (!usedLines.has(i + 1) &&
                stripped &&
                strippedLines[i].indexOf(stripped) !== -1) {
                return i + 1;
            }
        }
        return -1;
    };
    /**
     * 预处理：收集 Markdown 中所有无序列表（ul）行及其去除行内标记后的内容，构建快速查找结构。
     * 仅匹配以 `*`、`-`、`+` 开头的条目，支持任务列表如 `- [ ]`、`* [x]`。
     */
    var unorderedListEntries = (_d = cached === null || cached === void 0 ? void 0 : cached.unorderedListEntries) !== null && _d !== void 0 ? _d : [];
    var unorderedLookup = (_e = cached === null || cached === void 0 ? void 0 : cached.unorderedLookup) !== null && _e !== void 0 ? _e : new Map();
    var usedUnorderedLines = new Set();
    if (!cached) {
        for (var i = 0; i < srcLines.length; i++) {
            var raw = srcLines[i];
            var m = raw.match(/^\s*[*+-]\s+(?:\[(?: |x|X)\]\s+)?(.*)$/);
            if (m && typeof m[1] === "string") {
                var contentStripped = stripInlineForList(m[1]);
                unorderedListEntries.push({
                    ln: i + 1,
                    content: contentStripped,
                });
                if (!unorderedLookup.has(contentStripped)) {
                    unorderedLookup.set(contentStripped, [i + 1]);
                }
                else {
                    unorderedLookup.get(contentStripped).push(i + 1);
                }
            }
        }
    }
    /**
     * 从无序列表候选行中为给定文本选择一个行号。
     * 优先精确匹配（去标记后完全相同），否则回退到包含匹配。
     */
    var pickFirstUnusedUnordered = function (candidates) {
        if (!candidates || candidates.length === 0)
            return -1;
        for (var _i = 0, candidates_2 = candidates; _i < candidates_2.length; _i++) {
            var ln = candidates_2[_i];
            if (!usedUnorderedLines.has(ln))
                return ln;
        }
        return -1;
    };
    var findUnorderedListLineNumber = function (text) {
        var stripped = stripInlineForList(text);
        // 先尝试精确匹配
        var exact = pickFirstUnusedUnordered(unorderedLookup.get(stripped));
        if (exact !== -1)
            return exact;
        // 回退到包含匹配
        for (var i = 0; i < unorderedListEntries.length; i++) {
            var entry = unorderedListEntries[i];
            if (usedUnorderedLines.has(entry.ln))
                continue;
            if (!stripped)
                continue;
            if (entry.content.indexOf(stripped) !== -1 ||
                stripped.indexOf(entry.content) !== -1) {
                return entry.ln;
            }
        }
        return -1;
    };
    /**
     * 预处理：收集 Markdown 中所有有序列表（ol）行及其内容，支持 `1.` 或 `1)` 以及任务列表前缀。
     */
    var orderedListEntries = (_f = cached === null || cached === void 0 ? void 0 : cached.orderedListEntries) !== null && _f !== void 0 ? _f : [];
    var orderedLookup = (_g = cached === null || cached === void 0 ? void 0 : cached.orderedLookup) !== null && _g !== void 0 ? _g : new Map();
    var usedOrderedLines = new Set();
    var ORDERED_RE = /\s*\d+(?:[.)、．。]|[\uFF0E\uFF09\u3001])\s+(?:\[(?: |x|X)\]\s+)?(.*)/;
    var ORDERED_FULL = new RegExp("^".concat(ORDERED_RE.source, "$"));
    if (!cached) {
        for (var i = 0; i < srcLines.length; i++) {
            var raw = srcLines[i];
            var m = raw.match(ORDERED_FULL);
            if (m && typeof m[1] === "string") {
                var contentStripped = stripInlineForList(m[1]);
                orderedListEntries.push({
                    ln: i + 1,
                    content: contentStripped,
                });
                if (!orderedLookup.has(contentStripped)) {
                    orderedLookup.set(contentStripped, [i + 1]);
                }
                else {
                    orderedLookup.get(contentStripped).push(i + 1);
                }
            }
        }
    }
    var orderedGroups = (_h = cached === null || cached === void 0 ? void 0 : cached.orderedGroups) !== null && _h !== void 0 ? _h : [];
    if (!cached) {
        for (var i = 0; i < srcLines.length;) {
            var raw = srcLines[i];
            if (ORDERED_FULL.test(raw)) {
                var group = [];
                while (i < srcLines.length && ORDERED_FULL.test(srcLines[i])) {
                    group.push(i + 1);
                    i++;
                }
                if (group.length > 0) {
                    orderedGroups.push(group);
                }
            }
            else {
                i++;
            }
        }
    }
    /**
     * 为给定文本在有序列表候选中选择行号，精确匹配优先，包含匹配回退。
     */
    var pickFirstUnusedOrdered = function (candidates) {
        if (!candidates || candidates.length === 0)
            return -1;
        for (var _i = 0, candidates_3 = candidates; _i < candidates_3.length; _i++) {
            var ln = candidates_3[_i];
            if (!usedOrderedLines.has(ln))
                return ln;
        }
        return -1;
    };
    var findOrderedListLineNumber = function (text) {
        var stripped = stripInlineForList(text);
        var exact = pickFirstUnusedOrdered(orderedLookup.get(stripped));
        if (exact !== -1)
            return exact;
        for (var i = 0; i < orderedListEntries.length; i++) {
            var entry = orderedListEntries[i];
            if (usedOrderedLines.has(entry.ln))
                continue;
            if (!stripped)
                continue;
            if (entry.content.indexOf(stripped) !== -1 ||
                stripped.indexOf(entry.content) !== -1) {
                return entry.ln;
            }
        }
        return -1;
    };
    /**
     * 获取 `li` 的直接内容文本：仅拼接其直系子节点中的文本，排除嵌套的 `UL/OL` 列表。
     * 以便在嵌套列表场景下准确定位每个条目对应的源行。
     */
    var getImmediateLiText = function (li) {
        var buf = "";
        li.childNodes.forEach(function (node) {
            var _a;
            if (node.nodeType === 3) {
                buf += node.data;
            }
            else if (node.tagName !== "UL" &&
                node.tagName !== "OL" &&
                !((_a = node.classList) === null || _a === void 0 ? void 0 : _a.contains("katex"))) {
                buf += node.textContent || "";
            }
        });
        return buf;
    };
    var attrUpdates = [];
    var blocks = root.querySelectorAll("[data-block]");
    blocks.forEach(function (el) {
        try {
            var container = el;
            var dataType = container.getAttribute("data-type") || "";
            if (dataType === "math-block" || dataType === "code-block") {
                return;
            }
            var tagName = container.tagName;
            if (tagName === "UL" || tagName === "OL") {
                if (container.getAttribute("data-linenumber")) {
                    attrUpdates.push([container, "data-linenumber", ""]);
                }
                return;
            }
            var liAncestor = container.closest("li");
            if (liAncestor) {
                if (container.getAttribute("data-linenumber")) {
                    attrUpdates.push([container, "data-linenumber", ""]);
                }
                return;
            }
            var text = container.textContent || "";
            var normText = normalize(text);
            if (!normText.trim()) {
                if (container.getAttribute("data-linenumber")) {
                    attrUpdates.push([container, "data-linenumber", ""]);
                }
                return;
            }
            var lineNumber = -1;
            if (tagName === "BLOCKQUOTE") {
                var firstLine = normText.split("\n").find(function (l) { return l.trim().length > 0; }) ||
                    normText;
                var stripped = stripInlineMD(firstLine);
                for (var i = 0; i < srcLines.length; i++) {
                    if (usedLines.has(i + 1))
                        continue;
                    if (/^\s*>+\s/.test(srcLines[i])) {
                        var content = stripInlineMD(srcLines[i].replace(/^\s*>+\s+/, ""));
                        if (content.indexOf(stripped) !== -1) {
                            lineNumber = i + 1;
                            break;
                        }
                    }
                }
            }
            else {
                var firstLine = normText.split("\n").find(function (l) { return l.trim().length > 0; }) ||
                    normText;
                lineNumber = findLineNumberByText(firstLine);
            }
            if (lineNumber !== -1) {
                usedLines.add(lineNumber);
                var cur = container.getAttribute("data-linenumber");
                var val = String(lineNumber);
                if (cur !== val) {
                    attrUpdates.push([container, "data-linenumber", val]);
                }
            }
        }
        catch (_a) {
            void 0;
        }
    });
    var tBlockDone = performance.now();
    /**
     * 为所有 `ul` 下的每个直接 `li` 子元素追加 `data-linenumber`，不修改 `ul` 本身。
     * 支持多层嵌套与非文本起始节点（如加粗/行内代码）。
     */
    var ulElements = root.querySelectorAll("ul");
    ulElements.forEach(function (ul) {
        try {
            var children = Array.from(ul.children);
            var _loop_1 = function (child) {
                if (child.tagName !== "LI")
                    return "continue";
                var li = child;
                var rawText = getImmediateLiText(li);
                var norm = normalize(rawText);
                var firstLine = norm.split("\n").find(function (l) { return l.trim().length > 0; }) || norm;
                var ln = findUnorderedListLineNumber(firstLine);
                var level = (function () {
                    var depth = 0;
                    var p = li;
                    while (p) {
                        p = p.parentElement;
                        if (!p)
                            break;
                        var tag = p.tagName;
                        if (tag === "UL" || tag === "OL")
                            depth++;
                    }
                    return depth;
                })();
                var levelStr = String(level);
                var curLevel = li.getAttribute("data-list-level");
                if (curLevel !== levelStr) {
                    attrUpdates.push([li, "data-list-level", levelStr]);
                }
                if (ln !== -1) {
                    usedUnorderedLines.add(ln);
                    var curLn = li.getAttribute("data-linenumber");
                    var val = String(ln);
                    if (curLn !== val) {
                        attrUpdates.push([li, "data-linenumber", val]);
                    }
                }
                else {
                    if (li.getAttribute("data-linenumber")) {
                        attrUpdates.push([li, "data-linenumber", ""]);
                    }
                }
            };
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                _loop_1(child);
            }
        }
        catch (_a) {
            void 0;
        }
    });
    var tUlDone = performance.now();
    /**
     * 为所有 `ol` 下的每个直接 `li` 子元素追加 `data-linenumber`，不修改 `ol` 本身。
     */
    var olElements = root.querySelectorAll("ol");
    var orderedIndexMap = new WeakMap();
    olElements.forEach(function (ol) {
        try {
            var currentGroupIdx = -1;
            var lastAssigned_1 = -1;
            var startAttr = Number(ol.getAttribute("start"));
            var start = Number.isFinite(startAttr) && startAttr > 0 ? startAttr : 1;
            var children = Array.from(ol.children);
            var seq = start;
            for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
                var child = children_2[_i];
                if (child.tagName !== "LI")
                    continue;
                orderedIndexMap.set(child, seq++);
            }
            var _loop_2 = function (child) {
                if (child.tagName !== "LI")
                    return "continue";
                var li = child;
                var rawText = getImmediateLiText(li);
                var norm = normalize(rawText);
                var firstLine = norm.split("\n").find(function (l) { return l.trim().length > 0; }) || norm;
                var stripped0 = stripInlineForList(firstLine);
                var stripped = stripped0 || stripInlineMD(firstLine);
                orderedLookup.get(stripped);
                var ln = findOrderedListLineNumber(firstLine);
                if (ln !== -1) {
                    usedOrderedLines.add(ln);
                    var cur = li.getAttribute("data-linenumber");
                    var val = String(ln);
                    if (cur !== val) {
                        attrUpdates.push([li, "data-linenumber", val]);
                    }
                    for (var gi = 0; gi < orderedGroups.length; gi++) {
                        if (orderedGroups[gi].includes(ln)) {
                            currentGroupIdx = gi;
                            break;
                        }
                    }
                    lastAssigned_1 = ln;
                }
                else {
                    var assigned = -1;
                    var pickNextFromGroup = function (gi) {
                        if (gi < 0 || gi >= orderedGroups.length)
                            return -1;
                        var lines = orderedGroups[gi];
                        var startIdx = 0;
                        if (lastAssigned_1 !== -1) {
                            var idx = lines.indexOf(lastAssigned_1);
                            startIdx = idx >= 0 ? idx + 1 : 0;
                        }
                        for (var k = startIdx; k < lines.length; k++) {
                            var cand = lines[k];
                            if (!usedOrderedLines.has(cand))
                                return cand;
                        }
                        for (var k = 0; k < startIdx; k++) {
                            var cand = lines[k];
                            if (!usedOrderedLines.has(cand))
                                return cand;
                        }
                        return -1;
                    };
                    if (currentGroupIdx !== -1) {
                        assigned = pickNextFromGroup(currentGroupIdx);
                    }
                    if (assigned === -1) {
                        for (var gi = 0; gi < orderedGroups.length && assigned === -1; gi++) {
                            var cand = pickNextFromGroup(gi);
                            if (cand !== -1) {
                                currentGroupIdx = gi;
                                assigned = cand;
                            }
                        }
                    }
                    if (assigned !== -1) {
                        usedOrderedLines.add(assigned);
                        var cur = li.getAttribute("data-linenumber");
                        var val = String(assigned);
                        if (cur !== val) {
                            attrUpdates.push([li, "data-linenumber", val]);
                        }
                        lastAssigned_1 = assigned;
                    }
                    else {
                        if (li.getAttribute("data-linenumber")) {
                            attrUpdates.push([li, "data-linenumber", ""]);
                        }
                    }
                }
                var level = (function () {
                    var depth = 0;
                    var p = li;
                    while (p) {
                        p = p.parentElement;
                        if (!p)
                            break;
                        var tag = p.tagName;
                        if (tag === "UL" || tag === "OL")
                            depth++;
                    }
                    return depth;
                })();
                var levelStr = String(level);
                var curLevel = li.getAttribute("data-list-level");
                if (curLevel !== levelStr) {
                    attrUpdates.push([li, "data-list-level", levelStr]);
                }
                var numbering = (function () {
                    var _a;
                    var parts = [];
                    var node = li;
                    while (node) {
                        var parentOl = node.closest("ol");
                        if (!parentOl)
                            break;
                        var parentLi = ((_a = parentOl.parentElement) === null || _a === void 0 ? void 0 : _a.closest("li")) ||
                            parentOl.parentElement;
                        var idx = orderedIndexMap.get(node);
                        if (typeof idx === "number") {
                            parts.push(idx);
                        }
                        node = parentLi;
                    }
                    return parts.reverse().join(".");
                })();
                var curNum = li.getAttribute("data-list-number") || "";
                if (numbering && curNum !== numbering) {
                    attrUpdates.push([li, "data-list-number", numbering]);
                }
            };
            for (var _a = 0, children_3 = children; _a < children_3.length; _a++) {
                var child = children_3[_a];
                _loop_2(child);
            }
        }
        catch (_b) {
            void 0;
        }
    });
    var tOlDone = performance.now();
    var tableRowLookup = (_j = cached === null || cached === void 0 ? void 0 : cached.tableRowLookup) !== null && _j !== void 0 ? _j : new Map();
    var tableGroups = (_k = cached === null || cached === void 0 ? void 0 : cached.tableGroups) !== null && _k !== void 0 ? _k : [];
    if (!cached) {
        var isTableRowLine = function (line) {
            return /^\s*\|.*\|\s*$/.test(line);
        };
        var isAlignLine = function (line) {
            return /^\s*\|?(?:\s*:?-{2,}:?\s*\|)+\s*:?-{2,}:?\s*\|?\s*$/.test(line);
        };
        for (var i = 0; i < srcLines.length;) {
            var header = srcLines[i];
            var align = srcLines[i + 1];
            if (isTableRowLine(header) && isAlignLine(align || "")) {
                var groupRows = [i + 1];
                var groupRowTexts = [
                    stripInlineMD(header.replace(/^\s*\|?|\|?\s*$/g, "")),
                ];
                i += 2;
                while (i < srcLines.length && isTableRowLine(srcLines[i])) {
                    groupRows.push(i + 1);
                    groupRowTexts.push(stripInlineMD(srcLines[i].replace(/^\s*\|?|\|?\s*$/g, "")));
                    i++;
                }
                tableGroups.push({
                    rows: groupRows,
                    rowTexts: groupRowTexts,
                });
                for (var t = 0; t < groupRowTexts.length; t++) {
                    var key = groupRowTexts[t];
                    var ln = groupRows[t];
                    var arr = tableRowLookup.get(key);
                    if (arr)
                        arr.push(ln);
                    else
                        tableRowLookup.set(key, [ln]);
                }
            }
            else {
                i++;
            }
        }
    }
    var usedTableLines = new Set();
    var tIndexDone = performance.now();
    var tables = root.querySelectorAll("table");
    var groupPtr = 0;
    tables.forEach(function (table) {
        try {
            var trs = table.querySelectorAll("tr");
            trs.forEach(function (tr) {
                var cells = Array.from(tr.cells);
                var rowText = cells.map(function (c) { return c.textContent || ""; }).join("|");
                var normRow = stripInlineMD(normalize(rowText));
                var ln = pickFirstUnused(tableRowLookup.get(normRow));
                if (ln === -1) {
                    while (groupPtr < tableGroups.length &&
                        tableGroups[groupPtr].rows.every(function (r) {
                            return usedTableLines.has(r);
                        })) {
                        groupPtr++;
                    }
                    if (groupPtr < tableGroups.length) {
                        var g = tableGroups[groupPtr];
                        var chosen = -1;
                        for (var k = 0; k < g.rows.length; k++) {
                            var cand = g.rows[k];
                            if (!usedTableLines.has(cand)) {
                                chosen = cand;
                                break;
                            }
                        }
                        ln = chosen;
                    }
                }
                if (ln !== -1) {
                    usedTableLines.add(ln);
                    var cur = tr.getAttribute("data-linenumber");
                    var val = String(ln);
                    if (cur !== val) {
                        attrUpdates.push([
                            tr,
                            "data-linenumber",
                            val,
                        ]);
                    }
                }
                else {
                    var cur = tr.getAttribute("data-linenumber");
                    if (cur) {
                        attrUpdates.push([
                            tr,
                            "data-linenumber",
                            "",
                        ]);
                    }
                }
                var ths = tr.querySelectorAll("th");
                ths.forEach(function (th) {
                    var curTh = th.getAttribute("data-linenumber");
                    if (curTh) {
                        attrUpdates.push([
                            th,
                            "data-linenumber",
                            "",
                        ]);
                    }
                });
            });
        }
        catch (_a) {
            void 0;
        }
    });
    var tTableDone = performance.now();
    for (var _i = 0, attrUpdates_1 = attrUpdates; _i < attrUpdates_1.length; _i++) {
        var _l = attrUpdates_1[_i], el = _l[0], attr = _l[1], val = _l[2];
        if (val === "") {
            el.removeAttribute(attr);
        }
        else {
            el.setAttribute(attr, val);
        }
    }
    var tApplyDone = performance.now();
    if (!cached) {
        GLOBAL_CACHE.set(hash, {
            srcNorm: srcNorm,
            srcLines: srcLines,
            strippedLines: strippedLines,
            lineLookup: lineLookup,
            unorderedListEntries: unorderedListEntries,
            unorderedLookup: unorderedLookup,
            orderedListEntries: orderedListEntries,
            orderedLookup: orderedLookup,
            orderedGroups: orderedGroups,
            tableRowLookup: tableRowLookup,
            tableGroups: tableGroups,
        });
    }
};
/**
 * 节流后的行号更新函数，避免频繁更新 data-linenumber
 */
var attachLineNumbersToBlocksThrottled = (function () {
    var last = 0;
    var timer = 0;
    var lastArgs = null;
    var wait = 500;
    var invoke = function () {
        timer = 0;
        last = Date.now();
        var args = lastArgs;
        lastArgs = null;
        if (args) {
            attachLineNumbersToBlocks(args[0], args[1]);
        }
    };
    return function (root, source) {
        var now = Date.now();
        lastArgs = [root, source];
        if (now - last >= wait) {
            invoke();
        }
        else if (!timer) {
            timer = window.setTimeout(invoke, wait - (now - last));
        }
    };
})();


/***/ }),

/***/ 105:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ code160to32)
/* harmony export */ });
var code160to32 = function (text) {
    // 非打断空格转换为空格
    return text.replace(/\u00a0/g, " ");
};


/***/ }),

/***/ 494:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wb": () => (/* binding */ genUUID),
/* harmony export */   "on": () => (/* binding */ getSearch),
/* harmony export */   "Qf": () => (/* binding */ looseJsonParse)
/* harmony export */ });
var genUUID = function () { return ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (parseInt(c, 10) ^ (window.crypto.getRandomValues(new Uint32Array(1))[0] & (15 >> (parseInt(c, 10) / 4)))).toString(16);
}); };
var getSearch = function (key, link) {
    if (link === void 0) { link = window.location.search; }
    var params = link.substring(link.indexOf("?"));
    var hashIndex = params.indexOf("#");
    // REF https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
    var urlSearchParams = new URLSearchParams(params.substring(0, hashIndex >= 0 ? hashIndex : undefined));
    return urlSearchParams.get(key);
};
var looseJsonParse = function (text) {
    return Function("\"use strict\";return (".concat(text, ")"))();
};


/***/ }),

/***/ 106:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lG": () => (/* binding */ hasClosestByMatchTag),
/* harmony export */   "fb": () => (/* binding */ hasClosestByClassName)
/* harmony export */ });
/* unused harmony exports hasTopClosestByClassName, hasTopClosestByAttribute, hasTopClosestByTag, getTopList, hasClosestByAttribute, hasClosestBlock, getLastNode */

var hasTopClosestByClassName = function (element, className) {
    var closest = hasClosestByClassName(element, className);
    var parentClosest = false;
    var findTop = false;
    while (closest && !closest.classList.contains("vditor-reset") && !findTop) {
        parentClosest = hasClosestByClassName(closest.parentElement, className);
        if (parentClosest) {
            closest = parentClosest;
        }
        else {
            findTop = true;
        }
    }
    return closest || false;
};
var hasTopClosestByAttribute = function (element, attr, value) {
    var closest = hasClosestByAttribute(element, attr, value);
    var parentClosest = false;
    var findTop = false;
    while (closest && !closest.classList.contains("vditor-reset") && !findTop) {
        parentClosest = hasClosestByAttribute(closest.parentElement, attr, value);
        if (parentClosest) {
            closest = parentClosest;
        }
        else {
            findTop = true;
        }
    }
    return closest || false;
};
var hasTopClosestByTag = function (element, nodeName) {
    var closest = hasClosestByTag(element, nodeName);
    var parentClosest = false;
    var findTop = false;
    while (closest && !closest.classList.contains("vditor-reset") && !findTop) {
        parentClosest = hasClosestByTag(closest.parentElement, nodeName);
        if (parentClosest) {
            closest = parentClosest;
        }
        else {
            findTop = true;
        }
    }
    return closest || false;
};
var getTopList = function (element) {
    var topUlElement = hasTopClosestByTag(element, "UL");
    var topOlElement = hasTopClosestByTag(element, "OL");
    var topListElement = topUlElement;
    if (topOlElement &&
        (!topUlElement || (topUlElement && topOlElement.contains(topUlElement)))) {
        topListElement = topOlElement;
    }
    return topListElement;
};
var hasClosestByAttribute = function (element, attr, value) {
    if (!element) {
        return false;
    }
    if (element.nodeType === 3) {
        element = element.parentElement;
    }
    var e = element;
    var isClosest = false;
    while (e && !isClosest && !e.classList.contains("vditor-reset")) {
        if (e.getAttribute(attr) === value) {
            isClosest = true;
        }
        else {
            e = e.parentElement;
        }
    }
    return isClosest && e;
};
var hasClosestBlock = function (element) {
    if (!element) {
        return false;
    }
    if (element.nodeType === 3) {
        element = element.parentElement;
    }
    var e = element;
    var isClosest = false;
    var blockElement = hasClosestByAttribute(element, "data-block", "0");
    if (blockElement) {
        return blockElement;
    }
    while (e && !isClosest && !e.classList.contains("vditor-reset")) {
        if (e.tagName === "H1" ||
            e.tagName === "H2" ||
            e.tagName === "H3" ||
            e.tagName === "H4" ||
            e.tagName === "H5" ||
            e.tagName === "H6" ||
            e.tagName === "P" ||
            e.tagName === "BLOCKQUOTE" ||
            e.tagName === "OL" ||
            e.tagName === "UL") {
            isClosest = true;
        }
        else {
            e = e.parentElement;
        }
    }
    return isClosest && e;
};
var hasClosestByMatchTag = function (element, nodeName) {
    if (!element) {
        return false;
    }
    if (element.nodeType === 3) {
        element = element.parentElement;
    }
    var e = element;
    var isClosest = false;
    while (e && !isClosest && !e.classList.contains("vditor-reset")) {
        if (e.nodeName === nodeName) {
            isClosest = true;
        }
        else {
            e = e.parentElement;
        }
    }
    return isClosest && e;
};
var hasClosestByClassName = function (element, className) {
    if (!element) {
        return false;
    }
    if (element.nodeType === 3) {
        element = element.parentElement;
    }
    var e = element;
    var isClosest = false;
    while (e && !isClosest && !e.classList.contains("vditor-reset")) {
        if (e.classList.contains(className)) {
            isClosest = true;
        }
        else {
            e = e.parentElement;
        }
    }
    return isClosest && e;
};
var getLastNode = function (node) {
    while (node && node.lastChild) {
        node = node.lastChild;
    }
    return node;
};


/***/ }),

/***/ 771:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ hasClosestByHeadings)
/* harmony export */ });
/* unused harmony export hasClosestByTag */
// NOTE: 减少 method.ts 打包，故从 hasClosest.ts 中拆分
var hasClosestByTag = function (element, nodeName) {
    if (!element) {
        return false;
    }
    if (element.nodeType === 3) {
        element = element.parentElement;
    }
    var e = element;
    var isClosest = false;
    while (e && !isClosest && !e.classList.contains("vditor-reset")) {
        if (e.nodeName.indexOf(nodeName) === 0) {
            isClosest = true;
        }
        else {
            e = e.parentElement;
        }
    }
    return isClosest && e;
};
var hasClosestByHeadings = function (element) {
    var headingElement = hasClosestByTag(element, "H");
    if (headingElement && headingElement.tagName.length === 2 && headingElement.tagName !== "HR") {
        return headingElement;
    }
    return false;
};


/***/ }),

/***/ 35:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ bindMathSelectionListener)
/* harmony export */ });
/* unused harmony export updateMathSelection */
/**
 * 数学公式选中高亮工具
 * 监听选区变化，为选中的数学公式添加高亮样式
 */
var MATH_SELECTED_CLASS = "vditor-math--selected";
/**
 * 检查并更新数学公式的选中高亮状态
 * @param container 容器元素（编辑器或预览区域）
 */
var updateMathSelection = function (container) {
    var selection = window.getSelection();
    // 获取所有数学公式元素
    var mathElements = container.querySelectorAll(".language-math");
    // 移除所有旧的高亮
    mathElements.forEach(function (el) { return el.classList.remove(MATH_SELECTED_CLASS); });
    // 无选中内容则返回
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        return;
    }
    // 检测选中的公式节点并添加高亮
    mathElements.forEach(function (element) {
        if (selection.containsNode(element, true)) {
            element.classList.add(MATH_SELECTED_CLASS);
        }
    });
};
/**
 * 为容器绑定数学公式选中高亮监听
 * @param container 容器元素（编辑器或预览区域）
 */
var bindMathSelectionListener = function (container) {
    var updateHandler = function () { return updateMathSelection(container); };
    // 监听选区变化
    document.addEventListener("selectionchange", updateHandler);
    // 监听鼠标抬起（处理拖拽选择）
    container.addEventListener("mouseup", updateHandler);
    // 监听键盘选择（Shift + 方向键）
    container.addEventListener("keyup", function (e) {
        if (e.shiftKey && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
            updateHandler();
        }
    });
    // 返回清理函数
    return function () {
        document.removeEventListener("selectionchange", updateHandler);
        container.removeEventListener("mouseup", updateHandler);
    };
};


/***/ }),

/***/ 673:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ merge)
/* harmony export */ });
var merge = function () {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        options[_i] = arguments[_i];
    }
    var target = {};
    var merger = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                    target[prop] = merge(target[prop], obj[prop]);
                }
                else {
                    target[prop] = obj[prop];
                }
            }
        }
    };
    for (var i = 0; i < options.length; i++) {
        merger(options[i]);
    }
    return target;
};


/***/ }),

/***/ 810:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hc": () => (/* binding */ setSelectionFocus)
/* harmony export */ });
/* unused harmony exports getEditorRange, getCursorPosition, selectIsEditor, getSelectPosition, setSelectionByPosition, setRangeByWbr, insertHTML */
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);



var getEditorRange = function (vditor) {
    var range;
    var element = vditor[vditor.currentMode].element;
    if (getSelection().rangeCount > 0) {
        range = getSelection().getRangeAt(0);
        if (element.isEqualNode(range.startContainer) ||
            element.contains(range.startContainer)) {
            return range;
        }
    }
    if (vditor[vditor.currentMode].range) {
        return vditor[vditor.currentMode].range;
    }
    element.focus();
    range = element.ownerDocument.createRange();
    range.setStart(element, 0);
    range.collapse(true);
    return range;
};
var getCursorPosition = function (editor) {
    var range = window.getSelection().getRangeAt(0);
    if (!editor.contains(range.startContainer) &&
        !hasClosestByClassName(range.startContainer, "vditor-panel--none")) {
        return {
            left: 0,
            top: 0,
        };
    }
    var parentRect = editor.parentElement.getBoundingClientRect();
    var cursorRect;
    if (range.getClientRects().length === 0) {
        if (range.startContainer.nodeType === 3) {
            // 空行时，会出现没有 br 的情况，需要根据父元素 <p> 获取位置信息
            var parent_1 = range.startContainer.parentElement;
            if (parent_1 && parent_1.getClientRects().length > 0) {
                cursorRect = parent_1.getClientRects()[0];
            }
            else {
                return {
                    left: 0,
                    top: 0,
                };
            }
        }
        else {
            var children = range.startContainer.children;
            if (children[range.startOffset] &&
                children[range.startOffset].getClientRects().length > 0) {
                // markdown 模式回车
                cursorRect = children[range.startOffset].getClientRects()[0];
            }
            else if (range.startContainer.childNodes.length > 0) {
                // in table or code block
                var cloneRange = range.cloneRange();
                range.selectNode(range.startContainer.childNodes[Math.max(0, range.startOffset - 1)]);
                cursorRect = range.getClientRects()[0];
                range.setEnd(cloneRange.endContainer, cloneRange.endOffset);
                range.setStart(cloneRange.startContainer, cloneRange.startOffset);
            }
            else {
                cursorRect = range.startContainer.getClientRects()[0];
            }
            if (!cursorRect) {
                var parentElement = range.startContainer.childNodes[range.startOffset];
                while (!parentElement.getClientRects ||
                    (parentElement.getClientRects &&
                        parentElement.getClientRects().length === 0)) {
                    parentElement = parentElement.parentElement;
                }
                cursorRect = parentElement.getClientRects()[0];
            }
        }
    }
    else {
        cursorRect = range.getClientRects()[0];
    }
    return {
        left: cursorRect.left - parentRect.left,
        top: cursorRect.top - parentRect.top,
    };
};
var selectIsEditor = function (editor, range) {
    if (!range) {
        if (getSelection().rangeCount === 0) {
            return false;
        }
        else {
            range = getSelection().getRangeAt(0);
        }
    }
    var container = range.commonAncestorContainer;
    return editor.isEqualNode(container) || editor.contains(container);
};
var setSelectionFocus = function (range) {
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
};
var getSelectPosition = function (selectElement, editorElement, range) {
    var position = {
        end: 0,
        start: 0,
    };
    if (!range) {
        if (getSelection().rangeCount === 0) {
            return position;
        }
        range = window.getSelection().getRangeAt(0);
    }
    if (selectIsEditor(editorElement, range)) {
        var preSelectionRange = range.cloneRange();
        if (selectElement.childNodes[0] &&
            selectElement.childNodes[0].childNodes[0]) {
            preSelectionRange.setStart(selectElement.childNodes[0].childNodes[0], 0);
        }
        else {
            preSelectionRange.selectNodeContents(selectElement);
        }
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        position.start = preSelectionRange.toString().length;
        position.end = position.start + range.toString().length;
    }
    return position;
};
var setSelectionByPosition = function (start, end, editor) {
    var charIndex = 0;
    var line = 0;
    var pNode = editor.childNodes[line];
    var foundStart = false;
    var stop = false;
    start = Math.max(0, start);
    end = Math.max(0, end);
    var range = editor.ownerDocument.createRange();
    range.setStart(pNode || editor, 0);
    range.collapse(true);
    while (!stop && pNode) {
        var nextCharIndex = charIndex + pNode.textContent.length;
        if (!foundStart && start >= charIndex && start <= nextCharIndex) {
            if (start === 0) {
                range.setStart(pNode, 0);
            }
            else {
                if (pNode.childNodes[0].nodeType === 3) {
                    range.setStart(pNode.childNodes[0], start - charIndex);
                }
                else if (pNode.nextSibling) {
                    range.setStartBefore(pNode.nextSibling);
                }
                else {
                    range.setStartAfter(pNode);
                }
            }
            foundStart = true;
            if (start === end) {
                stop = true;
                break;
            }
        }
        if (foundStart && end >= charIndex && end <= nextCharIndex) {
            if (end === 0) {
                range.setEnd(pNode, 0);
            }
            else {
                if (pNode.childNodes[0].nodeType === 3) {
                    range.setEnd(pNode.childNodes[0], end - charIndex);
                }
                else if (pNode.nextSibling) {
                    range.setEndBefore(pNode.nextSibling);
                }
                else {
                    range.setEndAfter(pNode);
                }
            }
            stop = true;
        }
        charIndex = nextCharIndex;
        pNode = editor.childNodes[++line];
    }
    if (!stop && editor.childNodes[line - 1]) {
        range.setStartBefore(editor.childNodes[line - 1]);
    }
    setSelectionFocus(range);
    return range;
};
var setRangeByWbr = function (element, range) {
    var wbrElement = element.querySelector("wbr");
    if (!wbrElement) {
        return;
    }
    if (!wbrElement.previousElementSibling) {
        if (wbrElement.previousSibling) {
            // text<wbr>
            range.setStart(wbrElement.previousSibling, wbrElement.previousSibling.textContent.length);
        }
        else if (wbrElement.nextSibling) {
            if (wbrElement.nextSibling.nodeType === 3) {
                // <wbr>text
                range.setStart(wbrElement.nextSibling, 0);
            }
            else {
                // <wbr><br> https://github.com/Vanessa219/vditor/issues/400
                range.setStartBefore(wbrElement.nextSibling);
            }
        }
        else {
            // 内容为空
            range.setStart(wbrElement.parentElement, 0);
        }
    }
    else {
        if (wbrElement.previousElementSibling.isSameNode(wbrElement.previousSibling)) {
            if (wbrElement.previousElementSibling.lastChild) {
                // <em>text</em><wbr>
                range.setStartBefore(wbrElement);
                range.collapse(true);
                setSelectionFocus(range);
                // fix Chrome set range bug: **c**
                if (isChrome() &&
                    (wbrElement.previousElementSibling.tagName === "EM" ||
                        wbrElement.previousElementSibling.tagName ===
                            "STRONG" ||
                        wbrElement.previousElementSibling.tagName === "S")) {
                    range.insertNode(document.createTextNode(Constants.ZWSP));
                    range.collapse(false);
                }
                wbrElement.remove();
                return;
            }
            else {
                // <br><wbr>
                range.setStartAfter(wbrElement.previousElementSibling);
            }
        }
        else {
            // <em>text</em>text<wbr>
            range.setStart(wbrElement.previousSibling, wbrElement.previousSibling.textContent.length);
        }
    }
    range.collapse(true);
    wbrElement.remove();
    setSelectionFocus(range);
};
var insertHTML = function (html, vditor) {
    // 使用 lute 方法会添加 p 元素，只有一个 p 元素的时候进行删除
    var tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    var tempBlockElement = tempElement.querySelectorAll("p");
    if (tempBlockElement.length === 1 &&
        !tempBlockElement[0].previousSibling &&
        !tempBlockElement[0].nextSibling &&
        vditor[vditor.currentMode].element.children.length > 0 &&
        tempElement.firstElementChild.tagName === "P") {
        html = tempBlockElement[0].innerHTML.trim();
    }
    var pasteElement = document.createElement("div");
    pasteElement.innerHTML = html;
    var range = getEditorRange(vditor);
    if (range.toString() !== "") {
        vditor[vditor.currentMode].preventInput = true;
        document.execCommand("delete", false, "");
    }
    if (pasteElement.firstElementChild &&
        pasteElement.firstElementChild.getAttribute("data-block") === "0") {
        // 粘贴内容为块元素时，应在下一段落中插入
        pasteElement.lastElementChild.insertAdjacentHTML("beforeend", "<wbr>");
        var blockElement = hasClosestBlock(range.startContainer);
        if (!blockElement) {
            vditor[vditor.currentMode].element.insertAdjacentHTML("beforeend", pasteElement.innerHTML);
        }
        else {
            var liElement = hasClosestByMatchTag(range.startContainer, "LI");
            if (liElement && pasteElement.firstElementChild.tagName === "UL") {
                liElement.insertAdjacentHTML("afterend", pasteElement.firstElementChild.innerHTML);
            }
            else {
                blockElement.insertAdjacentHTML("afterend", pasteElement.innerHTML);
            }
        }
        setRangeByWbr(vditor[vditor.currentMode].element, range);
    }
    else {
        var pasteTemplate = document.createElement("template");
        pasteTemplate.innerHTML = html;
        range.insertNode(pasteTemplate.content.cloneNode(true));
        range.collapse(false);
        setSelectionFocus(range);
    }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ method)
});

// EXTERNAL MODULE: ./src/ts/markdown/abcRender.ts
var abcRender = __webpack_require__(135);
// EXTERNAL MODULE: ./src/ts/markdown/adapterRender.ts
var adapterRender = __webpack_require__(840);
// EXTERNAL MODULE: ./src/ts/markdown/chartRender.ts
var chartRender = __webpack_require__(775);
// EXTERNAL MODULE: ./src/ts/markdown/codeRender.ts
var codeRender = __webpack_require__(428);
// EXTERNAL MODULE: ./src/ts/markdown/flowchartRender.ts
var flowchartRender = __webpack_require__(325);
// EXTERNAL MODULE: ./src/ts/markdown/graphvizRender.ts
var graphvizRender = __webpack_require__(483);
// EXTERNAL MODULE: ./src/ts/markdown/highlightRender.ts
var highlightRender = __webpack_require__(999);
;// CONCATENATED MODULE: ./src/ts/markdown/lazyLoadImageRender.ts
var lazyLoadImageRender = function (element) {
    if (element === void 0) { element = document; }
    var loadImg = function (it) {
        var testImage = document.createElement("img");
        testImage.src = it.getAttribute("data-src");
        testImage.addEventListener("load", function () {
            if (!it.getAttribute("style") && !it.getAttribute("class") &&
                !it.getAttribute("width") && !it.getAttribute("height")) {
                if (testImage.naturalHeight > testImage.naturalWidth &&
                    testImage.naturalWidth / testImage.naturalHeight <
                        document.querySelector(".vditor-reset").clientWidth / (window.innerHeight - 40) &&
                    testImage.naturalHeight > (window.innerHeight - 40)) {
                    it.style.height = (window.innerHeight - 40) + "px";
                }
            }
            it.src = testImage.src;
        });
        it.removeAttribute("data-src");
    };
    if (!("IntersectionObserver" in window)) {
        element.querySelectorAll("img").forEach(function (imgElement) {
            if (imgElement.getAttribute("data-src")) {
                loadImg(imgElement);
            }
        });
        return false;
    }
    if (window.vditorImageIntersectionObserver) {
        window.vditorImageIntersectionObserver.disconnect();
        element.querySelectorAll("img").forEach(function (imgElement) {
            window.vditorImageIntersectionObserver.observe(imgElement);
        });
    }
    else {
        window.vditorImageIntersectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entrie) {
                if ((typeof entrie.isIntersecting === "undefined"
                    ? entrie.intersectionRatio !== 0
                    : entrie.isIntersecting)
                    && entrie.target.getAttribute("data-src")) {
                    loadImg(entrie.target);
                }
            });
        });
        element.querySelectorAll("img").forEach(function (imgElement) {
            window.vditorImageIntersectionObserver.observe(imgElement);
        });
    }
};

// EXTERNAL MODULE: ./src/ts/markdown/mathRender.ts
var mathRender = __webpack_require__(472);
// EXTERNAL MODULE: ./src/ts/markdown/mediaRender.ts
var mediaRender = __webpack_require__(280);
// EXTERNAL MODULE: ./src/ts/markdown/mermaidRender.ts
var mermaidRender = __webpack_require__(637);
// EXTERNAL MODULE: ./src/ts/markdown/SMILESRender.ts
var SMILESRender = __webpack_require__(825);
// EXTERNAL MODULE: ./src/ts/markdown/markmapRender.ts
var markmapRender = __webpack_require__(11);
// EXTERNAL MODULE: ./src/ts/markdown/mindmapRender.ts
var mindmapRender = __webpack_require__(194);
// EXTERNAL MODULE: ./src/ts/markdown/outlineRender.ts
var outlineRender = __webpack_require__(436);
// EXTERNAL MODULE: ./src/ts/markdown/plantumlRender.ts
var plantumlRender = __webpack_require__(229);
// EXTERNAL MODULE: ./src/ts/constants.ts
var constants = __webpack_require__(145);
// EXTERNAL MODULE: ./src/ts/ui/setContentTheme.ts
var setContentTheme = __webpack_require__(538);
// EXTERNAL MODULE: ./src/ts/util/addScript.ts
var addScript = __webpack_require__(413);
// EXTERNAL MODULE: ./src/ts/util/hasClosest.ts
var hasClosest = __webpack_require__(106);
// EXTERNAL MODULE: ./src/ts/util/merge.ts
var merge = __webpack_require__(673);
;// CONCATENATED MODULE: ./src/ts/markdown/anchorRender.ts
var anchorRender = function (type) {
    document.querySelectorAll(".vditor-anchor").forEach(function (anchor) {
        if (type === 1) {
            anchor.classList.add("vditor-anchor--left");
        }
        anchor.onclick = function () {
            var id = anchor.getAttribute("href").substr(1);
            var top = document.getElementById("vditorAnchor-" + id).offsetTop;
            document.querySelector("html").scrollTop = top;
        };
    });
    window.onhashchange = function () {
        var element = document.getElementById("vditorAnchor-" + decodeURIComponent(window.location.hash.substr(1)));
        if (element) {
            document.querySelector("html").scrollTop = element.offsetTop;
        }
    };
};

// EXTERNAL MODULE: ./src/ts/markdown/setLute.ts
var setLute = __webpack_require__(214);
// EXTERNAL MODULE: ./src/ts/util/selection.ts
var selection = __webpack_require__(810);
;// CONCATENATED MODULE: ./src/ts/markdown/speechRender.ts

var speechRender = function (element, lang) {
    if (lang === void 0) { lang = "zh_CN"; }
    if (typeof speechSynthesis === "undefined" || typeof SpeechSynthesisUtterance === "undefined") {
        return;
    }
    var getVoice = function () {
        var voices = speechSynthesis.getVoices();
        var currentVoice;
        var defaultVoice;
        voices.forEach(function (item) {
            if (item.lang === lang.replace("_", "-")) {
                currentVoice = item;
            }
            if (item.default) {
                defaultVoice = item;
            }
        });
        if (!currentVoice) {
            currentVoice = defaultVoice;
        }
        return currentVoice;
    };
    var playSVG = '<svg><use xlink:href="#vditor-icon-play"></use></svg>';
    var pauseSVG = '<svg><use xlink:href="#vditor-icon-pause"></use></svg>';
    if (!document.getElementById("vditorIconScript")) {
        playSVG = '<svg viewBox="0 0 32 32"><path d="M3.436 0l25.128 16-25.128 16v-32z"></path></svg>';
        pauseSVG = '<svg viewBox="0 0 32 32"><path d="M20.617 0h9.128v32h-9.128v-32zM2.255 32v-32h9.128v32h-9.128z"></path></svg>';
    }
    var speechDom = document.querySelector(".vditor-speech");
    if (!speechDom) {
        speechDom = document.createElement("button");
        speechDom.className = "vditor-speech";
        element.insertAdjacentElement("beforeend", speechDom);
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = getVoice;
        }
    }
    var voice = getVoice();
    var utterThis = new SpeechSynthesisUtterance();
    utterThis.voice = voice;
    utterThis.onend = utterThis.onerror = function () {
        speechDom.style.display = "none";
        speechSynthesis.cancel();
        speechDom.classList.remove("vditor-speech--current");
        speechDom.innerHTML = playSVG;
    };
    element.addEventListener(window.ontouchstart !== undefined ? "touchend" : "click", function (event) {
        var target = event.target;
        if (target.classList.contains("vditor-speech") || target.parentElement.classList.contains("vditor-speech")) {
            if (!speechDom.classList.contains("vditor-speech--current")) {
                utterThis.text = speechDom.getAttribute("data-text");
                speechSynthesis.speak(utterThis);
                speechDom.classList.add("vditor-speech--current");
                speechDom.innerHTML = pauseSVG;
            }
            else {
                if (speechSynthesis.speaking) {
                    if (speechSynthesis.paused) {
                        speechSynthesis.resume();
                        speechDom.innerHTML = pauseSVG;
                    }
                    else {
                        speechSynthesis.pause();
                        speechDom.innerHTML = playSVG;
                    }
                }
            }
            (0,selection/* setSelectionFocus */.Hc)(window.vditorSpeechRange);
            element.focus();
            return;
        }
        speechDom.style.display = "none";
        speechSynthesis.cancel();
        speechDom.classList.remove("vditor-speech--current");
        speechDom.innerHTML = playSVG;
        if (getSelection().rangeCount === 0) {
            return;
        }
        var range = getSelection().getRangeAt(0);
        var text = range.toString().trim();
        if (!text) {
            return;
        }
        window.vditorSpeechRange = range.cloneRange();
        var rect = range.getBoundingClientRect();
        speechDom.innerHTML = playSVG;
        speechDom.style.display = "block";
        speechDom.style.top = (rect.top + rect.height + document.querySelector("html").scrollTop - 20) + "px";
        if (window.ontouchstart !== undefined) {
            speechDom.style.left = (event.changedTouches[event.changedTouches.length - 1].pageX + 2) + "px";
        }
        else {
            speechDom.style.left = (event.clientX + 2) + "px";
        }
        speechDom.setAttribute("data-text", text);
    });
};

// EXTERNAL MODULE: ./src/ts/markdown/selectionRender.ts
var selectionRender = __webpack_require__(616);
// EXTERNAL MODULE: ./src/ts/util/mathSelection.ts
var mathSelection = __webpack_require__(35);
;// CONCATENATED MODULE: ./src/ts/markdown/previewRender.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
























var mergeOptions = function (options) {
    var _a;
    var defaultOption = {
        anchor: 0,
        cdn: constants/* Constants.CDN */.g.CDN,
        customEmoji: {},
        emojiPath: "".concat(constants/* Constants.CDN */.g.CDN, "/dist/images/emoji"),
        hljs: constants/* Constants.HLJS_OPTIONS */.g.HLJS_OPTIONS,
        icon: "ant",
        lang: "zh_CN",
        markdown: constants/* Constants.MARKDOWN_OPTIONS */.g.MARKDOWN_OPTIONS,
        math: constants/* Constants.MATH_OPTIONS */.g.MATH_OPTIONS,
        mode: "light",
        link: {
            isOpen: true,
        },
        speech: {
            enable: false,
        },
        runCode: {
            enable: false,
        },
        render: {
            media: {
                enable: true,
            },
        },
        theme: constants/* Constants.THEME_OPTIONS */.g.THEME_OPTIONS,
    };
    if (options.cdn) {
        if (!((_a = options.theme) === null || _a === void 0 ? void 0 : _a.path)) {
            defaultOption.theme.path = "".concat(options.cdn, "/dist/css/content-theme");
        }
        if (!options.emojiPath) {
            defaultOption.emojiPath = "".concat(options.cdn, "/dist/images/emoji");
        }
    }
    return (0,merge/* merge */.T)(defaultOption, options);
};
var md2html = function (mdText, options) {
    var mergedOptions = mergeOptions(options);
    return (0,addScript/* addScript */.G)("".concat(mergedOptions.cdn, "/dist/js/lute/lute.min.js"), "vditorLuteScript").then(function () {
        var lute = (0,setLute/* setLute */.X)({
            autoSpace: mergedOptions.markdown.autoSpace,
            gfmAutoLink: mergedOptions.markdown.gfmAutoLink,
            codeBlockPreview: mergedOptions.markdown.codeBlockPreview,
            emojiSite: mergedOptions.emojiPath,
            emojis: mergedOptions.customEmoji,
            fixTermTypo: mergedOptions.markdown.fixTermTypo,
            footnotes: mergedOptions.markdown.footnotes,
            headingAnchor: mergedOptions.anchor !== 0,
            inlineMathDigit: mergedOptions.math.inlineDigit,
            lazyLoadImage: mergedOptions.lazyLoadImage,
            linkBase: mergedOptions.markdown.linkBase,
            linkPrefix: mergedOptions.markdown.linkPrefix,
            listStyle: mergedOptions.markdown.listStyle,
            mark: mergedOptions.markdown.mark,
            mathBlockPreview: mergedOptions.markdown.mathBlockPreview,
            paragraphBeginningSpace: mergedOptions.markdown.paragraphBeginningSpace,
            sanitize: mergedOptions.markdown.sanitize,
            sub: mergedOptions.markdown.sub,
            sup: mergedOptions.markdown.sup,
            toc: mergedOptions.markdown.toc,
        });
        if (options === null || options === void 0 ? void 0 : options.renderers) {
            lute.SetJSRenderers({
                renderers: {
                    Md2HTML: options.renderers,
                },
            });
        }
        lute.SetHeadingID(true);
        return lute.Md2HTML(mdText);
    });
};
/**
 * 预览区域渲染入口
 * - 负责将 Markdown 转为 HTML 并对各类增强特性进行初始化
 * - 支持目录点击定位与链接点击行为配置（link.click / link.isOpen）
 * @param previewElement 预览容器元素
 * @param markdown Markdown 文本内容
 * @param options 预览配置项，支持 link 点击行为自定义
 */
var previewRender = function (previewElement, markdown, options) { return __awaiter(void 0, void 0, void 0, function () {
    var mergedOptions, html, i18nScriptPrefix, i18nScriptID_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mergedOptions = mergeOptions(options);
                return [4 /*yield*/, md2html(markdown, mergedOptions)];
            case 1:
                html = _a.sent();
                if (mergedOptions.transform) {
                    html = mergedOptions.transform(html);
                }
                previewElement.innerHTML = html;
                previewElement.classList.add("vditor-reset");
                if (!!mergedOptions.i18n) return [3 /*break*/, 5];
                if (!![
                    "de_DE",
                    "en_US",
                    "es_ES",
                    "fr_FR",
                    "ja_JP",
                    "ko_KR",
                    "pt_BR",
                    "ru_RU",
                    "sv_SE",
                    "vi_VN",
                    "zh_CN",
                    "zh_TW",
                ].includes(mergedOptions.lang)) return [3 /*break*/, 2];
                throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
            case 2:
                i18nScriptPrefix = "vditorI18nScript";
                i18nScriptID_1 = i18nScriptPrefix + mergedOptions.lang;
                document
                    .querySelectorAll("head script[id^=\"".concat(i18nScriptPrefix, "\"]"))
                    .forEach(function (el) {
                    if (el.id !== i18nScriptID_1) {
                        document.head.removeChild(el);
                    }
                });
                return [4 /*yield*/, (0,addScript/* addScript */.G)("".concat(mergedOptions.cdn, "/dist/js/i18n/").concat(mergedOptions.lang, ".js"), i18nScriptID_1)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                window.VditorI18n = mergedOptions.i18n;
                _a.label = 6;
            case 6:
                if (!mergedOptions.icon) return [3 /*break*/, 8];
                return [4 /*yield*/, (0,addScript/* addScript */.G)("".concat(mergedOptions.cdn, "/dist/js/icons/").concat(mergedOptions.icon, ".js"), "vditorIconScript")];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                (0,setContentTheme/* setContentTheme */.Z)(mergedOptions.theme.current, mergedOptions.theme.path);
                if (mergedOptions.anchor === 1) {
                    previewElement.classList.add("vditor-reset--anchor");
                }
                (0,codeRender/* codeRender */.O)(previewElement, mergedOptions.hljs, mergedOptions.runCode);
                (0,highlightRender/* highlightRender */.s)(mergedOptions.hljs, previewElement, mergedOptions.cdn);
                (0,mathRender/* mathRender */.H)(previewElement, {
                    cdn: mergedOptions.cdn,
                    math: mergedOptions.math,
                });
                (0,mermaidRender/* mermaidRender */.i)(previewElement, mergedOptions.cdn, mergedOptions.mode);
                (0,SMILESRender/* SMILESRender */.J)(previewElement, mergedOptions.cdn, mergedOptions.mode);
                (0,markmapRender/* markmapRender */.K)(previewElement, mergedOptions.cdn);
                (0,flowchartRender/* flowchartRender */.P)(previewElement, mergedOptions.cdn);
                (0,graphvizRender/* graphvizRender */.v)(previewElement, mergedOptions.cdn);
                (0,chartRender/* chartRender */.p)(previewElement, mergedOptions.cdn, mergedOptions.mode);
                (0,mindmapRender/* mindmapRender */.P)(previewElement, mergedOptions.cdn, mergedOptions.mode);
                (0,plantumlRender/* plantumlRender */.B)(previewElement, mergedOptions.cdn);
                (0,abcRender/* abcRender */.Q)(previewElement, mergedOptions.cdn);
                (0,selectionRender/* selectionRender */.V)(previewElement);
                if (mergedOptions.render.media.enable) {
                    (0,mediaRender/* mediaRender */.Y)(previewElement);
                }
                if (mergedOptions.speech.enable) {
                    speechRender(previewElement);
                }
                if (mergedOptions.anchor !== 0) {
                    anchorRender(mergedOptions.anchor);
                }
                if (mergedOptions.after) {
                    mergedOptions.after();
                }
                if (mergedOptions.lazyLoadImage) {
                    lazyLoadImageRender(previewElement);
                }
                // 绑定数学公式选中高亮监听
                (0,mathSelection/* bindMathSelectionListener */.I)(previewElement);
                // 绑定复制事件，处理数学公式源码复制
                previewElement.addEventListener("copy", function (event) {
                    var selection = window.getSelection();
                    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
                        return;
                    }
                    var range = selection.getRangeAt(0);
                    // 检查选区是否只包含单个数学公式
                    var mathElement = (0,hasClosest/* hasClosestByClassName */.fb)(range.startContainer, "language-math");
                    var mathEndElement = (0,hasClosest/* hasClosestByClassName */.fb)(range.endContainer, "language-math");
                    // 如果选区的起点和终点都在同一个数学公式元素内，复制源码
                    if (mathElement &&
                        mathEndElement &&
                        mathElement.isSameNode(mathEndElement)) {
                        event.stopPropagation();
                        event.preventDefault();
                        var mathSource = mathElement.getAttribute("data-math") || range.toString();
                        event.clipboardData.setData("text/plain", mathSource);
                        event.clipboardData.setData("text/html", "");
                        return;
                    }
                    // 处理包含多个公式的混合内容
                    var fragment = range.cloneContents();
                    var mathElements = fragment.querySelectorAll(".language-math");
                    if (mathElements.length > 0) {
                        event.stopPropagation();
                        event.preventDefault();
                        // 创建临时容器来处理内容
                        var tempDiv = document.createElement("div");
                        tempDiv.appendChild(fragment);
                        // 替换所有数学公式为源码
                        tempDiv
                            .querySelectorAll(".language-math")
                            .forEach(function (mathEl) {
                            var mathSource = mathEl.getAttribute("data-math");
                            if (mathSource) {
                                if (mathEl.tagName === "SPAN") {
                                    var textNode = document.createTextNode("$".concat(mathSource, "$"));
                                    mathEl.parentNode.replaceChild(textNode, mathEl);
                                }
                                else {
                                    var textNode = document.createTextNode("$$".concat(mathSource, "$$"));
                                    mathEl.parentNode.replaceChild(textNode, mathEl);
                                }
                            }
                        });
                        // 获取纯文本内容
                        var plainText = tempDiv.textContent || tempDiv.innerText || "";
                        event.clipboardData.setData("text/plain", plainText);
                        event.clipboardData.setData("text/html", "");
                    }
                });
                previewElement.addEventListener("click", function (event) {
                    var _a, _b;
                    var spanElement = (0,hasClosest/* hasClosestByMatchTag */.lG)(event.target, "SPAN");
                    if (spanElement &&
                        (0,hasClosest/* hasClosestByClassName */.fb)(spanElement, "vditor-toc")) {
                        var headingElement = previewElement.querySelector("#" + spanElement.getAttribute("data-target-id"));
                        if (headingElement) {
                            window.scrollTo(window.scrollX, headingElement.offsetTop);
                        }
                        return;
                    }
                    if (event.target.tagName === "A") {
                        if ((_a = mergedOptions.link) === null || _a === void 0 ? void 0 : _a.click) {
                            mergedOptions.link.click(event.target);
                        }
                        else if ((_b = mergedOptions.link) === null || _b === void 0 ? void 0 : _b.isOpen) {
                            window.open(event.target.getAttribute("href"));
                        }
                        event.preventDefault();
                        return;
                    }
                });
                return [2 /*return*/];
        }
    });
}); };

// EXTERNAL MODULE: ./src/ts/preview/image.ts
var preview_image = __webpack_require__(190);
// EXTERNAL MODULE: ./src/ts/ui/setCodeTheme.ts
var setCodeTheme = __webpack_require__(580);
// EXTERNAL MODULE: ./src/ts/markdown/getMarkdown.ts
var getMarkdown = __webpack_require__(210);
// EXTERNAL MODULE: ./src/ts/util/attachLineNumbers.ts
var attachLineNumbers = __webpack_require__(626);
;// CONCATENATED MODULE: ./src/method.ts
























var Vditor = /** @class */ (function () {
    function Vditor() {
    }
    /**
     * 外部更新行号：传入实例并根据配置进行同步/节流更新
     */
    Vditor.updateLineNumbers = function (instance, immediate) {
        var _a, _b, _c;
        if (immediate === void 0) { immediate = false; }
        try {
            var v = (_a = instance === null || instance === void 0 ? void 0 : instance.vditor) !== null && _a !== void 0 ? _a : instance;
            if (!((_c = (_b = v === null || v === void 0 ? void 0 : v.options) === null || _b === void 0 ? void 0 : _b.lineNumber) === null || _c === void 0 ? void 0 : _c.enable))
                return;
            var text = (0,getMarkdown/* getMarkdown */.O)(v);
            var root = v[v.currentMode].element;
            if (immediate) {
                (0,attachLineNumbers/* attachLineNumbersToBlocks */.t)(root, text);
            }
            else {
                (0,attachLineNumbers/* attachLineNumbersToBlocksThrottled */.g)(root, text);
            }
        }
        catch (_d) { }
    };
    /** 点击图片放大 */
    Vditor.adapterRender = adapterRender;
    /** 点击图片放大 */
    Vditor.previewImage = preview_image/* previewImage */.E;
    /** 为 element 中的代码块添加复制按钮 */
    Vditor.codeRender = codeRender/* codeRender */.O;
    /** 对 graphviz 进行渲染 */
    Vditor.graphvizRender = graphvizRender/* graphvizRender */.v;
    /** 为 element 中的代码块进行高亮渲染 */
    Vditor.highlightRender = highlightRender/* highlightRender */.s;
    /** 对数学公式进行渲染 */
    Vditor.mathRender = mathRender/* mathRender */.H;
    /** 流程图/时序图/甘特图渲染 */
    Vditor.mermaidRender = mermaidRender/* mermaidRender */.i;
    /** 化学物质结构渲染 */
    Vditor.SMILESRender = SMILESRender/* SMILESRender */.J;
    /** 支持 markdown 的思维导图 */
    Vditor.markmapRender = markmapRender/* markmapRender */.K;
    /** flowchart.js 渲染 */
    Vditor.flowchartRender = flowchartRender/* flowchartRender */.P;
    /** 图表渲染 */
    Vditor.chartRender = chartRender/* chartRender */.p;
    /** 五线谱渲染 */
    Vditor.abcRender = abcRender/* abcRender */.Q;
    /** 脑图渲染 */
    Vditor.mindmapRender = mindmapRender/* mindmapRender */.P;
    /** plantuml渲染 */
    Vditor.plantumlRender = plantumlRender/* plantumlRender */.B;
    /** 大纲渲染 */
    Vditor.outlineRender = outlineRender/* outlineRender */.k;
    /** 为[特定链接](https://github.com/Vanessa219/vditor/issues/7)分别渲染为视频、音频、嵌入的 iframe */
    Vditor.mediaRender = mediaRender/* mediaRender */.Y;
    /** 对选中的文字进行阅读 */
    Vditor.speechRender = speechRender;
    /** 渲染 selection 代码块为文件选择标签 */
    Vditor.selectionRender = selectionRender/* selectionRender */.V;
    /** 对图片进行懒加载 */
    Vditor.lazyLoadImageRender = lazyLoadImageRender;
    /** Markdown 文本转换为 HTML，该方法需使用[异步编程](https://ld246.com/article/1546828434083?r=Vaness) */
    Vditor.md2html = md2html;
    /** 页面 Markdown 文章渲染 */
    Vditor.preview = previewRender;
    /** 设置代码主题 */
    Vditor.setCodeTheme = setCodeTheme/* setCodeTheme */.Y;
    /** 设置内容主题 */
    Vditor.setContentTheme = setContentTheme/* setContentTheme */.Z;
    return Vditor;
}());
/* harmony default export */ const method = (Vditor);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});