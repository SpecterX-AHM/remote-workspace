import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../firebase-config";
import { useRouter } from "next/router";
import {  Button } from 'react-bootstrap'
import remoteWork from "../Assets/remote-work.svg"
import Image from 'next/image'
import styles from '../styles/login.module.css'

const login = () => {
  const firebaseAuth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const signIn = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;
    console.log(refreshToken, providerData);
    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));
    router.push("/home");
  };

  return(
      <main>
      <div style={{display:"flex", paddingLeft : "150px"}}>
      <div className="d-lg-flex  d-md-flex justify-content-center p-lg-5 m-lg-10">
        <div className="container col-12 col-lg-7 px-0 mt-5">
          <h1 className={styles['main-heading']}> Remote Workspace </h1>
          <h5 className={styles['main-text']}> A one-stop solution for collaborative remote teams! </h5>
              <Button className="p-2 mt-5" onClick={signIn} style={{backgroundColor: "#117A8B"}}>
                <FcGoogle />
                  &nbsp; Sign In with Google
              </Button>
        </div>
        <div className="col-12 mt-4  col-lg-5">
          <Image className="img-fluid rounded float-right" src={remoteWork} alt="pic"/>
        </div>
      </div>
      </div>
      </main>
  );
};

export default login;
