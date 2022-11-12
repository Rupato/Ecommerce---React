import React from 'react';
import { createAuthUserWithEmailAndPassword, createUserMethodFromAuth } from '../../utils/firebase';
import FormInput from '../form-input-component';
import Button from '../button-component'
import './index.scss';


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Index = () => {
  const [formFields, setFormFields] = React.useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try{
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserMethodFromAuth(user, {displayName});
      resetFormFields();
    }
    catch(error) {
      if (error.code === 'auth/email-already-in-use'){
        alert('email-already-in-use')
      }else{
        console.log('user creation encounterd an error', error);
      }

    }
  }
  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>
        Sign up with your email and password
      </span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type='text' required onChange={handleChange} name='displayName' value={displayName}/>

        <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email} />

        <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password} />

        <FormInput label="Confirm Password" type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />

        <Button>Sign Up</Button>
      </form>
    </div>
  )
}

export default Index;