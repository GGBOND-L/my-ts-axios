const toString = Object.prototype.toString

// is运算符
// 限制参数和函数返回值的关系，描述返回值属于true还是false
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }


/**
 * Checks if a value is a plain JavaScript object.
 *
 * @param {any} val - The value to check.
 * @return {val is Object} - Returns true if the value is a plain object, false otherwise.
 */
export function isPlainObject(val:any): val is Object{
  return toString.call(val) === '[object Object]'
}