import React, {useState,useEffect} from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Card from '../Card/Card';
import fakeData from '../fakeData';
import ReviewItem from '../ReviewItem/ItemNotFound/ReviewItem'
import happayImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);

    const history = useHistory()
    const handleProceedCheckout = () =>{
        history.push('/shipment')
    }

    const removeProduct = (productKeys) =>{
        const newCart = cart.filter(pd => pd.key !== productKeys);
        setCart(newCart);
        removeFromDatabaseCart(productKeys);
    }
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        },[]);
        setCart(cartProducts)
    },[])

    let thankYou; 
    if(orderPlaced){
        thankYou = <img style={{width:'500px',marginTop:'40px'}} src={happayImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem 
                        removeProduct= {removeProduct}
                        product = {pd} key={pd.key}>
                        </ReviewItem>)
                }
                { thankYou }
            </div>
            <div className="cart-container">
                <Card cart={cart}>
                    <button className="main-btn" onClick = {handleProceedCheckout}>Proceed Checkout</button>
                </Card>
            </div>
        </div>
    );
};

export default Review;