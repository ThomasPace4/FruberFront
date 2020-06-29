import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Marketplace from './pages/Marketplace';
import RegisterProduct from './pages/RegisterProduct';
import Panel from './pages/Panel';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/marketplace" exact component={Marketplace} />
      <Route path="/register-product" exact component={RegisterProduct} />
      <Route path="/panel" exact component={Panel} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/order-detail/:id" exact component={OrderDetail} />
    </Switch>
  );
}

//       <Route path="/repositories/:language/:q" component={Repositories} />
