import React, { useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext } from 'react';
import { Box, Button, Slider, ButtonGroup, Alert, Typography } from '@mui/material';
import Point from '../../services/point';
import ElasticNet from '../../services/ElasticNet';
import ModalParametrs from './ModalParametrs';
import { useCanvasStore } from '../../services/state';
import { shallow } from 'zustand/shallow';
import { LangContext } from '../../context/langContext';

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

  export default function Canvas(props) {
    const state = useCanvasStore((state) => state, shallow);
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
  
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
  
      const elasticnet = useMemo(() => new ElasticNet(state.selectedProducts, state.params), [state.selectedProducts, state.params]);
      
      function _scaled(canvas, points) {
        let width = canvas.width;
        let height = canvas.height;
        return points.map((node) => new Point(node.x * width, node.y * height));
      }
      
      function onStart() {
        if (requestRef.current !== null) {
          state.setStarted(false);
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        } else {
          state.setStarted(true);
          requestRef.current = requestAnimationFrame(redraw);
        }
      }
      const redraw = time =>{
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const _scaledcities = _scaled(canvas, state.selectedProducts);
            const _scaledpoints = _scaled(canvas, elasticnet.solution());
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawNodes(ctx, _scaledcities, 4, true);
            drawNodes(ctx, _scaledpoints, 3, false);
            drawEdges(ctx, _scaledpoints, '#f00');
            if(elasticnet.do_iteration()){
              state.setStarted(false);
              const sortedCities = sortCitiesByLine(_scaledcities, _scaledpoints);
              state.setSortedProducts(sortedCities);
              return () => cancelAnimationFrame(requestRef.current);
            }
            else{
              requestRef.current = requestAnimationFrame(redraw);
            }
      }

      useEffect(()=>{
        if(state.sortSelectedProducts.length > 0){
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawEdges(ctx, state.sortSelectedProducts, '#0f0');
            drawNodes(ctx, state.sortSelectedProducts, 4, true);
            setIsDone(true)
        }
      }, [state.sortSelectedProducts])

      useEffect(()=>{
        if(state.selectedProducts.length > 0){
            elasticnet.setNewData(state.selectedProducts, state.params);
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const _scaledcities = _scaled(canvas, state.selectedProducts);
            drawNodes(ctx, _scaledcities, 4, true);
        }
      }, [state.selectedProducts])
    
      useEffect(()=>{
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const _scaledcities = _scaled(canvas, state.selectedProducts);
            const _scaledpoints = _scaled(canvas, elasticnet.solution());
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawNodes(ctx, _scaledcities, 4, true);
            drawNodes(ctx, _scaledpoints, 3, false);
            drawEdges(ctx, _scaledpoints);
      }, [])

      const [isDone, setIsDone] = useState(false)
      const [openParams, setOpenParams] = useState(false);
      const handleClickOpenParams = () => setOpenParams(true);
      const handleClickCloseParams = () => setOpenParams(false);
      const [selectLang] = useContext(LangContext)
            
    return (
        <Box className="canvas-box">
          {isDone && <Alert onClose={() => {setIsDone(false)}} severity="success" sx={{ position: "fixed", bottom: 0, left: 0, zIndex: "100" }}>This is a success alert — check it out!</Alert>}
          <Typography variant='h5'>{selectLang.scheme}</Typography>
          <canvas ref={canvasRef} width={props.width} height={props.height}></canvas>
          <ButtonGroup variant="contained" fullWidth> 
            <Button onClick={onStart}>{state.started ? selectLang.stop : selectLang.start}</Button>
            <Button onClick={handleClickOpenParams}>{selectLang.param}</Button>
            <ModalParametrs open={openParams} handleClose={handleClickCloseParams}/>
          </ButtonGroup>
        </Box>
      )

}