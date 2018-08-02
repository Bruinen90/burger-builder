import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: false,
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const ordersDownloaded = [];
                for(let key in res.data) {
                    ordersDownloaded.push({
                        ...res.data[key],
                        id: key
                    });
                    this.setState({orders: ordersDownloaded, loading: false})
                    console.log(this.state.orders)
                }

            }
            )
            .catch(err => err)

    }
  render() {
    return (
      <div>
            {this.state.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    doneness={order.doneness}
                    price={order.price.toFixed(2)}
                    customerData={order.customerData}
                />
             ))}
      </div>
    );
  }
}
export default withErrorHandler(Orders, axios);
