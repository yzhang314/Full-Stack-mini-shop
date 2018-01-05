import React, { Component } from 'react';
import logo from './shop-logo.png';
import './App.css';
import HttpService from '../services/http-service.js'
import Product from '../product/product.js';
import WishList from '../wishlist/wishlist.js';


const http = new HttpService();

class App extends Component {
    
    
    constructor(props){
        super(props);
        //state is a object that hold different properties
        this.state = {products:[]};
        //bind functions
        this.loadData = this.loadData.bind(this);
        this.productList = this.productList.bind(this);
        this.loadData();
          
    };
    
    loadData = () => {
        var self = this;
        http.getProducts().then(data => {
            self.setState({products:data});
            //UI will refresh
        }, err => {
            
        });
    };
    
    productList = () => {
        const list = this.state.products.map((product) => 
            <div className="col-sm-4" key={product._id}>
                <Product product = {product}/>
            </div>
        );
        
        return (list);
                                             
        
 };
    
  render() {
    return (
      <div className="container App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Mini Shop</h1>
        </header>
       <div className=" container-fluid App-main">
           <div className="row">
               <div className="col-sm-8">
                   <div className="row">
                         {this.productList()}
                   </div>
               </div>
               <div className="col-sm-4">
                   <WishList />
               </div>

           </div>
        </div>
      </div>
    );
  }
}

export default App;
