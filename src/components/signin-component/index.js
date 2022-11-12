import React from 'react';
import { signAuthUserInWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase';
import FormInput from '../form-input-component';
import Button from '../button-component'
import './index.scss';


const defaultFormFields = {
  email: '',
  password: ''
};

const Index = () => {
  const [formFields, setFormFields] = React.useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await signAuthUserInWithEmailAndPassword(email, password);
      resetFormFields();
    }
    catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert('incorrect password for email');
          break;
        case "auth/user-not-found":
          alert('auth user not found');
          break;
        default:
          console.log(error);
      }
    }
  }
  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>
        Sign in with your email and password
      </span>
      <form onSubmit={handleSubmit}>


        <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email} />

        <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password} />

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
        </div>

      </form>
    </div>
  )
}

export default Index;