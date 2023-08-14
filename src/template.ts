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

/**
 * 字符串替换
 * @param regExp 正则
 * @param text   字符串
 * @returns string
 */
export var Template = function(regExp: RegExp, text: string) {
  return function<T = object>(replace: T | Replace): string {
    regExp.lastIndex = 0;
    return text.replace(regExp, function($1: string, $2: string): string {
      if (replace && typeof replace === "function") {
        // @ts-ignore
        return replace($1, $2);
      }
      if (replace) {
        // @ts-ignore
        return replace[$2];
      }
      return $2;
    });
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
export var template = function<T = object>(text: string, replace: T | Replace) {
  var tplA = Template(regExpA(), text);
  var tplB = Template(regExpB(), tplA(replace));
  return tplB(replace);
};