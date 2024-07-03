// import { render, screen } from '@testing-library/react-native';

// @ts-ignore
const { render, screen } = require('@testing-library/react-native');
// import Button from '../index';
const Button = require('../index');

describe('Hello', () => {
  console.log('===== running tests =====');
  
  it('displays the passed-in name', () => {
    const { getByText } = render(<Button>Checkout</Button>);
    // @ts-ignore
    expect(screen.getByRole('button', { name: 'Home' }).props.children).toBe('Home');
    expect(getByText('Welcome to React Native')).toBeTruthy();
  });
});
