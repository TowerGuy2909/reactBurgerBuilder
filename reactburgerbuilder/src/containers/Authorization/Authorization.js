import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../components/UserInterface/Input/Input';
import Button from '../../components/UserInterface/Button/Button';
import classes from './Authorization.css';
import * as actions from '../../store/actions/index';


class Authorization extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                   
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true 
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required){
            isValid = value !== '' && isValid;
        }
        if (rules.minlLength) {
            isValid = value.length >= rules.minlLength && isValid
        }
        if (rules.maxlLength) {
            isValid = value.length <= rules.maxlLength && isValid
        }
      

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.values, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthorization(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthorizationModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map( formElement => (
            <Input 
                key= {formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} 
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} /> 

        ) );
 
        return(
            <div className={classes.Authorization}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthorizationModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ?  'SIGNIN': 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthorization: (email, password, isSignup) => dispatch(actions.authorization(email, password, isSignup))
    }
}

export default connect(null, mapDispatchToProps)(Authorization);