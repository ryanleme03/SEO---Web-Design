// Fecha o menu mobile ao clicar num link, e ajusta aria-expanded
  var toggle = document.getElementById('nav-toggle');
  var label = document.querySelector('.nav-toggle-label');
  if (toggle && label) {
    toggle.addEventListener('change', function () {
      label.setAttribute('aria-expanded', toggle.checked ? 'true' : 'false');
    });
    document.querySelectorAll('nav.primary a').forEach(function (a) {
      a.addEventListener('click', function () { toggle.checked = false; });
    });
  }
