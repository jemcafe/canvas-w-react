import React, { Component } from 'react';

class Canvas extends Component {
    constructor () {
        super();
        this.state = {
            radius: 6,
            dragged: false,
        }
    }

    componentDidMount () {
        // A reference to the canvas
        const canvas = this.refs.canvas;

        // The size of the canvas
        canvas.width = 600;
        canvas.height = 600;
    }

    engage = (e) => {
        this.setState({ dragging: true });

        // A point is drawn without dragging the mouse
        this.putPoint(e, true);
    }

    disengage = () => {
        this.setState({ dragging: false });

        // The path is rest. All the paths would be connected without a reseting when the mouse is up.
        const context = this.refs.canvas.getContext('2d');
        context.beginPath();
    }

    // Without click parameter is needed so a point is drawn without dragging the mouse
    putPoint = (e, click) => {
        const { radius } = this.state;

        // A reference to the canvas to get the context
        const context = this.refs.canvas.getContext('2d');
        
        // Mouse position
        const x = e.nativeEvent.offsetX,
              y = e.nativeEvent.offsetY;

        // Arc angle values to make it a circle
        const startAngle = 0,
              endAngle = 2 * Math.PI; 
        
        if ( this.state.dragging || click ) {
            context.lineWidth = radius * 2;

            // 
            context.lineTo(x, y);

            // The stroke method draws the path defined by lineTo and moveTo
            context.strokeStyle = 'slateblue';
            context.stroke();

            // The beginPath method beigns a path and resets the current path
            context.beginPath();
            
            // A circle is created using the arc method. The start and end angles make the arc a circle. 2*PI is one cycle around a circle in radians. 
            context.arc(x, y, radius, startAngle, endAngle);  // context.arc(x, y, radius, startAngle, endAngle, [antiClockwise]);

            // Fills the circle with a color (without fillStyle the color is black by default)
            context.fillStyle = 'slateblue';
            context.fill();

            // The path is reset
            context.beginPath();

            // 
            context.moveTo(x, y)
        }
    }

    render () {
        /* The ref attribute is needed to access the canvas element. With regular javascript document.getElementById('canvas') would be used. */
        return (
            <canvas ref="canvas" onMouseDown={this.engage} 
                                 onMouseMove={(e) => this.putPoint(e, false)} 
                                 onMouseUp={this.disengage}/>
        )
    }
}

export default Canvas;