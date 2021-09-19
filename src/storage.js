import React from 'react';

/*-- function to decrypt key --*/
import CryptoJS from 'crypto-js'
const KEY = 'MDEyMzQ1Njc4OTAxMjM0NQ==';
function decrypt(text) {
    
    // Separate IV and ciphertext
    let iv = text.substring(0, 32);
    let ciphertext = text.substring(32);

    let bytes  = CryptoJS.AES.decrypt(
        {ciphertext: CryptoJS.enc.Hex.parse(ciphertext)}, 
        CryptoJS.enc.Base64.parse(KEY), 
        {iv: CryptoJS.enc.Hex.parse(iv)});  // pass IV
 
    let obj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return obj; // or Hex as in the posted code 
}

export const getLocalStorage = (name) => {

    const value = localStorage.getItem(name)

    const data = value ? decrypt(value) : null

    return data
}







/*  let _ = {};
const sessionInfo = localStorage.getItem("sessionInfo");

if (sessionInfo) {
    _ = JSON.parse(decodeURIComponent(atob(sessionInfo)));
}

export const setSessionInfo = ({ name, val }) => {
     _[name] = val;
     localStorage.setItem("sessionInfo", btoa(encodeURIComponent(JSON.stringify(_))));

}

export const getSessionInfo = (name) => {
  return (_[name]);
}

export const clearSessionInfo = () => {
    localStorage.clear();
    for (const prop of Object.keys(_)) {
        delete _[prop];
    }

}

export const removeSessionInfo = (name) => {
    delete _[name];
    sessionStorage.setItem("sessionInfo", btoa(encodeURIComponent(JSON.stringify(_))));
} */
