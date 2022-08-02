import React from 'react';
import {
  Backdrop,
  Modal as ModalWindow,
  Fade,
  Box,
  Typography,
} from '@mui/material';

type Props = {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  title: string;
  description?: string;
};

export default function Modal({ children, open, title, description }: Props) {
  return (
    <div>
      <ModalWindow
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '90%',
              maxWidth: '30rem',
              p: 4,
              textAlign: 'center',
              bgcolor: 'background.paper',
              border: '1px solid #000',
              borderRadius: 4,
              boxShadow: 24,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              {title}
            </Typography>
            {children}
            {description && (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {description}
              </Typography>
            )}
          </Box>
        </Fade>
      </ModalWindow>
    </div>
  );
}

Modal.defaultProps = {
  description: '',
};
