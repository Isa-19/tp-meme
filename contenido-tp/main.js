document.addEventListener("DOMContentLoaded", () => {
  const imagePanel = document.getElementById("image-panel");
  const textPanel = document.getElementById("text-panel");
  const imageLink = document.getElementById("image-link");
  const textLink = document.getElementById("text-link");
  const memeImage = document.getElementById("meme-image");
  const topTextElement = document.getElementById("top-text");
  const bottomTextElement = document.getElementById("bottom-text");
  const imageContainer = document.getElementById("image-container");

  // Alternar paneles entre Imagen y Texto
  imageLink.addEventListener("click", (e) => {
    e.preventDefault();
    imagePanel.classList.remove("hidden");
    textPanel.classList.add("hidden");
  });

  textLink.addEventListener("click", (e) => {
    e.preventDefault();
    textPanel.classList.remove("hidden");
    imagePanel.classList.add("hidden");
  });

  // Cargar imagen desde la URL
  document.getElementById("image-url").addEventListener("input", (e) => {
    const url = e.target.value;
    memeImage.src = url;
  });

  // Aplicar filtros avanzados a la imagen
  const filters = [
    "brightness",
    "opacity",
    "contrast",
    "blur",
    "grayscale",
    "sepia",
    "hue-rotate",
    "saturate",
    "invert",
  ];

  function applyImageFilters() {
    memeImage.style.filter = `
        brightness(${document.getElementById("brightness").value}%)
        opacity(${document.getElementById("opacity").value}%)
        contrast(${document.getElementById("contrast").value}%)
        blur(${document.getElementById("blur").value}px)
        grayscale(${document.getElementById("grayscale").value}%)
        sepia(${document.getElementById("sepia").value}%)
        hue-rotate(${document.getElementById("hue-rotate").value}deg)
        saturate(${document.getElementById("saturate").value}%)
        invert(${document.getElementById("invert").value}%)`;
  }

  filters.forEach((filter) => {
    document.getElementById(filter).addEventListener("input", applyImageFilters);
  });

  // Restablecer filtros a valores por defecto
  document.getElementById("reset-filters").addEventListener("click", () => {
    filters.forEach((filter) => {
      const element = document.getElementById(filter);
      if (filter === "blur" || filter === "hue-rotate") element.value = 0;
      else if (filter === "opacity") element.value = 100;
      else element.value = 100;
    });
    applyImageFilters();
  });

  // Aplicar texto personalizado
  document.getElementById("apply-text").addEventListener("click", () => {
    const topText = document.getElementById("new-top-text").value || "TOP TEXT";
    const bottomText = document.getElementById("new-bottom-text").value || "BOTTOM TEXT";
    const hideTop = document.getElementById("hide-top-text").checked;
    const hideBottom = document.getElementById("hide-bottom-text").checked;

    const font = document.getElementById("font-select").value;
    const fontSize = document.getElementById("font-size").value;
    const color = document.getElementById("color-picker").value;
    const bgColor = document.getElementById("transparent-bg").checked
      ? "transparent"
      : document.getElementById("bg-color").value;
    const spacing = document.getElementById("spacing").value;
    const lineHeight = document.getElementById("line-height").value;

    // Configurar texto superior e inferior
    topTextElement.textContent = hideTop ? "" : topText;
    bottomTextElement.textContent = hideBottom ? "" : bottomText;

    [topTextElement, bottomTextElement].forEach((el) => {
      el.style.fontFamily = font;
      el.style.fontSize = `${fontSize}px`;
      el.style.color = color;
      el.style.backgroundColor = bgColor;
      el.style.letterSpacing = `${spacing}px`;
      el.style.lineHeight = lineHeight;
      el.style.textShadow = "1px 1px 2px black";
    });
  });

  // Cambiar color de fondo del contenedor de la imagen
  document.getElementById("background-color").addEventListener("input", (e) => {
    imageContainer.style.backgroundColor = e.target.value;
  });

  // Aplicar modos de mezcla del fondo
  document.getElementById("background-option").addEventListener("change", (e) => {
    const mode = e.target.value;
    memeImage.style.mixBlendMode = mode === "normal" ? "normal" : mode;
  });

  // Descargar meme como imagen
  // document.getElementById("download-meme").addEventListener("click", () => {
  //   html2canvas(imageContainer).then((canvas) => {
  //     const link = document.createElement("a");
  //     link.download = "meme.png";
  //     link.href = canvas.toDataURL();
  //     link.click();
  //   });
  // });
});

document.addEventListener("DOMContentLoaded", () => {
  const topTextElement = document.getElementById("top-text");
  const bottomTextElement = document.getElementById("bottom-text");

  // Obtener referencias a los controles del panel de texto
  const topTextInput = document.getElementById("new-top-text");
  const hideTopCheckbox = document.getElementById("hide-top-text");

  const bottomTextInput = document.getElementById("new-bottom-text");
  const hideBottomCheckbox = document.getElementById("hide-bottom-text");

  const fontSelect = document.getElementById("font-select");
  const fontSizeInput = document.getElementById("font-size");

  const colorPicker = document.getElementById("color-picker");
  const bgColorPicker = document.getElementById("bg-color");
  const transparentBgCheckbox = document.getElementById("transparent-bg");

  const spacingInput = document.getElementById("spacing");
  const lineHeightSelect = document.getElementById("line-height");

  const applyTextButton = document.getElementById("apply-text");

  // Función para aplicar los cambios de texto
  function applyTextStyles() {
    const topText = hideTopCheckbox.checked ? "" : topTextInput.value || "TOP TEXT";
    const bottomText = hideBottomCheckbox.checked ? "" : bottomTextInput.value || "BOTTOM TEXT";

    const fontFamily = fontSelect.value;
    const fontSize = `${fontSizeInput.value}px`;
    const color = colorPicker.value;
    const backgroundColor = transparentBgCheckbox.checked ? "transparent" : bgColorPicker.value;
    const letterSpacing = `${spacingInput.value}px`;
    const lineHeight = lineHeightSelect.value;

    // Aplicar estilos al texto superior
    topTextElement.textContent = topText;
    topTextElement.style.fontFamily = fontFamily;
    topTextElement.style.fontSize = fontSize;
    topTextElement.style.color = color;
    topTextElement.style.backgroundColor = backgroundColor;
    topTextElement.style.letterSpacing = letterSpacing;
    topTextElement.style.lineHeight = lineHeight;

    // Aplicar estilos al texto inferior
    bottomTextElement.textContent = bottomText;
    bottomTextElement.style.fontFamily = fontFamily;
    bottomTextElement.style.fontSize = fontSize;
    bottomTextElement.style.color = color;
    bottomTextElement.style.backgroundColor = backgroundColor;
    bottomTextElement.style.letterSpacing = letterSpacing;
    bottomTextElement.style.lineHeight = lineHeight;
  }

  // Evento para aplicar texto al hacer clic en el botón
  applyTextButton.addEventListener("click", applyTextStyles);

  // Actualizar texto dinámicamente al escribir
  topTextInput.addEventListener("input", applyTextStyles);
  bottomTextInput.addEventListener("input", applyTextStyles);

  // Actualizar estilos dinámicamente en tiempo real
  fontSelect.addEventListener("change", applyTextStyles);
  fontSizeInput.addEventListener("input", applyTextStyles);
  colorPicker.addEventListener("input", applyTextStyles);
  bgColorPicker.addEventListener("input", applyTextStyles);
  transparentBgCheckbox.addEventListener("change", applyTextStyles);
  spacingInput.addEventListener("input", applyTextStyles);
  lineHeightSelect.addEventListener("change", applyTextStyles);
  hideTopCheckbox.addEventListener("change", applyTextStyles);
  hideBottomCheckbox.addEventListener("change", applyTextStyles);
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleLightModeButton = document.getElementById("toggle-light-mode");

  // Alternar modo claro para toda la página excepto el meme
  toggleLightModeButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.toggle("light-mode");
  });
});

document.getElementById("download-meme").addEventListener("click", () => {
  const memeImage = document.getElementById("meme-image");

  // Aplica el atributo crossOrigin si es necesario
  memeImage.setAttribute("crossOrigin", "anonymous");

  domtoimage
    .toBlob(document.getElementById("image-container"))
    .then((blob) => {
      window.saveAs(blob, "meme.png");
    })
    .catch((error) => {
      console.error("Error al generar la imagen:", error);
    });
});
