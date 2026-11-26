const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

require("./server.js");

let mainWindow = null;

function createWindow() {
  const iconPath = path.join(__dirname, "assets", "icon.png");
  const windowOptions = {
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    backgroundColor: "#0c0b12",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  };

  if (fs.existsSync(iconPath)) {
    windowOptions.icon = iconPath;
  }

  mainWindow = new BrowserWindow(windowOptions);
  mainWindow.loadFile(path.join(__dirname, "index.html"));
}

ipcMain.handle("escolher-pasta", async () => {
  const resultado = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"]
  });

  if (resultado.canceled || !resultado.filePaths || !resultado.filePaths.length) {
    return null;
  }

  return resultado.filePaths[0];
});

ipcMain.handle("iniciar-jogo", async (_event, payload) => {
  const caminhoRom = payload && payload.caminho;
  const emuladorCaminho = payload && payload.emuladorCaminho;

  if (!caminhoRom || !emuladorCaminho) {
    return { ok: false, motivo: "Emulador ou caminho da ROM não encontrado." };
  }

  try {
    const child = spawn(emuladorCaminho, [caminhoRom], {
      detached: true,
      stdio: "ignore"
    });
    child.unref();
    return { ok: true };
  } catch (err) {
    return { ok: false, motivo: err.message };
  }
});

ipcMain.handle("notificar-discord", async (_event, payload) => {
  const webhookUrl = payload && typeof payload.webhookUrl === "string" ? payload.webhookUrl.trim() : "";
  const jogo = payload && payload.jogo ? payload.jogo : null;

  if (!jogo) {
    return { ok: false, motivo: "Jogo não informado." };
  }

  console.log(`[Discord] Jogando ${jogo.titulo} (${jogo.console} • ${jogo.emulador})`);

  if (webhookUrl && webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🎮 **Cartridge** — Jogando **${jogo.titulo}** no **${jogo.console}** (${jogo.emulador})`
        })
      });
      return { ok: res.ok, status: res.status };
    } catch (err) {
      return { ok: false, motivo: err.message };
    }
  }

  return { ok: true, localOnly: true };
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});