import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocument } from "../utils/firebase/index.js";

export const CatagoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    //send write new data to the firestore
    //addCollectionAndDocuments('categories', SHOP_DATA);
    const getCategories = async () => {
      const categoriesMap = await getCategoriesAndDocument();
      console.log(categoriesMap, 'CategoriesProvider')
      setCategoriesMap(categoriesMap)
    }
    getCategories();
  },[]);

  const value = { categoriesMap }
  return(
    <CatagoriesContext.Provider value={value}>
      {children}
    </CatagoriesContext.Provider>
  )
}