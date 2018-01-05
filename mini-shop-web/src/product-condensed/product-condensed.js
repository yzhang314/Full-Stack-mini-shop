import React, {Component} from 'react'
import './product-condensed.css';
import DataService from '../services/data-service.js'

let ds = new DataService();

class ProductCondensed extends Component{
    constructor(props) {
        super(props);
        
        this.removeProduct = this.removeProduct.bind(this);
    };
    
    removeProduct = () => {
        ds.removeWishListItem(this.props.product);
    }
    
    render(){
        return (
            <li className="list-group-item pc-condensed">
                    <a className="btn btn-secondary btn-sm" onClick={()=> this.removeProduct()}> x </a>
                {this.props.product.title} | <br></br><b>${this.props.product.price} </b>
            </li>
        );
       
    }
}

export default ProductCondensed;