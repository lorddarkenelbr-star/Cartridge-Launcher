const versoes = {
  android: {
    nome: "Android",
    arquiteturas: ["arm64-v8a", "armeabi-v7a"],
    arquivos: [".apk"]
  },
  linux: {
    nome: "Linux",
    arquiteturas: ["x86_64", "aarch64"],
    arquivos: [".AppImage", ".tar.gz", ".pkg.tar.zst"]
  },
  windows: {
    nome: "Windows",
    arquiteturas: ["x64", "arm64"],
    arquivos: [".exe", ".zip"]
  }
};

function mostrarVersao(sistema) {
  const chave = sistema.toLowerCase();
  const dados = versoes[chave];

  if (!dados) {
    console.log("Sistema não encontrado. Use: android, linux ou windows.");
    return;
  }

  console.log(`Sistema: ${dados.nome}`);
  console.log(`Arquiteturas: ${dados.arquiteturas.join(", ")}`);
  console.log(`Arquivos: ${dados.arquivos.join(", ")}`);
}

// Testando:
mostrarVersao("linux");