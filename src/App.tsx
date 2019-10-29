import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './game-of-life/Cell';


interface WorldProps {
  id?: string;
  name?: string;
}

interface WorldState {
  world: boolean[][];
}

export class World extends React.Component<WorldProps, WorldState> {

  constructor(props: WorldProps) {
    super(props);
    this.state = { world: [[false, false, false,false, false, false], [false, false, false,true, false, false],[false, false, true,false, false, false],[false, true, false,false, false, false],[false, false, false,true, false, false],[false, false, true,false, true, false]] }
  }

  componentDidMount() {
    setInterval(this.tic,1000);
    //this.tic();
  }

  aliveNeighbours = (x: number, y: number) => {
    let result = 0;
    if (x < 5 && y < 5 && this.state.world[x + 1][y + 1]) {
      result += 1;
    }
    if (x < 5 && y > 0 && this.state.world[x + 1][y - 1]) {
      result += 1;
    }
    if (x > 0 && this.state.world[x - 1][y]) {
      result += 1;
    }
    if (x > 0 && y > 0 && this.state.world[x - 1][y - 1]) {
      result += 1;
    }
    if (x > 0 && y < 5 && this.state.world[x - 1][y + 1]) {
      result += 1;
    }
    if (x < 5 && this.state.world[x + 1][y]) {
      result += 1;
    }
    if (y < 5 && this.state.world[x][y + 1]) {
      result += 1;
    }
    if (y > 0 && this.state.world[x][y - 1]) {
      result += 1;
    }
    return result;
  }

  tic = () => {
    let newWorld: boolean[][] = [[],[],[],[],[],[]];
    for (let i = 0; i < this.state.world.length; i++) {
      for (let j = 0; j < this.state.world[i].length; j++) {
        newWorld[i][j] = this.state.world[i][j];
        let nb = this.aliveNeighbours(i, j);
        if (nb < 2) {
          newWorld[i][j] = false;
        }
        if (nb > 3) {
          newWorld[i][j] = false;
        }
        if (this.state.world[i][j] && (nb === 2 || nb === 3)) {
          newWorld[i][j] = true;
        }
        if (!this.state.world[i][j] && nb === 3) {
          newWorld[i][j] = true;
        }
      }
    }

    this.setState({ world: newWorld });

  }



  render() {

    const line = () => {
      return this.state.world
        .map((line, lineIndex) => {
          return <div> {line.map((cell, cellIndex) => {
            return (
            <Cell key={`${lineIndex} - ${cellIndex}`} alive={cell}></Cell>
            )})
          } </div>
        })
    }
    return (
      <div className="App" >
        {line()}
      </div>
    )
  }

}

export default World;
