import BaseOfPages from "../../components/BaseOfPages";
import ProductsList from "../../components/products/ProductsList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productToUpdate, setProductToUpdate] = useState([]);
  const [productToDelete, setProductToDelete] = useState([]);


  // Suppression de produit
  const deleteProduct = (selected) => {
      // Récupérer les informations du/des produit(s) à supprimer
      setProductToDelete(products.filter((product) => selected.includes(product.product_id)))  }

    // Modification du produit
    const editProduct = (selected) => {
      // Récupérer les informations du produit à modifier
      setProductToUpdate(products.filter((product) => selected.includes(product.product_id)))
    }

  // Récupération des produits depuis le backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product/offers`);
        setProducts(response.data.products);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des produits :",
          error
        );
      }
    };
    fetchCategories();
  }, []);
  return (
    <BaseOfPages>
      <ProductsList data = {products} handleDelete = {deleteProduct} handleEdit = {editProduct}/>
    </BaseOfPages>
  );
};

export default Products;
