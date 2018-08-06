import React, {Component} from 'react';

import Button from '../../../components/UserInterface/Button/Button';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UserInterface/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
         this.setState( { loading: true } );
        const order  = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Jeridd',
                address: {
                    street: '123TestStreet',
                    zipCode: '54321',
                    contry: 'States'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
        });
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type='text' name='name' placeholder='Your Name' />
                <Input inputtype="input" type='email' name='email' placeholder='Your email' />
                <Input inputtype="input" type='text' name='street' placeholder='Street' />
                <Input inputtype="input" type='text' name='postal' placeholder='Postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;