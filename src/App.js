import React, { useState, useEffect,useLayoutEffect, useRef } from "react";
import './App.css';
import { getNumber, getRandomPosition } from "./circle/circlecomponent.js";
import Circle from "./circle/circle.js";


function App() {
  const [count, setCount] = useState(0);
  const [circles, setCircles] = useState([]);
  const [timer, setTimer] = useState(0);
  const [text, setText] = useState("LET'S PLAY");
  const [gameOver, setGameOver] = useState(false);
  const [clearAll, setClearAll] = useState(false);
  const [timeStart, setTimeStart] = useState(false);
  const [deletedCount, setDeletedCount] = useState(1);

  const ref = useRef(null);

  const [widthContainer, setWidthContainer] = useState(0);
  const [heightContainer, setHeightContainer] = useState(0);

  useLayoutEffect(() => {
    setWidthContainer(ref.current.offsetWidth);
    setHeightContainer(ref.current.offsetHeight);
  }, []);

  const handleInPutChange=(e)=>{
    setCount(Number(e.target.value));
  }

  const handleGenerateCircles=()=>{
    if (count <= 0) {
      alert('Please enter a number greater than 0');
      return;
    }
    const newCircle = Array.from( {length: count},(_,i)=>({
      id: i+1,
      number: getNumber(count,i),
      position: getRandomPosition(widthContainer,heightContainer,50),
      hidden: false
    }));
    setCircles(newCircle);
    setTimer(0);
    setDeletedCount(1);
    setText("LET'S PLAY");
    setGameOver(false);
    setClearAll(false);
    setTimeStart(true);
  }
  
  const handleRemoveCircle = (number) => {
    if (gameOver) return;  

    
    const visibleCircles = circles.filter(circle => !circle.hidden);
    const smallestVisibleNumber = Math.min(...visibleCircles.map(circle => circle.number));

    if (number === smallestVisibleNumber) {
      setCircles(prevCircles => prevCircles.map(circle =>
        circle.number === number ? { ...circle, hidden: true } : circle
      ));
      setDeletedCount(prevCount => prevCount + 1);
      if(deletedCount===count){
        setText("Clear All")
        setClearAll(true)
        setTimeStart(false)
      }
    } else {
      setText("Game Over"); 
      setGameOver(true);
      setTimeStart(false)
    }
  };

  useEffect(() => {
    if (timeStart && !gameOver) {
      
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeStart, gameOver]);

  return (
    <div className="App">
        <h1 style={{color : gameOver? 'red' : clearAll? 'green' : 'black'}}>{text}</h1>
        <div className="container">
          <label htmlFor="circle-point">Point:</label>
          <input
            id="circle-point" 
            type="number"
            value={count}
            onChange={handleInPutChange}
          />
          <div className="timer">
          <p>Time:</p>
          <div className="time">{timer}s</div>
          </div>
        <button onClick={handleGenerateCircles}>Play</button>
        </div>
        <div className="circle-appear" ref={ref}>
        {circles.map((circle) => (
        <Circle
          key={circle.id}
          id={circle.id}
          number={circle.number}
          position={circle.position}
          hidden={circle.hidden}
          isRemove={() => handleRemoveCircle(circle.number)}
        />
      ))}
        </div>
    </div>
  );
}

export default App;
