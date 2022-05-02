import React from "react";
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, FormFeedback, InputGroup, InputGroupText } from "reactstrap";
import { API_URL } from "../helper"
import Axios from "axios"
import { useEffect } from "react";

const SignUpModal = (props) => {
    const { isOpen, setOpen, toggle } = props

    const [userDatabase, setUserDatabase] = React.useState([])
    const [userValidity, setUserValidity] = React.useState("null")
    const [emailValidity, setEmailValidity] = React.useState("null")
    const [emailInfo, setEmailInfo] = React.useState("")
    const [passwordValidity, setPasswordValidity] = React.useState("null")
    const [passwordConfValidity, setPasswordConfValidity] = React.useState("null")
    const [passwordInfo, setPasswordInfo] = React.useState("")
    const [passwordShown, setPasswordShown] = React.useState(false)
    const [passwordConf, setPasswordConf] = React.useState("")

    const [fullnameValue, setFullnameValue] = React.useState()
    const [usernameValue, setUsernameValue] = React.useState()
    const [emailValue, setEmailValue] = React.useState()
    const [passValue, setPassValue] = React.useState()
    const [passConfValue, setPassConfValue] = React.useState()


    const getUserData = () => {
        Axios.get(`${API_URL}/users`)
            .then((response) => {
                setUserDatabase(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        getUserData();
        console.log(userDatabase)
    }, [])

    const handleCheckUsername = (username) => {
        let index = userDatabase.findIndex((value, index) => value.username == username)
        console.log(index)
        if (username == "") {
            setUserValidity("null")
        } else if (index < 0) {
            setUserValidity(true)
        } else if (index >= 0) {
            setUserValidity(false)
        }
    }

    const handleCheckEmail = (newEmail) => {
        if (newEmail == "") {
            setEmailValidity("null")
        } else if (newEmail.includes("@")) {
            let index = userDatabase.findIndex((value) => value.email === newEmail)
            console.log(index)
            if (index < 0) {
                setEmailValidity(true)
            } else if (index >= 0) {
                setEmailValidity(false)
                setEmailInfo("That email is already registered")
            }
        } else if (!newEmail.includes("@")) {
            setEmailValidity(false)
            setEmailInfo("Please fill in a valid email address")
        }
    }

    const handleCheckPassword = (password) => {
        let temp = password.split("")
        let checkNumber = "";
        let checkLowerCase = "";
        let checkUpperCase = "";
        let checkSymbol = "";

        temp.forEach((value) => {
            if (value / 2) {
                checkNumber = true;
            }
        })

        temp.forEach((value) => {
            if (value.toLowerCase() == value) {
                checkLowerCase = true;
            }
        })

        temp.forEach((value) => {
            if (value.toUpperCase() == value) {
                checkUpperCase = true;
            }
        })

        let symbols = `~!@#$%^&*()_-+={[}]|\:;"'<,>.?/`
        let arraySymbols = symbols.split("")

        for (let i = 0; i < temp.length; i++) {
            for (let k = 0; k < arraySymbols.length; k++) {
                if (temp[i] == arraySymbols[k]) {
                    checkSymbol = true;
                }
            }
        }


        if (checkLowerCase == true) {
            if (checkUpperCase == true) {
                if (checkNumber == true) {
                    if (checkSymbol == true) {
                        if (temp.length >= 8) {
                            setPasswordInfo("Password strong!")
                            setPasswordValidity(true)
                            setPasswordConf(password)
                        } else {
                            setPasswordValidity(false)
                            setPasswordInfo("Password must at least contain 8 characters")
                        }
                    } else {
                        setPasswordValidity(false)
                        setPasswordInfo("Password must include a symbol")
                    }
                } else {
                    setPasswordValidity(false)
                    setPasswordInfo("Password must include a number")
                }
            } else {
                setPasswordValidity(false)
                setPasswordInfo("Password must include an uppercase")
            }
        } else {
            setPasswordValidity(false)
            setPasswordInfo("Password must include an lowercase")
        }

        if (password == "") {
            setPasswordValidity("null")
        }
    }

    const handleRecheckPassword = (passwordConfirmation) => {
        if (passwordConfirmation == passwordConf) {
            setPasswordConfValidity(true)
        } else if (passwordConfirmation !== passwordConf) {
            setPasswordConfValidity(false)
        }
    }

    const handleCloseModal = () => {
        toggle();
        setFullnameValue();
        setUsernameValue();
        setUserValidity("null")
        setEmailValue();
        setEmailValidity("null")
        setPassValue();
        setPasswordValidity("null")
        setPassConfValue();
        setPasswordConfValidity("null")
    }



    return <Modal isOpen={isOpen} toggle={handleCloseModal}>
        <div className="container m-auto " style={{ backgroundColor: "#FFFDF8" }}>
            <h3 className="display-6 mt-4 mb-3 text-center" style={{ color: "#134E4A" }}>Nice to meet you!</h3>
            <div style={{ textAlign: "center" }}>
                <img
                    src="https://external-preview.redd.it/-By7bUqncmznnA4tdfBQbiYBinN_7joIqL7Y64R7hMo.png?format=pjpg&auto=webp&s=3e0a96ba6c590f008b8d88da4b719bd9e60fd363"
                    className="rounded-circle"
                    style={{ width: "25%" }}
                />
            </div>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label className="text-muted mb-0" style={{ fontSize: 12 }}>Full Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter your full name"
                            defaultValue={fullnameValue}
                            required
                        />
                        <FormFeedback invalid>
                            Please fill in your full name
                        </FormFeedback>

                    </FormGroup>
                    <FormGroup>
                        <Label className="text-muted mb-0" style={{ fontSize: 12 }}>Username</Label>
                        <Input
                            type="text"
                            defaultValue={usernameValue}
                            placeholder="Enter your username"
                            onChange={(e) => {
                                handleCheckUsername(e.target.value)
                            }}
                            valid={userValidity == "null" ? null : userValidity}
                            invalid={userValidity == "null" ? null : !userValidity}
                        />
                        <FormFeedback valid>
                            Nice! That username is available
                        </FormFeedback>
                        <FormFeedback invalid>
                            Oh no! That username is unavailable
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label className="text-muted mb-0" style={{ fontSize: 12 }}>Email</Label>
                        <Input
                            type="text"
                            placeholder="Enter your Email"
                            defaultValue={emailValue}
                            onChange={(e) => handleCheckEmail(e.target.value)}
                            valid={emailValidity == "null" ? null : emailValidity}
                            invalid={emailValidity == "null" ? null : !emailValidity}
                        />
                        <FormFeedback invalid>
                            {emailInfo}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label className="text-muted mb-0" style={{ fontSize: 12 }}>Password</Label>
                        <InputGroup>
                            <Input
                                type={passwordShown ? "text" : "password"}
                                placeholder="Enter your Password"
                                defaultValue={passValue}
                                onChange={(e) => handleCheckPassword(e.target.value)}
                                valid={passwordValidity == "null" ? null : passwordValidity}
                                invalid={passwordValidity == "null" ? null : !passwordValidity}
                            />
                            <InputGroupText
                                className="btn btn-secondary"
                                onClick={() => setPasswordShown(!passwordShown)}
                            >
                                {passwordShown ? "Hide" : "Show"}
                            </InputGroupText>
                            <FormFeedback valid>
                                {passwordInfo}
                            </FormFeedback>
                            <FormFeedback invalid>
                                {passwordInfo}
                            </FormFeedback>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label className="text-muted mb-0" style={{ fontSize: 12 }}>Confirmation Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter your confirmation Password"
                            defaultValue={passConfValue}
                            onChange={(e) => handleRecheckPassword(e.target.value)}
                            valid={passwordConfValidity == "null" ? null : passwordConfValidity}
                            invalid={passwordConfValidity == "null" ? null : !passwordConfValidity}
                        />
                        <FormFeedback invalid>
                            Password doesn't match
                        </FormFeedback>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <button className="btn w-100" type="submit" style={{ backgroundColor: "#134E4A", color: "white" }}>Sign up!</button>
            </ModalFooter>
        </div>
    </Modal>
}

export default SignUpModal;