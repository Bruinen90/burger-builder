import React, {Component} from 'react';
import axios from '../../../axios-orders';

import {connect} from 'react-redux';

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
                validation: {
                    required: true,
                },
                valid: false,
                changed: false,
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your phone number',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                changed: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zip-code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength:6,
                },
                valid: false,
                changed: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street address',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                changed: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email address',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                changed: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
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
            ingredients: this.props.ings,
            doneness: this.props.done,
            price: +this.props.totalPrc,
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

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
                isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.changed = true;
        updatedOrderForm[inputId] = updatedFormElement;

        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            if(updatedOrderForm[inputId].valid === false) {
                formIsValid = false;
            }
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
                        value={field.config.value}
                        changed={(event) => this.inputChangedHandler(event, field.id)}
                        invalid={!field.config.valid}
                        shouldValidate={field.config.validation}
                        ifChanged={field.config.changed}
                    />
                ))}

                <Button type="Green" disabled={!this.state.formIsValid}>Order now</Button>
            </form>
            )
)}};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrc: state.totalPrice,
        done: state.doneness,
    }
}

export default connect(mapStateToProps)(Contact);
