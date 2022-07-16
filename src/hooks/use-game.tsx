import { useReducer, useState, useEffect } from 'react';

import { Coord } from '../models';
import { Player } from '../lib/index';

const initialState: {
  players: {
    [key in `player${1 | 2}`]?: ReturnType<typeof Player>;
  };
  isPlayer1?: boolean;
} = {
  players: {},
  isPlayer1: true,
};

type Action =
  | {
      type: 'SET_PLAYER';
      payload: { key: `player${1 | 2}`; value: ReturnType<typeof Player> };
    }
  | { type: 'SWITCH_TURNS' }
  | { type: 'TAKE_SHOT' | 'RECEIVE_ATTACK'; payload: Coord };

function gameReducer(state: typeof initialState, action: Action) {
  if (action.type === 'SET_PLAYER') {
    const updatedPlayers = { ...state.players };
    updatedPlayers[action.payload.key] = action.payload.value;
    return {
      ...state,
      players: updatedPlayers,
    };
  }
  if (action.type === 'SWITCH_TURNS') {
    return {
      players: state.players,
      isPlayer1: !state.isPlayer1,
    };
  }
  if (action.type === 'TAKE_SHOT') {
    const updatedPlayers = { ...state.players };
    updatedPlayers[state.isPlayer1 ? 'player1' : 'player2']?.takeShot(
      action.payload
    );
    return {
      ...state,
      players: updatedPlayers,
    };
  }
  if (action.type === 'RECEIVE_ATTACK') {
    const updatedPlayers = { ...state.players };
    updatedPlayers[state.isPlayer1 ? 'player2' : 'player1']?.receiveAttack(
      action.payload
    );
    return {
      ...state,
      players: updatedPlayers,
    };
  }
  return state;
}

export default function useGame() {
  const [game, dispatch] = useReducer(gameReducer, initialState);
  const [isEnd, setIsEnd] = useState(false);

  const isReady = Object.keys(game.players).length === 2;

  const setPlayerHandler = (
    key: `player${1 | 2}`,
    value: ReturnType<typeof Player>
  ) => {
    dispatch({ type: 'SET_PLAYER', payload: { key, value } });
  };

  const switchTurnsHandler = () => {
    dispatch({ type: 'SWITCH_TURNS' });
  };

  const registerShotHandler = (coord: Coord) => {
    dispatch({
      type: 'TAKE_SHOT',
      payload: coord,
    });
    dispatch({
      type: 'RECEIVE_ATTACK',
      payload: coord,
    });
  };

  useEffect(() => {
    if (game.players[game.isPlayer1 ? 'player2' : 'player1']?.areShipsSunk()) {
      setTimeout(() => setIsEnd(true), 700);
    }
  }, [game.isPlayer1, game.players]);

  return {
    isReady,
    players: game.players,
    isPlayer1: game.isPlayer1,
    setPlayer: setPlayerHandler,
    registerShot: registerShotHandler,
    switchTurns: switchTurnsHandler,
    isEnd,
  };
}
