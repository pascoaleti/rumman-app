(function () {
  try {
    var saved = localStorage.getItem('rumman-theme');
    var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = saved || preferred;
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
  }
})();
