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

document.addEventListener("DOMContentLoaded", function() {
    // Aquí va todo el código


    /*ingresar por enter a los contenidos*/
    document.addEventListener("keydown", function(event) {
        if (document.activeElement.tagName === "A" && event.key === "Enter") {
            event.preventDefault();
            window.location = document.activeElement.href;
        }
    });
    /*ingresar por enter a los contenidos*/


    /*variables de los botones*/
    var speakBtn = document.createElement("button");
    var btnHabilitar = document.createElement("button");
    var fontSizeButton = document.createElement("button");
    var btnAlternar = document.createElement("button");
    var lineHeightButton = document.createElement("button");
    var textalignButton = document.createElement("button");
    var fontFamilyButton = document.createElement("button");
    var accesibilityBoton = document.createElement("button");
    const imgspeaker = "<img style='width:50%; height:auto; margin:auto; display:block;' class='accessibility-imagewidget' src='https://cdn.jsdelivr.net/gh/vtorresmz/accesibilitypro@c4f8b4bbff12cf7ceff50a6321059b6239032b5e/img/speak.svg'>";
    const imgrlink = "<img style='width:50%; height:auto; margin:auto; display:block;' class='accessibility-imagewidget' src='https://cdn.jsdelivr.net/gh/vtorresmz/accesibilitypro@c4f8b4bbff12cf7ceff50a6321059b6239032b5e/img/resaltar.svg'>";
    const imgrcontraste = "<img style='width:50%; height:auto; margin:auto; display:block;' class='accessibility-imagewidget' src='https://cdn.jsdelivr.net/gh/vtorresmz/accesibilitypro@c4f8b4bbff12cf7ceff50a6321059b6239032b5e/img/contraste.svg'>";
    const imgrfontsize = "<img style='width:50%; height:auto; margin:auto; display:block;' class='accessibility-imagewidget' src='https://cdn.jsdelivr.net/gh/vtorresmz/accesibilitypro@c4f8b4bbff12cf7ceff50a6321059b6239032b5e/img/textozoom.svg'>";
    const imgrinter = "<img style='width:50%; height:auto; margin:auto; display:block;' class='accessibility-imagewidget' src='https://cdn.jsdelivr.net/gh/vtorresmz/accesibilitypro@c4f8b4bbff12cf7ceff50a6321059b6239032b5e/img/interlineado.svg'>";
    const imgraline = "<img style='width:50%; height:auto; margin:auto; display:block;' class='accessibility-imagewidget' src='https://cdn.jsdelivr.net/gh/vtorresmz/accesibilitypro@c4f8b4bbff12cf7ceff50a6321059b6239032b5e/img/alineacion.svg'>";
    const imgrdislexia = "<img style='width:50%; height:auto; margin:auto; display:block;' class='accessibility-imagewidget' src='https://cdn.jsdelivr.net/gh/vtorresmz/accesibilitypro@c4f8b4bbff12cf7ceff50a6321059b6239032b5e/img/dislexia.svg'>";
    const imgrtooltips = "<img style='width:50%; height:auto; margin:auto; display:block;' class='accessibility-imagewidget' src='https://cdn.jsdelivr.net/gh/vtorresmz/accesibilitypro@c4f8b4bbff12cf7ceff50a6321059b6239032b5e/img/alttext.svg'>";
    const logoaccessibility = "<img style='width:30%; height:auto; margin:auto; display:block;' class='accessibility-imagewidget' src='https://cdn.jsdelivr.net/gh/vtorresmz/accesibilitypro@7112fb33fd80ee75a4c56b3bbb95c7b098ac73ff/img/accessibility-logo.svg'>";

    /*** *Accesibility lector de páginas web ***/
    /*** *Accesibility lector de páginas web ***/



    function accesibilityread() {

        speakBtn.classList.add("accesibility-widget", "accesibility-boton");
        speakBtn.innerHTML = '<span>Habilitar lectura</span>' + imgspeaker;
        document.body.appendChild(speakBtn);
        speakBtn.addEventListener("click", toggleSpeech);

        var isSpeaking = false;
        var focusedElement = null;

        function toggleSpeech() {
            if (!isSpeaking) {
                speakBtn.innerHTML = '<span>Deshabilitar lectura</span>' + imgspeaker;
                isSpeaking = true;
                readPage();
            } else {
                speakBtn.innerHTML = '<span>Habilitar lectura</span>' + imgspeaker;
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

    btnHabilitar.innerHTML = '<span>Resaltar link</span>' + imgrlink;
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

            btnHabilitar.innerHTML = '<span>Resaltar link</span>' + imgrlink;
            document.querySelectorAll("a").forEach(function(enlace) {
                enlace.style.backgroundColor = "";
                enlace.style.color = "";
            });
        } else {
            // Cambiar el estado a habilitado
            habilitado = true;
            btnHabilitar.innerHTML = '<span>Quitar Resaltar</span>' + imgrlink;
            document.querySelectorAll("a").forEach(function(enlace) {
                enlace.style.backgroundColor = "#9ccc9c";
                enlace.style.color = "#333";
            });
        }
    }

    /**Resaltar enlaces*/





    /* Accesibility JS: regulador de contraste*/
    btnAlternar.innerHTML = '<span>Modo Daltonico</span>' + imgrcontraste;
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
            document.querySelector(".accesibility-daltonismo").innerHTML = '<span>Daltonismo</span>' + imgrcontraste;

            for (var i = 0; i < images.length; i++) {
                images[i].style.filter = "invert(100%)";
            }
        } else if (colorActual === 0) {
            colorActual = 1;
            document.body.style.backgroundColor = "#9ccc9c";
            document.body.style.color = "#333";
            document.querySelector(".accesibility-daltonismo").innerHTML = '<span>Daltonismo 2</span>' + imgrcontraste;

            for (var i = 0; i < images.length; i++) {
                images[i].style.filter = "invert(100%) hue-rotate(120deg)";
            }
        } else if (colorActual === 1) {
            colorActual = 2;
            document.body.style.backgroundColor = "#ffdd57";
            document.body.style.color = "#333";
            document.querySelector(".accesibility-daltonismo").innerHTML = '<span>Daltonismo 3</span>' + imgrcontraste;

            for (var i = 0; i < images.length; i++) {
                images[i].style.filter = "invert(100%) hue-rotate(60deg)";
            }
        } else if (colorActual === 2) {
            colorActual = 3;
            document.body.style.backgroundColor = "#333";
            document.body.style.color = "#fff";
            document.querySelector(".accesibility-daltonismo").innerHTML = '<span>Alto contraste</span>' + imgrcontraste;

            for (var i = 0; i < images.length; i++) {
                images[i].style.filter = "grayscale(100%)";
            }
        } else if (colorActual === 3) {
            colorActual = 4;
            document.body.style.backgroundColor = "#efefef";
            document.body.style.color = "#333";
            document.querySelector(".accesibility-daltonismo").innerHTML = '<span>Alto contraste Blanco</span>' + imgrcontraste;

            for (var i = 0; i < images.length; i++) {
                images[i].style.filter = "none";
            }
        } else if (colorActual === 4) {
            colorActual = -1;
            document.body.style.backgroundColor = "";
            document.body.style.color = "";
            document.querySelector(".accesibility-daltonismo").innerHTML = '<span>Alternar Colores</span>' + imgrcontraste;


            for (var i = 0; i < images.length; i++) {
                images[i].style.filter = "";
            }
        }

    }



    /**Resaltar contraste*/


    /**Interlineado*/
    function interlineado() {
        // Si el resaltado está habilitado
        if (habilitado) {
            // Cambiar el estado a deshabilitado
            habilitado = false;

            lineHeightButton.innerHTML = '<span>Interlineado Grande</span>' + imgrinter;
            document.querySelectorAll("*").forEach(function(interlin) {
                interlin.style.lineHeight = "";
            });
        } else {
            // Cambiar el estado a habilitado
            habilitado = true;
            lineHeightButton.innerHTML = '<span>Interlineado Normal</span>' + imgrinter;
            document.querySelectorAll("*").forEach(function(interlin) {
                interlin.style.lineHeight = "300%";


            });
        }
    }

    /**Interlineado*/

    /**Tamaño de fuentes**/



    function cambiarTamanioTexto(elementos, tamaño) {
        elementos.forEach(function(elemento) {
            var etiquetas = document.getElementsByTagName(elemento);
            for (var i = 0; i < etiquetas.length; i++) {
                etiquetas[i].style.fontSize = tamaño;
            }
        });
    }

    // Función para habilitar y deshabilitar el cambio de tamaño de fuente
    var habilitado = false;

    function cambiarTamanoFuente() {
        // Si el cambio de tamaño de fuente está habilitado, deshabilítalo
        if (habilitado) {
            habilitado = false;
            cambiarTamanioTexto(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'span'], '');
            fontSizeButton.innerHTML = '<span>Agrandar texto</span>' + imgrfontsize;
        } else {
            // Si el cambio de tamaño de fuente no está habilitado, habilitarlo con un tamaño de fuente del 150%
            habilitado = true;
            cambiarTamanioTexto(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'span'], '150%');
            fontSizeButton.innerHTML = '<span>Texto normal texto</span>' + imgrfontsize;
        }
    }

    // Agregar un botón al cuerpo del documento que permite habilitar y deshabilitar el cambio de tamaño de fuente
    var fontSizeButton = document.createElement('button');
    fontSizeButton.innerHTML = '<span>Agrandar texto</span>' + imgrfontsize;
    document.body.appendChild(fontSizeButton);
    fontSizeButton.addEventListener('click', cambiarTamanoFuente);
    fontSizeButton.classList.add('accesibility-widget', 'accesibility-boton');

    /**Tamaño de fuentes**/





    /**Interlineado de texto**/

    lineHeightButton.innerHTML = '<span>Interlineado Grande</span>' + imgrinter;
    document.body.appendChild(lineHeightButton);
    lineHeightButton.addEventListener("click", lineHeight);
    lineHeightButton.classList.add("accesibility-widget", "accesibility-boton");
    // Función para habilitar y deshabilitar el resaltado
    var habilitado = false;

    function lineHeight() {
        // Si el resaltado está habilitado
        if (habilitado) {
            // Cambiar el estado a deshabilitado
            habilitado = false;

            lineHeightButton.innerHTML = '<span>Interlineado Grande</span>' + imgrinter;
            document.querySelectorAll("*").forEach(function(interlin) {
                interlin.style.lineHeight = "";
            });
        } else {
            // Cambiar el estado a habilitado
            habilitado = true;
            lineHeightButton.innerHTML = '<span>Interlineado Normal</span>' + imgrinter;
            document.querySelectorAll("*").forEach(function(interlin) {
                interlin.style.lineHeight = "300%";


            });
        }
    };

    /**Interlineado de texto**/


    /* Alinear texto */

    function toggleTextAlign() {
        var button = document.getElementById("text-align-button");
        var alineacion = button.dataset.textAlign;

        switch (alineacion) {
            case "left":
                alineacion = "center";
                button.innerHTML = '<span>Alinear texto al centro</span>' + imgrfontsize;
                break;
            case "center":
                alineacion = "right";
                button.innerHTML = '<span>Alinear texto a la derecha</span>' + imgrfontsize;
                break;
            case "right":
            default:
                alineacion = "left";
                button.innerHTML = '<span>Alinear texto a la izquierda</span>' + imgrfontsize;
                break;
        }

        button.dataset.textAlign = alineacion;
        alinearTexto(alineacion);
    }

    function alinearTexto(alineacion) {
        var elementos = document.getElementsByTagName("*");
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].style.textAlign = alineacion;
        }
    }

    var textalignButton = document.createElement("button");
    textalignButton.setAttribute("id", "text-align-button");
    textalignButton.innerHTML = '<span>Alinear texto a la izquierda</span>' + imgrfontsize;
    textalignButton.classList.add("accesibility-widget", "accesibility-boton");
    textalignButton.dataset.textAlign = "left";
    textalignButton.addEventListener("click", toggleTextAlign);

    document.body.appendChild(textalignButton);

    /* Alinear texto */





    /*dislexia*/
    function toggleFont() {
        var head = document.head;
        var body = document.body;

        var link = head.querySelector('link[href="https://fonts.cdnfonts.com/css/open-dyslexic?styles=49734"]');

        if (link) {
            head.removeChild(link);
            body.style.fontFamily = null;
        } else {
            link = document.createElement('link');
            link.href = 'https://fonts.cdnfonts.com/css/open-dyslexic?styles=49734';
            link.rel = 'stylesheet';
            head.appendChild(link);
            body.style.fontFamily = "'Open-Dyslexic', sans-serif";
        }
    }

    var button = document.createElement('button');

    button.innerHTML = 'Texto amigable';
    button.classList.add('accesibility-widget', 'accesibility-boton');
    button.innerHTML = '<span>Texto amigable</span>' + imgrdislexia;
    button.addEventListener('click', toggleFont);

    document.body.appendChild(button);

    /*dislexia*/



    /*alt text tooltip*/
    var tooltipsEnabled = false;

    var accesibilityBoton = document.createElement("button");
    accesibilityBoton.setAttribute("id", "accesibility-boton");
    accesibilityBoton.innerHTML = '<span>Tooltips</span>' + imgrtooltips;
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
                var parentDiv = image.parentNode;
                parentDiv.insertBefore(wrapperDiv, image);
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

    function removeAltText() {
        var wrapperDivs = document.querySelectorAll("div[style='position: relative;']");
        for (var i = 0; i < wrapperDivs.length; i++) {
            var wrapperDiv = wrapperDivs[i];
            var image = wrapperDiv.firstChild;
            var parentDiv = wrapperDiv.parentNode;
            parentDiv.insertBefore(image, wrapperDiv);
            parentDiv.removeChild(wrapperDiv);
        }
    }

    document.getElementById("accesibility-boton").addEventListener("click", function() {
        if (tooltipsEnabled) {
            accesibilityBoton.innerHTML = '<span>Tooltips</span>' + imgrtooltips;
            removeAltText();
        } else {
            accesibilityBoton.innerHTML = '<span>Desactivar Tooltips</span>' + imgrtooltips;
            showAltText();
        }
        tooltipsEnabled = !tooltipsEnabled;
    });


    /*alt text tooltip*/


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


    // reemplaza "ruta-de-la-imagen" con la ruta real de la imagen
    var button = document.createElement('button');
    button.classList.add('accesibility-widget', 'accesibility-boton');
    button.innerHTML = '<span>www.Accessibility.cl</span>' + logoaccessibility;
    document.body.appendChild(button);

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
        accesibilityWidgetBox.style.borderRadius = "10px";

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

    /*estilo*/
    function crearClaseCSS() {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.accesibility-widget.accesibility-boton span {font-size:1rem!important;}';
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    crearClaseCSS();

    /*Estilo*/
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
    acessibilityheading2.style.gridArea = '1 / 1 / 1 / 4';
    acessibilityheading2.innerHTML = "AccessibilityJS";
    acessibilityheading2.innerHTML = logoaccessibility;
    accesibilityWidgetBox.appendChild(acessibilityheading2);

    /*titulos*/






});