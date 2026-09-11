import React from 'react';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { PCIdeology } from '../views/pc/PCIdeology';
import { MobileIdeology } from '../views/mobile/MobileIdeology';

export const Ideology = () => {
  const { isMobile } = useDeviceDetect();
  return isMobile ? <MobileIdeology /> : <PCIdeology />;
};

export default Ideology;
