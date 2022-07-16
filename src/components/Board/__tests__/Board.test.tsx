import React from 'react';
import { render, screen } from '@testing-library/react';

import Board from '../Board';

import { Player } from '../../../lib/index';

const DUMMY_PLAYERS = {
  player1: Player(),
  player2: Player(),
};

describe('Board component', () => {
  it('should render a 10x10 board', () => {
    render(
      <Board
        boardData={{
          missed: DUMMY_PLAYERS.player1.missed,
          ships: DUMMY_PLAYERS.player1.ships,
        }}
        onTogglePiece={() => {}}
      />
    );
    const boardEl = screen.getByTestId('board') as HTMLTableElement;
    expect(boardEl.rows.length).toBe(10);
  });
});
