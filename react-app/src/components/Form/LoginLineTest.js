import React, { useState, useEffect } from "react";
import liff from "@line/liff";

const LoginLineTest = () => {
  useEffect(() => {
    liff
      .init({ liffId: "2001488392-pk27JKYA" })
      .then(() => {
        //code
        handleLogin();
      })
      .catch((err) => console.log(err));
  }, []);
  const handleLogin = async () => {
    try {
      //code
      const profile = await liff.getProfile();
      console.log(profile);
    } catch (err) {
      console.log(err);
    }
  };
  return <button onClick={handleLogin}>Login here</button>;
};

export default LoginLineTest;
