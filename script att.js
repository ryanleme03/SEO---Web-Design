/**
 * script.js — CERNE Escola de Tecnologia e Engenharia
 * Todo o JavaScript do site é organizado em funções pequenas e nomeadas,
 * cada uma comentada, para facilitar a documentação posterior do projeto.
 * Nenhuma biblioteca externa é usada — apenas JavaScript puro (vanilla JS).
 */

/**
 * initMobileMenu()
 * Controla o menu de navegação no formato mobile (largura < 880px).
 * O menu em si é aberto/fechado por um <input type="checkbox"> escondido
 * (técnica "checkbox hack", sem depender de JS para o efeito visual).
 * Esta função cuida apenas de dois efeitos que exigem JavaScript:
 *   1) Atualizar o atributo aria-expanded do botão hambúrguer, para leitores
 *      de tela saberem se o menu está aberto ou fechado.
 *   2) Fechar automaticamente o menu quando o usuário clica em algum link,
 *      para não precisar clicar duas vezes (uma no link, outra pra fechar).
 */
function initMobileMenu() {
  var toggle = document.getElementById('nav-toggle');
  var label = document.querySelector('.nav-toggle-label');

  if (!toggle || !label) return; // elementos não existem nesta página — encerra a função

  // Sempre que o checkbox muda de estado (marcado/desmarcado),
  // reflete isso no aria-expanded do botão de menu.
  toggle.addEventListener('change', function () {
    label.setAttribute('aria-expanded', toggle.checked ? 'true' : 'false');
  });

  // Ao clicar em qualquer link do menu, desmarca o checkbox — isso fecha o menu.
  document.querySelectorAll('nav.primary a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.checked = false;
    });
  });
}

/**
 * initAudioPlayer()
 * Controla o botão customizado de reprodução da vinheta sonora institucional
 * (elemento <audio id="vinheta">). Em vez de usar os controles nativos do
 * navegador, a página tem um botão próprio (#audio-toggle) que chama esta
 * lógica para tocar/pausar e atualizar o ícone e o texto do botão.
 */
function initAudioPlayer() {
  var audio = document.getElementById('vinheta');
  var button = document.getElementById('audio-toggle');

  if (!audio || !button) return; // página sem player de áudio — encerra a função

  var icon = button.querySelector('.audio-icon');
  var label = button.querySelector('.audio-label');

  // Clique no botão alterna entre tocar e pausar o áudio.
  button.addEventListener('click', function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  // Quando o áudio começa a tocar, atualiza o botão para o estado "pausar".
  audio.addEventListener('play', function () {
    button.setAttribute('aria-pressed', 'true');
    if (icon) icon.textContent = '❚❚';
    if (label) label.textContent = 'Pausar vinheta institucional';
  });

  // Quando o áudio é pausado (ou termina sozinho), volta o botão para "tocar".
  audio.addEventListener('pause', function () {
    button.setAttribute('aria-pressed', 'false');
    if (icon) icon.textContent = '►';
    if (label) label.textContent = 'Ouvir vinheta institucional';
  });
}

/**
 * initFaqAnalytics()
 * Exemplo simples de instrumentação: cada vez que o usuário abre uma
 * pergunta do FAQ (elemento <details>), registra no console qual pergunta
 * foi aberta. Serve como ponto de partida caso, no futuro, isso precise
 * ser conectado a uma ferramenta real de analytics.
 */
function initFaqAnalytics() {
  var faqItems = document.querySelectorAll('#faq details');

  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        var question = item.querySelector('summary');
        var text = question ? question.textContent.trim() : 'pergunta desconhecida';
        console.log('[FAQ] Pergunta aberta:', text);
      }
    });
  });
}

/**
 * initApp()
 * Função principal — chama, em ordem, todas as funções de inicialização
 * do site. Mantém o carregamento organizado num único ponto de entrada,
 * em vez de espalhar chamadas soltas pelo arquivo.
 */
function initApp() {
  initMobileMenu();
  initAudioPlayer();
  initFaqAnalytics();
}

// Ponto de entrada: executa initApp() assim que o script é carregado.
// Como a tag <script> usa o atributo "defer", o HTML já está totalmente
// carregado neste momento, então não é preciso esperar por DOMContentLoaded.
initApp();
