const colorSwatchContainer = document.getElementById("color-swatch-container");

fetch("https://www.thecolorapi.com/scheme?hex=0047AB&mode=analogic&count=5")
    .then(res => res.json())
    .then(data => {
        const colors = data.colors;
        colorSwatchContainer.innerHTML = "";
        colors.forEach((color) => {
            createColorSwatch(color);
        })
    });


function createColorSwatch(color) {
    const newSwatch = document.createElement("div");
    newSwatch.classList.add("swatch");
    const newSwatchColor = document.createElement("div");
    newSwatchColor.classList.add("swatch-color");
    newSwatchColor.style.backgroundColor = color.hex.value;
    const newFooter = document.createElement("div");
    newFooter.classList.add("footer");
    newFooter.textContent = color.hex.value;

    newSwatch.append(newSwatchColor, newFooter);
    colorSwatchContainer.append(newSwatch);
}