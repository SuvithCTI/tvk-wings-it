import React from 'react';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { PCDevelopments } from '../views/pc/PCDevelopments';
import { MobileDevelopments } from '../views/mobile/MobileDevelopments';

export const Developments = () => {
  const { isMobile } = useDeviceDetect();
  return isMobile ? <MobileDevelopments /> : <PCDevelopments />;
};

export default Developments;
