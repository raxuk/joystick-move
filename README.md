# Joystick-MV

**Joystick-MV** is a lightweight JavaScript library that provides an interactive on-screen joystick to control the movement of an HTML element in real-time. Ideal for web projects that require mobile control interaction or simulated movement using a visual control.

## Features

- Real-time control of an HTML element's movement.
- Customizable speed and behavior.
- Works on both desktop and mobile devices.
- Easy integration and usage in any web project.
- Designed with a modern and minimalistic style.

## Installation

You can install the library via npm:

```bash
npm install joystick-mv
```
Or you can directly include it in your project by downloading the file.

Basic Usage
Here is how you can use Joystick-MV in your project.

## HTML
```html	
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Joystick Example</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .movement-area {
            position: relative;
            height: 25vh;
            width: 25vw;
            border: 2px solid #e74c3c;
            margin-bottom: 20px;
        }

        #elementToMove {
            width: 100px;
            height: 100px;
            background-color: #3498db;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            cursor: move;
            user-select: none;
        }

        #joysticko {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="movement-area">
            <div id="elementToMove">MOVE ME</div>
        </div>
        <div id="joysticko"></div>
    </div>

    <script type="module">
        import Joystick from './src/joystick.js';

        // Instantiate the joystick and link it to the element to move
        const js2 = new Joystick('elementToMove', (position) => {
            console.log('Current position:', position);
        });
        document.getElementById('joysticko').appendChild(js2);
    </script>
</body>
</html>
```

## JavaScript
```javascript
import Joystick from 'joystick-mv';

// Create a new joystick linked to an HTML element
const joystick = new Joystick('elementToMove', (position) => {
    console.log('Current position:', position);
});

// Add it to any container on your page
document.getElementById('joystick-container').appendChild(joystick);
```

## Parameters
The Joystick constructor accepts the following parameters:

* elementToMoveId: The id of the HTML element that will be moved by the joystick.
* onMoveCallback (optional): A callback function that receives the current position of the element (used to respond to real-time movement). 
* speed (optional): Defines the speed of the element's movement. The default value is 4.

## Custom Styles
The joystick's style can be customized directly in your CSS. The library adds a main div (#joystick) and an inner div (#joystick-inner), representing the outer and inner parts of the joystick. You can modify their appearance to match your design.

By default, the joystick is designed with the following style:
    
```css
#joystick {
  width: 100px;
  height: 100px;
  background-color: #2ecc71;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
}

#joystick-inner {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(0, 136, 204, 0.25);
}
```

## Callback Example

You can define a callback to trigger actions when the element moves. For example, to update the position in real-time or perform calculations based on the current coordinates of the element:

```javascript
const joystick = new Joystick('elementToMove', (position) => {
    console.log('Current position of the element:', position.left, position.top);
});
```

## Contributions
Contributions are welcome. If you encounter any [issues](https://github.com/raxuk/joystick-move/issues) or have suggestions to improve the project, please open an issue here or submit a pull request.

## License
This project is licensed under the [GPL-3.0 License](https://www.gnu.org/licenses/gpl-3.0.html).

## Author
Created by [raxuk](https://github.com/raxuk). Thank you for using Joystick-MV!