import React, { useState } from "react";
import Button from "../../components/button";
import Heading from "../../components/heading";
import PassField from "../../components/passField";
import TextField from "../../components/textField";
import ForgotLink from "../../components/forgotLink";
import RegisterLink from "../../components/authFooter";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../data/firebase";

export default function Login() {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlerLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.pass) {
      navigator("/loginsucess");
    } else {
      navigator("/login");
    }
  };

  console.log(formData);
  const handlerGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      if (result.user) {
        navigator("/loginsucess");
      }
    });
  };
  return (
    <>
      <div className="grid px-2">
        <div className="col-12 ">
          <Heading
            title="Login to your account."
            headline="Please sign in to your account "
          />
        </div>
        <div className="col-12 p-0">
          <form action="" method="post" onSubmit={handlerLogin}>
            <div className="grid">
              <div className="col-12 mb-1">
                <TextField
                  type="email"
                  labelname="Email Address"
                  idname="emai"
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="col-12">
                <PassField
                  labelname="Password"
                  idname="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="pass"
                />
              </div>
              <div className="col-12">
                <ForgotLink />
              </div>
              <div className="col-12">
                <Button btnname="Sign In" btntype="submit" />
              </div>
            </div>
            <RegisterLink onClick={handlerGoogleLogin} />
          </form>
        </div>
      </div>
    </>
  );
}
