import React, { useState, createContext } from "react"

const UserContext = createContext({token:'', setToken: () => {} })

const UserProvider = props => {
  const [token, setToken] = useState('')
  const value = { token, setToken }

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }