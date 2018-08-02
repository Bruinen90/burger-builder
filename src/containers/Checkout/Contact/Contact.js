import React, {Component} from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './Contact.css';

class Contact extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: '',
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your phone number',
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zip-code',
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street address',
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email address',
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                ]
                },
                value: '',
            },
        },
        loading: false,
    }
    submitOrderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true });
        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value
        }
        const order = {
            ingredients: this.props.ingredients,
            doneness: this.props.doneness,
            price: +this.props.price,
            customerData: formData,
            }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({displayPrompt: false, loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({displayPrompt: false, loading: false})
            })
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        }
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputId] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({id: key, config: this.state.orderForm[key]})
        }
        return(
            (this.state.loading ? <Spinner /> :
            <form className={classes.ContactContainer} onSubmit={this.submitOrderHandler}>
                <h2>Delivery address:</h2>
                {formElementsArray.map(field => (
                    <Input
                        key={field.id}
                        elementType={field.config.elementType}
                        elementConfig={field.config.elementConfig}
                        value={field.value}
                        changed={(event) => this.inputChangedHandler(event, field.id)}
                    />
                ))}

                <Button>Order now</Button>
            </form>
            )
)}}
export default Contact;
