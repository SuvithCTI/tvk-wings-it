import React from 'react';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { PCLiveNews } from '../views/pc/PCLiveNews';
import { MobileLiveNews } from '../views/mobile/MobileLiveNews';

export const LiveNews = () => {
  const { isMobile } = useDeviceDetect();
  return isMobile ? <MobileLiveNews /> : <PCLiveNews />;
};

export default LiveNews;
