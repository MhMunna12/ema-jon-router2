import React from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props)
    const {img, name,seller,price,stock,key} = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div className='content-align'>
                <h4 className='product-name'><Link to={"/product/"+key}>{name}</Link></h4>
               
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p>Stock: {stock} left in stock - Order soon</p>
                {props.showAddToCart && <button className='main-btn' onClick={() =>
                    props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                </button>}
            </div>
            
        </div>
    );
};

export default Product;