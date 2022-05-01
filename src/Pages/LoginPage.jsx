import React from "react";
import { Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText } from "reactstrap";
import SignUpModal from "../Components/SignUpModal";
import { API_URL } from "../helper";
import Axios from "axios";
import { useDispatch } from "react-redux"
import { loginAction } from "../Redux/Actions/usersAction";
import { useNavigate, Link } from 'react-router-dom';


const LoginPage = (props) => {
    let navigate = useNavigate();

    const [openRegister, setOpenRegister] = React.useState(false)
    const [userDatabase, setUserDatabase] = React.useState([])
    const [usernameLogin, setUsernameLogin] = React.useState()
    const [passwordLogin, setPasswordLogin] = React.useState()
    const [passwordValidity, setPasswordValidity] = React.useState("null")
    const [validityInfo, setValidityInfo] = React.useState()

    const [passwordShown, setPasswordShown] = React.useState(false)

    const dispatch = useDispatch();

    React.useEffect(() => {
        getUserData();
    }, [])

    const getUserData = () => {
        Axios.get(`${API_URL}/users`)
            .then((response) => {
                setUserDatabase(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleLogin = () => {
        if (usernameLogin == "" || passwordLogin == "") {
            setPasswordValidity(false)
            setValidityInfo("Please fill in all the form")
        } else {
            let index = userDatabase.findIndex((value) => value.username === usernameLogin)
            console.log(index)
            if (index >= 0) {
                if (passwordLogin === userDatabase[index].password) {
                    setPasswordValidity(true)
                    console.log(`login success! username / email : ${[usernameLogin]}, password: ${passwordLogin}`)
                    Axios.get(`${API_URL}/users?username=${usernameLogin}&password=${passwordLogin}`)
                        .then((response) => {
                            localStorage.setItem("tokenIdUser", response.data[0].id)
                            dispatch(loginAction(response.data[0]));
                            navigate('/');
                        }).catch((error) => {
                            console.log(error);
                        })
                } else {
                    setPasswordValidity(false)
                    setValidityInfo("Username and password doesn't match")
                }
            } else if (index < 0) {
                index = userDatabase.findIndex((value) => value.email === usernameLogin)
                if (index >= 0) {
                    if (passwordLogin === userDatabase[index].password) {
                        setPasswordValidity(true)
                        console.log(`login success! username / email : ${[usernameLogin]}, password: ${passwordLogin}`)
                        Axios.get(`${API_URL}/users?email=${usernameLogin}&password=${passwordLogin}`)
                            .then((response) => {
                                localStorage.setItem("tokenIdUser", response.data[0].id)
                                dispatch(loginAction(response.data[0]));
                                navigate('/');
                            }).catch((error) => {
                                console.log(error);
                            })
                    } else if (index < 0) {
                        setPasswordValidity(false)
                        setValidityInfo("Email and password doesn't match")
                    }
                } else if (index < 0) {
                    setPasswordValidity(false)
                    setValidityInfo("Username / Email is invalid")
                }
            }
        }

    }


    return <div
        style={{
            height: "100%",
            width: "100%",
            backgroundImage: `url("https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: "absolute"
        }}
    >
        <div className="container row m-auto">
            <h1 className="display-5 pt-5 mt-5 mb-4 mb-lg-5 text-center text-lg-start" style={{ color: "white" }}>Welcome back</h1>
            <div className="col-12 col-lg-4">
                <Form>
                    <FormGroup>
                        <Input
                            type="email"
                            placeholder="Email / Username"
                            className="my-3"
                            style={{ border: "0px", backgroundColor: "#FFFDF8" }}
                            onChange={(e) => {
                                setUsernameLogin(e.target.value)
                                setPasswordValidity("null")
                            }}
                            invalid={passwordValidity === "null" ? null : !passwordValidity}
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <Input
                                type={passwordShown ? "text" : "password"}
                                placeholder="Password"
                                style={{ border: "0px", backgroundColor: "#FFFDF8" }}
                                onChange={(e) => {
                                    setPasswordLogin(e.target.value)
                                    setPasswordValidity("null")
                                }}
                                invalid={passwordValidity === "" ? null : !passwordValidity}
                            />
                            <InputGroupText
                                className="btn btn-secondary"
                                onClick={() => setPasswordShown(!passwordShown)}
                            >
                                {passwordShown ? "Hide" : "Show"}
                            </InputGroupText>
                            <FormFeedback invalid>
                                {validityInfo}
                            </FormFeedback>
                        </InputGroup>

                    </FormGroup>

                </Form>
                <div className="mb-2 text-end" style={{ color: "white" }}>
                    <a>Forgot password?</a>
                </div>
                <button className="btn w-100" style={{ backgroundColor: "#134E4A", color: "white" }} onClick={handleLogin}>Log In</button>
                <hr style={{ color: "white" }} />
                <p style={{ color: "white" }}>Don't have an account yet?</p>
                <button className="btn w-100" style={{ backgroundColor: "#134E4A", color: "white" }} onClick={() => setOpenRegister(!openRegister)}>Join us!</button>
                <SignUpModal
                    isOpen={openRegister}
                    setOpen={setOpenRegister}
                    toggle={() => setOpenRegister(!openRegister)}
                />
            </div>
        </div>
    </div>
}

export default LoginPage;