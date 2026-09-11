import React from 'react';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { PCAdmin } from '../views/pc/PCAdmin';
import { MobileAdmin } from '../views/mobile/MobileAdmin';

export const Admin = () => {
  const { isMobile } = useDeviceDetect();
  return isMobile ? <MobileAdmin /> : <PCAdmin />;
};

export default Admin;
