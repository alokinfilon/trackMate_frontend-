import { useState } from 'react';

export const useAccountSecurity = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [faceId, setFaceId] = useState(false);
  const [smsAuth, setSmsAuth] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(false);

  return {
    rememberMe,
    setRememberMe,
    biometrics,
    setBiometrics,
    faceId,
    setFaceId,
    smsAuth,
    setSmsAuth,
    googleAuth,
    setGoogleAuth,
  };
};
