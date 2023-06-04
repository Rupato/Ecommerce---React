import { initializeApp } from 'firebase/app';
import { onAuthStateChanged, signOut, getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, DocumentSnapshot } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBQgTBrT3vCp2ShVrFptpBAXEw_nOtvurY",
  authDomain: "ecommerce-db-6c616.firebaseapp.com",
  projectId: "ecommerce-db-6c616",
  storageBucket: "ecommerce-db-6c616.appspot.com",
  messagingSenderId: "211940482095",
  appId: "1:211940482095:web:957c061be921a8c69dfada"
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
}

export const getCategoriesAndDocument = async() => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef)

  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc; 
  }, {});

  return categoryMap;
}

export const createUserMethodFromAuth = async (userAuth, additionalInformation = {displayName : 'mike'}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    }
    catch (error) {
      console.log('error creating the user', error);
    }
  }
} 

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signAuthUserInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = async (callback) => await onAuthStateChanged(auth, callback)