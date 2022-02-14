import React from 'react';

export type ButtonType = {id: number, status: string, handleClick: Function}

export function Button({id, status, handleClick}: ButtonType) {

    const _handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      console.log(`event happened ${e.button.valueOf()}`)
      handleClick(status, id)
    };

    return <button 
              className={'button button-' + status} 
              id={id + ""} 
              value={status} 
              onClick={_handleClick}>
            &nbsp;</button>;
}
