import React from 'react';

import Modal from '../UI/Modal';
import GameForm from './GameForm';

import { SHIPS } from '../../constants';
import { Coord } from '../../models/index';

type Props<T> = {
  open: boolean;
  onNewGame: (gameData?: T) => void;
};

type FormData = {
  [key in `player${1 | 2}`]: {
    [key: string]: string | number;
  };
};

function transformFormData(data: { [key: string]: string | number }) {
  return SHIPS.reduce((obj: any, [shipName]) => {
    const newObj = { ...obj };
    const shipCoord = (data[`${shipName}-coord`] as string).split(':');
    const shipDir = data[`${shipName}-dir`] === 1 ? 'horz' : 'vert';
    newObj[shipName] = {
      coord: shipCoord as Coord,
      dir: shipDir,
    };
    return newObj;
  }, {});
}

export default function NewGame<T extends object>({
  open,
  onNewGame,
}: Props<T>) {
  const saveGameDataHandler = (data: FormData | undefined) => {
    if (data) {
      const player1Ships = transformFormData(data.player1);
      const player2Ships = transformFormData(data.player2);
      const gameData = {
        player1: player1Ships,
        player2: player2Ships,
      } as T;
      onNewGame(gameData);
    }
    onNewGame();
  };

  return (
    <Modal open={open} title="Create New Game">
      <GameForm onSubmit={saveGameDataHandler} />
    </Modal>
  );
}
