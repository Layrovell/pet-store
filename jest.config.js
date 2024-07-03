module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // moduleNameMapper: {
  //   '^.+\\.svg$': '<rootDir>/src/tests/mocks/svgMock.ts',
  // },
  transformIgnorePatterns: [
    // 'node_modules/(?!(jest-)?@?react-native|scheduler|react-native-vector-icons|@react-native-community|@react-navigation)',
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|react-navigation|@expo|expo|@unimodules|unimodules|unimodules-barcode-scanner-interface|unimodules-camera-interface|unimodules-constants-interface|unimodules-face-detector-interface|unimodules-file-system-interface|unimodules-font-interface|unimodules-image-loader-interface|unimodules-image-picker-interface|unimodules-location-interface|unimodules-permissions-interface|unimodules-sensors-interface|unimodules-task-manager-interface|unimodules-react-native-adapter|unimodules-react-native-adapter|unimodules|unimodules-barcode-scanner-interface|unimodules-camera-interface|unimodules-constants-interface|unimodules-face-detector-interface|unimodules-file-system-interface|unimodules-font-interface|unimodules-image-loader-interface|unimodules-image-picker-interface|unimodules-location-interface|unimodules-permissions-interface|unimodules-sensors-interface|unimodules-task-manager-interface|@expo|expo|@expo/vector-icons)'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jestSetupFile.js',
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/context/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/screens/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/hooks/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/utils/**/*.{js,jsx,ts,tsx}',
    '!**/*spec.tsx',
    // '!**/useValidationSchema.ts',
    // '!**/*styles.ts',
    '!<rootDir>/src/contexts/AllProviders.tsx',
    '!<rootDir>/node_modules/',
    // '!<rootDir>/src/utils/lists.ts',
    // '!<rootDir>/src/configs/featuresFlag.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  globals: {
    RN_BASE_URL: 'https://example.com',
    RN_BASE_URL_API: 'https://example.com/api',
    RN_ENV: 'test',
    RN_FEATURES_OFF: '',
  },
};