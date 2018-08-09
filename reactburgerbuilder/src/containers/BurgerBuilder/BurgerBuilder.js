import React, { Component } from 'react';
import {connect} from 'react-redux';

import Auxillary from '../../higherOrderComponents/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UserInterface/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import withErrorHandler from '../../higherOrderComponents/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';




class BurgerBuilder extends Component{
   state = {
     
       purchasing: false,
       loading: false,
       error: false
    }

    componentDidMount(){
        console.log(this.props);
        // axios.get('https://testproject-73caf.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }

    updatePurchaseState (ingredients) {
       
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p> Ingredients cant be loaded! </p> : <Spinner />;

        if ( this.props.ings){
            burger = (
                <Auxillary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemove}
                        disabled = {disabledInfo}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler} 
                        price = {this.props.price}/>
                </Auxillary> 
            );
            orderSummary =  <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price.toFixed(2)}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} />;
        }
        if (this.state.loading){
            orderSummary = <Spinner />;
        }

        return(
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal> 
                {burger}
            </Auxillary>
        );
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStatetoProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
