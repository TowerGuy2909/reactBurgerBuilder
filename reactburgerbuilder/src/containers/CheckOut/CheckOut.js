import React, { Component } from 'react';

import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';

class CheckOut extends Component {
    state ={
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    checkOutCancelled = () => {
        this.props.history.goBack();
    }

    checkOutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckOutSummary 
                ingredients={this.state.ingredients}
                checkOutCancelled={this.checkOutCancelled}
                checkOutContinued={this.checkOutContinued}/>
            </div>
        )
    }
}

export default CheckOut;