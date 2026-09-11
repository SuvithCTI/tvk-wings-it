import React from 'react';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { PCLogin } from '../views/pc/PCLogin';
import { MobileLogin } from '../views/mobile/MobileLogin';

export const Login = () => {
  const { isMobile } = useDeviceDetect();
  return isMobile ? <MobileLogin /> : <PCLogin />;
};

export default Login;
