import './App.css';
import Categories from './components/Categories';
import CategoryDetail from './components/CategoryDetail';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubCategoryForm from './components/SubCategoryForm';
import SubCategoryDetail from './components/SubCategoryDetail';
import AddProduct from './components/AddProduct';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Router>
          <Routes>
           
            <Route path="/" element={<Categories />} />
            <Route path="/category/:categoryId" element={<CategoryDetail />} />
            <Route
              path="/category/:categoryId/create-SubCategory"
              element={<SubCategoryForm />}
            />
            <Route
              path="/category/:categoryId/:subcategoryId"
              element={<SubCategoryDetail />}
            />
            <Route
              path="/category/:categoryId/:subcategoryId/add-product"
              element={<AddProduct />}
            />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
