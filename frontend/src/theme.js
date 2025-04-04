import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#e6f1fe',
    100: '#c5dafd',
    200: '#a4c2fa',
    300: '#83aaf7',
    400: '#6293f4',
    500: '#417bf0',
    600: '#3062c1',
    700: '#234992',
    800: '#173163',
    900: '#0a1834',
  },
};

const theme = extendTheme({ config, colors });

export default theme; 