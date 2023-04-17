;(function initTheme() {
  var theme = window.localStorage.getItem('dark-mode')
  if (theme === 'true') {
    document.querySelector('html').classList.add('dark')
  }
})()
