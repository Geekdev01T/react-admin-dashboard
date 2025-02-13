import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeSwitcher: React.FC<{ toggleTheme: () => void, isDarkTheme: boolean }> = ({ toggleTheme, isDarkTheme }) => {
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {isDarkTheme ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeSwitcher;