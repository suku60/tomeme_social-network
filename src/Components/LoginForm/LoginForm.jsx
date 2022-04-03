import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { checkError } from '../../utils';
import { TextInput, Checkbox, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import axios from 'axios';

//REDUX...
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';
import { showNotification } from '@mantine/notifications';

export const LoginForm = (props) => {
  let navigate = useNavigate();
  let regexError;
  let passLengthError;
  let passMisError;
  let ageError;

  //1-Hooks
  const [userData, setuserData] = useState({
    nickname: "",
    password: ""
  });
  const [msgLength, setMsgLength] = useState("");
  const [msgMis, setMsgMis] = useState("");
  const [errorMsg, seterrorMsg] = useState("");


  //Refs



  //useEffect
  //userData useEffect
  useEffect(() => {

  })


  //Handler function
  //Shows msgs while writting
  const fillForm = (e) => {
    //Set data
    setuserData({ ...userData, [e.target.name]: e.target.value })

  }

  const login = async () => {

    let fieldsArr = Object.entries(userData);
    let error = "";
    seterrorMsg("");

    //Inputs regex validation
    for (let element of fieldsArr) {
      error = checkError(element[0], element[1]);
      if (error !== "ok") {
        seterrorMsg(error)
        regexError = true;
        return
      } else if (error == "ok") {
        seterrorMsg("")
        regexError = false;
      }
    }

    let body = {
      nickname: userData.nickname,
      password: userData.password
    }
    let result;
    if (!regexError && !passMisError && !passLengthError && !ageError) {
      try {
        result = await axios.post("https://socialmeme.herokuapp.com/users/login", body)

        if (result.data.token) {
          setTimeout(() => {
            // setMsgLength(`Welcome again ${result.data.user[0].nickname}`);

            showNotification({
              title: `Welcome again ${result.data.user[0].nickname}`,
              // message: 'Hey there, your code is awesome! 🤥',
              autoClose: 3000
            })

            navigate("/home")

            props.dispatch({ type: LOGIN, payload: result.data });
            setTimeout(() => {
              clearHooks();
            }, 4000)
          }, 1500)
        } else {

          seterrorMsg(result.data)
        }



      } catch (error) {
        console.log("Login error", error)
      }
    }
  }

  const clearHooks = () => {
    setuserData({
      nickname: "",
      password: ""
      // avatar:,
    })

    setMsgLength("");
    setMsgMis("");
    seterrorMsg("");
  }

  const enterPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  }

    return (
      <>
        <TextInput
          required
          label="Nickname"
          placeholder=""
          onChange={(e) => { fillForm(e) }}
          name="nickname"
          value={userData.nickname}
          className="register_form_inputs"
          onKeyDown={(e) => { enterPress(e) }}
        />
        <TextInput
          required
          label="Password"
          type="password"
          placeholder="4 characters min"
          onChange={(e) => { fillForm(e) }}
          name="password"
          value={userData.password}
          className="register_form_inputs"
          onKeyDown={(e) => { enterPress(e) }}
        />

        <Button className='submitBttn' id="login_form_button" type="submit" onClick={() => login()}>Submit</Button>
        <br></br>
        <span className='errorMsg'>{errorMsg}</span>
        <br></br>
        <span className='okMsg'>{msgLength}</span>
        <br></br>
        <span className='okMsg'>{msgMis}</span>
      </>
    )
  }
  export default connect()(LoginForm);