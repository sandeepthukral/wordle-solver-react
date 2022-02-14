import { useState } from 'react';
import Grid from './components/Grid';
import PossibleWords from './components/PossibleWords';
import './App.css';

function App() {
  const startGame = () => {}
  const [data, setData] = useState(Array(20).fill(''))
  const [statuses, setStatuses] = useState(Array(20).fill(''))
  
  const validStatuses = ['', 'B', 'Y', 'G']

  const handleSquareChange = (value: string, id: number) => {
    console.log(`TOP LEVEL Got value of id ${id} and the value is ${value}`)
    setData((data) => {
      let newData = [...data]
      newData[id] = value
      return newData
    })
  }

  const handleButtonClick = (status: string, id: number) => {
    console.log(`TOP LEVEL Button Click with status ${status} and id ${id}`);
    setStatuses((stauses) => {
      const newStatuses = [...statuses]
      const index = validStatuses.indexOf(status);
      const isCurrentStatusLastInArray = index === validStatuses.length -1

      newStatuses[id] = isCurrentStatusLastInArray ? validStatuses[0] : validStatuses[index + 1] 
      return newStatuses;
    });
  }


  return (
    <div className="App">
      <header className="App-header">
        <button className="startGame" onClick={startGame}>Start New Game</button>
        <Grid 
          grid={data} 
          statuses={statuses} 
          handleSquareChange={handleSquareChange} 
          handleButtonClick={handleButtonClick}/>
        <PossibleWords />
      </header>
    </div>
  );
}

export default App;
