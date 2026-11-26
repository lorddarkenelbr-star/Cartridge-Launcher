const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = 3000;
const cacheCapas = new Map();

const extensoesPorConsole = {
  NES: [".nes", ".unf", ".unif"],
  SGM: [".sms"],
  GB: [".gb"],
  GBC: [".gbc"],
  SNES: [".smc", ".sfc"],
  SGMD: [".md", ".gen", ".bin"],
  NEOGEO: [".zip", ".neo"],
  PcEngine: [".pce"],
  PS1: [".chd", ".cue", ".pbp", ".bin", ".iso"],
  N64: [".z64", ".n64", ".v64"],
  SG: [".chd", ".cue"],
  VTB: [".vb", ".vboy"],
  PS2: [".iso", ".cso"],
  XBX: [".xbe"],
  GC: [".gcm", ".rvz", ".gcz", ".iso"],
  DC: [".cdi", ".gdi"],
  GBA: [".gba"],
  PS3: [".pkg"],
  XBX360: [".xex"],
  WII: [".wbfs", ".nkit.iso", ".iso"],
  DS: [".nds"],
  PSP: [".cso", ".iso"],
  PS4: [".pkg"],
  PSV: [".vpk"],
  SWITCH: [".nsp", ".xci"],
  "3DS": [".3ds", ".cia"]
};

const emuladorPadraoPorConsole = {
  NES: "RetroArch",
  SGM: "RetroArch",
  GB: "mGBA",
  GBC: "mGBA",
  SNES: "RetroArch",
  SGMD: "RetroArch",
  NEOGEO: "RetroArch",
  PcEngine: "RetroArch",
  PS1: "DuckStation",
  N64: "RetroArch",
  SG: "RetroArch",
  VTB: "RetroArch",
  PS2: "PCSX2",
  XBX: "RetroArch",
  GC: "Dolphin",
  DC: "RetroArch",
  GBA: "mGBA",
  PS3: "RetroArch",
  XBX360: "RetroArch",
  WII: "Dolphin",
  DS: "melonDS",
  PSP: "PPSSPP",
  PS4: "RetroArch",
  PSV: "Vita3K",
  SWITCH: "RetroArch",
  "3DS": "RetroArch"
};

const libretroSystemByConsole = {
  NES: "Nintendo - Nintendo Entertainment System",
  SGM: "Sega - Master System - Mark III",
  GB: "Nintendo - Game Boy",
  GBC: "Nintendo - Game Boy Color",
  SNES: "Nintendo - Super Nintendo Entertainment System",
  SGMD: "Sega - Mega Drive - Genesis",
  NEOGEO: "SNK - Neo Geo",
  PcEngine: "NEC - PC Engine - TurboGrafx-16",
  PS1: "Sony - PlayStation",
  N64: "Nintendo - Nintendo 64",
  SG: "Sega - Saturn",
  VTB: "Nintendo - Virtual Boy",
  PS2: "Sony - PlayStation 2",
  XBX: "Microsoft - Xbox",
  GC: "Nintendo - GameCube",
  DC: "Sega - Dreamcast",
  GBA: "Nintendo - Game Boy Advance",
  PS3: "Sony - PlayStation 3",
  XBX360: "Microsoft - Xbox 360",
  WII: "Nintendo - Wii",
  DS: "Nintendo - Nintendo DS",
  PSP: "Sony - PlayStation Portable",
  PSV: "Sony - PlayStation Vita",
  SWITCH: "Nintendo - Nintendo Switch",
  "3DS": "Nintendo - Nintendo 3DS"
};

const emuladoresConhecidos = [
  {
    nome: "DuckStation",
    bins: ["duckstation-qt", "duckstation", "duckstation-nogui", "duckstation-qt.exe"],
    consoles: ["PS1"]
  },
  {
    nome: "RetroArch",
    bins: ["retroarch", "retroarch.exe"],
    consoles: ["NES", "SGM", "GB", "SNES", "SGMD", "NEOGEO", "PcEngine", "PS1", "N64", "SG", "GBA", "DS", "PSP"]
  },
  {
    nome: "PCSX2",
    bins: ["pcsx2", "pcsx2-qt", "pcsx2-qt.exe"],
    consoles: ["PS2"]
  },
  {
    nome: "Dolphin",
    bins: ["dolphin-emu", "Dolphin.exe"],
    consoles: ["GC", "WII"]
  },
  {
    nome: "PPSSPP",
    bins: ["PPSSPPQt", "ppsspp", "ppsspp-sdl", "PPSSPPWindows64.exe"],
    consoles: ["PSP"]
  },
  {
    nome: "Vita3K",
    bins: ["Vita3K", "vita3k", "Vita3K.exe"],
    consoles: ["PSV"]
  },
  {
    nome: "melonDS",
    bins: ["melonds", "melonDS", "melonDS.exe"],
    consoles: ["DS"]
  },
  {
    nome: "mGBA",
    bins: ["mgba", "mgba-qt", "mGBA.exe"],
    consoles: ["GB", "GBA"]
  }
];

function enviarJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-sgdb-apikey"
  });
  res.end(JSON.stringify(payload));
}

function detectarConsolePorArquivo(nomeArquivo) {
  const lower = nomeArquivo.toLowerCase();

  for (const [consoleKey, exts] of Object.entries(extensoesPorConsole)) {
    for (const ext of exts) {
      if (lower.endsWith(ext)) {
        return {
          console: consoleKey === "GBC" ? "GB" : consoleKey,
          extensao: ext
        };
      }
    }
  }

  return null;
}

function formatarTituloJogo(nomeArquivo, extensao) {
  let base = nomeArquivo.slice(0, nomeArquivo.length - extensao.length);
  base = base
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[._]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return base || nomeArquivo;
}

function escanearDiretorioJogos(pastaRaiz) {
  const resultados = [];

  function percorrer(dirAtual, consoleSugerido = null) {
    let itens = [];
    try {
      itens = fs.readdirSync(dirAtual, { withFileTypes: true });
    } catch {
      return;
    }

    for (const item of itens) {
      if (item.name.startsWith(".")) continue;
      const caminhoCompleto = path.join(dirAtual, item.name);

      if (item.isDirectory()) {
        const upper = item.name.toUpperCase();
        const consoleDaPasta = Object.prototype.hasOwnProperty.call(extensoesPorConsole, upper)
          ? upper
          : consoleSugerido;
        percorrer(caminhoCompleto, consoleDaPasta);
      } else if (item.isFile()) {
        const infoConsole = detectarConsolePorArquivo(item.name);
        if (!infoConsole) continue;

        const chaveConsole = consoleSugerido || infoConsole.console;
        resultados.push({
          titulo: formatarTituloJogo(item.name, infoConsole.extensao),
          console: chaveConsole,
          extensao: infoConsole.extensao,
          emulador: emuladorPadraoPorConsole[chaveConsole] || "RetroArch",
          arquivo: item.name,
          caminho: caminhoCompleto
        });
      }
    }
  }

  percorrer(pastaRaiz, null);
  return resultados;
}

function buscarExecutavelNoSistema(binarios) {
  const pastasPath = (process.env.PATH || "").split(path.delimiter).filter(Boolean);
  const pastasExtras =
    process.platform === "win32"
      ? [
          process.env.ProgramFiles || "C:\\Program Files",
          process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)",
          process.env.LOCALAPPDATA || ""
        ].filter(Boolean)
      : ["/usr/bin", "/usr/local/bin", path.join(process.env.HOME || "", ".local/bin")];

  const todasPastas = [...pastasPath, ...pastasExtras];

  for (const pasta of todasPastas) {
    for (const bin of binarios) {
      const candidato = path.join(pasta, bin);
      try {
        if (fs.existsSync(candidato) && fs.statSync(candidato).isFile()) {
          return candidato;
        }
      } catch {
        // Ignora caminhos sem permissão
      }
    }
  }

  return null;
}

function escanearEmuladoresInstalados() {
  const encontrados = [];

  for (const emu of emuladoresConhecidos) {
    const caminho = buscarExecutavelNoSistema(emu.bins);
    if (caminho) {
      encontrados.push({
        nome: emu.nome,
        caminho,
        consoles: emu.consoles
      });
    }
  }

  return encontrados;
}

function regioesPorIdioma(idioma) {
  const lang = (idioma || "pt-BR").toLowerCase();
  if (lang.startsWith("pt")) return ["(Brazil)", "(USA)", "(World)", "(Europe)"];
  if (lang.startsWith("es")) return ["(Spain)", "(USA)", "(World)", "(Europe)"];
  if (lang.startsWith("ja")) return ["(Japan)", "(World)", "(USA)"];
  return ["(USA)", "(World)", "(Europe)"];
}

function sanitizarNomeLibretro(titulo) {
  return String(titulo || "")
    .replace(/[&*/:`<>?\\|"]/g, "_")
    .replace(/\s+/g, " ")
    .trim();
}

async function verificarImagemUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

async function buscarCapaMidiaFisicaLibretro(titulo, consoleSigla, idioma) {
  const sistema = libretroSystemByConsole[(consoleSigla || "").toUpperCase()];
  if (!sistema) return null;

  const baseLimpo = sanitizarNomeLibretro(titulo);
  if (!baseLimpo) return null;

  const regioes = regioesPorIdioma(idioma);
  const candidatosNomes = [
    ...regioes.map((reg) => `${baseLimpo} ${reg}`),
    baseLimpo
  ];

  const systemEncoded = encodeURIComponent(sistema);

  for (const nome of candidatosNomes) {
    const url = `https://thumbnails.libretro.com/${systemEncoded}/Named_Boxarts/${encodeURIComponent(nome)}.png`;
    if (await verificarImagemUrl(url)) {
      return url;
    }
  }

  return null;
}

function pontuarGridMidiaFisica(grid) {
  if (!grid || !grid.url) return -999;
  let score = 0;

  const w = Number(grid.width) || 0;
  const h = Number(grid.height) || 0;

  if (h > w && w > 0) {
    score += 35;
    const ratio = h / w;
    if (ratio >= 1.25 && ratio <= 1.65) {
      score += 20;
    }
  } else if (w > h) {
    score -= 20;
  }

  const style = String(grid.style || "").toLowerCase();
  if (style === "alternate" || style === "material") score += 25;
  if (style === "blurred" || style === "white_logo") score += 10;
  if (style === "no_logo") score -= 5;

  if (grid.nsfw) score -= 50;
  if (grid.humor) score -= 20;

  score += Math.min(Number(grid.upvotes) || 0, 50) * 0.2;
  return score;
}

async function buscarCapaNoSteamGridDB(titulo, apiKey, options = {}) {
  const consoleSigla = (options.console || "").trim().toUpperCase();

  const headers = {
    Authorization: `Bearer ${apiKey}`
  };

  const consultas = consoleSigla ? [`${titulo} ${consoleSigla}`, titulo] : [titulo];
  let primeiroJogo = null;

  for (const termo of consultas) {
    const searchUrl = `https://www.steamgriddb.com/api/v2/search/autocomplete/${encodeURIComponent(termo)}`;
    const searchRes = await fetch(searchUrl, { headers });

    if (!searchRes.ok) {
      if (termo === consultas[consultas.length - 1]) {
        return { status: searchRes.status, url: null, fonte: null };
      }
      continue;
    }

    const searchJson = await searchRes.json();
    if (Array.isArray(searchJson.data) && searchJson.data.length > 0) {
      primeiroJogo = searchJson.data[0];
      break;
    }
  }

  if (!primeiroJogo || !primeiroJogo.id) {
    return { status: 200, url: null, fonte: null };
  }

  const gridsUrlFiltrada = `https://www.steamgriddb.com/api/v2/grids/game/${primeiroJogo.id}?dimensions=600x900,342x482,460x690,660x930`;
  let gridsRes = await fetch(gridsUrlFiltrada, { headers });
  let gridsJson = gridsRes.ok ? await gridsRes.json() : { data: [] };

  let candidatos = Array.isArray(gridsJson.data) ? gridsJson.data.filter((item) => item && item.url) : [];

  if (candidatos.length === 0) {
    const gridsUrlGeral = `https://www.steamgriddb.com/api/v2/grids/game/${primeiroJogo.id}`;
    gridsRes = await fetch(gridsUrlGeral, { headers });
    if (!gridsRes.ok) {
      return { status: gridsRes.status, url: null, fonte: null };
    }
    gridsJson = await gridsRes.json();
    candidatos = Array.isArray(gridsJson.data) ? gridsJson.data.filter((item) => item && item.url) : [];
  }

  if (candidatos.length === 0) {
    return { status: 200, url: null, fonte: null };
  }

  candidatos.sort((a, b) => pontuarGridMidiaFisica(b) - pontuarGridMidiaFisica(a));
  return {
    status: 200,
    url: candidatos[0].url,
    fonte: "SteamGridDB",
    jogoEncontrado: primeiroJogo.name
  };
}

async function resolverCapaMidiaFisica({ titulo, consoleSigla, idioma, apiKey }) {
  const chaveCache = `${titulo.toLowerCase()}:${consoleSigla.toUpperCase()}:${idioma.toLowerCase()}:${apiKey ? "sgdb" : "no-sgdb"}`;
  if (cacheCapas.has(chaveCache)) {
    return { status: 200, data: cacheCapas.get(chaveCache) };
  }

  const boxartLibretro = await buscarCapaMidiaFisicaLibretro(titulo, consoleSigla, idioma);
  if (boxartLibretro) {
    const payload = { url: boxartLibretro, fonte: "LibRetro Boxart", idioma };
    cacheCapas.set(chaveCache, payload);
    return { status: 200, data: payload };
  }

  if (apiKey) {
    const sgdb = await buscarCapaNoSteamGridDB(titulo, apiKey, { console: consoleSigla, idioma });
    if (sgdb.url) {
      const payload = {
        url: sgdb.url,
        fonte: sgdb.fonte,
        jogoEncontrado: sgdb.jogoEncontrado,
        idioma
      };
      cacheCapas.set(chaveCache, payload);
      return { status: 200, data: payload };
    }
    if (sgdb.status === 401 || sgdb.status === 403) {
      return { status: sgdb.status, data: { url: null, erro: "API Key inválida na SteamGridDB." } };
    }
  }

  const payloadVazio = { url: null, fonte: null, idioma };
  cacheCapas.set(chaveCache, payloadVazio);
  return { status: 200, data: payloadVazio };
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-sgdb-apikey"
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (parsedUrl.pathname === "/api/pasta" && req.method === "GET") {
    const caminho = (parsedUrl.searchParams.get("caminho") || "").trim();
    if (!caminho) {
      enviarJson(res, 400, { erro: "Caminho da pasta não informado.", jogos: [] });
      return;
    }

    const caminhoResolvido = path.resolve(caminho);
    if (!fs.existsSync(caminhoResolvido) || !fs.statSync(caminhoResolvido).isDirectory()) {
      enviarJson(res, 404, { erro: "Pasta não encontrada.", jogos: [] });
      return;
    }

    const jogos = escanearDiretorioJogos(caminhoResolvido);
    enviarJson(res, 200, { pasta: caminhoResolvido, jogos });
    return;
  }

  if (parsedUrl.pathname === "/api/emuladores" && req.method === "GET") {
    const emuladores = escanearEmuladoresInstalados();
    enviarJson(res, 200, { emuladores });
    return;
  }

  if (parsedUrl.pathname === "/api/capa" && req.method === "GET") {
    const titulo = (parsedUrl.searchParams.get("titulo") || "").trim();
    const consoleSigla = (parsedUrl.searchParams.get("console") || "").trim();
    const idioma = (parsedUrl.searchParams.get("idioma") || "pt-BR").trim();
    const apiKey = (req.headers["x-sgdb-apikey"] || "").trim();

    if (!titulo) {
      enviarJson(res, 400, { url: null, erro: "Título não informado." });
      return;
    }

    try {
      const resultado = await resolverCapaMidiaFisica({
        titulo,
        consoleSigla,
        idioma,
        apiKey
      });
      enviarJson(res, resultado.status, resultado.data);
    } catch (erro) {
      console.error("Erro ao buscar capa de mídia física:", erro);
      enviarJson(res, 502, { url: null, erro: "Falha ao buscar capa de mídia física." });
    }
    return;
  }

  enviarJson(res, 404, { erro: "Rota não encontrada." });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});