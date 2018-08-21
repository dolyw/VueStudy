// 建立公共方法，属性复制
export default{
  copyProperty: function (p, c) {
    c = c || {}
    for (var i in p) {
      // 属性i是否为p对象的自有属性
      if (p.hasOwnProperty(i)) {
        // 属性i是否为复杂类型
        if (typeof p[i] === 'object') {
          // 如果p[i]是数组，则创建一个新数组
          // 如果p[i]是普通对象，则创建一个新对象
          c[i] = Array.isArray(p[i]) ? [] : {}
          // 递归拷贝复杂类型的属性
          this.copyProperty(p[i], c[i])
        } else {
          // 属性是基础类型时，直接拷贝
          c[i] = p[i]
        }
      }
    }
    return c
  }
}
