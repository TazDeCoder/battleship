import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';

import NewGame from './components/NewGame/NewGame';
import Board from './components/Board/Board';

import { IGameData } from './models';
import { Ship, Player, initPlayers } from './lib/index';
import { useGame } from './hooks/index';

function App() {
  const {
    isReady,
    setPlayer,
    players,
    isPlayer1,
    registerShot,
    switchTurns,
    isEnd,
  } = useGame();
  const [error, setError] = useState<string | null>(null);

  const newGameHandler = (newGameData?: IGameData) => {
    let initialPlayers = Object.freeze({
      player1: Player(),
      player2: Player(),
    });

    if (newGameData) {
      for (let i = 0; i < 2; i += 1) {
        const playerKey = i === 0 ? 'player1' : 'player2';
        for (
          let j = 0;
          j < Object.keys(newGameData[playerKey]).length;
          j += 1
        ) {
          try {
            const shipName = Object.keys(newGameData[playerKey])[j];
            const { coord, dir } = newGameData[playerKey][shipName];
            initialPlayers[playerKey].setPiece(Ship(shipName), coord, dir);
          } catch {
            setError(`Invalid ship placement from ${playerKey}`);
            return;
          }
        }
      }
    } else {
      initialPlayers = initPlayers(initialPlayers);
    }

    setPlayer('player1', initialPlayers.player1);
    setPlayer('player2', initialPlayers.player2);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <NewGame open={!isReady} onNewGame={newGameHandler} />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          py: 2,
          textAlign: 'center',
        }}
      >
        {!isReady && !isEnd ? (
          <Typography>Creating game...</Typography>
        ) : (
          <>
            <Typography>
              {isPlayer1 ? 'Player 1 turn' : 'Player 2 turn'}
            </Typography>
            <Button
              sx={{ alignSelf: 'center', my: 3 }}
              variant="contained"
              onClick={switchTurns}
              disabled={isEnd}
            >
              Switch Turns
            </Button>
          </>
        )}
        {isReady && !isEnd && (
          <Board
            boardData={{
              ships: players[isPlayer1 ? 'player2' : 'player1']?.ships ?? {},
              missed: players[isPlayer1 ? 'player2' : 'player1']?.missed ?? [],
            }}
            onTogglePiece={registerShot}
          />
        )}
        {isEnd && (
          <Typography>{isPlayer1 ? 'Player1' : 'Player2'} Wins!</Typography>
        )}
      </Container>
    </>
  );
}

export default App;
