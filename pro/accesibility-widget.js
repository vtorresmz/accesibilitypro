/* Accesibility PRO
version: 1.0
AUTHOR: VLADIMIR DRAGUICEVIC MUÑOZ
AUTHOR URL:https://www.linkedin.com/in/vtorresm/?locale=en_US
Esta libreria en su versión 1.0 está desarrollada para que las empresas y corporativos 
tengan el minimo de accesibilidad, todo este código ha sido escrito por Vladimir Draguiceviec Muñoz durante 6 meses de trabajo.
Si ves esté código y no están pagando licencia, favor avisame. 

Si necesitas la versión free del plugin no dudes escribirme o visitar mi perfil de github:

https://github.com/vtorresmz/accesibility

Muchas gracias
*/


/*variables de los botones*/
var speakBtn = document.createElement("button");
var btnHabilitar = document.createElement("button");
var fontSizeButton = document.createElement("button");
var btnAlternar = document.createElement("button");
var lineHeightButton = document.createElement("button");
var textalignButton = document.createElement("button");
var fontFamilyButton = document.createElement("button");
var accesibilityBoton = document.createElement("button");

/*ingresar por enter a los contenidos*/
document.addEventListener("keydown", function(event) {
    if (document.activeElement.tagName === "A" && event.key === "Enter") {
        event.preventDefault();
        window.location = document.activeElement.href;
    }
});
/*ingresar por enter a los contenidos*/
/*** *Accesibility lector de páginas web ***/
/*** *Accesibility lector de páginas web ***/



function accesibilityread() {



    speakBtn.classList.add("accesibility-widget", "accesibility-boton");
    speakBtn.innerHTML = "Habilitar lectura";

    document.body.appendChild(speakBtn);
    speakBtn.addEventListener("click", toggleSpeech);

    var isSpeaking = false;
    var focusedElement = null;

    function toggleSpeech() {
        if (!isSpeaking) {
            speakBtn.innerHTML = "Deshabilitar lectura";
            isSpeaking = true;
            readPage();
        } else {
            speakBtn.innerHTML = "Habilitar lectura";
            isSpeaking = false;
            window.speechSynthesis.cancel();
        }
    }

    function readPage() {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            var utterance = new SpeechSynthesisUtterance();
            utterance.rate = 0.6;
            utterance.onend = function() {
                if (focusedElement) {
                    focusedElement.style.outline = "";
                    focusedElement = null;
                }
                if (isSpeaking) {
                    readPage();
                }
            };
            var elements = document.getElementsByTagName("*");
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element.tabIndex >= 0) {
                    element.addEventListener("focus", function(event) {
                        if (isSpeaking) {
                            var elements = document.getElementsByTagName("*");
                            for (var i = 0; i < elements.length; i++) {
                                elements[i].addEventListener("focus", function(event) {
                                    var text = event.target.textContent;
                                    var msg = new SpeechSynthesisUtterance(text);
                                    msg.rate = 0.6;
                                    window.speechSynthesis.speak(msg);
                                });
                                elements[i].addEventListener("blur", function() {
                                    window.speechSynthesis.cancel();
                                });
                            }
                        }
                    });
                }
            }
        }
    }

    /*** *Accesibility lector de páginas web ***/
    // Selecciona todos los párrafos y enlaces
    const paragraphs = document.querySelectorAll("p");
    const links = document.querySelectorAll("a");

    paragraphs.forEach(function(paragraph) {
        paragraph.addEventListener("focus", function() {
            var utterance = new SpeechSynthesisUtterance("párrafo");
            utterance.rate = 0.5;
            window.speechSynthesis.speak(utterance);
        });
    });

    links.forEach(function(link) {
        link.addEventListener("focus", function() {
            var utterance = new SpeechSynthesisUtterance("Link");
            utterance.rate = 0.5;
            window.speechSynthesis.speak(utterance);
        });
    });

    document.addEventListener("keydown", function(event) {
        if (event.code === "Tab") {
            // Crea un nuevo elemento audio
            const audio = new Audio("path/to/click-sound.mp3");
            audio.play();
        }
    });
}




accesibilityread();

/*** *Accesibility lector de páginas web ***/

/**Navegación por TAB*/
function navegacionTeclado() {
    // Obtener todos los elementos navegables
    var elementosNavegables = document.querySelectorAll("a, button, input, select, textarea, section, header, nav, li, p, footer, article, h1, h2, h3, h4, h5, h6");

    // Asignar tabindex a cada elemento
    elementosNavegables.forEach(function(elemento) {
        elemento.setAttribute("tabindex", "0");
    });

    // Agregar evento keydown al documento
    document.addEventListener("keydown", function(event) {
        // Obtener el elemento actualmente enfocado
        var elementoEnfocado = document.activeElement;

        // Manejar navegación con las teclas de flecha
        if (event.key === "ArrowDown") {
            var siguienteElemento = elementoEnfocado.nextElementSibling;
            if (siguienteElemento) {
                siguienteElemento.focus();
                siguienteElemento.style.outline = "dotted";
                elementoEnfocado.style.outline = "none";
            }
        } else if (event.key === "ArrowUp") {
            var anteriorElemento = elementoEnfocado.previousElementSibling;
            if (anteriorElemento) {
                anteriorElemento.focus();
                anteriorElemento.style.outline = "dotted";
                elementoEnfocado.style.outline = "none";
            }
        }
    });


}
navegacionTeclado();
/**Navegación por TAB*/

/**Resaltar enlaces*/
// Crear un botón para habilitar el resaltado

var tHabilitar = document.createTextNode("Resaltar link");
btnHabilitar.appendChild(tHabilitar);
document.body.appendChild(btnHabilitar);
btnHabilitar.addEventListener("click", resaltarEnlaces);
btnHabilitar.classList.add("accesibility-widget", "accesibility-boton");
// Función para habilitar y deshabilitar el resaltado
var habilitado = false;

function resaltarEnlaces() {
    // Si el resaltado está habilitado
    if (habilitado) {
        // Cambiar el estado a deshabilitado
        habilitado = false;
        btnHabilitar.innerHTML = "Resaltar link";
        document.querySelectorAll("a").forEach(function(enlace) {
            enlace.style.backgroundColor = "";
            enlace.style.color = "";
        });
    } else {
        // Cambiar el estado a habilitado
        habilitado = true;
        btnHabilitar.innerHTML = "Quitar resaltado";
        document.querySelectorAll("a").forEach(function(enlace) {
            enlace.style.backgroundColor = "#9ccc9c";
            enlace.style.color = "#333";
        });
    }
}

/**Resaltar enlaces*/

/**Tamaño de fuentes**/


fontSizeButton.setAttribute("id", "font-size-button");
fontSizeButton.innerHTML = "Basico";
fontSizeButton.classList.add("accesibility-widget", "accesibility-boton");
document.body.appendChild(fontSizeButton);

function cnahgefontSize(level) {
    var elements = document.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
        switch (level) {
            case "Basico":
                elements[i].style.fontSize = "1.1rem";
                break;
            case "Medio":
                elements[i].style.fontSize = "1.2rem";
                break;
            case "grande":
                elements[i].style.fontSize = "1.3rem";
                break;
            default:
                elements[i].style.fontSize = "1rem";
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("font-size-button");
    button.addEventListener("click", function() {
        switch (button.innerHTML) {
            case "Basico":
                cnahgefontSize("Medio");
                button.innerHTML = "Medio";
                break;
            case "Medio":
                cnahgefontSize("grande");
                button.innerHTML = "grande";
                break;
            case "grande":
                cnahgefontSize("Basico");
                button.innerHTML = "Basico";
                break;
        }
    });
});

/**Tamaño de fuentes**/

/**Resaltar contraste*/
/* Accesibility JS: regulador de contraste*/

var tAlternar = document.createTextNode("Alternar colores");
btnAlternar.appendChild(tAlternar);
document.body.appendChild(btnAlternar);
btnAlternar.addEventListener("click", alternarColores);
btnAlternar.classList.add("accesibility-widget", "accesibility-boton", "accesibility-daltonismo");

var colorActual = -1;
var images = document.getElementsByTagName("img");

function alternarColores() {
    var headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    var links = document.getElementsByTagName("a");

    for (var i = 0; i < headings.length; i++) {
        headings[i].style.color = document.body.style.color;
    }

    for (var i = 0; i < links.length; i++) {
        links[i].style.color = document.body.style.color;
    }

    if (colorActual === -1) {
        colorActual = 0;
        document.body.style.backgroundColor = "#ff867c";
        document.body.style.color = "#333";
        document.querySelector(".accesibility-daltonismo").textContent = "Daltonismo 1";

        for (var i = 0; i < images.length; i++) {
            images[i].style.filter = "invert(100%)";
        }
    } else if (colorActual === 0) {
        colorActual = 1;
        document.body.style.backgroundColor = "#9ccc9c";
        document.body.style.color = "#333";
        document.querySelector(".accesibility-daltonismo").textContent = "Daltonismo 2";

        for (var i = 0; i < images.length; i++) {
            images[i].style.filter = "invert(100%) hue-rotate(120deg)";
        }
    } else if (colorActual === 1) {
        colorActual = 2;
        document.body.style.backgroundColor = "#ffdd57";
        document.body.style.color = "#333";
        document.querySelector(".accesibility-daltonismo").textContent = "Daltonismo 3";

        for (var i = 0; i < images.length; i++) {
            images[i].style.filter = "invert(100%) hue-rotate(60deg)";
        }
    } else if (colorActual === 2) {
        colorActual = 3;
        document.body.style.backgroundColor = "#333";
        document.body.style.color = "#fff";
        document.querySelector(".accesibility-daltonismo").textContent = "Alto contraste";

        for (var i = 0; i < images.length; i++) {
            images[i].style.filter = "grayscale(100%)";
        }
    } else if (colorActual === 3) {
        colorActual = 4;
        document.body.style.backgroundColor = "#efefef";
        document.body.style.color = "#333";
        document.querySelector(".accesibility-daltonismo").textContent = "Alto contraste blanco";

        for (var i = 0; i < images.length; i++) {
            images[i].style.filter = "none";
        }
    } else if (colorActual === 4) {
        colorActual = -1;
        document.body.style.backgroundColor = "";
        document.body.style.color = "";
        document.querySelector(".accesibility-daltonismo").textContent = "Alternar colores";


        for (var i = 0; i < images.length; i++) {
            images[i].style.filter = "";
        }
    }

}
/**Resaltar contraste*/
/*line height*/

lineHeightButton.setAttribute("id", "line-height-button");
lineHeightButton.innerHTML = "interlineado Basico";
lineHeightButton.classList.add("accesibility-widget", "accesibility-boton");
document.body.appendChild(lineHeightButton);

function changeLineHeight(level) {
    var elements = document.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
        switch (level) {
            case "interlineado Basico":
                elements[i].style.lineHeight = "1.5";
                break;
            case "interlineado Medio":
                elements[i].style.lineHeight = "2.0";
                break;
            case "interlineado Alto":
                elements[i].style.lineHeight = "2.5";
                break;
            default:
                elements[i].style.lineHeight = "interlineado normal";
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("line-height-button");
    button.addEventListener("click", function() {
        switch (button.innerHTML) {
            case "interlineado Basico":
                changeLineHeight("interlineado Medio");
                button.innerHTML = "interlineado Medio";
                break;
            case "interlineado Medio":
                changeLineHeight("interlineado Alto");
                button.innerHTML = "interlineado Alto";
                break;
            case "interlineado Alto":
                changeLineHeight("interlineado Basico");
                button.innerHTML = "interlineado Basico";
                break;
        }
    });
});
/*line height*/
/*Alinear texto*/

textalignButton.setAttribute("id", "text-align-button");
textalignButton.innerHTML = "Alinear a la izquierda";
textalignButton.classList.add("accesibility-widget", "accesibility-boton");
document.body.appendChild(textalignButton);

function changetextAlign(level) {
    var elements = document.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
        switch (level) {
            case "Alinear a la izquierda":
                elements[i].style.textAlign = "left";
                break;
            case "Alinear al centro":
                elements[i].style.textAlign = "center";
                break;
            case "Alinear al right":
                elements[i].style.textAlign = "right";
                break;
            default:
                elements[i].style.textAlign = "inherit";
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("text-align-button");
    button.addEventListener("click", function() {
        switch (button.innerHTML) {
            case "Alinear a la izquierda":
                changetextAlign("Alinear al centro");
                button.innerHTML = "Alinear al centro";
                break;
            case "Alinear al centro":
                changetextAlign("Alinear al right");
                button.innerHTML = "Alinear al right";
                break;
            case "Alinear al right":
                changetextAlign("Alinear a la izquierda");
                button.innerHTML = "Alinear a la izquierda";
                break;
        }
    });
});
/*Alinear texto*/


/*dislexia*/
function changeFontFamily(type) {
    var elements = document.getElementsByTagName("body");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontFamily = type;
    }
}


fontFamilyButton.innerHTML = "Tipografía con Serif";
fontFamilyButton.classList.add("accesibility-widget", "accesibility-boton");
document.body.appendChild(fontFamilyButton);

document.addEventListener("DOMContentLoaded", function() {
    fontFamilyButton.addEventListener("click", function() {
        if (fontFamilyButton.innerHTML === "Tipografía con Serif") {
            changeFontFamily("serif");
            fontFamilyButton.innerHTML = "Tipografía sin Serif";
        } else {
            changeFontFamily("sans-serif");
            fontFamilyButton.innerHTML = "Tipografía con Serif";
        }
    });
});
/*dislexia*/

/*alt text tooltip*/

accesibilityBoton.setAttribute("id", "accesibility-boton");
accesibilityBoton.innerHTML = "Activar lectura de texto en imágenes";
accesibilityBoton.classList.add("accesibility-widget", "accesibility-boton");
document.body.appendChild(accesibilityBoton);

var images = document.getElementsByTagName("img");

function showAltText() {
    for (var i = 0; i < images.length; i++) {
        var image = images[i];
        var altText = image.getAttribute("alt");
        if (altText) {
            var wrapperDiv = document.createElement("div");
            wrapperDiv.style.position = "relative";
            image.parentNode.insertBefore(wrapperDiv, image);
            wrapperDiv.appendChild(image);
            var tooltip = document.createElement("div");
            tooltip.innerHTML = altText;
            tooltip.style.backgroundColor = "white";
            tooltip.style.padding = "10px";
            tooltip.style.position = "absolute";
            tooltip.style.bottom = "0";
            tooltip.style.left = "50%";
            tooltip.style.transform = "translateX(-50%)";
            wrapperDiv.appendChild(tooltip);
        }
    }

}

document.getElementById("accesibility-boton").addEventListener("click", function() {
    if (accesibilityBoton.innerHTML === "Activar lectura de texto en imágenes") {
        accesibilityBoton.innerHTML = "Desactivar lectura de texto en imágenes";
        showAltText();
    } else {
        accesibilityBoton.innerHTML = "Activar lectura de texto en imágenes";
        var wrapperDivs = document.querySelectorAll("div[style='position: relative;']");
        for (var i = 0; i < wrapperDivs.length; i++) {
            var wrapperDiv = wrapperDivs[i];
            var image = wrapperDiv.firstChild;
            wrapperDiv.parentNode.insertBefore(image, wrapperDiv);
            wrapperDiv.parentNode.removeChild(wrapperDiv);
        }
    }
});

/*alt text tooltip*/

/*comando abrir menu sin click*/
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "y") {
        var accesibilityWidgetBox = document.getElementById("accesibility-widget-box");
        if (accesibilityWidgetBox.style.display === "none") {
            accesibilityWidgetBox.style.display = "grid";
        } else {
            accesibilityWidgetBox.style.display = "none";
        }
    }
});
/*comando abrir menu sin click*/


/*estilos*/

//Obtener todos los elementos button con la clase "accesibility-widget"
var buttonsbox = document.querySelectorAll(".accesibility-widget");

//Crear un elemento div con id "accesibility-widget-box" y clase "accesibility-widget-box-class"
var accesibilityWidgetBox = document.createElement("div");
accesibilityWidgetBox.id = "accesibility-widget-box";
accesibilityWidgetBox.classList.add("accesibility-widget-box-class");

//Agregar todos los elementos button dentro del elemento div creado
for (var i = 0; i < buttonsbox.length; i++) {
    accesibilityWidgetBox.appendChild(buttonsbox[i]);
}

//Agregar el elemento div al documento
document.body.appendChild(accesibilityWidgetBox);

if (accesibilityWidgetBox) {
    accesibilityWidgetBox.style.backgroundColor = "#EFF1F5";
    accesibilityWidgetBox.style.position = "fixed";
    accesibilityWidgetBox.style.right = "0px";
    accesibilityWidgetBox.style.width = "50%";
    accesibilityWidgetBox.style.borderRadius = "0px";
    accesibilityWidgetBox.style.top = "0%";
    accesibilityWidgetBox.style.display = "none";
    accesibilityWidgetBox.style.zIndex = "99999999";
    accesibilityWidgetBox.style.gridTemplateColumns = 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)';
    accesibilityWidgetBox.style.gap = '15px';
    accesibilityWidgetBox.style.padding = '1.25rem';

}


var elements = document.getElementsByClassName("accesibility-widget accesibility-boton");
for (var i = 0; i < elements.length; i++) {
    elements[i].style.position = 'relative';
    elements[i].style.width = '100%';
    elements[i].style.height = '114px';
    elements[i].style.display = 'flex';
    elements[i].style.flexFlow = 'column-reverse';
    elements[i].style.alignItems = 'center';
    elements[i].style.justifyContent = 'center';
    elements[i].style.WebkitAppearance = 'none';
    elements[i].style.cursor = 'pointer';
    elements[i].style.background = '#fff';
    elements[i].style.borderRadius = '12px';
    elements[i].style.border = '2px solid #fff';
    elements[i].style.borderTopColor = '#fff';
    elements[i].style.borderRightColor = '#fff';
    elements[i].style.borderBottomColor = '#fff';
    elements[i].style.borderLeftColor = '#fff';
    elements[i].style.padding = '.3125rem .625rem';
    elements[i].style.transition = 'border-color 0.15s ease';
    elements[i].style.backgroundSize = "90px";
    elements[i].style.backgroundRepeat = "no-repeat";
    elements[i].style.backgroundPosition = "center";


}



/*botón mostrar y esconder*/
var accesibilityWidgetBox = document.getElementsByClassName("accesibility-widget-box-class")[0];

var showBtn = document.createElement("button");
showBtn.classList.add("accesibility-show");
showBtn.innerHTML = "";

showBtn.addEventListener("click", function() {
    if (accesibilityWidgetBox.style.display === "grid") {
        accesibilityWidgetBox.style.display = "none";
        showBtn.innerHTML = "";
    } else {
        accesibilityWidgetBox.style.display = "grid";
        showBtn.innerHTML = "";
    }
});

showBtn.style.borderRadius = "100px";
showBtn.style.position = "fixed";
showBtn.style.bottom = "5%";
showBtn.style.right = "5%";
showBtn.style.width = "57px";
showBtn.style.height = "57px";
showBtn.style.padding = "0 !important";
showBtn.style.margin = "0 !important";
showBtn.style.background = "0 0 !important";
showBtn.style.border = "none";
showBtn.style.visibility = "visible !important";
showBtn.style.backgroundImage = "url('https://cdn.jsdelivr.net/gh/vtorresmz/accesibilitypro@main/pro/accesibility-icon.svg')";
showBtn.style.backgroundSize = "100%";
showBtn.style.backgroundRepeat = "no-repeat";
showBtn.style.backgroundPosition = "center";
showBtn.style.zIndex = "99999999999";
document.body.appendChild(showBtn);
/*mostrar esconder*/
/*estilos*/

/*titulos*/
const acessibilityheading2 = document.createElement('h3');
acessibilityheading2.style.display = 'flex';
acessibilityheading2.style.flexFlow = 'column';
acessibilityheading2.style.alignItems = 'center';
acessibilityheading2.style.justifyContent = 'center';
acessibilityheading2.innerHTML = "AccessibilityJS";
accesibilityWidgetBox.appendChild(acessibilityheading2);
/*titulos*/

/*imagen botones*/
const speakimage = document.createElement('img');
speakimage.src = 'img/speak.svg';
speakimage.width = '90';
speakimage.height = '90';
speakBtn.appendChild(speakimage);

const sizeimage = document.createElement('img');
sizeimage.src = 'img/textozoom.svg';
sizeimage.width = '90';
sizeimage.height = '90';
fontSizeButton.appendChild(sizeimage);

const linkupimage = document.createElement('img');
linkupimage.src = 'img/resaltar.svg';
linkupimage.width = '90';
linkupimage.height = '90';
btnHabilitar.appendChild(linkupimage);

const contrasteimage = document.createElement('img');
contrasteimage.src = 'img/contraste.svg';
contrasteimage.width = '90';
contrasteimage.height = '90';
btnAlternar.appendChild(contrasteimage);

const interlineado = document.createElement('img');
interlineado.src = 'img/speak.svg';
interlineado.width = '90';
interlineado.height = '90';
lineHeightButton.appendChild(interlineado);

const alineado = document.createElement('img');
alineado.src = 'img/alineacion.svg';
alineado.width = '90';
alineado.height = '90';
textalignButton.appendChild(alineado);

const dislexia = document.createElement('img');
dislexia.src = 'img/dislexia.svg';
dislexia.width = '90';
dislexia.height = '90';
fontFamilyButton.appendChild(dislexia);


const alttext = document.createElement('img');
alttext.src = 'img/alttext.svg';
alttext.width = '90';
alttext.height = '90';
accesibilityBoton.appendChild(alttext);
/*imagen botones*/