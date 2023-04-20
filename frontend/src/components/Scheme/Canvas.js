import React, { useEffect, useRef, useMemo, useCallback, useReducer } from 'react';
import { Box, Button, Slider, ButtonGroup } from '@mui/material';
import Point from '../../services/point';
import ElasticNet from '../../services/ElasticNet';
import TableParametrs from './TableParametrs';

function sortCitiesByLine(cities, points) {
  // Функция для нахождения расстояния между двумя точками
  function distance(pointA, pointB) {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Найти ближайшую точку второго массива для каждого города
  const closestPoints = cities.map(city => {
    const distances = points.map(point => distance(city, point));
    const minDistance = Math.min(...distances);
    const closestPointIndex = distances.indexOf(minDistance);
    return {point: points[closestPointIndex],city: city};
  });

  const sortedCities = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (closestPoints.filter(data => data.point === point).length > 0) {
      sortedCities.push(closestPoints.filter(data => data.point === point)[0].city);
    }
  }

  // Возвращаем отсортированный массив городов
  return sortedCities;
}

const initialState = {
    cities: [],
    sortCities: [],
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
      case 'setSortCities':
        return { ...state, sortCities: action.payload };
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
  
    const drawEdges = useCallback(
        (context, nodes, color) => {
          if (nodes.length === 0) {
            return;
          }
          context.strokeStyle = color;
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
  
      const elasticnet = useMemo(() => new ElasticNet(state.cities, state.params), [state.cities, state.params]);
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
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        } else {
            dispatch({ type: 'setStarted', payload: true });
          requestRef.current = requestAnimationFrame(redraw);
        }
      }
      const redraw = time =>{
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const _scaledcities = _scaled(canvas, state.cities);
            const _scaledpoints = _scaled(canvas, elasticnet.solution());
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawNodes(ctx, _scaledcities, 4, true);
            drawNodes(ctx, _scaledpoints, 3, false);
            drawEdges(ctx, _scaledpoints, '#f00');
            if(elasticnet.do_iteration()){
              dispatch({ type: 'setStarted', payload: false });
              const sortedCities = sortCitiesByLine(_scaledcities, _scaledpoints);
              dispatch({ type: 'setSortCities', payload: sortedCities });
              return () => cancelAnimationFrame(requestRef.current);
            }
            else{
            requestRef.current = requestAnimationFrame(redraw);
            }
      }
      useEffect(()=>{
        onResize();
      }, [state.range])

      useEffect(()=>{
        if(state.sortCities.length > 0){
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawEdges(ctx, state.sortCities, '#0f0');
            drawNodes(ctx, state.sortCities, 4, true);
            console.log(state.sortCities, "sortcities");
        }
      }, [state.sortCities])
    
      useEffect(()=>{
            onResize();
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const _scaledcities = _scaled(canvas, state.cities);
            const _scaledpoints = _scaled(canvas, elasticnet.solution());
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawNodes(ctx, _scaledcities, 4, true);
            drawNodes(ctx, _scaledpoints, 3, false);
            drawEdges(ctx, _scaledpoints);
      }, [])
            
    return (
        <Box className="canvas-box">
          <canvas ref={canvasRef} width={props.width} height={props.height}></canvas>
          <ButtonGroup variant="contained" fullWidth> 
            <Button onClick={onStart}>{state.started ? "Стоп": "Старт"}</Button>
            <Button onClick={console.log("Модальное окно нужно добавить")}>Параметры</Button>
          </ButtonGroup>
          <Slider 
            aria-label="Cities len" 
            min={10} 
            step={10} 
            max={100} 
            value={state.range} 
            valueLabelDisplay="auto" 
            onChange={(e) => {dispatch({ type: 'setRange', payload: e.target.value });}} 
          />
          <TableParametrs />
        </Box>
      )

}