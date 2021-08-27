import React from 'react';

export default function CheckoutStops(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.steps1 ? 'active' : ''}>Sign in</div>
            <div className={props.steps2 ? 'active' : ''}>Shipping</div>
            <div className={props.steps3 ? 'active' : ''}>Payment</div>
            <div className={props.steps4 ? 'active' : ''}>Place order</div>
        </div>
    );
}