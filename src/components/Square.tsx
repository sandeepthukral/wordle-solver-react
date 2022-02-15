import React from 'react';

export type SquareType = {id: number, word: string, handleChange: Function}

export function Square({id, word, handleChange}: SquareType) {

    const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value.toUpperCase(), id)
    };

    const handleClick = (e: any) => {
        e.target.select();
    }
    
  return <input 
            type="text" 
            className='square' 
            id={id + ""} 
            value={word.toUpperCase()} 
            maxLength={1} 
            onChange={_handleChange} 
            onClick={handleClick}
            autoComplete='off'/>;
}
