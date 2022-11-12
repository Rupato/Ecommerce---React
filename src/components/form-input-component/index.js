import React from 'react'
import './index.scss'

const Index = ({label, ...otherprops}) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherprops} />
     {
      label && (
         <label className={`${otherprops.value.length > 0 ? 'shrink' : ''} form-input-label`}>{label}</label>
      )
     }
      
    </div>
  )
}

export default Index