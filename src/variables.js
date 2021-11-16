import { getLocalStorage } from "./storage"

export const user = getLocalStorage('ui')

export const picture = process.env.REACT_APP_API + user.picture