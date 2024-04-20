/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';


const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();
    const githubprovider = new GithubAuthProvider()

    const handleGoogleSignin = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInuser = result.user;
                console.log(loggedInuser);
                setUser(loggedInuser);
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }

    const handleGithubSignin = () =>{
        signInWithPopup(auth , githubprovider)
        .then(result =>{
            const loggedInuser = result.user;
            console.log(loggedInuser);
            setUser(loggedInuser)

        })
        .catch(error =>{
            console.log(error)
        })
    }
    const handleGoogleSignout = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null)
            })
            .catch(error => {
                console.log(error)
            })
    }



    return (
        <div>
            {user ?
                <button onClick={handleGoogleSignout}>Signout</button> :
                <>
                    <button onClick={handleGoogleSignin}>Google Login</button>
                    <button onClick={handleGithubSignin}>Github Login </button>


                </>


            }


            {user && <div>
                <h3>User : {user.displayName}</h3>
                <p>Email : {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;