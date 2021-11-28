import { getLocalStorage } from "./storage"

export const userInfo = getLocalStorage('ui')

export const picture = process.env.REACT_APP_API + userInfo.picture