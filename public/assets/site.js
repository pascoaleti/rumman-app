(function () {
  var root = document.documentElement;
  var body = document.body;
  var themeButton = document.querySelector('[data-theme-toggle]');
  var menuButton = document.querySelector('[data-menu-toggle]');
  var menuPanel = document.querySelector('[data-menu-panel]');
  var language = (document.documentElement.lang || 'pt-BR').toLowerCase();
  var menuLabels = language.indexOf('fr') === 0
    ? { open: 'Ouvrir le menu', close: 'Fermer le menu' }
    : language.indexOf('es') === 0
      ? { open: 'Abrir men\u00fa', close: 'Cerrar men\u00fa' }
      : language.indexOf('en') === 0
        ? { open: 'Open menu', close: 'Close menu' }
        : { open: 'Abrir menu', close: 'Fechar menu' };

  function updateThemeButton() {
    if (!themeButton) return;
    var dark = root.dataset.theme === 'dark';
    var label = dark ? themeButton.dataset.labelLight : themeButton.dataset.labelDark;
    themeButton.setAttribute('aria-label', label);
    themeButton.setAttribute('title', label);
    themeButton.querySelector('span').textContent = dark ? '\u2600' : '\u263e';
  }

  if (themeButton) {
    updateThemeButton();
    themeButton.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('rumman-theme', root.dataset.theme);
      } catch (error) {
        // The selected theme still applies for the current page.
      }
      updateThemeButton();
    });
  }

  function closeMenu() {
    if (!menuButton || !menuPanel) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', menuLabels.open);
    menuPanel.dataset.open = 'false';
    body.classList.remove('menu-open');
  }

  if (menuButton && menuPanel) {
    menuButton.addEventListener('click', function () {
      var open = menuPanel.dataset.open === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.setAttribute('aria-label', open ? menuLabels.open : menuLabels.close);
      menuPanel.dataset.open = String(!open);
      body.classList.toggle('menu-open', !open);
    });

    menuPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }
})();
