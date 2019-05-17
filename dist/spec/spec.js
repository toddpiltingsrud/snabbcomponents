/******/ (function (modules) {
    /******/ // The module cache
    /******/ var installedModules = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
            /******/ return installedModules[moduleId].exports;
            /******/ }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {}
            /******/ 
        };
        /******/
        /******/ // Execute the module function
        /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/ module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/ 
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/ __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/ __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/ __webpack_require__.d = function (exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/ }
        /******/ 
    };
    /******/
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = function (exports) {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/ }
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/ 
    };
    /******/
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require
    /******/ __webpack_require__.t = function (value, mode) {
        /******/ if (mode & 1)
            value = __webpack_require__(value);
        /******/ if (mode & 8)
            return value;
        /******/ if ((mode & 4) && typeof value === 'object' && value && value.__esModule)
            return value;
        /******/ var ns = Object.create(null);
        /******/ __webpack_require__.r(ns);
        /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        /******/ if (mode & 2 && typeof value != 'string')
            for (var key in value)
                __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
        /******/ return ns;
        /******/ 
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = function (module) {
        /******/ var getter = module && module.__esModule ?
            /******/ function getDefault() { return module['default']; } :
            /******/ function getModuleExports() { return module; };
        /******/ __webpack_require__.d(getter, 'a', getter);
        /******/ return getter;
        /******/ 
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/ __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ // __webpack_public_path__
    /******/ __webpack_require__.p = "";
    /******/
    /******/
    /******/ // Load entry module and return exports
    /******/ return __webpack_require__(__webpack_require__.s = "./spec/Spec_Component.js");
    /******/ 
})({
    /***/ "./index.ts": 
    /*!******************!*\
      !*** ./index.ts ***!
      \******************/
    /*! no static exports found */
    /***/ (function (module, exports) {
        eval("throw new Error(\"Module parse failed: Unexpected token (7:24)\\nYou may need an appropriate loader to handle this file type.\\n| import createVNode from \\\"vdom-virtualize\\\";\\r\\n| \\r\\n> export default abstract class Component extends HTMLElement {\\r\\n|     constructor() {\\r\\n|         super();\\r\");\n\n//# sourceURL=webpack:///./index.ts?");
        /***/ 
    }),
    /***/ "./spec/Spec_Component.js": 
    /*!********************************!*\
      !*** ./spec/Spec_Component.js ***!
      \********************************/
    /*! no exports provided */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.ts */ \"./index.ts\");\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_ts__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\ndescribe(\"Component\", function () {\n  it(\"should read search\", function () {\n    var url = \"?a=b&a=c&d=2\";\n    var attr = _index_ts__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.readSearch(url);\n    expect(Array.isArray(attr.a)).toEqual(true);\n  });\n  it(\"should read search\", function () {\n    var url = \"a=b&a=c&D=2&e=&f\";\n    var attr = _index_ts__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.readSearch(url);\n    expect(Array.isArray(attr.a)).toEqual(true);\n    expect(attr.a[0]).toEqual(\"b\");\n    expect(attr.a[1]).toEqual(\"c\");\n    expect(attr.d).toEqual(\"2\");\n    expect(attr.D).toBeUndefined();\n    expect(attr.e).toEqual(null);\n    expect(attr.f).toEqual(null);\n  });\n  it(\"should read search\", function () {\n    var url = \"\";\n    var attr = _index_ts__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.readSearch(url);\n    expect(attr).toBeDefined(true);\n  });\n  it(\"should decode\", function () {\n    var url = \"?a=this+is+a+test\";\n    var attr = _index_ts__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.readSearch(url);\n    expect(attr.a).toEqual(\"this is a test\");\n  });\n  it(\"should decode\", function () {\n    var set1 = \";,/?:@&=+$\";\n    var encoded = \"%3B%2C%2F%3F%3A%40%26%3D%2B%24\";\n    var url = \"?arg=\" + encoded;\n    var attr = _index_ts__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.readSearch(url);\n    expect(attr.arg).toEqual(set1);\n  });\n  it(\"should trigger custom events\", function (done) {\n    var eventname = \"customeventname\";\n    var detail = \"the detail of the event\";\n\n    var EventTest =\n    /*#__PURE__*/\n    function (_Component) {\n      _inherits(EventTest, _Component);\n\n      function EventTest() {\n        _classCallCheck(this, EventTest);\n\n        return _possibleConstructorReturn(this, _getPrototypeOf(EventTest).apply(this, arguments));\n      }\n\n      _createClass(EventTest, [{\n        key: \"render\",\n        value: function render(h) {\n          return _get(_getPrototypeOf(EventTest.prototype), \"render\", this).call(this, h);\n        }\n      }]);\n\n      return EventTest;\n    }(_index_ts__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n    customElements.define(\"event-test\", EventTest);\n\n    var handler = function handler(evt) {\n      expect(evt.detail).toEqual(detail);\n      document.body.removeChild(app);\n      done();\n    };\n\n    var app = document.createElement(\"event-test\");\n    document.body.appendChild(app);\n    document.addEventListener(eventname, handler);\n    app.triggerEvent(eventname, detail);\n  });\n  it(\"should throw if setState is called during render cycle\", function () {\n    var didThrow = false;\n\n    var badComponent =\n    /*#__PURE__*/\n    function (_Component2) {\n      _inherits(badComponent, _Component2);\n\n      function badComponent() {\n        _classCallCheck(this, badComponent);\n\n        return _possibleConstructorReturn(this, _getPrototypeOf(badComponent).apply(this, arguments));\n      }\n\n      _createClass(badComponent, [{\n        key: \"componentDidUpdate\",\n        value: function componentDidUpdate(nextProps, nextState) {\n          try {\n            this.setState({});\n          } catch (_unused) {\n            didThrow = true;\n          }\n        }\n      }, {\n        key: \"componentDidMount\",\n        value: function componentDidMount() {\n          this.setState({});\n        }\n      }]);\n\n      return badComponent;\n    }(_index_ts__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n    customElements.define(\"spents-setstateincorrectly\", badComponent);\n    var bad = document.createElement(\"spents-setstateincorrectly\");\n    document.body.appendChild(bad);\n    expect(didThrow).toEqual(true);\n    document.body.removeChild(bad);\n  });\n  it(\"should throw if setProps is called during render cycle\", function () {\n    var didThrow = false;\n\n    var badComponent =\n    /*#__PURE__*/\n    function (_Component3) {\n      _inherits(badComponent, _Component3);\n\n      function badComponent() {\n        _classCallCheck(this, badComponent);\n\n        return _possibleConstructorReturn(this, _getPrototypeOf(badComponent).apply(this, arguments));\n      }\n\n      _createClass(badComponent, [{\n        key: \"componentDidUpdate\",\n        value: function componentDidUpdate(nextProps, nextState) {\n          try {\n            this.setProps({});\n          } catch (_unused2) {\n            didThrow = true;\n          }\n        }\n      }, {\n        key: \"componentDidMount\",\n        value: function componentDidMount() {\n          this.setState({});\n        }\n      }]);\n\n      return badComponent;\n    }(_index_ts__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n    customElements.define(\"spents-setpropsincorrectly\", badComponent);\n    var bad = document.createElement(\"spents-setpropsincorrectly\");\n    document.body.appendChild(bad);\n    expect(didThrow).toEqual(true);\n    document.body.removeChild(bad);\n  });\n  it(\"should handle event delegation\", function () {\n    var handled = 0;\n\n    var comp2 =\n    /*#__PURE__*/\n    function (_Component4) {\n      _inherits(comp2, _Component4);\n\n      function comp2() {\n        _classCallCheck(this, comp2);\n\n        return _possibleConstructorReturn(this, _getPrototypeOf(comp2).apply(this, arguments));\n      }\n\n      _createClass(comp2, [{\n        key: \"handleClick\",\n        value: function handleClick(evt, target) {\n          handled++;\n          expect(target).toBeDefined();\n        }\n      }, {\n        key: \"componentDidMount\",\n        value: function componentDidMount() {\n          this.on(\"click\", \".btn\", this.handleClick);\n        }\n      }, {\n        key: \"render\",\n        value: function render(h) {\n          return h(\"div\", [h(\"button.btn.button1\"), h(\"button.btn.button2\")]);\n        }\n      }]);\n\n      return comp2;\n    }(_index_ts__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n    customElements.define(\"spents-comp2\", comp2);\n    var instance = document.createElement(\"spents-comp2\");\n    document.body.appendChild(instance);\n    var button1 = instance.querySelector(\"button.button1\");\n    var button2 = instance.querySelector(\"button.button2\");\n    button1.click();\n    button2.click();\n    expect(instance.eventHandlers.length).toEqual(1);\n    expect(handled).toEqual(2);\n    document.body.removeChild(instance);\n    expect(instance.eventHandlers.length).toEqual(0);\n  });\n  it(\"should not supplant\", function () {\n    var c =\n    /*#__PURE__*/\n    function (_Component5) {\n      _inherits(c, _Component5);\n\n      function c() {\n        var _this;\n\n        _classCallCheck(this, c);\n\n        _this = _possibleConstructorReturn(this, _getPrototypeOf(c).call(this));\n        _this.supplant = false;\n        return _this;\n      }\n\n      return c;\n    }(_index_ts__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n    customElements.define(\"spents-shouldnotsupplant\", c);\n    var instance = document.createElement(\"spents-shouldnotsupplant\");\n    document.body.appendChild(instance);\n    var element = document.querySelector(\"spents-shouldnotsupplant\");\n    expect(element).toBeDefined();\n    document.body.removeChild(instance);\n  });\n  it(\"should supplant\", function () {\n    var c =\n    /*#__PURE__*/\n    function (_Component6) {\n      _inherits(c, _Component6);\n\n      function c() {\n        var _this2;\n\n        _classCallCheck(this, c);\n\n        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(c).call(this));\n        _this2.supplant = true;\n        return _this2;\n      }\n\n      return c;\n    }(_index_ts__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n    customElements.define(\"spents-shouldsupplant\", c);\n    var instance = document.createElement(\"spents-shouldsupplant\");\n    document.body.appendChild(instance);\n    var element = document.querySelector(\"spents-shouldsupplant\");\n    expect(element).toEqual(null);\n  });\n  it(\"should pass props from parent to child\", function () {\n    var data = [1, 2, 3];\n\n    var parent =\n    /*#__PURE__*/\n    function (_Component7) {\n      _inherits(parent, _Component7);\n\n      function parent() {\n        _classCallCheck(this, parent);\n\n        return _possibleConstructorReturn(this, _getPrototypeOf(parent).apply(this, arguments));\n      }\n\n      _createClass(parent, [{\n        key: \"render\",\n        value: function render(h) {\n          return h(\"div\", h(\"spents-child\", {\n            props: {\n              data: data\n            }\n          }));\n        }\n      }]);\n\n      return parent;\n    }(_index_ts__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n    var child =\n    /*#__PURE__*/\n    function (_Component8) {\n      _inherits(child, _Component8);\n\n      function child() {\n        _classCallCheck(this, child);\n\n        return _possibleConstructorReturn(this, _getPrototypeOf(child).apply(this, arguments));\n      }\n\n      _createClass(child, [{\n        key: \"render\",\n        value: function render(h) {\n          return h(\"ul\", this.props.data.map(function (item) {\n            return h(\"li\", {}, item);\n          }));\n        }\n      }]);\n\n      return child;\n    }(_index_ts__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n    customElements.define(\"spents-parent\", parent);\n    customElements.define(\"spents-child\", child);\n    var instance = document.createElement(\"spents-parent\");\n    document.body.appendChild(instance);\n    var list = instance.querySelectorAll(\"li\");\n\n    for (var i = 0; i < data.length; i++) {\n      expect(list[i].textContent).toEqual(data[i].toString());\n    }\n\n    document.body.removeChild(instance);\n  });\n});\n\n//# sourceURL=webpack:///./spec/Spec_Component.js?");
        /***/ 
    })
    /******/ 
});
