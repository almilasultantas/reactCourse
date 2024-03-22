// import CategoryList from "./CategoryList";
// import Navi from "./Navi";
// import ProductList from "./ProductList";
// import { Container, Row, Col } from "reactstrap";
// function App() {
//   let titleProduct = "Product List";
//   let categoryInfo = { title: "Category List", dnm: "dnm" };
//   // burada sadece title değil farklı değikenlerde tanımlayıp bu değişkenlerin bir kerede liste gibi verilmesini sağlıyoruz
//   return (
//     <div>
//       <Container>
//         <Row>
//           <Navi></Navi>
//         </Row>
//         <Row>
//           <Col xs="3">
//             {/* <CategoryList title="Category List" /> */}
//             {/* burada title yerine başka kelimeler kullanabiliriz ama böyle yaparsak kullanacağımız yerde de farklı isimde kullanmalıyız */}
//             <CategoryList info={categoryInfo} />
//           </Col>
//           <Col xs="9">
//             {/* <ProductList title="Product List" /> */}
//             <ProductList title={titleProduct} />
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default App;
// bu redux olmadan componentler arası veri aktarımı için kullandığımız component yapısına çeviriyoruz şimdi categoryList sayfasında yapmış olduğumuz changecategory fonksşyonunu buraya taşıyabşleceğiz ve bu sayede seçilen categoryi product list componentinede gönderebileceğiz
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import React, { Component } from "react";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound.js";
import CartList from "./CartList.js";
import FormDemo1 from "./FormDemo1.js";
import FormDemo2 from "./FormDemo2.js";
class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };
  changeCategory = (category) => {
    this.setState({
      currentCategory: category.categoryName,
    });
    this.getProducts(category.id);
  };
  componentDidMount() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      this.setState({ cart: JSON.parse(storedCart) });
    }
    this.getProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    // Cart verileri güncellendiğinde Local Storage'a kaydet
    if (prevState.cart !== this.state.cart) {
      localStorage.setItem("cart", JSON.stringify(this.state.cart));
    }
  }
  getProducts = (id) => {
    let url = "http://localhost:3000/products";
    if (id) {
      url += "?categoryId=" + id;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to cart.", 2);
  };
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + " removed from cart.", 2);
  };
  render() {
    let titleProduct = "Product List";
    let categoryInfo = { title: "Category List", dnm: "dnm" };
    return (
      // burada sadece title değil farklı değikenlerde tanımlayıp bu değişkenlerin bir kerede liste gibi verilmesini sağlıyoruz

      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />

          <Routes>
            <Route
              path="/"
              element={
                <Row>
                  <Col xs="3">
                    <CategoryList
                      currentCategory={this.state.currentCategory}
                      changeCategory={this.changeCategory}
                      info={categoryInfo}
                    />
                  </Col>
                  <Col xs="9">
                    <ProductList
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      title={titleProduct}
                    />
                  </Col>
                </Row>
              }
            />
            <Route
              path="/cart"
              element={
                <CartList
                  cart={this.state.cart}
                  removeFromCart={this.removeFromCart}
                />
              }
            />
            <Route path="/form1" element={<FormDemo1 />} />
            <Route path="/form2" element={<FormDemo2 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>
    );
  }
}

export default App;
