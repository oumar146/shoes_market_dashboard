import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import SelectTextField from "../form/SelectTextField";
import TextFields from "../form/TextFields";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload({handleFileChange}) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      style={{ margin: "1vh", width: "100%" }}
    >
      Remplacer l'image
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
}

const EditProductForm = (props) => {
  // const product = data[0];
  const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/category/get`);
        // Mettre à jour les catégories
        setCategories(response.data.categories);
      } catch (error) {
        props.setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchCategories();
  });

  const handleFileChange = (e) => {
    props.setImage(e.target.files[0]);
  };

  return (
    <div>
      {categories ? (
        <div>
          <TextFields defaultValue={props.data.product_name} setData={props.setName} label="Nom" />
          <TextFields
            defaultValue={props.data.description}
            setData={props.setDescription}
            label="Description"
          />
          <TextFields type="number" defaultValue={props.data.price} setData={props.setPrice} label="Prix" />
            <SelectTextField
              defaultValue={props.data.category}
              datas={categories}
              setData={props.setCategoryName}
              label="Catégories"
            />
            <SelectTextField
              defaultValue={props.data.size}
              datas={sizes}
              setData={props.setSize}
              label="Tailles"
            />
          <InputFileUpload handleFileChange={handleFileChange} />
          
        </div>
      ) : (
        <h5>Impossible de modifier</h5>
      )}
    </div>
  );
};

export default EditProductForm;
