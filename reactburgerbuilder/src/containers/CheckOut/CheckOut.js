import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';

class CheckOut extends Component {
   
   
    checkOutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkOutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            summary = (
                <div>
                    <CheckOutSummary 
                        ingredients={this.props.ings}
                        checkOutCancelled={this.checkOutCancelledHandler}
                        checkOutContinued={this.checkOutContinuedHandler}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(CheckOut);