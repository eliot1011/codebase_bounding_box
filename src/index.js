import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group, Image, Circle} from 'react-konva';
import Konva from 'konva';

class MyRect extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: 'green',
      xTop: 5,
      yTop: 5,
      xBottom: 60,
      yBottom: 80,
      draggable: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.anchorHandleMouseDownTouchStartStart = this.anchorHandleMouseDownTouchStartStart.bind(this);
    this.anchorHandleDragEnd = this.anchorHandleDragEnd.bind(this);
  }
  handleClick() {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  }

  handleDragEnd(e) {
    // console.log('handleDragEnd', e, e.target instanceof Konva.Circle);
    // if (e.target instanceof Konva.Circle) {
    //   const { x, y } = e.target.attrs;
    //   console.log('circle', { x, y });
    //   this.setState({
    //     xTop: x,
    //     yTop: y
    //   });
    //   e.target.moveToTop()
    // }
    // else {
    //   const { x, y } = e.target.children[1].attrs;
    //   this.setState({
    //     xTop: x,
    //     yTop: y
    //   });
    //   e.target.children[0].moveToTop();
    // }
  }

  handleDragMove(e) {
    const { x, y } = (e.target instanceof Konva.Circle) ?
      e.target.attrs : // circle
      e.target.children[1].attrs; // rect
    this.setState({
      xTop: x,
      yTop: y
    });
    this.anchor.moveToTop();
    // console.log(this);
  }

  handleMouseOver(e) {
    console.log('mouseover', e);
  }

  anchorHandleMouseDownTouchStartStart(e) {
    console.log('anchorHandleMouseDownTouchStartStart');
    // this.setState({draggable: false});
  }

  anchorHandleDragEnd(e) {
    console.log('anchorHandleDragEnd');
    // this.setState({draggable: true});
  }

  render() {
    return (
      <Group
        onClick={this.handleClick}
        onDragEnd={this.handleDragEnd}
        onDragMove={this.handleDragMove}
        onMouseOver={this.handleMouseOver}
        draggable={this.state.draggable}
      >
        <Circle
          fill="yellow"
          x={this.state.xTop}
          y={this.state.yTop}
          ref={anchor => { this.anchor = anchor; }}
          onMouseDown={this.anchorHandleMouseDownTouchStartStart}
          onTouchStart={this.anchorHandleMouseDownTouchStartStart}
          radius={10}
          zIndex={1}
          draggable
        />
        <Rect
          x={this.state.xTop}
          y={this.state.yTop}
          width={Math.abs(this.state.xTop-this.state.xBottom)}
          height={Math.abs(this.state.yTop-this.state.yBottom)}
          stroke={this.state.color}
          zIndex={0}
        />
      </Group>
    );
  }
}
class MyImage extends React.Component {
  state = {
    image: null
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = 'http://konvajs.github.io/assets/yoda.jpg';
    image.onload = () => {
      this.setState({
        image: image
      });
    }
  }

  render() {
    return (
      <Image
        image={this.state.image}
      />
    );
  }
}

function App() {
  // Stage - is a div wrapper
  // Layer - is a <canvas> element on the page
  // so you can use several canvases. It may help you to improve performance a lot.
  return (
    <Stage width={213} height={236}>
      <Layer>
        <MyImage/>
      </Layer>
      <Layer>
        <MyRect/>
      </Layer>
    </Stage>
  );
}


ReactDOM.render(<App/>, document.getElementById('root'));
