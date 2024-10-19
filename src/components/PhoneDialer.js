import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';

const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iphone|ipad|iPod/i.test(userAgent);
};

const PhoneDialer = ({ phoneNumber }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const handlePhoneClick = () => {
    const formattedNumber = `+57${phoneNumber}`;
    window.location.href = `tel:${formattedNumber}`;
  };

  if (!isMobile) {
    return null;
  }

  return (
    <IconButton
      color="primary"
      onClick={handlePhoneClick}
      sx={{
        padding: 0.5, 
      }}
    >
      <PhoneIcon fontSize="small" />
    </IconButton>
  );
};

export default PhoneDialer;
