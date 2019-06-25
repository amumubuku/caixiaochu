/*!
 * we-validator
 * version: 2.1.0
 * address: https://github.com/ChanceYu/we-validator#readme
 * author:  ChanceYu
 * license: MIT
 */
! function (root, factory) {
  "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("WeValidator", [], factory) : "object" == typeof exports ? exports.WeValidator = factory() : root.WeValidator = factory()
}("undefined" != typeof self ? self : this, function () {
  return function (modules) {
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) return installedModules[moduleId].exports;
      var module = installedModules[moduleId] = {
        i: moduleId,
        l: !1,
        exports: {}
      };
      return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports
    }
    var installedModules = {};
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function (exports, name, getter) {
      __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
        configurable: !1,
        enumerable: !0,
        get: getter
      })
    }, __webpack_require__.n = function (module) {
      var getter = module && module.__esModule ? function () {
        return module.default
      } : function () {
        return module
      };
      return __webpack_require__.d(getter, "a", getter), getter
    }, __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property)
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0)
  }([function (module, exports, __webpack_require__) {
    "use strict";

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
    }
    var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
          }
        }
        return function (Constructor, protoProps, staticProps) {
          return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
        }
      }(),
      _rules = __webpack_require__(1),
      _rules2 = function (obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        }
      }(_rules),
      isWx = "undefined" != typeof wx && !!wx.showToast,
      isMy = "undefined" != typeof my && !!my.showToast,
      isSwan = "undefined" != typeof swan && !!swan.showToast,
      isTt = "undefined" != typeof tt && !!tt.showToast,
      isBrowser = "undefined" != typeof window && !!window.alert,
      objString = Object.prototype.toString,
      isArray = Array.isArray || function (v) {
        return "[object Array]" === objString.call(v)
      },
      isFunction = function (v) {
        return "[object Function]" === objString.call(v)
      },
      isRegExp = function (v) {
        return "[object RegExp]" === objString.call(v)
      },
      WeValidator = function () {
        function WeValidator() {
          var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          _classCallCheck(this, WeValidator), this.options = Object.assign({}, WeValidator.defaultOptions, options), this.required = WeValidator.RULES.required.rule, this._checkAllRules()
        }
        return _createClass(WeValidator, [{
          key: "_showErrorMessage",
          value: function (params, onMessage) {
            return isFunction(onMessage) ? onMessage(params) : isFunction(this.options.onMessage) ? this.options.onMessage(params) : isFunction(WeValidator.onMessage) ? WeValidator.onMessage(params) : isWx ? wx.showToast({
              title: params.msg,
              icon: "none"
            }) : isMy ? my.showToast({
              content: params.msg,
              type: "none"
            }) : isSwan ? swan.showToast({
              title: params.msg,
              icon: "none"
            }) : isTt ? tt.showToast({
              title: params.msg,
              icon: "none"
            }) : void(isBrowser && alert(params.msg))
          }
        }, {
          key: "_getErrorMessage",
          value: function (ruleName, attr, param) {
            var messages = this.options.messages,
              defaultMessage = WeValidator.RULES[ruleName].message;
            if (messages.hasOwnProperty(attr) && messages[attr][ruleName] && (defaultMessage = messages[attr][ruleName]), defaultMessage) return defaultMessage = defaultMessage.replace(/\{(\d)\}/g, function ($0, $1) {
              return isArray(param) ? param[$1] : param
            })
          }
        }, {
          key: "_isRuleInvalid",
          value: function (ruleName, attr) {
            if (!WeValidator.RULES.hasOwnProperty(ruleName)) return console.warn && console.warn("没有此验证规则：" + ruleName + "，字段：" + attr), !0
          }
        }, {
          key: "_checkAllRules",
          value: function () {
            var _rules_ = this.options.rules;
            for (var attr in _rules_)
              for (var ruleName in _rules_[attr]) this._isRuleInvalid(ruleName, attr)
          }
        }, {
          key: "checkData",
          value: function (data, onMessage) {
            var showMessage = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
              _rules_ = this.options.rules,
              multiCheck = this.options.multiCheck,
              hasError = !1,
              errorData = {};
            this.data = data;
            for (var attr in _rules_)
              for (var ruleName in _rules_[attr])
                if (!this._isRuleInvalid(ruleName, attr)) {
                  var ruleParam = _rules_[attr][ruleName],
                    value = "";
                  data.hasOwnProperty(attr) && (value = data[attr]);
                  var param = ruleParam;
                  if (isFunction(ruleParam) && (param = ruleParam.call(this, value)), !WeValidator.checkField.call(this, ruleName, value, param)) {
                    var msg = this._getErrorMessage(ruleName, attr, param);
                    if (showMessage && msg) {
                      var errorParam = {
                        name: attr,
                        value: value,
                        param: param,
                        rule: ruleName,
                        msg: msg
                      };
                      errorData[attr] = errorParam, multiCheck || this._showErrorMessage(errorParam, onMessage)
                    }
                    if (hasError = !0, !multiCheck) return !1
                  }
                } return !hasError || (multiCheck && this._showErrorMessage(errorData, onMessage), !1)
          }
        }, {
          key: "addRules",
          value: function () {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Object.assign(this.options.rules, options.rules || {}), Object.assign(this.options.messages, options.messages || {}), this._checkAllRules()
          }
        }, {
          key: "removeRules",
          value: function (fields) {
            if (!isArray(fields)) throw new Error("参数须为数组");
            for (var i = 0; i < fields.length; i++) {
              var key = fields[i];
              delete this.options.rules[key]
            }
          }
        }, {
          key: "isValid",
          value: function (data) {
            return this.checkData(data, null, !1)
          }
        }]), WeValidator
      }();
    WeValidator.defaultOptions = {
      rules: {},
      messages: {},
      onMessage: null,
      multiCheck: !1
    }, WeValidator.RULES = {}, WeValidator.addRule = function (ruleName, ruleValue) {
      WeValidator.RULES[ruleName] = ruleValue
    }, WeValidator.checkField = function (ruleName, value, param) {
      var rule = WeValidator.RULES[ruleName].rule;
      return isRegExp(rule) ? !this.required(value) || rule.test(value) : isFunction(rule) ? rule.call(this, value, param) : void 0
    }, WeValidator.RULES = _rules2.default, WeValidator.required = WeValidator.RULES.required.rule, module.exports = WeValidator
  }, function (module, exports, __webpack_require__) {
    "use strict";
    module.exports = {
      required: {
        message: "此字段必填",
        rule: function (value) {
          if ("number" == typeof value) value = value.toString();
          else if ("boolean" == typeof value) return !0;
          return value && value.length > 0
        }
      },
      regex: {
        message: "不符合此验证规则",
        rule: function (value, param) {
          return !this.required(value) || param.test(value)
        }
      },
      email: {
        message: "请输入有效的电子邮件地址",
        rule: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      },
      mobile: {
        message: "请输入11位的手机号码",
        rule: /^1[345789]\d{9}$/
      },
      tel: {
        message: "请输入座机号",
        rule: /^(\d{3,4}-)?\d{7,8}$/
      },
      url: {
        message: "请输入有效的网址",
        rule: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i
      },
      idcard: {
        message: "请输入18位的有效身份证",
        rule: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      },
      equalTo: {
        message: "输入值必须和 {0} 相同",
        rule: function (value, param) {
          return !this.required(value) || value === this.data[param]
        }
      },
      contains: {
        message: "输入值必须包含 {0}",
        rule: function (value, param) {
          return !this.required(value) || value.indexOf(param) > -1
        }
      },
      length: {
        message: "请输入 {0} 个字符",
        rule: function (value, param) {
          return !this.required(value) || value.length == param
        }
      },
      minlength: {
        message: "最少要输入 {0} 个字符",
        rule: function (value, param) {
          return !this.required(value) || value.length >= param
        }
      },
      maxlength: {
        message: "最多可以输入 {0} 个字符",
        rule: function (value, param) {
          return !this.required(value) || value.length <= param
        }
      },
      rangelength: {
        message: "请输入长度在 {0} 到 {1} 之间的字符",
        rule: function (value, param) {
          return !this.required(value) || value.length >= param[0] && value.length <= param[1]
        }
      },
      number: {
        message: "请输入有效的数字",
        rule: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
      },
      digits: {
        message: "只能输入整数数字",
        rule: /^\d+$/
      },
      min: {
        message: "请输入不小于 {0} 的数字",
        rule: function (value, param) {
          return !this.required(value) || value >= param
        }
      },
      max: {
        message: "请输入不大于 {0} 的数字",
        rule: function (value, param) {
          return !this.required(value) || value <= param
        }
      },
      range: {
        message: "请输入大于 {0} 且小于 {1} 的数字",
        rule: function (value, param) {
          return !this.required(value) || value >= param[0] && value <= param[1]
        }
      },
      chinese: {
        message: "只能输入中文字符",
        rule: /^[\u4e00-\u9fa5]{0,}$/
      },
      minChinese: {
        message: "最少输入 {0} 个中文字符",
        rule: function (value, param) {
          return !this.required(value) || new RegExp("^[一-龥]{" + param + ",}$").test(value)
        }
      },
      maxChinese: {
        message: "最多输入 {0} 个中文字符",
        rule: function (value, param) {
          return !this.required(value) || new RegExp("^[一-龥]{0," + param + "}$").test(value)
        }
      },
      rangeChinese: {
        message: "只能输入 {0} 到 {1} 个中文字符",
        rule: function (value, param) {
          return !this.required(value) || new RegExp("^[一-龥]{" + param[0] + "," + param[1] + "}$").test(value)
        }
      },
      date: {
        message: "请输入有效的日期",
        rule: function (value) {
          return !this.required(value) || !/Invalid|NaN/.test(new Date(value).toString())
        }
      },
      dateISO: {
        message: "请输入有效的日期（ISO标准格式）",
        rule: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
      }
    }
  }])
});
