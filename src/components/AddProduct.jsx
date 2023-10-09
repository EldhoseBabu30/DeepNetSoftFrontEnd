import React, { useState } from "react";
import { Button } from "react-bootstrap";

import "./CategoryForm.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BASEURL from "../services/BaseUrl";
const AddProduct = () => {
  const [productName, setProductName] = useState("");
    // const [categoryId, setCategoryId] = useState("");
    // const [subcategoryId, setSubcategoryId] = useState("");
    const { categoryId, subcategoryId } = useParams();
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    // console.log(categoryId);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASEURL}/api/products/addproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          category:categoryId,
          subcategory: subcategoryId,
        }),
      });

      if (response.status === 201) {
        MySwal.fire({
          title: <strong>Product added successfully</strong>,
          html: <i></i>,
          icon: 'success',
        });
        setProductName("");
        navigate(`/category/${categoryId}/${subcategoryId}`);
      } else {
        alert("Product creation failed");
        navigate(`/category/${categoryId}/${subcategoryId}`);
      }
    } catch (error) {
      console.error("Error creating product", error);
      alert("product creation failed");
    }
  };

  return (
    <div className="container mt-3 category-form-container ">
      <h2>Create a Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Button type="submit">Add Product</Button>
        &nbsp;{" "}
        <Button className="btn-primary"
          onClick={() => navigate(`/category/${categoryId}/${subcategoryId}`)}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
