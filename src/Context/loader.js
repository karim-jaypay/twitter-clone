import { createContext, useState } from "react";

export const tweetContext = createContext()

export const TweetLoader = ({ children }) => {
  
    const [loader, setLoader] = useState(false)
  
    const changeLoader = (value) => setLoader(value);
  
    return (
      <tweetContext.Provider value={{ loader, changeLoader }}>
        {children}
      </tweetContext.Provider>
    )
  }