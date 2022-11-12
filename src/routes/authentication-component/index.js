import React from 'react';
import './index.scss';
import { 
  //getRedirectResult 
} from 'firebase/auth'
import { 
  signInWithGooglePopup, 
  //signInWithGoogleRedirect, 
  createUserMethodFromAuth, 
  //auth, 
  //createUserDocumentFromAuth 
} from '../../utils/firebase';
import SignUpForm from '../../components/signup-component'
import SignInForm from '../../components/signin-component'

const Index = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserMethodFromAuth(user)
  }
  // React.useEffect(async () => {
  //   const response = await getRedirectResult(auth);
  //   console.log(response);
  //   if(response){
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  // }, [])

  return (
    <div>
      {/* <button onClick={signInWithGoogleRedirect}>Sign In redirect</button> */}
      <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
      </div>
    </div>
  )
}

export default Index;