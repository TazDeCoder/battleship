import React, { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';
import { Circle as CircleIcon, Clear as ClearIcon } from '@mui/icons-material';

import { Coord } from '../../models/index';

type Props = {
  value: 'x' | 'o' | undefined;
  row: { index: number };
  col: { Header: string };
  onTogglePiece: (coord: Coord) => void;
};

export default function ShipPiece({
  value: initialValue,
  row: { index },
  col: { Header },
  onTogglePiece,
}: Props) {
  const [value, setValue] = useState(initialValue);
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isToggled = initialValue === 'x' || initialValue === 'o';
    setValue(initialValue);
    setChecked(isToggled);
    setDisabled(isToggled);
  }, [initialValue]);

  const changeHandler = () => {
    setChecked(true);
    setDisabled(true);
    onTogglePiece([Header, index]);
  };

  return (
    <Checkbox
      checked={checked}
      checkedIcon={value === 'x' ? <ClearIcon /> : <CircleIcon />}
      value={value}
      disabled={disabled}
      inputProps={{ 'aria-label': 'board piece' }}
      onChange={changeHandler}
    />
  );
}
