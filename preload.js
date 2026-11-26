const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("cartridgeAPI", {
  escolherPasta: () => ipcRenderer.invoke("escolher-pasta"),
  iniciarJogo: (dados) => ipcRenderer.invoke("iniciar-jogo", dados),
  notificarDiscord: (dados) => ipcRenderer.invoke("notificar-discord", dados)
});