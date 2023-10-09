import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Categories.css'
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BASEURL from "../services/BaseUrl";



function Categories() {


     const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState("");
    const [showModal, setShowModal] = useState(false);

    

    const navigate = useNavigate();

    useEffect(() => {
      axios
        .get(`${BASEURL}/api/categories/viewCategories`)
        .then((response) => {
          setCategories(response.data.categories);
          console.log(response.data.categories);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          setLoading(false);
        });
    }, []);

    
    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
    const MySwal = withReactContent(Swal)
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(`${BASEURL}/api/categories/create-category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }),
        });
  
        if (response.status === 201) {
          MySwal.fire({
            title: <strong>Category created successfully</strong>,
            html: <i></i>,
            icon: 'success',
        });
          
          setCategoryName("");
          handleCloseModal();
          navigate("/");
          axios
        .get(`${BASEURL}/api/categories/viewCategories`)
        .then((response) => {
          setCategories(response.data.categories);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

        } else {
          alert("Category creation failed");
        }
      } catch (error) {
        console.error("Error creating category", error);
        alert("Category creation failed");
      }
    };
   

    


  if (loading) {
    return <div>Loading...</div>;
  }
if (!categories) {
  return <div>Category not found</div>;
}

  return (
    <div className="container">
      <Button onClick={handleShowModal} className="btn btn-primary">
        Add Category
      </Button>
      
      <Table striped>
        <thead>
          <tr>
            
            <th>Categories({categories.length})</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <Link
                  to={`/category/${category._id}`}
                  className="btn btn-primary"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* add category modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name:</Form.Label>
              <Form.Control
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Category
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Categories;
