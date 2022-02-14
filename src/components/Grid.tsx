import { Button } from './Button'
import {Square} from './Square'
type Prop = { grid: Array<string>, statuses: Array<string>, handleSquareChange: Function, handleButtonClick: Function }

const Grid = ({grid, statuses, handleSquareChange, handleButtonClick}: Prop) => { 
    const _handleSquareChange = (value: string, id: number) => {
        console.log(`Got value of id ${id} and the value is ${value}`)
        handleSquareChange(value, id)
    }

    const _handleButtonClick = (status: string, id: number) => {
        console.log(`Button click having status ${status} and id ${id}`);
        handleButtonClick(status, id)
    }

    return (
    <>
        <div>Grid</div>
        <p>In the first row, enter the characters that you have submitted. In the row beow that, use the mosue to cnahge the color of the corresponding text. <br/>
        Do the same in the next two rows and the next two rows and... you get th idea</p>
        <div className="outer">
            <div className="board-row">
                <Square id={0} word={grid[0]} handleChange={_handleSquareChange} />
                <Square id={1} word={grid[1]} handleChange={_handleSquareChange} />
                <Square id={2} word={grid[2]} handleChange={_handleSquareChange}  />
                <Square id={3} word={grid[3]} handleChange={_handleSquareChange}  />
                <Square id={4} word={grid[4]} handleChange={_handleSquareChange}  />
            </div>

            <div className="board-row">
                <Button id={0} status={statuses[0]} handleClick={_handleButtonClick} />
                <Button id={1} status={statuses[1]} handleClick={_handleButtonClick} />
                <Button id={2} status={statuses[2]} handleClick={_handleButtonClick}  />
                <Button id={3} status={statuses[3]} handleClick={_handleButtonClick}  />
                <Button id={4} status={statuses[4]} handleClick={_handleButtonClick}  />
            </div>
        </div>
        <div className="outer">
            <div className="board-row">
                <Square id={5} word={grid[5]} handleChange={_handleSquareChange} />
                <Square id={6} word={grid[6]} handleChange={_handleSquareChange} />
                <Square id={7} word={grid[7]} handleChange={_handleSquareChange}  />
                <Square id={8} word={grid[8]} handleChange={_handleSquareChange}  />
                <Square id={9} word={grid[9]} handleChange={_handleSquareChange}  />
            </div>

            <div className="board-row">
                <Button id={5} status={statuses[5]} handleClick={_handleButtonClick} />
                <Button id={6} status={statuses[6]} handleClick={_handleButtonClick} />
                <Button id={7} status={statuses[7]} handleClick={_handleButtonClick}  />
                <Button id={8} status={statuses[8]} handleClick={_handleButtonClick}  />
                <Button id={9} status={statuses[9]} handleClick={_handleButtonClick}  />
            </div>
        </div>
        <div className="outer">
            <div className="board-row">
                <Square id={10} word={grid[10]} handleChange={_handleSquareChange} />
                <Square id={11} word={grid[11]} handleChange={_handleSquareChange} />
                <Square id={12} word={grid[12]} handleChange={_handleSquareChange}  />
                <Square id={13} word={grid[13]} handleChange={_handleSquareChange}  />
                <Square id={14} word={grid[14]} handleChange={_handleSquareChange}  />
            </div>

            <div className="board-row">
                <Button id={10} status={statuses[10]} handleClick={_handleButtonClick} />
                <Button id={11} status={statuses[11]} handleClick={_handleButtonClick} />
                <Button id={12} status={statuses[12]} handleClick={_handleButtonClick}  />
                <Button id={13} status={statuses[13]} handleClick={_handleButtonClick}  />
                <Button id={14} status={statuses[14]} handleClick={_handleButtonClick}  />
            </div>
        </div>
        <div className="outer">
            <div className="board-row">
                <Square id={15} word={grid[15]} handleChange={_handleSquareChange} />
                <Square id={16} word={grid[16]} handleChange={_handleSquareChange} />
                <Square id={17} word={grid[17]} handleChange={_handleSquareChange}  />
                <Square id={18} word={grid[18]} handleChange={_handleSquareChange}  />
                <Square id={19} word={grid[19]} handleChange={_handleSquareChange}  />
            </div>

            <div className="board-row">
                <Button id={15} status={statuses[15]} handleClick={_handleButtonClick} />
                <Button id={16} status={statuses[16]} handleClick={_handleButtonClick} />
                <Button id={17} status={statuses[17]} handleClick={_handleButtonClick}  />
                <Button id={18} status={statuses[18]} handleClick={_handleButtonClick}  />
                <Button id={19} status={statuses[19]} handleClick={_handleButtonClick}  />
            </div>
        </div>
    </>
)}

export default Grid