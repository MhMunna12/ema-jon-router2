import React from 'react';


const Card = (props) => {
    const cart = props.cart;
    // console.log(cart);
    //
    let total = (0);
    for(let i = 0;i<cart.length;i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const price = (total).toFixed(2)
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + parseFloat(tax)).toFixed(3);
    // const formatNumber = num => {
    //     const precision = num.toFixed(2);
    //     return Number(precision);
    // }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items: {cart.length} </p>
            <p>Product Price: {price}</p>
            <p><small>Shipping cost: {shipping}</small></p>
            <p>Tax + VAT: {tax}</p>
            <p>Total Price: {grandTotal}</p>
            {
                props.children
            }
        </div>
    );
};

export default Card;