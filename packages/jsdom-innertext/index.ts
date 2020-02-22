const getText = (el: HTMLElement) => {
  let str = '';
  const nodes = el.childNodes;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.nodeType === Node.TEXT_NODE) {
      str += node.nodeValue;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const nodeEl = node as HTMLElement;
      if (nodeEl.tagName === 'BR') {
        str += '\n';
      } else if (node.childNodes.length) {
        str += getText(nodeEl);
      }
    }
  }
  return str;
};

// innerText is not in jsdom
try {
  Object.defineProperty(Element.prototype, 'innerText', {
    get() {
      return getText(this);
    },
    set(v) {
      this.textContent = v;
      return true;
    },
  });
} catch (err) {
  if (err.message.includes('Cannot redefine')) {
    // noop
  } else {
    throw err;
  }
}

// @note for All files must be modules when the '--isolatedModules' flag is provided
export default {};
