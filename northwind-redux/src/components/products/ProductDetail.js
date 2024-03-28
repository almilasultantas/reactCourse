import React from "react";
import TextInput from "../toolbox/TextInput";

const ProductDetail = (categories, product, onSave, onChange) => {
  return (
    <form onSubmit={onSave}>
      <h2>{product.id ? "Güncelle" : "Ekle"}</h2>
      <TextInput
        name="productName"
        label="ProductName"
        value={product.productName}
        onChange={onChange}
        error="Hata"
      />
      <button type="submit" className="btn btn-succes">
        Save
      </button>
    </form>
  );
};
export default ProductDetail;
