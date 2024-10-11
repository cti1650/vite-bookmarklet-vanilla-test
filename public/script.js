async function loadConfig() {
  const response = await fetch('/config.json');
  return response.json();
}

async function loadBookmarkletCode() {
  const response = await fetch('/bookmarklet.js');
  const code = await response.text();
  // IIFEラッパーを削除
  return code.replace(/^\(function\(\)\{/, '').replace(/\}\)\.call\(this\);$/, '');
}

function createBookmarkletLink(code) {
  return `javascript:(function(){${encodeURIComponent(code)}})();`;
}

async function initPage() {
  try {
      const config = await loadConfig();
      const bookmarkletCode = await loadBookmarkletCode();
      const bookmarkletLink = createBookmarkletLink(bookmarkletCode);

      document.getElementById('page-title').textContent = config.title;
      document.getElementById('bookmarklet-title').textContent = config.title;
      document.getElementById('bookmarklet-description').textContent = config.description;
      document.getElementById('bookmarklet-instructions').textContent = config.instructions;

      const bookmarkletButton = document.getElementById('bookmarklet-link');
      bookmarkletButton.href = bookmarkletLink;
      bookmarkletButton.textContent = config.title;

      const copyButton = document.getElementById('copy-button');
      copyButton.addEventListener('click', () => {
          navigator.clipboard.writeText(bookmarkletCode).then(() => {
              const copySuccess = document.getElementById('copy-success');
              copySuccess.style.display = 'block';
              setTimeout(() => {
                  copySuccess.style.display = 'none';
              }, 3000);
          }).catch(err => {
              console.error('Failed to copy: ', err);
          });
      });
  } catch (error) {
      console.error('Error initializing page:', error);
  }
}

initPage();