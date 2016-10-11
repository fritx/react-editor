import $ from 'jquery'
// import qqface from '../../../lib/qqface'

export function parse() {
  const items = []
  // todo: text br image qface emoji
  return items
}

export function filter(html) {
  let mat = html.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/)
  if (mat) html = mat[1]
  mat = html.match(/<body>([\s\S]*?)<\/body>/)
  if (mat) html = mat[1]
  const $src = $('<div>').html(html)
  const $dest = $('<div>')
  filterContent($src, $dest)
  $dest.children('[x-block]').removeAttr('x-block')
  $dest.children('div').each((i, el) => {
    el.innerHTML = el.innerHTML.replace(/\n{3,}/g, '\n\n') // 消除过多换行
    if (!el.innerHTML.trim()) el.parentNode.removeChild(el) // 消除空白div
  })
  return $dest.html()
}

/* eslint-disable */
// https://github.com/fritx/none/blob/dev/elec%2Fapp%2Feditor.js
var blockElements = 'address, article, aside, blockquote, canvas, dd, div, dl, fieldset, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video'
blockElements += ', li' // display:iist-item => block
blockElements += ', tr'

// 过滤清理 内容
function filterContent($src, $dest) {
  [].forEach.call($src[0].childNodes, function(node){
    if (node.nodeType === Node.TEXT_NODE) {
      getLine().append(node.cloneNode())
      return
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return
    }

    var $node = $(node)

    // 过滤无效标签 修复粘贴出代码的情况
    if ($node.is('meta, title, style, script')) return

    // 过滤消息中的用户头像
    if ($node.is('.nocopy')) return

    if ($node.is('img')) {

      // 如果可能是emoji 则优先使用alt
      // case: 右侧 http://changba.com/s/MWN6SYnX0zJwnnKNijYL-w?&code=Kxhsv6044ik
      // if ($node.is('[class*=emoji], [src*=emoji]') && $node.attr('alt')) {
      //   getLine().append($node.attr('alt'))
      //   return
      // }

      // qq表情粘贴到GT sysface属性
      // 从richtext.js迁移 差点漏了
      // var sysface = $node.attr('sysface')
      // if (sysface != null) {
      //   // var index = qqface.indexFromCode(+sysface)
      //   var index = qqface.sysfaceMap.indexOf(+sysface)
      //   if (index !== -1 && index <= 104) {
      //     $node.attr('src', 'main/img/face/' + index + '.gif')
      //   }
      // }

      getLine().append('<img src="'+ $node.attr('src') +'">')
      return
    }

    if ($node.is('br')) {
      // getLine().append('<br>')
      getLine(true) // br直接转div
      return
    }

    // var html = $node.html().trim()
    var html = $node.html()
    if (!html) return

    var isBlock = $node.is(blockElements)
    if (isBlock) getLine(true)

    if ($node.children().length > 0) {
      filterContent($node, $dest)
      if (isBlock) getLine(true)
      return
    }

    // 暂时解决textarea dom结构中 可能存在html标签 (原因不明)
    // 避免用户误以为 粘贴出多余的html代码
    // case: trello上一张card的title 居然靠textarea直接显示
    if ($node.is('textarea')) return

    var text = $node.text()
    if (!text) return
    getLine().append(document.createTextNode(text))
    if (isBlock) getLine(true)
  })

  function getLine(newBlock){
    var $prev = $dest.children('div').last()
    var $line = $prev
    // if ($prev.length > 0 && !$prev.html()) {
    //   $prev.remove() // 清除空div
    // }
    if ($prev.length <= 0 || $prev.is('[x-block]')) {
      $prev.removeAttr('x-block')
      $line = $('<div>').appendTo($dest)
    }
    if (newBlock) {
      $line.attr('x-block', '') // block标记
    }
    return $line
  }
}

export function lint(dom){

  return // 暂时取消clean

  // 消除嵌套多层的div
  var $dom = $(dom)
  var $el = $dom.clone()
  // amazing无敌选择器 选出嵌套的目标
  var $main = $el.find('div:has(>div:not(:has(div))), .editor').first()
  $el.html($main.html())

  $el.children('[x-block]').removeAttr('x-block')

  // 如果只有一个空行 则视为空
  var nodes = $el[0].childNodes
  if (nodes.length === 1) {
    var $first = $(nodes[0])
    if ($first.is('br')) {
      $el.html('')
    } else {
      nodes = $first[0].childNodes
      if (nodes.length === 1) {
        var $first = $(nodes[0])
        if ($first.is('br')) {
          $el.html('')
        }
      }
    }
  }

  // 若超过一行 第一行需要div包裹 与其他行保持一致
  var $prev = $([])
  var hasNext = false
  var nodes = $el[0].childNodes
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i]
    if (node.tagName !== 'DIV') {
      $prev.push(node)
    } else {
      hasNext = true
      break
    }
  }
  if (hasNext && $prev.length >= 1) $prev.wrapAll('<div>')

  if ($el.html() !== $dom.html()) {
    $dom.html($el.html())
  }
}
/* eslint-enable */
