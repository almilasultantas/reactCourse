import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
class CategoryList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     counter: 1,
  //     categories: [
  //       { categoryId: 1, categoryName: "Beverages" },
  //       { categoryId: 2, categoryName: "Condiments" },
  //     ],
  //   };
  // }
  state = {
    counter: 1,
    categories: [
      // { categoryId: 1, categoryName: "Beverages" },
      // { categoryId: 2, categoryName: "Condiments" },
    ],
    // currentCategory: "",
  };
  // yukarıda yazmış olduğumuz kodu eskiden yazmamız gerekiyordu ama artık bu ortadan kalktı

  // changeCategory = (category) => {
  //   this.setState({
  //     currentCategory: category.categoryName,
  //   });
  // };
  componentDidMount() {
    this.getCategories();
  }
  // yukarıda ki kodu yazmazsak kategoriler gelmiyor çünkü reactta ilk önce kategoriler oluşturuluyor sonra renderlar çalıştırılıyor ama burada componentler tamamlandığında bu işlemi yapması için componentDidMount kullanıyoruz
  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };
  render() {
    return (
      <div>
        <h2>{this.props.info.title}</h2>
        <h3>{this.props.info.dnm}</h3>
        <h4>{this.state.counter}</h4>
        <ListGroup>
          {/* <ListGroupItem disabled href="#" tag="a">
            Cras justo odio
          </ListGroupItem>
          <ListGroupItem href="#" tag="a">
            Dapibus ac facilisis in
          </ListGroupItem>
          <ListGroupItem href="#" tag="a">
            Morbi leo risus
          </ListGroupItem>
          <ListGroupItem href="#" tag="a">
            Porta ac consectetur ac
          </ListGroupItem> */}
          {this.state.categories.map((category) => (
            <ListGroupItem
              active={
                category.categoryName === this.props.currentCategory
                  ? true
                  : false
              }
              onClick={() => this.props.changeCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <h4>{this.props.currentCategory}</h4> */}
      </div>
    );
  }
}

export default CategoryList;
