import firebase from 'firebase';
import { EMAIL_CHANGED,PASSWORD_CHANGED,LOGIN_USER_SUCCESS,LOGIN_USER_FAIL,ATTEMPTING_LOGIN } from './types'

export const  emailChanged = (text)=>{
       return {type:EMAIL_CHANGED,playload:text}
};

export const passwordChanged = (text)=>{
        return {
              type: PASSWORD_CHANGED,
              payload: text
          };
};

export const loginUser = (email,password)=>{
  return (dispatch)=>{
        dispatch({ type: ATTEMPTING_LOGIN });

        firebase.auth().signInWithEmailAndPassword(email, password)
                 .then(user => {
                     loginUserSuccess(dispatch, user);
                 })
                 .catch(() => loginUserFail(dispatch));
         };
  };

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};

