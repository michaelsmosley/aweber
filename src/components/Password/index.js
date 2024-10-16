import React, { useState, useRef } from "react";
import Styles from "./index.module.css";

const Password = () => {
  const inputPassword = useRef(null);
  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(true);

  const onChangePassword = (event) => {
    setError(null);
    setPassword(event.target.value);
    event.preventDefault();
  };

  const onChangePasswordValidate = (event) => {
    setError(null);
    setPasswordValidate(event.target.value);
    event.preventDefault();
  };
  const validatePassword = (password) => {
    //PASSWORD REQUIREMENTS
    var re =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()-+=<>:;"',.{}|_\[\]]).{6,}$/;
    return re.test(password);
  };
  const validatePasswordLength = (password) => {
    return password.length >= 6;
  };

  const validatePasswordUpper = (password) => {
    //RIGOROUS PASSWORD REQUIREMENTS
    var re = /^(?=.*?[A-Z]).{1,}$/;
    return re.test(password);
  };
  const validatePasswordLower = (password) => {
    //RIGOROUS PASSWORD REQUIREMENTS
    var re = /^(?=.*?[a-z]).{1,}$/;
    return re.test(password);
  };
  const validatePasswordNumber = (password) => {
    //RIGOROUS PASSWORD REQUIREMENTS
    var re = /^(?=.*?[0-9]).{1,}$/;
    return re.test(password);
  };
  const validatePasswordSpecial = (password) => {
    //RIGOROUS PASSWORD REQUIREMENTS
    var re = /^(?=.*?[!@#$%^&*()-+=<>:;"',.{}|_\[\]]).{1,}$/;
    return re.test(password);
  };

  const validatePasswordMatch = () => {
    //RIGOROUS PASSWORD REQUIREMENTS
    var re = /^(?=.*?[!@#$%^&*()-+=<>:;"',.{}|_\[\]]).{1,}$/;
    return password !== passwordValidate ? true : false;
  };

  const onSubmitPassword = (event) => {
    if (validatePassword(password) && !isInvalidPasswordMatch) {
      //password is valid
      alert("Success!");
    } else {
      let errorArray = [];

      isInvalidPasswordMatch &&
        errorArray.push("The two passwords to not match.");
      isInvalidPasswordLength &&
        errorArray.push("Password needs to be at least 6 characters.");
      isInvalidPasswordNumber &&
        errorArray.push("Password needs to have at least one number.");
      isInvalidPasswordUpper &&
        errorArray.push(
          "Password needs to have at least one upper case character."
        );
      isInvalidPasswordLower &&
        errorArray.push(
          "Password needs to have at least one lower case character."
        );
      isInvalidPasswordSpecial &&
        errorArray.push("Password needs at least one special character.");
      setError({
        message: `Password does not meet minimal requirements:`,
        array: errorArray,
      });
    }

    event.preventDefault();
  };

  //   const isInvalidPassword = false;
  const isInvalidPasswordLength = !validatePasswordLength(password);
  const isInvalidPasswordLower = !validatePasswordLower(password);
  const isInvalidPasswordUpper = !validatePasswordUpper(password);
  const isInvalidPasswordNumber = !validatePasswordNumber(password);
  const isInvalidPasswordSpecial = !validatePasswordSpecial(password);
  const isInvalidPasswordMatch = validatePasswordMatch();

  return (
    <>
      <div className={Styles.title}>AWeber : Password Validation</div>
      <div>
        <input
          id="password"
          name="password"
          value={password}
          ref={inputPassword}
          onChange={onChangePassword}
          type={showPassword ? "text" : "password"}
          placeholder={"enter password"}
          onKeyDown={(e) => e.keyCode === 13 && onSubmitPassword(e)}
        />
      </div>

      <div>
        {" "}
        <input
          id="passwordValidate"
          name="passwordValidate"
          value={passwordValidate}
          onChange={onChangePasswordValidate}
          type={showPassword ? "text" : "password"}
          placeholder={"validate password"}
          onKeyDown={(e) => e.keyCode === 13 && onSubmitPassword(e)}
        />
      </div>

      <div>
        <button disabled={false} type="submit" onClick={onSubmitPassword}>
          SUBMIT
        </button>
      </div>
      <div className={Styles.errorBlock}>
        {error && <div className={Styles.errorMessage}>{error.message}</div>}
        <ul>
          {error &&
            error.array &&
            error.array.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
        </ul>
      </div>
    </>
  );
};

export default Password;
