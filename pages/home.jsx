import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import { useStyles } from '../utils/globalStyles'
import { useRouter } from "next/router";
import { userAccessToken, fetchUser } from "../utils/fetchDetails";
import Image from "next/image";
import animatedMeet from "../Assets/meet-animation.svg"



const HomePage = (props) => {

  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = userAccessToken();
    if (!accessToken) return router.push("/login");
    const [userInfo] = fetchUser();
    console.log(userInfo);
    setUser(userInfo);
  }, []);



  const [value, setValue] = useState();
  const [meetname, setMeetName] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleMeetName = (event) => {
    setMeetName(event.target.value);
  };
  const classes = useStyles();

  //start meeting
  const startMeet = async () => {

  }
  const joinMeet = async () => {

  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

   
      <div className="container-fluid d-lg-flex  d-md-flex justify-content-center p-lg-5 ">

        <div className="container col-12 col-lg-7" style={{ marginTop: "20vh", paddingRight: "40px" }} >
          <h4 className=" m-3 justify-content-center">Hi <span style={{ color: "#2dbdc3" }}> {user?.displayName}</span></h4>
          <h6 className=" m-3 justify-content-center" style={{ fontSize: "1.4rem" }}>Connect, collaborate, and celebrate from anywhere with Remote Workspace!</h6>
          <div className="row container m-3">
            <div className=" justify-content-center m-3">
              <TextField
                id="meetname"
                label="Enter Meet Name"
                multiline
                rowsMax={4}
                value={meetname}
                onChange={handleMeetName}
                color="primary"
                InputLabelProps={{
                  style: { color: '#B2BEB5' },
                }}
              />
              <Button className="p-2 m-1 " variant="info" onClick={startMeet} style={{backgroundColor: "#117A8B"}} >Create Meet</Button> <br />
            </div>
            <form className=" justify-content-center m-3" noValidate autoComplete="off">
              <TextField
                id="meeturl"
                label="Enter Meet URL"
                multiline
                rowsMax={4}
                value={value}
                onChange={handleChange}
                color="secondary"
                InputLabelProps={{
                  style: { color: '#B2BEB5' },
                }}
              />
              <Button className="p-2 m-1" variant="danger" onClick={joinMeet} >Join Meet </Button>
            </form>
          </div>
        </div>
        <div className="col-12 mt-4  col-lg-5">
          <Image className="img-fluid rounded d-block float-right" src={animatedMeet} alt="pic" />
        </div>
      </div>
    </main>
  )
}

export default HomePage;