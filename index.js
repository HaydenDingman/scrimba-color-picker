const colorSwatchContainer = document.getElementById("color-swatch-container");
const colorPicker = document.getElementById("color-picker");
const colorScheme = document.getElementById("scheme");
const copyModal = document.getElementById("copy-modal");

document.getElementById("color-scheme-form").addEventListener("submit", (e) => {
    e.preventDefault();
    getNewColorScheme();
})

document.getElementById("dark-mode").addEventListener("click", () => {
    document.body.classList.toggle("dark");
})

function getNewColorScheme() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicker.value.replace('#', '')}&mode=${colorScheme.value}&count=5`)
        .then(res => res.json())
        .then(data => {
            const colors = data.colors;
            colorSwatchContainer.innerHTML = "";
            colors.forEach((color) => {
                createColorSwatch(color);
            })
        });
}

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

    newSwatch.addEventListener("click", (e) => {
        copyColorHex(e, color.hex.value)
    })

    colorSwatchContainer.append(newSwatch);
}

function copyColorHex(e, color) {
    navigator.clipboard.writeText(color);
    copyModal.style.left = e.clientX - (copyModal.offsetWidth / 2);
    copyModal.style.top = e.clientY - (copyModal.offsetHeight / 2);
    copyModal.classList.add("fade-in");
    setTimeout(() => {
        copyModal.classList.remove("fade-in");
    }, 1500)
}

getNewColorScheme();