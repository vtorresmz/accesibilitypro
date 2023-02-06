  /*ingresar por enter a los contenidos*/
  document.addEventListener("keydown", function(event) {
      if (document.activeElement.tagName === "A" && event.key === "Enter") {
          event.preventDefault();
          window.location = document.activeElement.href;
      }
  });
  /*ingresar por enter a los contenidos*/

  /*** *Accesibility lector de páginas web ***/
  var speakBton = document.createElement("button");
  speakBton.setAttribute("id", "speak-btn");
  speakBton.innerHTML = "Habilitar lectura";
  speakBton.setAttribute("onclick", "enableSpeech()");
  document.body.appendChild(speakBton);

  var speedRangeInput = document.createElement("input");
  speedRangeInput.setAttribute("type", "range");
  speedRangeInput.setAttribute("style", "display: none;");
  speedRangeInput.setAttribute("id", "speed-range");
  speedRangeInput.setAttribute("value", "0.5");
  speedRangeInput.setAttribute("min", "0.6");
  speedRangeInput.setAttribute("max", "0.9");
  speedRangeInput.setAttribute("step", "0.1");
  document.body.appendChild(speedRangeInput);


  var speedRange = document.getElementById("speed-range");
  var speakBtn = document.getElementById("speak-btn");
  var isSpeaking = false;
  var state = 0;

  function enableSpeech() {
      switch (state) {
          case 0:
              isSpeaking = true;
              speakBtn.innerHTML = "Habilitar lectura";
              speedRange.value = 0.0;
              state = 1;
              break;
          case 1:
              isSpeaking = false;
              speakBtn.innerHTML = "Deshabilitar lectura";
              state = 2;
              break;
          default:
              break;
      }

      if (isSpeaking) {
          var elements = document.getElementsByTagName("*");
          for (var i = 0; i < elements.length; i++) {
              elements[i].addEventListener("focus", function(event) {
                  var text = event.target.textContent;
                  var msg = new SpeechSynthesisUtterance(text);
                  msg.rate = speedRange.value;
                  window.speechSynthesis.speak(msg);
              });
              elements[i].addEventListener("blur", function() {
                  window.speechSynthesis.cancel();
              });
          }
      } else {
          window.speechSynthesis.cancel();
      }
  }



  speakBtn.addEventListener("click", enableSpeech);

  speedRange.addEventListener("input", function() {
      if (isSpeaking) {
          window.speechSynthesis.cancel();
          enableSpeech();
      }
  });



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

      //Agregar boton para deshabilitar la navegación por teclado
      var btn = document.createElement("BUTTON");
      var t = document.createTextNode("Deshabilitar navegación");
      btn.appendChild(t);
      document.body.appendChild(btn);
      btn.addEventListener("click", function() {
          //Remover el evento keydown del documento
          document.removeEventListener("keydown", navegacionTeclado);
          //Remover el boton de deshabilitar navegación
          btn.remove();
      });
  }
  navegacionTeclado();
  /**Navegación por TAB*/

  /**Resaltar enlaces*/
  // Crear una function que resalte los enlaces
  function resaltarEnlaces() {
      var enlaces = document.querySelectorAll("a");
      enlaces.forEach(function(enlace) {
          enlace.style.outline = "dotted blue";
      });
  }

  // Crear un botón para habilitar el resaltado
  var btnHabilitar = document.createElement("BUTTON");
  var tHabilitar = document.createTextNode("Habilitar resaltado");
  btnHabilitar.appendChild(tHabilitar);
  document.body.appendChild(btnHabilitar);
  btnHabilitar.addEventListener("click", resaltarEnlaces);

  // Crear un botón para deshabilitar el resaltado
  var btnDeshabilitar = document.createElement("BUTTON");
  var tDeshabilitar = document.createTextNode("Deshabilitar resaltado");
  btnDeshabilitar.appendChild(tDeshabilitar);
  document.body.appendChild(btnDeshabilitar);
  btnDeshabilitar.addEventListener("click", function() {
      var enlaces = document.querySelectorAll("a");
      enlaces.forEach(function(enlace) {
          enlace.style.outline = "";
      });
  });
  /**Resaltar enlaces*/

  /**Tamaño de fuentes**/
  /* Accesibility JS font size regulador*/
  var fontSizeRangeInput = document.createElement("input");
  fontSizeRangeInput.setAttribute("type", "number");
  fontSizeRangeInput.setAttribute("id", "font-size-range");
  fontSizeRangeInput.setAttribute("value", "100");
  fontSizeRangeInput.setAttribute("min", "100");
  fontSizeRangeInput.setAttribute("max", "700");
  fontSizeRangeInput.setAttribute("class", "accesibility-text-size");
  document.body.appendChild(fontSizeRangeInput);

  function changeFontSize(size) {
      var elements = document.getElementsByTagName("*");
      for (var i = 0; i < elements.length; i++) {
          elements[i].style.fontSize = size + "%";
      }
  }

  document.addEventListener("DOMContentLoaded", function() {
      var range = document.getElementById("font-size-range");
      range.addEventListener("change", function() {
          var size = range.value;
          changeFontSize(size);
      });
  });
  /**Tamaño de fuentes**/

  /**Resaltar contraste*/
  /* Accesibility JS: regulador de contraste*/
  function changeColorScheme(scheme) {
      var elements = document.getElementsByTagName("*");
      switch (scheme) {
          case "high-contrast":
              document.body.style.backgroundColor = "black";
              for (var i = 0; i < elements.length; i++) {
                  elements[i].style.color = "white";
              }
              break;
          case "daltonism-1":
              document.body.style.backgroundColor = "white";
              for (var i = 0; i < elements.length; i++) {
                  elements[i].style.color = "#004d99";
              }
              break;
          case "daltonism-2":
              document.body.style.backgroundColor = "white";
              for (var i = 0; i < elements.length; i++) {
                  elements[i].style.color = "#009933";
              }
              break;
          case "daltonism-3":
              document.body.style.backgroundColor = "white";
              for (var i = 0; i < elements.length; i++) {
                  elements[i].style.color = "#ff0000";
              }
              break;
          case "daltonism-4":
              document.body.style.backgroundColor = "white";
              for (var i = 0; i < elements.length; i++) {
                  elements[i].style.color = "#ff9900";
              }
              break;
          case "daltonism-5":
              document.body.style.backgroundColor = "white";
              for (var i = 0; i < elements.length; i++) {
                  elements[i].style.color = "#00cc99";
              }
              break;
          default:
              document.body.style.backgroundColor = "white";
              for (var i = 0; i < elements.length; i++) {
                  elements[i].style.color = "black";
              }
      }
  }

  // Crear el primer botón
  var button1 = document.createElement("button");
  button1.innerHTML = "Alto contraste";
  button1.setAttribute("onclick", "changeColorScheme('high-contrast')");
  button1.classList.add("accesibility-widget", "accesibility-boton");

  // Crear el segundo botón
  var button2 = document.createElement("button");
  button2.innerHTML = "Daltonismo 1";
  button2.setAttribute("onclick", "changeColorScheme('daltonism-1')");
  button2.classList.add("accesibility-widget", "accesibility-boton");

  // Crear el tercer botón
  var button3 = document.createElement("button");
  button3.innerHTML = "Daltonismo 2";
  button3.setAttribute("onclick", "changeColorScheme('daltonism-2')");
  button3.classList.add("accesibility-widget", "accesibility-boton");

  // Crear el cuarto botón
  var button4 = document.createElement("button");
  button4.innerHTML = "Daltonismo 3";
  button4.setAttribute("onclick", "changeColorScheme('daltonism-3')");
  button4.classList.add("accesibility-widget", "accesibility-boton");

  // Agregar los botones al documento
  document.body.appendChild(button1);
  document.body.appendChild(button2);
  document.body.appendChild(button3);
  document.body.appendChild(button4);

  changeColorScheme();
  /**Resaltar contraste*/