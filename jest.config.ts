import type { Config } from 'jest';

console.log('===== jest.config.ts =====');

const config: Config = {
  preset: 'react-native',
  // preset: 'ts-jest',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|js|ts|tsx)?$',
  // testRegex: '(/app/.*|(\\.|/)(test|spec))\\.(tsx|js|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|react-navigation|@expo|expo|@unimodules|unimodules|unimodules-barcode-scanner-interface|unimodules-camera-interface|unimodules-constants-interface|unimodules-face-detector-interface|unimodules-file-system-interface|unimodules-font-interface|unimodules-image-loader-interface|unimodules-image-picker-interface|unimodules-location-interface|unimodules-permissions-interface|unimodules-sensors-interface|unimodules-task-manager-interface|unimodules-react-native-adapter|unimodules-react-native-adapter|unimodules|unimodules-barcode-scanner-interface|unimodules-camera-interface|unimodules-constants-interface|unimodules-face-detector-interface|unimodules-file-system-interface|unimodules-font-interface|unimodules-image-loader-interface|unimodules-image-picker-interface|unimodules-location-interface|unimodules-permissions-interface|unimodules-sensors-interface|unimodules-task-manager-interface|@expo|expo|@expo/vector-icons)',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
    __DEV__: true,
  },
  testEnvironment: 'node',
};

export default config;
