/*
 * @Author: jasonjcwu
 * @Date: 2021-05-07 22:47:02
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-07 23:02:03
 * @Description: 
 */
const openTypeMap = {
  contact: 'contact',
  getPhoneNumber: 'getphonenumber',
  getUserInfo: 'getuserinfo',
  openSetting: 'opensetting',
  launchApp: 'launchapp',
}

const ObserversForControlledPropsByAncestor = (props) => {
  const obs = {}
  props.forEach(item => {
    obs[item] = function () {
      if (!this._hasAttached) {
        if (!this._propIsSet) {
          this._propIsSet = {}
        }
        this._propIsSet[item] = true
      }
    }
  })
  return obs
}

// 防抖动函数
function debounce(func, wait) {
  let timer
  const delay = parseInt(wait, 10) || 0

  return function (...args) {
    clearTimeout(timer)
    const content = this
    timer = setTimeout(function () {
      func.apply(content, args)
    }, delay)
  }
}

export {
  debounce,
  openTypeMap,
  ObserversForControlledPropsByAncestor,
}
