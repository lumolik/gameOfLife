import React from 'react'

interface CellProps {
    alive :boolean;
}

const Cell :React.FC<CellProps> = (props :CellProps) => {

    const stylePlop = {width: '40px', height: '40px' , backgroundColor: props.alive?'green': 'red', border:'1px solid' }   ;
    return (
        <div style={stylePlop}>
        </div>
    )
}

export default Cell;