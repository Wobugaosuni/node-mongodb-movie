
const utils = {}

/**
 * remove obj property by key
 * @param removeKey 要移除的属性
 * @param obj 对象
 */
utils.removeObjKey = (removeKey, obj) => {
  // 从 keys 数组中排除掉丢弃的key
  const keys = Object.keys(obj).filter(key => key !== removeKey)

  // 组装obj
  // accumulator 累加器的初始值是 reduce 方法的第二个参数。没有的话，取数组的第一个值，currentValue取第二个值
  return keys.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = obj[currentValue]
    return accumulator
  }, {})
}


module.exports = utils


