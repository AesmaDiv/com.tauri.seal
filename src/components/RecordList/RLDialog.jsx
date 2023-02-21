import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


/** Диалог удаления записи */
export default function RLDialog({is_open, rec_id, onClose}) {
  return (
    <div>
      <Dialog
        open={is_open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Внимание</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Вы уверены, что хотите удалить запись № ${rec_id} ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)} autoFocus>Отмена</Button>
          <Button onClick={() => onClose(true)} >Удалить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}