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

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            //['salad', '1']
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
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