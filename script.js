const joystick = document.getElementById('joystick');
const joystickInner = document.getElementById('joystick-inner');
const elemento = document.getElementById('esteelemento');

let isMoving = false;
let joystickCenterX, joystickCenterY;
const speed = 3; // Velocidad constante
const maxMovement = 50; // Rango máximo de movimiento del joystick

// Variables para el movimiento acumulativo
let movementX = 0;
let movementY = 0;

// Función para iniciar el movimiento
joystick.addEventListener('mousedown', (event) => {
    isMoving = true;
    joystickCenterX = joystick.offsetLeft + joystick.clientWidth / 2;
    joystickCenterY = joystick.offsetTop + joystick.clientHeight / 2;

    // Mover el círculo interno al centro
    joystickInner.style.transform = 'translate(0, 0)';
});

// Función para mover el elemento y el joystick interno
function updateMovement() {
    if (!isMoving) {
        // Detener el movimiento suavemente
        movementX *= 0.9; // Fricción
        movementY *= 0.9; // Fricción
        if (Math.abs(movementX) < 0.1 && Math.abs(movementY) < 0.1) {
            movementX = 0; // Resetear movimiento
            movementY = 0; // Resetear movimiento
        }
    }

    // Actualizar la posición del elemento
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;

    elemento.style.left = Math.min(Math.max(elemento.offsetLeft + movementX, 0), bodyWidth - elemento.clientWidth) + 'px';
    elemento.style.top = Math.min(Math.max(elemento.offsetTop + movementY, 0), bodyHeight - elemento.clientHeight) + 'px';

    requestAnimationFrame(updateMovement); // Llamar a la siguiente actualización
}

document.addEventListener('mousemove', (event) => {
    if (!isMoving) return;

    const deltaX = event.clientX - joystickCenterX;
    const deltaY = event.clientY - joystickCenterY;

    // Limitar el movimiento del joystick interno
    const moveX = Math.min(Math.max(deltaX, -maxMovement), maxMovement);
    const moveY = Math.min(Math.max(deltaY, -maxMovement), maxMovement);

    // Mover el círculo interno del joystick
    joystickInner.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // Normalizar la dirección del movimiento
    const angle = Math.atan2(moveY, moveX);
    movementX = Math.cos(angle) * speed; // Velocidad constante en X
    movementY = Math.sin(angle) * speed; // Velocidad constante en Y
});

// Finalizar el movimiento
document.addEventListener('mouseup', () => {
    isMoving = false;
    joystickInner.style.transform = 'translate(0, 0)'; // Regresar el círculo interno a la posición central
});

// Iniciar la animación
updateMovement();
