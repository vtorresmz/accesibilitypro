/*navegación facial*/

// Acceder a la cámara web
var video = document.createElement("video");
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
document.body.appendChild(video);

// Botón para activar la cámara web
var cameraButton = document.createElement("button");
cameraButton.innerHTML = "Activar cámara web";
cameraButton.classList.add("accesibility-widget", "accesibility-boton");
cameraButton.addEventListener("click", function() {
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(function(track) {
            track.stop();
        });
        video.srcObject = null;
        cameraButton.innerHTML = "Activar cámara web";
    } else {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();

                cameraButton.innerHTML = "Desactivar cámara web";
            });
    }
});
document.body.appendChild(cameraButton);

// Inicializar el reconocimiento facial
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);
var tracker = new tracking.ObjectTracker("face");
tracker.setInitialScale(4);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);
tracking.track(video, tracker, { camera: true });
tracker.on("track", function(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function(rect) {
        // Mover el cursor con el movimiento de la cara
        var x = rect.x + rect.width / 2;
        var y = rect.y + rect.height / 2;
        document.body.style.cursor = "none";
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
    });
});

var blinkCount = 0;
var timeOut;

// Inicializar el reconocimiento de ojos
var eyeTracker = new tracking.ObjectTracker("eye");
eyeTracker.setInitialScale(2);
eyeTracker.setStepSize(1);
eyeTracker.setEdgesDensity(0.1);
tracking.track(video, eyeTracker);
eyeTracker.on("track", function(event) {
    event.data.forEach(function(rect) {
        // Detectar pestañeos
        blinkCount++;
        clearTimeout(timeOut);
        timeOut = setTimeout(function() {
            blinkCount = 0;
        }, 200);
        // Realizar acción dependiendo del número de pestañeos
        if (blinkCount === 1) {
            // Realizar clic izquierdo
            document.dispatchEvent(new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                button: 0
            }));
        } else if (blinkCount >= 2) {
            // Realizar clic derecho
            document.dispatchEvent(new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                button: 2
            }));
        }
    });
});

// Inicializar el reconocimiento de la cara
var faceTracker = new tracking.ObjectTracker("face");
faceTracker.setInitialScale(2);
faceTracker.setStepSize(1);
faceTracker.setEdgesDensity(0.1);
tracking.track(video, faceTracker);
faceTracker.on("track", function(event) {
    event.data.forEach(function(rect) {
        // Actualizar la posición del cursor
        var x = rect.x + rect.width / 2;
        var y = rect.y + rect.height / 2;
        document.body.style.cursor = "none";
        var cursor = document.getElementById("cursor");
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
    });
});

// Crear el elemento cursor
var cursor = document.createElement("div");
cursor.id = "cursor";
cursor.style.width = "20px";
cursor.style.height = "20px";
cursor.style.background = "red";
cursor.style.position = "absolute";
document.body.appendChild(cursor);
// Inicializar el reconocimiento de ojos
var eyeTracker = new tracking.ObjectTracker("eye");
eyeTracker.setInitialScale(2);
eyeTracker.setStepSize(1);
eyeTracker.setEdgesDensity(0.1);
tracking.track(video, eyeTracker);

var blinkCount = 0;
var timeOut;

eyeTracker.on("track", function(event) {
    event.data.forEach(function(rect) {
        // Detectar pestañeos
        blinkCount++;
        clearTimeout(timeOut);
        timeOut = setTimeout(function() {
            blinkCount = 0;
        }, 200);



        // Mover el cursor con el movimiento de la cara
        cursor.style.left = rect.x + "px";
        cursor.style.top = rect.y + "px";

        // Hacer clic izquierdo con un pestañeo
        if (blinkCount == 1) {
            document.elementFromPoint(cursor.offsetLeft, cursor.offsetTop).click();
        }

        // Hacer clic derecho con dos pestañeos
        if (blinkCount == 2) {
            var clickEvent = new MouseEvent("contextmenu", {
                clientX: cursor.offsetLeft,
                clientY: cursor.offsetTop
            });
            document.elementFromPoint(cursor.offsetLeft, cursor.offsetTop).dispatchEvent(clickEvent);
        }

    });
});

/*Naegación facial*/


<
script src = "https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/8.2.0/adapter.js"
integrity = "sha512-+G5yJYBdxKtG8XVXWHlfolgo1GMnwhjt+SPalpBrgjNmxucjWnonqwp7lPYhpEc+R3/endykBJ/TAQ8Xfo9DFw=="
crossorigin = "anonymous"
referrerpolicy = "no-referrer" > < /script> <script src = "https:/ / cdnjs.cloudflare.com / ajax / libs / tracking.js / 1.1 .3 / tracking.js " integrity = "
sha512 - NVXbaNJH8szQlU3DGFnbX6rylAA8YRqXaSkUAkOK3V9nFeRZoOL3i8xcq08fcpbF8D1zb581KKmuGNmjhrCZ6w == " crossorigin= "
anonymous " referrerpolicy= "
no - referrer "> </script> <
    script src = "https://cdnjs.cloudflare.com/ajax/libs/tracking.js/1.1.3/data/face.js"
integrity = "sha512-gOyhLFrDGhZZAtwUpxeKQDY6+GIvrureqVRBzB5D84RD75CMgVTlvDcKKIECgxJ91lfljhJbzThPII+pqc/H0g=="
crossorigin = "anonymous"
referrerpolicy = "no-referrer" > < /script> <script src = "https:/ / cdnjs.cloudflare.com / ajax / libs / tracking.js / 1.1 .3 / data / eye.js " integrity = "
sha512 - hRdlD4RdowVK0k7QcO03eqGdhUk + dhM / ndC2Z49uO097bwR8g58mO9J6Tj / BeEExNF + cABTMOFuz5stiNElOgw == " crossorigin= "
anonymous " referrerpolicy = "
no - referrer " > </script> 

<
style >
    body {
        cursor: none;
        position: relative;
    }

.cursor {
    width: 1 rem;
    height: 1 rem;
    background - color: red;
    position: absolute;
    border - radius: 100 px;
}

.accesibility - face {
        max - width: 150 px;
        position: fixed;
        top: 0 px;
        left: 0 px;
        z - index: 9999;
    } <
    /style>

// Hacer click con un pestañeo
document.addEventListener("click", function() {
    if (blinkCount === 1) {
        // Aquí se debe agregar el código para realizar un click izquierdo
        console.log("Click izquierdo realizado");
    } else if (blinkCount === 2) {
        // Aquí se debe agregar el código para realizar un click derecho
        console.log("Click derecho realizado");
    }
});

document.body.appendChild(canvas);
/*Navegación facial*/

/*Naegación facial*/