import { forwardRef, useState, Fragment, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import EditProductForm from "./EditProductForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditPopUp({ data, icon, title = null, ContentComponent = null }) {
  const [open, setOpen] = useState(false);

  const product = data[0];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  // const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  useEffect(() => {
    // Charger les données du produit dans le formulaire lorsque le produit change
    if (product) {
      setName(product.product_name || "");
      setDescription(product.description || "");
      setSize(product.size || "");
      setPrice(product.price || "");
      setCategoryName(product.category_name || "");
      setImage(product.image_url || "");
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !size || !price || !categoryName || !image) {
      return;
    }

    const formData = {
      name: name,
      description: description,
      size: size,
      price: price,
      category_name: categoryName,
      product_id: product.product_id,
    };
    console.log(formData)
    if (image) formData.image = image;

    try {
      // Mettre à jour les informations sur le produit
      await axios.put(`${config.apiUrl}/product/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setName("");
      setDescription("");
      setSize("");
      setPrice("");
      setCategoryName("");
      setImage(null);
      refreshPage();
    } catch (error) {

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
        <DialogTitle>{title}</DialogTitle>
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
          {product && (
            <EditProductForm
              data={product}
              setName={setName}
              setDescription={setDescription}
              setSize={setSize}
              setPrice={setPrice}
              setCategoryName={setCategoryName}
              setImage={setImage}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit}>
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default EditPopUp;
