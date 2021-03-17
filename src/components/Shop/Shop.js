import React from 'react';
import fakeData from '../fakeData'
import {useState,useEffect} from 'react'
import './Shop.css'
import Product from '../Product/Product';
import Card from '../Card/Card';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
const Shop = () => {
    const first10 = fakeData.slice(0,10)
    const [products, setProducts] = useState(first10);
    const [cart,setCart] = useState([])
    
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = saveCart[existingKey];
            return product;
        })
        setCart(previousCart);
    },[])

    const handleAddProduct = (product) =>{
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd =>pd.key  === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd =>pd.key !== toBeAdded);
            newCart = [...others,sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        
        addToDatabaseCart(product.key, count)
    }
    //   console.log(first10)
    return (
        <div className='twin-container'>
            <div className='product-container'>
            {
                products.map(pd => <Product
                key = {pd.key}
                    handleAddProduct={handleAddProduct}
                     showAddToCart={true} product={pd}>

                     </Product>)
            }
            </div>
            <div className='cart-container'>
                    <Card cart={cart}>
                        <Link to="/review">
                            <button className="main-btn">Review Order</button>
                        </Link>
                    </Card>
            </div>
            
        </div>
    );
};

export default Shop;