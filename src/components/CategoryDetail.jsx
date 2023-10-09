import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Card } from "react-bootstrap";
import BASEURL from "../services/BaseUrl";

function CategoryDetail() {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)

  const { categoryId } = useParams();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${BASEURL}/api/categories/subcategory/create-subcategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: subCategory, parentCategory: categoryId }),
      });
  
      if (response.status === 201) {
        // Parse the response data to get the newly created subcategory
        const createdSubcategory = await response.json();
  
        // Update the category state to include the newly created subcategory
        setCategory((prevCategory) => ({
          ...prevCategory,
          subcategories: [...prevCategory.subcategories, createdSubcategory],
        }));
  
        // Show a success message
        MySwal.fire({
          title: <strong>Sub Category created successfully</strong>,
          html: <i></i>,
          icon: 'success',
        });
  
        // Close the modal and reset the subcategory name
        handleCloseModal();
        setSubCategory("");
      } else {
        alert("SubCategory creation failed");
      }
    } catch (error) {
      console.error("Error creating Subcategory", error);
      alert("SubCategory creation failed");
    }
  };
  
  
  useEffect(() => {
    // Fetch the category details
    axios
      .get(`${BASEURL}/api/categories/${categoryId}`)
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
        setLoading(false);
      });

    // Fetch the products for the current category
    axios
      .get(`${BASEURL}/api/products/get-products-by-category/${categoryId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

 // ...
return (
  <div className="container">
    <div className="buttons_top w-100">
      <Button
        onClick={handleShowModal}
        className="btn btn-primary justify-content-end"
      >
        Add SubCategory
      </Button>
    </div>
    <br />
    <h1 className="">{category.name}</h1>
    <br />
    <h4>Subcategories({category.subcategories.length})</h4>
    <ul className="subcat_list">
  {category.subcategories
    .slice() 
    .sort((a, b) => a.name.localeCompare(b.name)) // Sort by subcategory name
    .map((subcategory) => (
      <li key={subcategory._id}>
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/category/${categoryId}/${subcategory._id}`);
          }}
        >
          <Card.Title> {subcategory.name} </Card.Title>
        </Card>
      </li>
    ))}
</ul>


    <Table striped>
      <thead>
        <tr>
          <th>Products</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>

    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create SubCategory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="subcategoryName">
            <Form.Label>SubCategory Name in {category.name}</Form.Label>
            <Form.Control
              type="text"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create SubCategory
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);
// ...

  
}

export default CategoryDetail;
