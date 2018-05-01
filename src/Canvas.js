import React, { Component } from 'react';

class Canvas extends Component {
    constructor () {
        super();
        this.state = {
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
        this.putPoint(e, true);
    }

    disengage = () => {
        this.setState({ dragging: false });
    }

    // Without click parameter, nothing is drawn until the mouse moves.
    putPoint = (e, click) => {
        // A reference to the canvas
        const canvas = this.refs.canvas,
              context = canvas.getContext('2d');
        
        if ( this.state.dragging || click ) {
            // Begins the path
            context.beginPath();
            
            // The arc values. The start and end angles make the arc a circle. 2*PI is one cycle around a circle in radians. 
            const x = e.nativeEvent.offsetX,
                  y = e.nativeEvent.offsetY,
                  radius = 8,
                  startAngle = 0,
                  endAngle = 2 * Math.PI; 

            // A circle is created using the arc method
            context.arc(x, y, radius, startAngle, endAngle);  // context.arc(x, y, radius, startAngle, endAngle, [antiClockwise]);

            // Fills the circle with a color (without fillStyle the color is black by default)
            context.fillStyle = 'slateblue';
            context.fill();
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