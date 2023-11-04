import React, { useEffect, useState } from "react";
import liff from "@line/liff";

const Line = () => {
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
      const idToken = liff.getIDToken();

      console.log(profile, idToken);
    } catch (err) {
      console.log(err);
    }
  };

  return <div>Line</div>;
};

export default Line;
