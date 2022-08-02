import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from 'react-hook-form-mui';

import { COORD_REGEX } from '../../constants';

type Props<TFormValues> = {
  onSubmit: (data?: TFormValues) => void;
};

const defaultValues = {
  'carrier-coord': '',
  'carrier-dir': 1,
  'battleship-coord': '',
  'battleship-dir': 1,
  'cruiser-coord': '',
  'cruiser-dir': 1,
  'submarine-coord': '',
  'submarine-dir': 1,
  'destroyer-coord': '',
  'destroyer-dir': 1,
};

const dirOptions = [
  {
    id: 'horz',
    label: 'Horz',
  },
  {
    id: 'vert',
    label: 'Vert',
  },
];

const validation = {
  required: true,
  pattern: {
    value: COORD_REGEX,
    message: 'Coords must be in format [ltr]:[num]',
  },
};

export default function GameForm<TFormValues extends object>({
  onSubmit,
}: Props<TFormValues>) {
  const formContext = useForm({ defaultValues });
  const [enteredP1Vals, setEnteredP1Vals] =
    useState<typeof defaultValues>(defaultValues);
  const [enteredP2Vals, setEnteredP2Vals] =
    useState<typeof defaultValues>(defaultValues);
  const [currentView, setCurrentView] = useState('player1');

  const submitP1ValsHandler = (data: typeof defaultValues) => {
    setEnteredP1Vals(data);
    setCurrentView('player2');
    formContext.reset();
  };

  const submitP2ValsHandler = (data: typeof defaultValues) => {
    setEnteredP2Vals(data);
    setCurrentView('submit');
  };

  const onClickHandler = () => {
    const data = {
      player1: enteredP1Vals,
      player2: enteredP2Vals,
    } as TFormValues;
    // Handle data
    onSubmit(data);
  };

  return (
    <Box
      sx={{
        margin: '7px auto 0',
      }}
    >
      {currentView !== 'submit' ? (
        <>
          <Typography variant="h6" paragraph>
            {currentView === 'player1' ? 'Player 1' : 'Player2'}
          </Typography>
          <Button sx={{ my: 1 }} variant="contained" onClick={() => onSubmit()}>
            Auto-generate
          </Button>
          <FormContainer
            formContext={formContext}
            onSuccess={
              currentView === 'player1'
                ? submitP1ValsHandler
                : submitP2ValsHandler
            }
          >
            <Box
              sx={{
                '& > div': {
                  my: 0.5,
                  '& *': {
                    mx: '1px',
                  },
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextFieldElement
                  name="carrier-coord"
                  label="Carrier"
                  placeholder="[ltr]:[num]"
                  validation={validation}
                  required
                />
                <SelectElement
                  name="carrier-dir"
                  label="Direction"
                  options={dirOptions}
                  required
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextFieldElement
                  name="battleship-coord"
                  label="Battleship"
                  placeholder="[ltr]:[num]"
                  validation={validation}
                  required
                />
                <SelectElement
                  name="battleship-dir"
                  label="Direction"
                  options={dirOptions}
                  required
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextFieldElement
                  name="cruiser-coord"
                  label="Cruiser"
                  placeholder="[ltr]:[num]"
                  validation={validation}
                  required
                />
                <SelectElement
                  name="cruiser-dir"
                  label="Direction"
                  options={dirOptions}
                  required
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextFieldElement
                  name="submarine-coord"
                  label="Submarine"
                  placeholder="[ltr]:[num]"
                  validation={validation}
                  required
                />
                <SelectElement
                  name="submarine-dir"
                  label="Direction"
                  options={dirOptions}
                  required
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextFieldElement
                  name="destroyer-coord"
                  label="Destroyer"
                  placeholder="[ltr]:[num]"
                  validation={validation}
                  required
                />
                <SelectElement
                  name="destroyer-dir"
                  label="Direction"
                  options={dirOptions}
                  required
                />
              </Box>
            </Box>
            <Button sx={{ mt: 3 }} type="submit" variant="contained">
              Set Ships
            </Button>
          </FormContainer>
        </>
      ) : (
        <Button
          sx={{ my: 1 }}
          type="button"
          variant="contained"
          onClick={onClickHandler}
        >
          Let&apos;s Play!
        </Button>
      )}
    </Box>
  );
}
