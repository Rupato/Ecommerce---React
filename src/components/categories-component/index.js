import React from 'react';
import './index.scss'

const Index = ({ category }) => {
  return (
  category.map(({ id, imageUrl, title }) => {
    return(
      <div className="category-container" key={id}>
        <div className='background-image' style={{
          backgroundImage: `url(${imageUrl})`,
        }}></div>
        <div className="category-body-container">
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
      </div>
    )
  })
)}

export default Index;