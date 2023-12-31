const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
function genChildren(el) {
  const children = el.children
  if (children) {
    return children.map((child) => gen(child)).join(',')
  }
}
function gen(node) {
  if (node.type == 1) {
    // 说明为元素节点 递归生成元素节点
    return generate(node)
  } else {
    let text = node.text
    if (defaultTagRE.test(text)) {
      let tokens = []
      let match
      let index = 0
      let lastIndex = (defaultTagRE.lastIndex = 0)
      while ((match = defaultTagRE.exec(text))) {
        index = match.index
        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index))) // 拼接非 {{}} 中的文本
        }
        tokens.push(`_s(${match[1].trim()})`) // 拼接 {{}} 匹配的文本
        lastIndex = index + match[0].length
      }
      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
      }
      return `_v(${tokens.join('+')})`
    } else {
      return `_v(${JSON.stringify(text)})`
    }
  }
}
function genProps(attrs) {
  // 将最终的 attrs 拼接成一个对象 key 为 属性名 value 为属性值
  let str = ''
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    if (attr.name === 'style') {
      let obj = {}
      attr.value.split(';').forEach((item) => {
        let [key, value] = item.split(':')
        obj[key] = value
      })
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`
}
export function generate(el) {
  // 字符串拼接
  let children = genChildren(el) // 递归 ast 语法树
  let code = `_c('${el.tag}',${
    el.attrs.length ? genProps(el.attrs) : 'undefined'
  } ${children ? ',' + children : ''})`
  return code
}
