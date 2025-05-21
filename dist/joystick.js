class Joystick {
  constructor(elementToAppend, elementToMoveId, onMoveCallback, speed = 4) {
    setTimeout(() => {
      if (document.getElementById(elementToAppend)===null || document.getElementById(elementToAppend).getElementsByClassName('joystick').length > 0) {
        return;
      }
      this.joystick = document.createElement('div');
      this.joystickInner = document.createElement('div');
      this.elemento = document.getElementById(elementToMoveId);
      this.elemento.style.position = 'absolute';

      this.onMoveCallback = onMoveCallback;

      this.uuid = crypto.randomUUID();

      this.joystick.id = 'joystick-' + this.uuid;
      this.joystick.classList.add('joystick');
      this.joystickInner.id = 'joystick-inner-' + this.uuid;
      this.joystickInner.classList.add('joystick-inner');

      this.joystick.appendChild(this.joystickInner);

      this.isMoving = false;
      this.speed = speed;
      this.maxRadius = 40;
      this.movementX = -1;
      this.movementY = -1;

      this.previousPosition = { left: this.elemento.offsetLeft, top: this.elemento.offsetTop };

      this.setupStyles(this.uuid);
      this.bindEvents();
      this.updateMovement();
      document.getElementById(elementToAppend).appendChild(this.joystick);
    }, 10);
  }

  setupStyles(uuid) {
    const styles = `
        /* Estilos del joystick */
        #joystick-${uuid} {
          margin:25px;
          width: 100px;
          height: 100px;
          background-color: #2ecc71;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 136, 204, 0.05);
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5) inset, 0 1px 1px rgba(0, 0, 0, 0.2);
          touch-action: none;
        }
  
        #joystick-inner-${uuid} {
          height: 70px;
          width: 70px;
          border-radius: 50%;
          background: rgba(0, 136, 204, 0.25);
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.7) inset;
          position: absolute;
          transition: background 0.3s;
        }
      `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }

  bindEvents() {
    this.joystick.addEventListener('mousedown', (event) => {
      this.isMoving = true;
      event.preventDefault();

      this.joystickCenterX = this.joystick.offsetLeft + this.joystick.clientWidth / 2;
      this.joystickCenterY = this.joystick.offsetTop + this.joystick.clientHeight / 2;
      this.joystickInner.style.transform = 'translate(0, 0)';
      this.updateMovement();
    });

    document.addEventListener('mousemove', (event) => {
      if (!this.isMoving) return;
      this.handleMove(event);
    });

    document.addEventListener('mouseup', () => {
      this.isMoving = false;
      this.joystickInner.style.transform = 'translate(0, 0)';
    });

    document.addEventListener('dragstart', (event) => {
      event.preventDefault();
    });
  }

  handleMove(event) {
    const deltaX = event.clientX - this.joystickCenterX;
    const deltaY = event.clientY - this.joystickCenterY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const moveX = distance > this.maxRadius ? (deltaX / distance) * this.maxRadius : deltaX;
    const moveY = distance > this.maxRadius ? (deltaY / distance) * this.maxRadius : deltaY;

    this.joystickInner.style.transform = `translate(${moveX}px, ${moveY}px)`;
    const angle = Math.atan2(moveY, moveX);
    this.movementX = Math.cos(angle) * this.speed;
    this.movementY = Math.sin(angle) * this.speed;
  }

  updateMovement() {
    if (!this.isMoving) {
      this.movementX *= 0.9;
      this.movementY *= 0.9;

      if (Math.abs(this.movementX) < 0.1 && Math.abs(this.movementY) < 0.1) {
        this.movementX = 0;
        this.movementY = 0;
      }
    }

    const bodyWidth = this.elemento.parentElement.clientWidth;
    const bodyHeight = this.elemento.parentElement.clientHeight;

    const newLeft = Math.min(Math.max(this.elemento.offsetLeft + this.movementX, 0), bodyWidth - this.elemento.clientWidth);
    const newTop = Math.min(Math.max(this.elemento.offsetTop + this.movementY, 0), bodyHeight - this.elemento.clientHeight);

    if (newLeft !== this.previousPosition.left || newTop !== this.previousPosition.top) {
      this.elemento.style.left = newLeft + 'px';
      this.elemento.style.top = newTop + 'px';

      this.previousPosition = { left: newLeft, top: newTop };

      if (this.isMoving && this.onMoveCallback) {
        const position = {
          left: this.elemento.offsetLeft,
          top: this.elemento.offsetTop
        };
        this.onMoveCallback(position);
      }
    }

    if (this.isMoving && (Math.abs(this.movementX) > 0.1 || Math.abs(this.movementY) > 0.1)) {
      requestAnimationFrame(this.updateMovement.bind(this));
    }
  }

}

export { Joystick as default };
