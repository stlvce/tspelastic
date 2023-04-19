import React from "react";


class Canvas extends React.Component {
    componentDidUpdate() {
      this.canvas.width = this.props.width;
      this.canvas.height = this.props.height;
    }
  
    render() {
      return (
        <canvas ref={el => this.canvas = el} />
      );
    }
  }


  class RangeInput extends React.Component {
    render() {
      return (
        <input
          type="range"
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          value={this.props.value}
          onChange={event => this.props.onChange(Number(event.target.value))}
        />
      );
    }
  }

  class City extends React.Component {
    render() {
      const { x, y, color, size, filled } = this.props;
  
      return (
        <circle cx={x} cy={y} r={size / 2} fill={filled ? color : "none"} stroke={color} />
      );
    }
  }
  
  class Point extends React.Component {
    render() {
      const { x, y, color, size } = this.props;
  
      return (
        <circle cx={x} cy={y} r={size / 2} fill={color} stroke={color} />
      );
    }
  }
  
  class Line extends React.Component {
    render() {
      const { points, color, width } = this.props;
  
      return (
        <path
          d={`M ${points.map(p => `${p.x} ${p.y}`).join(" L ")}`}
          stroke={color}
          strokeWidth={width}
          fill="none"
        />
      );
    }
  }