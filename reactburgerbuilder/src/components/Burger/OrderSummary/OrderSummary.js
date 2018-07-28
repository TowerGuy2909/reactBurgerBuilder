import React, { Component } from 'react';

import Auxillary from '../../../higherOrderComponents/Auxillary/Auxillary';
import Button from '../../UserInterface/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate() {
        console.log('[Order Summary] Will Update');
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
        });
        return(
            <Auxillary>
            <h3>Your Order</h3>
            <p>Delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Auxillary>
        );
    }
}

export default OrderSummary;