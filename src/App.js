import React from 'react';
import Home from '../src/routes/home-component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation-component';
import Authentication from './routes/authentication-component';
import Shop from './routes/shop';
import Checkout from './routes/checkout-component'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>

  )
}

export default App