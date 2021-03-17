import React from 'react';

const ReviewItem = (props) => {
    // console.log(props)
    const {name,quantity,key,price} = props.product;
    const reviewStyle = {
        borderBottom:'1px solid lightgray',
        padding:'5px',
        marginLeft:'150px'
    }

    return (
        <div style={reviewStyle}>
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <br/>
            <button className="main-btn"
                onClick={() => props.removeProduct(key)}>
                Remove</button>
        </div>
    );
};

export default ReviewItem;