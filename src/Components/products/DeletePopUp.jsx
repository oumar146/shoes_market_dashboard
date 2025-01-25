import { forwardRef, useState, Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import TextFields from "../form/TextFields";

import axios from "axios";
import config from "../../config";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeletePopUp({ data, icon = null, ContentComponent = null }) {
  const [open, setOpen] = useState(false);

  const deleteProduct = async (productId) => {
    try {
      console.log("supprimer : ", productId)
      await axios.delete(`${config.apiUrl}/product/delete`, {
        data: { product_id: productId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  const handleSubmit = async (data) => {
    try {

      data.map((data)=>{
        deleteProduct(data.product_id)
      })
      refreshPage();  

    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        style={{ backgroundColor: "transparent" }}
        onMouseDown={(e) => {
          e.target.style.background = "transparent";
        }}
        onMouseUp={(e) => {
          e.target.style.background = "transparent";
        }}
        variant="text"
        size="small"
        onClick={handleClickOpen}
      >
        {icon}
      </Button>
      <Dialog
        fullWidth="md"
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        disableEscapeKeyDown // Empêche la fermeture avec la touche Échap
        onClose={(event, reason) => {
          // Empêche la fermeture en cliquant à l'extérieur
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {data.length > 1 ? "Supprimer des produits" : "Supprimer un produit"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {data.map((data, index) => (
            <TextFields
              key={index}
              disabled={true}
              defaultValue={data.product_name}
              label={`Produit N°${index + 1}`}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="contained" onClick={()=>{handleSubmit(data)}}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default DeletePopUp;
