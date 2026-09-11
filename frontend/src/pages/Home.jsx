import React from 'react';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { PCHome } from '../views/pc/PCHome';
import { MobileHome } from '../views/mobile/MobileHome';

export const Home = () => {
  const { isMobile } = useDeviceDetect();
  return isMobile ? <MobileHome /> : <PCHome />;
};

export default Home;
