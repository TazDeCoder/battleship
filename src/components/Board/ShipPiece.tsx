import React, { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';
import { Circle as CircleIcon, Clear as ClearIcon } from '@mui/icons-material';

type Props = {
  value: 'x' | 'o' | undefined;
  col: any;
  row: any;
  onTogglePiece: (coord: [string, number]) => void;
};

export default function ShipPiece({
  value: initialValue,
  row: { index },
  col: { Header },
  onTogglePiece,
}: Props) {
  const [value, setValue] = useState(initialValue);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isToggled = initialValue === 'o' || initialValue === 'x';
    setValue(initialValue);
    setDisabled(isToggled);
  }, [initialValue]);

  return (
    <Checkbox
      checked
      checkedIcon={value === 'x' ? <ClearIcon /> : <CircleIcon />}
      value={value}
      disabled={disabled}
      inputProps={{ 'aria-label': 'board piece' }}
      onChange={() => {
        onTogglePiece([Header, index]);
      }}
    />
  );
}
