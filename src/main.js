export function highlightWords(word) {
  const textNodes = [...document.body.getElementsByTagName('*')]
    .filter(el => el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE)
    .map(el => el.childNodes[0]);

  textNodes.forEach(node => {
    const text = node.textContent;
    if (text.includes(word)) {
      const newNode = document.createElement('span');
      newNode.innerHTML = text.replace(new RegExp(word, 'g'), `<mark>${word}</mark>`);
      node.parentNode.replaceChild(newNode, node);
    }
  });
}

export function runBookmarklet() {
  const word = prompt('Enter a word to highlight:');
  if (word) {
    highlightWords(word);
  }
}

if (typeof window !== 'undefined') {
  runBookmarklet();
}
