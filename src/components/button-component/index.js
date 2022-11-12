import React from 'react';
import './index.scss'

const BUTTON_TYPE_CLASSES = {
  google : 'google-sign-in',
  inverted : 'inverted'
}

const Index = ({children, buttonType, ...otherProps}) => {
  return (
   <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
   >
     
    {children}
   </button>
  )
}

export default Index