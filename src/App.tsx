import { useState } from 'react';
import Grid from './components/Grid';
import PossibleWords from './components/PossibleWords';
import './App.css';
import { findValidWords } from './modules/wordsSearch'

function App() {
  const startGame = () => {}
  const [data, setData] = useState(Array(20).fill(''))
  const [statuses, setStatuses] = useState(Array(20).fill(''))
  const [validWords, setValidWords] = useState([''])
  
  const validStatuses = ['', 'B', 'Y', 'G']

  const handleSquareChange = (value: string, id: number) => {
    console.log(`TOP LEVEL Got value of id ${id} and the value is ${value}`)
    setData((data) => {
      let newData = [...data]
      newData[id] = value.toLowerCase()
      return newData
    })
  }

  const handleClickShowWords = () => {
    console.log('outer click handler for show words')
    const validWords = findValidWords(data, statuses)
    setValidWords(validWords);
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
        <Grid 
          grid={data} 
          statuses={statuses} 
          handleSquareChange={handleSquareChange} 
          handleButtonClick={handleButtonClick}/>
        <PossibleWords handleClick={handleClickShowWords} words={validWords}/>
      </header>
    </div>
  );
}

export default App;
