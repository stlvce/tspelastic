import React, { useEffect, useRef, useState, useCallback, useReducer } from 'react';
import { Box, Button, Slider } from '@mui/material';
import Point from '../../services/point';
import WorkerBuilder from '../../services/WorkerBuilder'
import Worker from '../../services/worker';
import WorkerTransport from '../../services/WorkerTransport'
import Algo from '../../services/Algo';


const initialState = {
    cities: [],
    range: 10,
    started: false,
    params: {
      alpha: 0.2,
      beta: 2,
      initialK: 0.2,
      epsilon: 0.02,
      kAlpha: 0.99,
      kUpdatePeriod: 25,
      maxNumIter: 100000,
      numPointsFactor: 2.5,
      radius: 0.1,
    },
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case 'setCities':
        return { ...state, cities: action.payload };
      case 'setRange':
        return { ...state, range: action.payload };
      case 'setStarted':
        return { ...state, started: action.payload };
      case 'setParams':
        return { ...state, params: action.payload };
      default:
        return state;
    }
  }

  export default function Canvas(props) {
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [elasticnetResult, setElasticnetResult] = useState([]);
    
    let algo = new Algo(new WorkerTransport(new WorkerBuilder(Worker)))

    algo.onStopped(function () {
      dispatch({ type: 'setStarted', payload: false });
    });
    

    algo.onCreated(function (cities, solution) {
      setElasticnetResult([solution]);
      dispatch({ type: 'setCities', payload: cities });
      redraw();
    });
  
    algo.onStarted(function () {
      dispatch({ type: 'setStarted', payload: true });
      algo.getSolution();
    });
  
    algo.onSolution(function (points) {
      setElasticnetResult([...elasticnetResult, points]);
    });



    const drawEdges = useCallback(
        (context, nodes) => {
          if (nodes.length === 0) {
            return;
          }
          context.strokeStyle = '#f00';
          context.lineWidth = 2;
          context.beginPath();
          context.moveTo(nodes[0].x, nodes[0].y);
          nodes.slice(1).forEach(function (node) {
            context.lineTo(node.x, node.y);
          });
          context.lineTo(nodes[0].x, nodes[0].y);
    
          context.stroke();
          context.closePath();
        },
        [canvasRef.current]
      );
      const drawNodes = useCallback(
        (context, nodes, radius, fill) => {
          context.strokeStyle = '#444';
          nodes.forEach((node) => {
            context.beginPath();
            context.arc(node.x, node.y, radius, 0, Math.PI * 2, true);
            context.closePath();
            if (fill) {
              context.fill();
            } else {
              context.stroke();
            }
          });
        },
        [canvasRef.current]
      );
      function _scaled(canvas, points) {
        let width = canvas.width;
        let height = canvas.height;
        return points.map((node) => new Point(node.x * width, node.y * height));
      }
      function onResize() {
        const newCities = [];
        for (let i = 0; i < state.range; i++) {
          newCities.push(new Point(Math.random(), Math.random()));
        }
        dispatch({ type: 'setCities', payload: newCities });
      }
      function onStart() {
        if (requestRef.current !== null) {
          dispatch({ type: 'setStarted', payload: false });
          algo.stop();
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        } else {
          dispatch({ type: 'setStarted', payload: true });
          algo.start();
          requestRef.current = requestAnimationFrame(redraw);
        }
      }
      const redraw = (time) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const _scaledcities = _scaled(canvas, state.cities);
        const _scaledpoints = _scaled(canvas, elasticnetResult.length ? elasticnetResult[elasticnetResult.length - 1] : []);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawNodes(ctx, _scaledcities, 4, true);
        drawNodes(ctx, _scaledpoints, 3, false);
        drawEdges(ctx, _scaledpoints);
        requestRef.current = requestAnimationFrame(redraw);
      };

      useEffect(()=>{
        onResize();
      }, [state.range])
    
      useEffect(()=>{
            algo.create(state.cities, state.params);
            onResize();
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const _scaledcities = _scaled(canvas, state.cities);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawNodes(ctx, _scaledcities, 4, true);
      }, [])
            
    return (
        <Box className="canvas-box">
          <canvas ref={canvasRef} width={props.width} height={props.height}></canvas>
          <Button onClick={onStart}>{state.started ? "Стоп": "Старт"}</Button>
          <Slider aria-label="Cities len" min={10} step={10} max={100} value={state.range} valueLabelDisplay="auto" onChange={(e) => {dispatch({ type: 'setRange', payload: e.target.value });}} />
        </Box>
      )

}