import React from 'react'
import "./PaymentItem.css"
export default function PaymentMethodItem(props) {
    return (
        <>
            <div className="image">
                <img src={props.logo} />
            </div>
        </>
    );
}
