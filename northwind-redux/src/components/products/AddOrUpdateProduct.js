import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import { validate } from "@babel/types";

function AddOrUpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();

  const products = useSelector((state) => state.productListReducer);
  const categories = useSelector((state) => state.categoryListReducer);

  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!categories?.length) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (productId && products.length) {
      const selectedProduct = getProductById(products, productId);
      setProduct(selectedProduct);
    }
  }, [productId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    setErrors((previousErrors) => ({
      ...previousErrors,
      productName:
        name === "productName" && !value ? "Ürün ismi olmalıdır" : "",
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    dispatch(saveProduct(product)).then(() => {
      navigate("/");
    });
  }
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  return products.find((product) => product.id === productId) || null;
}

export default AddOrUpdateProduct;
