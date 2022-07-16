import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Board from '../Board';

import { Player, Ship } from '../../../lib/index';

type Checkbox = HTMLTableCellElement & { disabled: boolean };

const DUMMY_PLAYERS = {
  player1: Player(),
  player2: Player(),
};

beforeAll(() => {
  DUMMY_PLAYERS.player1.setPiece(Ship(1), ['A', 1], 'vert');
  DUMMY_PLAYERS.player1.setPiece(Ship(2), ['C', 9], 'horz');
  DUMMY_PLAYERS.player1.setPiece(Ship(3), ['E', 4], 'vert');
  DUMMY_PLAYERS.player1.setPiece(Ship(4), ['F', 6], 'horz');
  DUMMY_PLAYERS.player1.setPiece(Ship(5), ['D', 5], 'vert');
  DUMMY_PLAYERS.player2.setPiece(Ship(1), ['D', 1], 'vert');
  DUMMY_PLAYERS.player2.setPiece(Ship(2), ['C', 9], 'horz');
  DUMMY_PLAYERS.player2.setPiece(Ship(3), ['A', 4], 'vert');
  DUMMY_PLAYERS.player2.setPiece(Ship(4), ['B', 6], 'horz');
  DUMMY_PLAYERS.player2.setPiece(Ship(5), ['E', 5], 'vert');
});

describe('Board component', () => {
  describe('renders each player board correctly', () => {
    it('should render a 10x10 board for "player1"', () => {
      render(
        <Board
          boardData={{
            ships: DUMMY_PLAYERS.player1.ships,
            missed: [],
          }}
          onTogglePiece={() => {}}
        />
      );
      const boardEl = screen.getByTestId('board') as HTMLTableElement;
      expect(boardEl.rows.length).toBe(10);
    });
    it('should render a 10x10 board for "player2"', async () => {
      render(
        <Board
          boardData={{
            ships: DUMMY_PLAYERS.player2.ships,
            missed: [],
          }}
          onTogglePiece={() => {}}
        />
      );
      const boardEl = screen.getByTestId('board') as HTMLTableElement;
      await userEvent.click(boardEl);
      expect(boardEl.rows.length).toBe(10);
    });
  });
  describe('when either player toggles a checkbox there should an appropriate feedback', () => {
    it('should render a disabled checkbox when toggled for the first time', async () => {
      render(
        <Board
          boardData={{
            ships: DUMMY_PLAYERS.player2.ships,
            missed: [],
          }}
          onTogglePiece={() => {}}
        />
      );
      const [checkboxEl] = screen.getAllByLabelText(
        'board piece'
      ) as Checkbox[];
      await userEvent.click(checkboxEl);
      expect(checkboxEl.disabled).toBe(true);
    });
  });
});
