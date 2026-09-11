import React from 'react';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { PCServices } from '../views/pc/PCServices';
import { MobileServices } from '../views/mobile/MobileServices';

export const Services = () => {
  const { isMobile } = useDeviceDetect();
  return isMobile ? <MobileServices /> : <PCServices />;
};

export default Services;
