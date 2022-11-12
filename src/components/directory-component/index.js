import React from 'react';
import Categories from '../categories-component'

const Index = ({ categoriesMap }) => {
  return (
   <div>
      <div className="categories-container">
        <Categories category={categoriesMap} />
      </div>
   </div>
  )
}

export default Index