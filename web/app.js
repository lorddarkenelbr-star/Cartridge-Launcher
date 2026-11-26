const API_BASE = "http://localhost:3000";

const TRADUCOES = {
  "pt-BR": {
    biblioteca: "Biblioteca",
    configuracoes: "Configurações",
    somOn: "♪ Som: ON",
    somOff: "♪ Som: OFF",
    todos: "Todos",
    todosOsJogos: "Todos os Jogos",
    jogosCarregados: (n) => `${n} ${n === 1 ? "jogo carregado" : "jogos carregados"}`,
    vazio: "Nenhuma ROM carregada ainda. Vá em Configurações para escolher a pasta de jogos.",
    tabBiblioteca: "Biblioteca & Emuladores",
    tabEstilo: "Estilo do Jogo",
    tabScraping: "Scraping & Capas",
    tabIdioma: "Idioma & Controles",
    tabCustom: "Customização & Discord",
    tituloConfigPasta: "Biblioteca & Emuladores",
    descConfigPasta: "Selecione a pasta de ROMs e escaneie os emuladores instalados no sistema.",
    escolherPasta: "Escolher Pasta",
    carregarPasta: "Carregar Pasta",
    emuladoresDetectados: "Emuladores Detectados",
    escanearEmuladores: "Escanear Emuladores",
    nenhumEmu: "Nenhum escaneamento realizado ainda.",
    tituloEstiloJogo: "Estilo do Jogo",
    descEstiloJogo: "Escolha como os cards de mídia física / cartucho aparecem na Biblioteca.",
    estiloMidiaFisica: "Mídia Física",
    estiloMidiaFisicaDesc: "Carcaça/mídia física por console com arte do jogo.",
    estiloBolinhasVita: "Bolinhas PS Vita",
    estiloBolinhasVitaDesc: "Ícone circular/bolha estilo LiveArea do PS Vita.",
    estiloPadraoCartucho: "Padrão Cartucho",
    estiloPadraoCartuchoDesc: "Cartucho clássico com destaque de console e título.",
    tituloScraping: "Scraping & Capas",
    descScraping: "Busca automaticamente a capa de caixa física por console/região e usa o SteamGridDB como complemento.",
    salvarKey: "Salvar Key",
    keySalvaBuscando: "API Key salva! Buscando capas...",
    buscandoCapas: "Buscando capas físicas...",
    capasAtualizadas: "Busca de capas concluída.",
    idiomaAplicado: "Idioma aplicado.",
    customSalva: "Customização e Discord salvos.",
    temaPadrao: "Tema padrão restaurado.",
    iniciandoJogo: (jogo) => `Iniciando ${jogo.titulo} (${jogo.console} • ${jogo.emulador})...`,
    emuladorNaoEncontrado: (jogo) => `Emulador ${jogo.emulador} não encontrado para ${jogo.titulo}.`
  },
  en: {
    biblioteca: "Library",
    configuracoes: "Settings",
    somOn: "♪ Sound: ON",
    somOff: "♪ Sound: OFF",
    todos: "All",
    todosOsJogos: "All Games",
    jogosCarregados: (n) => `${n} ${n === 1 ? "game loaded" : "games loaded"}`,
    vazio: "No ROMs loaded yet. Go to Settings to pick your games folder.",
    tabBiblioteca: "Library & Emulators",
    tabEstilo: "Game Style",
    tabScraping: "Scraping & Covers",
    tabIdioma: "Language & Controls",
    tabCustom: "Customization & Discord",
    tituloConfigPasta: "Library & Emulators",
    descConfigPasta: "Choose your ROMs folder and scan installed emulators on the system.",
    escolherPasta: "Choose Folder",
    carregarPasta: "Load Folder",
    emuladoresDetectados: "Detected Emulators",
    escanearEmuladores: "Scan Emulators",
    nenhumEmu: "No scan run yet.",
    tituloEstiloJogo: "Game Style",
    descEstiloJogo: "Choose how physical media / cartridge cards appear in the Library.",
    estiloMidiaFisica: "Physical Media",
    estiloMidiaFisicaDesc: "Console physical media shell with game artwork.",
    estiloBolinhasVita: "PS Vita Bubbles",
    estiloBolinhasVitaDesc: "Circular LiveArea-style bubble icon.",
    estiloPadraoCartucho: "Standard Cartridge",
    estiloPadraoCartuchoDesc: "Classic cartridge card with console and title.",
    tituloScraping: "Scraping & Covers",
    descScraping: "Fetches physical box art by console/region and uses SteamGridDB as fallback.",
    salvarKey: "Save Key",
    keySalvaBuscando: "API Key saved! Fetching covers...",
    buscandoCapas: "Fetching physical covers...",
    capasAtualizadas: "Cover search finished.",
    idiomaAplicado: "Language applied.",
    customSalva: "Customization and Discord settings saved.",
    temaPadrao: "Default theme restored.",
    iniciandoJogo: (jogo) => `Launching ${jogo.titulo} (${jogo.console} • ${jogo.emulador})...`,
    emuladorNaoEncontrado: (jogo) => `Emulator ${jogo.emulador} not found for ${jogo.titulo}.`
  },
  es: {
    biblioteca: "Biblioteca",
    configuracoes: "Configuración",
    somOn: "♪ Sonido: ON",
    somOff: "♪ Sonido: OFF",
    todos: "Todos",
    todosOsJogos: "Todos los Juegos",
    jogosCarregados: (n) => `${n} ${n === 1 ? "juego cargado" : "juegos cargados"}`,
    vazio: "Aún no hay ROMs cargadas. Ve a Configuración para elegir la carpeta de juegos.",
    tabBiblioteca: "Biblioteca y Emuladores",
    tabEstilo: "Estilo del Juego",
    tabScraping: "Scraping y Portadas",
    tabIdioma: "Idioma y Controles",
    tabCustom: "Personalización y Discord",
    tituloConfigPasta: "Biblioteca y Emuladores",
    descConfigPasta: "Selecciona la carpeta de ROMs y escanea los emuladores instalados.",
    escolherPasta: "Elegir Carpeta",
    carregarPasta: "Cargar Carpeta",
    emuladoresDetectados: "Emuladores Detectados",
    escanearEmuladores: "Escanear Emuladores",
    nenhumEmu: "Aún no se ha realizado ningún escaneo.",
    tituloEstiloJogo: "Estilo del Juego",
    descEstiloJogo: "Elige cómo se muestran las tarjetas de medios físicos / cartucho en la Biblioteca.",
    estiloMidiaFisica: "Medio Físico",
    estiloMidiaFisicaDesc: "Carcasa/medio físico por consola con arte del juego.",
    estiloBolinhasVita: "Burbujas PS Vita",
    estiloBolinhasVitaDesc: "Icono circular estilo LiveArea de PS Vita.",
    estiloPadraoCartucho: "Cartucho Estándar",
    estiloPadraoCartuchoDesc: "Cartucho clásico con consola y título.",
    tituloScraping: "Scraping y Portadas",
    descScraping: "Busca portadas físicas por consola/región y usa SteamGridDB como complemento.",
    salvarKey: "Guardar Key",
    keySalvaBuscando: "¡API Key guardada! Buscando portadas...",
    buscandoCapas: "Buscando portadas físicas...",
    capasAtualizadas: "Búsqueda de portadas completada.",
    idiomaAplicado: "Idioma aplicado.",
    customSalva: "Personalización y Discord guardados.",
    temaPadrao: "Tema predeterminado restaurado.",
    iniciandoJogo: (jogo) => `Iniciando ${jogo.titulo} (${jogo.console} • ${jogo.emulador})...`,
    emuladorNaoEncontrado: (jogo) => `No se encontró el emulador ${jogo.emulador} para ${jogo.titulo}.`
  },
  ja: {
    biblioteca: "ライブラリ",
    configuracoes: "設定",
    somOn: "♪ 音声: ON",
    somOff: "♪ 音声: OFF",
    todos: "すべて",
    todosOsJogos: "すべてのゲーム",
    jogosCarregados: (n) => `${n} 件のゲームを読み込みました`,
    vazio: "ROMがまだ読み込まれていません。設定からゲームフォルダを選択してください。",
    tabBiblioteca: "ライブラリとエミュレータ",
    tabEstilo: "ゲーム表示スタイル",
    tabScraping: "スクレイピングと表紙",
    tabIdioma: "言語と操作",
    tabCustom: "カスタマイズとDiscord",
    tituloConfigPasta: "ライブラリとエミュレータ",
    descConfigPasta: "ROMフォルダを選択し、インストール済みエミュレータを検索します。",
    escolherPasta: "フォルダを選択",
    carregarPasta: "フォルダを読込",
    emuladoresDetectados: "検出されたエミュレータ",
    escanearEmuladores: "エミュレータを検索",
    nenhumEmu: "まだ検索は実行されていません。",
    tituloEstiloJogo: "ゲーム表示スタイル",
    descEstiloJogo: "ライブラリでのパッケージ / カートリッジ表示を選択します。",
    estiloMidiaFisica: "パッケージ風",
    estiloMidiaFisicaDesc: "機種ごとのパッケージ/メディア枠とゲームアート。",
    estiloBolinhasVita: "PS Vita バブル",
    estiloBolinhasVitaDesc: "PS Vita LiveArea風の丸型アイコン。",
    estiloPadraoCartucho: "標準カートリッジ",
    estiloPadraoCartuchoDesc: "機種とタイトルが際立つクラシック表示。",
    tituloScraping: "スクレイピングと表紙",
    descScraping: "機種・地域ごとのパッケージ表紙を検索し、SteamGridDBを補完に使います。",
    salvarKey: "キーを保存",
    keySalvaBuscando: "APIキーを保存しました！表紙を検索中...",
    buscandoCapas: "パッケージ表紙を検索中...",
    capasAtualizadas: "表紙の検索が完了しました。",
    idiomaAplicado: "言語を適用しました。",
    customSalva: "カスタマイズとDiscord設定を保存しました。",
    temaPadrao: "デフォルトテーマに戻しました。",
    iniciandoJogo: (jogo) => `${jogo.titulo} (${jogo.console} • ${jogo.emulador}) を起動中...`,
    emuladorNaoEncontrado: (jogo) => `${jogo.titulo} 用のエミュレータ ${jogo.emulador} が見つかりません。`
  }
};

// Bloqueia zoom por pinça (2+ dedos) e toque duplo no Android/touch
(() => {
  let lastTouchEnd = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false }
  );

  ["gesturestart", "gesturechange", "gestureend"].forEach((evName) => {
    document.addEventListener(evName, (e) => e.preventDefault(), { passive: false });
  });
})();

const state = {
  view: "biblioteca",
  pasta: localStorage.getItem("cartridge_pasta") || "",
  jogos: [],
  emuladores: [],
  consoleFiltro: "TODOS",
  indiceSelecionado: 0,
  estilo: localStorage.getItem("cartridge_estilo") || "midia-fisica",
  apiKey: localStorage.getItem("cartridge_sgdb_key") || "",
  idioma: localStorage.getItem("cartridge_idioma") || "pt-BR",
  somAtivo: localStorage.getItem("cartridge_som") !== "false",
  corDestaque: localStorage.getItem("cartridge_cor_destaque") || "#7c4dff",
  corBotao: localStorage.getItem("cartridge_cor_botao") || "#22c55e",
  blurFundo: Number(localStorage.getItem("cartridge_blur") ?? 28),
  discordAtivo: localStorage.getItem("cartridge_discord_ativo") !== "false",
  discordWebhook: localStorage.getItem("cartridge_discord_webhook") || "",
  capas: {}
};

const el = {
  backdrop: document.getElementById("backdrop"),
  consoleTabs: document.getElementById("consoleTabs"),
  btnAudioToggle: document.getElementById("btnAudioToggle"),
  btnBiblioteca: document.getElementById("btnBiblioteca"),
  btnConfiguracoes: document.getElementById("btnConfiguracoes"),
  viewBiblioteca: document.getElementById("viewBiblioteca"),
  viewConfiguracoes: document.getElementById("viewConfiguracoes"),
  tituloSecao: document.getElementById("tituloSecao"),
  contadorJogos: document.getElementById("contadorJogos"),
  infoJogoAtual: document.getElementById("infoJogoAtual"),
  carouselContainer: document.getElementById("carouselContainer"),
  emptyState: document.getElementById("emptyState"),
  textoVazio: document.getElementById("textoVazio"),
  carouselTrack: document.getElementById("carouselTrack"),
  inputPastaRoms: document.getElementById("inputPastaRoms"),
  btnEscolherPasta: document.getElementById("btnEscolherPasta"),
  btnCarregarPasta: document.getElementById("btnCarregarPasta"),
  btnEscanearEmuladores: document.getElementById("btnEscanearEmuladores"),
  listaEmuladores: document.getElementById("listaEmuladores"),
  inputApiKey: document.getElementById("inputApiKey"),
  btnSalvarKey: document.getElementById("btnSalvarKey"),
  selectIdioma: document.getElementById("selectIdioma"),
  btnAplicarIdioma: document.getElementById("btnAplicarIdioma"),
  inputCorDestaque: document.getElementById("inputCorDestaque"),
  inputCorBotao: document.getElementById("inputCorBotao"),
  btnResetCustom: document.getElementById("btnResetCustom"),
  rangeBlurFundo: document.getElementById("rangeBlurFundo"),
  valorBlur: document.getElementById("valorBlur"),
  checkDiscordAtivo: document.getElementById("checkDiscordAtivo"),
  inputDiscordWebhook: document.getElementById("inputDiscordWebhook"),
  btnSalvarCustom: document.getElementById("btnSalvarCustom"),
  statusMensagem: document.getElementById("statusMensagem")
};

// --- Motor de Áudio (Web Audio API) ---
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = AudioContextClass ? new AudioContextClass() : null;
let timerMusica = null;

function garantirAudio() {
  if (!audioCtx || !state.somAtivo) return;
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
}

function tocarNota(freq, duracao, tipo = "triangle", volume = 0.05, delay = 0) {
  if (!audioCtx || !state.somAtivo) return;
  garantirAudio();
  const agora = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = tipo;
  osc.frequency.setValueAtTime(freq, agora);

  gain.gain.setValueAtTime(0.0001, agora);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), agora + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, agora + duracao);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(agora);
  osc.stop(agora + duracao + 0.02);
}

function somNavegar() {
  tocarNota(520, 0.055, "sine", 0.04, 0);
}

function somConfirmar() {
  tocarNota(587.33, 0.07, "triangle", 0.05, 0);
  tocarNota(880, 0.09, "triangle", 0.05, 0.055);
}

function somAbrirJogo() {
  tocarNota(440, 0.08, "square", 0.035, 0);
  tocarNota(554.37, 0.08, "square", 0.035, 0.07);
  tocarNota(659.25, 0.1, "square", 0.035, 0.14);
  tocarNota(880, 0.24, "triangle", 0.06, 0.22);
}

function iniciarMusicaFundo() {
  if (!audioCtx || !state.somAtivo) return;
  garantirAudio();
  if (timerMusica) return;

  const notas = [220, 261.63, 329.63, 392.0, 329.63, 261.63, 293.66, 392.0];
  let passo = 0;

  timerMusica = setInterval(() => {
    if (!state.somAtivo || !audioCtx || audioCtx.state !== "running") return;
    const freq = notas[passo % notas.length];
    tocarNota(freq, 0.34, "sine", 0.016, 0);
    passo += 1;
  }, 420);
}

function pararMusicaFundo() {
  if (timerMusica) {
    clearInterval(timerMusica);
    timerMusica = null;
  }
}

function atualizarBotaoAudio() {
  const tr = t();
  el.btnAudioToggle.textContent = state.somAtivo ? tr.somOn : tr.somOff;
}

function t() {
  return TRADUCOES[state.idioma] || TRADUCOES["pt-BR"];
}

function setStatus(msg) {
  el.statusMensagem.textContent = msg;
}

function aplicarCustomizacao() {
  document.documentElement.style.setProperty("--accent", state.corDestaque);
  document.documentElement.style.setProperty("--accent-green", state.corBotao);
  document.documentElement.style.setProperty("--backdrop-blur", `${state.blurFundo}px`);

  if (el.inputCorDestaque) el.inputCorDestaque.value = state.corDestaque;
  if (el.inputCorBotao) el.inputCorBotao.value = state.corBotao;
  if (el.rangeBlurFundo) el.rangeBlurFundo.value = String(state.blurFundo);
  if (el.valorBlur) el.valorBlur.textContent = String(state.blurFundo);
  if (el.checkDiscordAtivo) el.checkDiscordAtivo.checked = state.discordAtivo;
  if (el.inputDiscordWebhook) el.inputDiscordWebhook.value = state.discordWebhook;
}

function aplicarIdiomaNaTela() {
  const tr = t();
  el.btnBiblioteca.textContent = tr.biblioteca;
  el.btnConfiguracoes.textContent = tr.configuracoes;
  atualizarBotaoAudio();
  el.textoVazio.textContent = tr.vazio;
  document.getElementById("labelTabBiblioteca").textContent = tr.tabBiblioteca;
  document.getElementById("labelTabEstilo").textContent = tr.tabEstilo;
  document.getElementById("labelTabScraping").textContent = tr.tabScraping;
  document.getElementById("labelTabIdioma").textContent = tr.tabIdioma;
  document.getElementById("labelTabCustom").textContent = tr.tabCustom;
  document.getElementById("tituloConfigPasta").textContent = tr.tituloConfigPasta;
  document.getElementById("descConfigPasta").textContent = tr.descConfigPasta;
  el.btnEscolherPasta.textContent = tr.escolherPasta;
  el.btnCarregarPasta.textContent = tr.carregarPasta;
  document.getElementById("emuladoresDetectados").textContent = tr.emuladoresDetectados;
  el.btnEscanearEmuladores.textContent = tr.escanearEmuladores;
  document.getElementById("tituloEstiloJogo").textContent = tr.tituloEstiloJogo;
  document.getElementById("descEstiloJogo").textContent = tr.descEstiloJogo;
  document.getElementById("estiloMidiaFisica").textContent = tr.estiloMidiaFisica;
  document.getElementById("estiloMidiaFisicaDesc").textContent = tr.estiloMidiaFisicaDesc;
  document.getElementById("estiloBolinhasVita").textContent = tr.estiloBolinhasVita;
  document.getElementById("estiloBolinhasVitaDesc").textContent = tr.estiloBolinhasVitaDesc;
  document.getElementById("estiloPadraoCartucho").textContent = tr.estiloPadraoCartucho;
  document.getElementById("estiloPadraoCartuchoDesc").textContent = tr.estiloPadraoCartuchoDesc;
  document.getElementById("tituloScraping").textContent = tr.tituloScraping;
  document.getElementById("descScraping").textContent = tr.descScraping;
  el.btnSalvarKey.textContent = tr.salvarKey;
  el.selectIdioma.value = state.idioma;
  renderConsoles();
  renderBiblioteca();
}

function jogosFiltrados() {
  if (state.consoleFiltro === "TODOS") return state.jogos;
  return state.jogos.filter((j) => j.console === state.consoleFiltro);
}

function renderConsoles() {
  const tr = t();
  const consolesUnicos = ["TODOS", ...new Set(state.jogos.map((j) => j.console))];
  el.consoleTabs.innerHTML = "";

  for (const c of consolesUnicos) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `console-tab ${state.consoleFiltro === c ? "active" : ""}`;
    btn.textContent = c === "TODOS" ? tr.todos : c;
    btn.addEventListener("click", () => {
      iniciarMusicaFundo();
      somNavegar();
      state.consoleFiltro = c;
      state.indiceSelecionado = 0;
      renderConsoles();
      renderBiblioteca();
    });
    el.consoleTabs.appendChild(btn);
  }
}

function atualizarBackdrop(capaUrl) {
  if (capaUrl) {
    el.backdrop.style.backgroundImage = `url("${capaUrl.replace(/"/g, "%22")}")`;
  } else {
    el.backdrop.style.backgroundImage = "none";
  }
}

function criarPlaceholder(titulo) {
  const div = document.createElement("div");
  div.className = "game-placeholder";
  div.textContent = titulo;
  return div;
}

function encontrarEmuladorParaJogo(jogo) {
  if (!jogo || !Array.isArray(state.emuladores)) return null;
  const exato = state.emuladores.find((e) => e.nome === jogo.emulador);
  if (exato) return exato;
  return state.emuladores.find((e) => Array.isArray(e.consoles) && e.consoles.includes(jogo.console)) || null;
}

async function abrirJogo(jogo) {
  if (!jogo) return;
  iniciarMusicaFundo();
  somAbrirJogo();
  setStatus(t().iniciandoJogo(jogo));

  if (state.discordAtivo && window.cartridgeAPI && typeof window.cartridgeAPI.notificarDiscord === "function") {
    window.cartridgeAPI.notificarDiscord({
      webhookUrl: state.discordWebhook,
      jogo
    }).catch(() => {});
  }

  const emu = encontrarEmuladorParaJogo(jogo);
  if (emu && window.cartridgeAPI && typeof window.cartridgeAPI.iniciarJogo === "function") {
    const res = await window.cartridgeAPI.iniciarJogo({
      caminho: jogo.caminho,
      emuladorCaminho: emu.caminho
    });
    if (!res || !res.ok) {
      setStatus(t().emuladorNaoEncontrado(jogo));
    }
  }
}

function renderBiblioteca() {
  const tr = t();
  const lista = jogosFiltrados();

  el.carouselContainer.className = `carousel-container estilo-${state.estilo}`;
  el.tituloSecao.textContent = state.consoleFiltro === "TODOS" ? tr.todosOsJogos : state.consoleFiltro;
  el.contadorJogos.textContent = tr.jogosCarregados(lista.length);

  if (lista.length === 0) {
    el.emptyState.style.display = "block";
    el.carouselTrack.innerHTML = "";
    el.infoJogoAtual.textContent = "";
    atualizarBackdrop(null);
    return;
  }

  el.emptyState.style.display = "none";
  if (state.indiceSelecionado >= lista.length) {
    state.indiceSelecionado = 0;
  }

  el.carouselTrack.innerHTML = "";

  lista.forEach((jogo, idx) => {
    const consoleClasse = `media-${String(jogo.console || "").toLowerCase()}`;
    const card = document.createElement("div");
    card.className = `game-card ${consoleClasse} ${idx === state.indiceSelecionado ? "selected" : ""}`;

    const chave = `${jogo.console}:${jogo.titulo}:${state.idioma}`;
    const capaUrl = state.capas[chave] || null;

    const wrap = document.createElement("div");
    wrap.className = "game-cover-wrap";

    if (capaUrl) {
      const img = document.createElement("img");
      img.src = capaUrl;
      img.alt = jogo.titulo;
      img.loading = "lazy";
      img.onerror = () => {
        img.replaceWith(criarPlaceholder(jogo.titulo));
      };
      wrap.appendChild(img);
    } else {
      wrap.appendChild(criarPlaceholder(jogo.titulo));
    }

    if (state.estilo === "midia-fisica") {
      const shell = document.createElement("div");
      shell.className = "media-shell";

      if (jogo.console === "GBA") {
        const ridge = document.createElement("div");
        ridge.className = "media-top-ridge";
        shell.appendChild(ridge);
      }

      const tag = document.createElement("span");
      tag.className = "media-tag";
      tag.textContent = jogo.console;
      shell.appendChild(tag);
      shell.appendChild(wrap);
      card.appendChild(shell);
    } else {
      card.appendChild(wrap);
    }

    const info = document.createElement("div");
    info.className = "game-info";

    const tituloEl = document.createElement("div");
    tituloEl.className = "game-title";
    tituloEl.textContent = jogo.titulo;

    const subEl = document.createElement("div");
    subEl.className = "game-sub";
    subEl.textContent = `${jogo.console} • ${jogo.emulador}`;

    info.appendChild(tituloEl);
    info.appendChild(subEl);
    card.appendChild(info);

    card.addEventListener("click", () => {
      iniciarMusicaFundo();
      if (state.indiceSelecionado === idx) {
        abrirJogo(jogo);
      } else {
        somNavegar();
        state.indiceSelecionado = idx;
        renderBiblioteca();
      }
    });

    el.carouselTrack.appendChild(card);
  });

  const atual = lista[state.indiceSelecionado];
  if (atual) {
    el.infoJogoAtual.textContent = `${atual.arquivo} (${atual.emulador})`;
    const chaveAtual = `${atual.console}:${atual.titulo}:${state.idioma}`;
    atualizarBackdrop(state.capas[chaveAtual] || null);
  }
}

async function buscarCapaParaJogo(jogo) {
  const tituloLimpo = String(jogo.titulo || "").trim();
  if (!tituloLimpo) return null;

  const chave = `${jogo.console}:${tituloLimpo}:${state.idioma}`;
  if (Object.prototype.hasOwnProperty.call(state.capas, chave)) {
    return state.capas[chave];
  }

  const params = new URLSearchParams({
    titulo: tituloLimpo,
    console: jogo.console || "",
    idioma: state.idioma || "pt-BR"
  });

  const headers = {};
  if (state.apiKey) {
    headers["x-sgdb-apikey"] = state.apiKey;
  }

  try {
    const res = await fetch(`${API_BASE}/api/capa?${params.toString()}`, { headers });
    if (!res.ok) return null;
    const data = await res.json();
    state.capas[chave] = data.url || null;
    return state.capas[chave];
  } catch {
    return null;
  }
}

async function buscarCapasDeTodosJogos() {
  if (!state.jogos.length) return;
  setStatus(t().buscandoCapas);

  for (const jogo of state.jogos) {
    await buscarCapaParaJogo(jogo);
    renderBiblioteca();
  }

  setStatus(t().capasAtualizadas);
}

async function carregarPasta(caminho) {
  const pastaLimpa = String(caminho || "").trim();
  if (!pastaLimpa) return;

  try {
    const params = new URLSearchParams({ caminho: pastaLimpa });
    const res = await fetch(`${API_BASE}/api/pasta?${params.toString()}`);
    const data = await res.json();

    if (!res.ok) {
      setStatus(data.erro || "Erro ao carregar pasta.");
      return;
    }

    state.pasta = data.pasta;
    state.jogos = Array.isArray(data.jogos) ? data.jogos : [];
    state.indiceSelecionado = 0;
    localStorage.setItem("cartridge_pasta", state.pasta);

    renderConsoles();
    renderBiblioteca();
    setStatus(t().jogosCarregados(state.jogos.length));
    buscarCapasDeTodosJogos();
  } catch (err) {
    setStatus(`Falha de conexão com servidor: ${err.message}`);
  }
}

async function escanearEmuladores() {
  try {
    const res = await fetch(`${API_BASE}/api/emuladores`);
    const data = await res.json();
    const emus = Array.isArray(data.emuladores) ? data.emuladores : [];
    state.emuladores = emus;

    el.listaEmuladores.innerHTML = "";
    if (emus.length === 0) {
      el.listaEmuladores.innerHTML = `<li class="emu-empty">${t().nenhumEmu}</li>`;
      return;
    }

    for (const emu of emus) {
      const li = document.createElement("li");
      li.textContent = `${emu.nome} — ${emu.caminho} (${emu.consoles.join(", ")})`;
      el.listaEmuladores.appendChild(li);
    }
  } catch (err) {
    setStatus(`Erro ao escanear emuladores: ${err.message}`);
  }
}

function alternarView(novaView) {
  iniciarMusicaFundo();
  somNavegar();
  state.view = novaView;
  el.btnBiblioteca.classList.toggle("active", novaView === "biblioteca");
  el.btnConfiguracoes.classList.toggle("active", novaView === "configuracoes");
  el.viewBiblioteca.classList.toggle("active", novaView === "biblioteca");
  el.viewConfiguracoes.classList.toggle("active", novaView === "configuracoes");
}

function bindEventos() {
  window.addEventListener("pointerdown", iniciarMusicaFundo, { once: true });

  el.btnAudioToggle.addEventListener("click", () => {
    state.somAtivo = !state.somAtivo;
    localStorage.setItem("cartridge_som", String(state.somAtivo));
    if (state.somAtivo) {
      iniciarMusicaFundo();
      somConfirmar();
    } else {
      pararMusicaFundo();
    }
    atualizarBotaoAudio();
  });

  el.btnBiblioteca.addEventListener("click", () => alternarView("biblioteca"));
  el.btnConfiguracoes.addEventListener("click", () => alternarView("configuracoes"));

  document.querySelectorAll(".settings-tab").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      iniciarMusicaFundo();
      somNavegar();
      const target = tabBtn.dataset.tab;
      document.querySelectorAll(".settings-tab").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".settings-panel").forEach((p) => p.classList.remove("active"));
      tabBtn.classList.add("active");
      document.getElementById(`tab-${target}`).classList.add("active");
    });
  });

  el.btnEscolherPasta.addEventListener("click", async () => {
    iniciarMusicaFundo();
    somConfirmar();
    if (!window.cartridgeAPI || typeof window.cartridgeAPI.escolherPasta !== "function") return;
    const pastaEscolhida = await window.cartridgeAPI.escolherPasta();
    if (pastaEscolhida) {
      el.inputPastaRoms.value = pastaEscolhida;
      carregarPasta(pastaEscolhida);
    }
  });

  el.btnCarregarPasta.addEventListener("click", () => {
    iniciarMusicaFundo();
    somConfirmar();
    carregarPasta(el.inputPastaRoms.value);
  });

  el.btnEscanearEmuladores.addEventListener("click", () => {
    iniciarMusicaFundo();
    somConfirmar();
    escanearEmuladores();
  });

  document.querySelectorAll(".style-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.estilo === state.estilo);
    card.addEventListener("click", () => {
      iniciarMusicaFundo();
      somConfirmar();
      state.estilo = card.dataset.estilo;
      localStorage.setItem("cartridge_estilo", state.estilo);
      document.querySelectorAll(".style-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      renderBiblioteca();
    });
  });

  el.btnSalvarKey.addEventListener("click", () => {
    iniciarMusicaFundo();
    somConfirmar();
    state.apiKey = (el.inputApiKey.value || "").trim();
    localStorage.setItem("cartridge_sgdb_key", state.apiKey);
    state.capas = {};
    setStatus(t().keySalvaBuscando);
    buscarCapasDeTodosJogos();
  });

  el.btnAplicarIdioma.addEventListener("click", () => {
    iniciarMusicaFundo();
    somConfirmar();
    state.idioma = el.selectIdioma.value || "pt-BR";
    localStorage.setItem("cartridge_idioma", state.idioma);
    state.capas = {};
    aplicarIdiomaNaTela();
    setStatus(t().idiomaAplicado);
    buscarCapasDeTodosJogos();
  });

  if (el.rangeBlurFundo) {
    el.rangeBlurFundo.addEventListener("input", () => {
      state.blurFundo = Number(el.rangeBlurFundo.value) || 0;
      if (el.valorBlur) el.valorBlur.textContent = String(state.blurFundo);
      document.documentElement.style.setProperty("--backdrop-blur", `${state.blurFundo}px`);
    });
  }

  if (el.btnResetCustom) {
    el.btnResetCustom.addEventListener("click", () => {
      iniciarMusicaFundo();
      somConfirmar();
      state.corDestaque = "#7c4dff";
      state.corBotao = "#22c55e";
      state.blurFundo = 28;
      localStorage.setItem("cartridge_cor_destaque", state.corDestaque);
      localStorage.setItem("cartridge_cor_botao", state.corBotao);
      localStorage.setItem("cartridge_blur", String(state.blurFundo));
      aplicarCustomizacao();
      setStatus(t().temaPadrao);
    });
  }

  if (el.btnSalvarCustom) {
    el.btnSalvarCustom.addEventListener("click", () => {
      iniciarMusicaFundo();
      somConfirmar();
      state.corDestaque = el.inputCorDestaque.value || "#7c4dff";
      state.corBotao = el.inputCorBotao.value || "#22c55e";
      state.blurFundo = Number(el.rangeBlurFundo.value) || 0;
      state.discordAtivo = Boolean(el.checkDiscordAtivo.checked);
      state.discordWebhook = (el.inputDiscordWebhook.value || "").trim();

      localStorage.setItem("cartridge_cor_destaque", state.corDestaque);
      localStorage.setItem("cartridge_cor_botao", state.corBotao);
      localStorage.setItem("cartridge_blur", String(state.blurFundo));
      localStorage.setItem("cartridge_discord_ativo", String(state.discordAtivo));
      localStorage.setItem("cartridge_discord_webhook", state.discordWebhook);

      aplicarCustomizacao();
      setStatus(t().customSalva);
    });
  }

  window.addEventListener("keydown", (e) => {
    iniciarMusicaFundo();
    const lista = jogosFiltrados();

    if (e.key === "Tab") {
      e.preventDefault();
      alternarView(state.view === "biblioteca" ? "configuracoes" : "biblioteca");
      return;
    }

    if (e.key === "Escape" || e.key === "Backspace") {
      if (document.activeElement && ["INPUT", "SELECT"].includes(document.activeElement.tagName)) return;
      if (state.view !== "biblioteca") {
        alternarView("biblioteca");
      }
      return;
    }

    if (state.view !== "biblioteca" || !lista.length) return;

    if (e.key === "ArrowRight") {
      somNavegar();
      state.indiceSelecionado = (state.indiceSelecionado + 1) % lista.length;
      renderBiblioteca();
    } else if (e.key === "ArrowLeft") {
      somNavegar();
      state.indiceSelecionado = (state.indiceSelecionado - 1 + lista.length) % lista.length;
      renderBiblioteca();
    } else if (e.key === "Enter") {
      abrirJogo(lista[state.indiceSelecionado]);
    } else if (e.key === "q" || e.key === "Q" || e.key === "e" || e.key === "E") {
      somNavegar();
      const consoles = ["TODOS", ...new Set(state.jogos.map((j) => j.console))];
      const pos = consoles.indexOf(state.consoleFiltro);
      const delta = e.key === "q" || e.key === "Q" ? -1 : 1;
      state.consoleFiltro = consoles[(pos + delta + consoles.length) % consoles.length];
      state.indiceSelecionado = 0;
      renderConsoles();
      renderBiblioteca();
    }
  });
}

function init() {
  el.inputPastaRoms.value = state.pasta;
  el.inputApiKey.value = state.apiKey;
  el.selectIdioma.value = state.idioma;
  atualizarBotaoAudio();
  aplicarCustomizacao();
  bindEventos();
  aplicarIdiomaNaTela();
  escanearEmuladores();
  if (state.pasta) {
    carregarPasta(state.pasta);
  }
}

init();