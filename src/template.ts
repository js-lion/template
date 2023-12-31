/**
 * @file 字符串替换
 * @author svon.me@gmail.com
 */

type Replace = (key: string) => string;

/**
 * 创建模板匹配规则
 * @returns /{([\w]+)}/g
 */
export var regExpA = function() {
  return /{([\w-]+)}/ig;
}

/**
 * 创建模板匹配规则
 * @returns /\/:(\w-)+/ig
 */
export var regExpB = function() {
  return /\/:([\w-]+)/ig;
}

var isNil = function(value: any): boolean {
  if (typeof value === "boolean") {
    return value ? true : false;
  }
  return value == null;
}

var isNumber = function(value: string | number) {
  if (value === 0 || typeof value === "number") {
    return true;
  }
  return false;
}

var isString = function(value: string | number) {
  if (value || typeof value === "string") {
    return true;
  }
  return false;
}

var toString = function(value: string | number) {
  if(isNumber(value) || isString(value)) {
    return String(value);
  }
}

var Callback = function(value: object | Replace) {
  return function($1: string, $2: string) {
    if (value && typeof value === "function") {
      // @ts-ignore
      return value($1, $2);
    }
    if (value && typeof value === "object") {
      // @ts-ignore
      var data = toString(value[$2]);
      if (!isNil(data)) {
        return data;
      }
    }
    if (Array.isArray(value) && value.length > 0) {
      if (/^\d+$/.test($2)) {
        var index = Number($2);
        var data = toString(value[index]);
        if (!isNil(data)) {
          return data;
        }
      }
    }
    return "";
  }
}

/**
 * 字符串替换
 * @param regExp 正则
 * @param text   字符串
 * @returns string
 */
export var Template = function(regExp: RegExp, text: string) {
  return function(replace: object | Replace): string {
    regExp.lastIndex = 0;
    return text.replace(regExp, Callback(replace));
  }
};

/**
 * 正则校验
 * @param text 
 * @description regExpA 或 regExpB 其中一个通过则返回 true
 * @returns boolean
 */
export var regExpTest = function(text: string): boolean {
  var reg1 = regExpA();
  var reg2 = regExpB();
  if (reg1.test(text) || reg2.test(text)) {
    return true;
  }
  return false;
}

/**
 * 字符串模板替换
 * @param text 字符串
 * @param replace 替换逻辑 function 或者 object
 * @description 会同时执行 regExpA & regExpB 两种规则
 * @returns string
 */
export var template = function(text: string, replace: object | Replace) {
  var tplA = Template(regExpA(), text);
  var tplB = Template(regExpB(), tplA(replace));
  var callback = Callback(replace);
  return tplB(function($1: string, $2: string) {
    var value = callback($1, $2);
    if (value && /^https?:|^\//i.test(value)) {
      return value;
    }
    return "/" + (toString(value) || "");
  });
};