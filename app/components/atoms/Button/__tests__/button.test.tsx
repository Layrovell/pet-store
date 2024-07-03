// import { render, screen } from '@testing-library/react-native';
// import Button from '../index';

// describe('Hello', () => {
//   console.log('===== running tests =====');

//   it('displays the passed-in name', () => {
//     const { getByText } = render(<Button>Checkout</Button>);
//     // @ts-ignore
//     expect(screen.getByRole('button', { name: 'Home' }).props.children).toBe('Home');
//     expect(getByText('Welcome to React Native')).toBeTruthy();
//   });
// });

import React, { useRef } from 'react';

import '@testing-library/jest-native/extend-expect';
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react-native';
import Title from '../index';
import renderer from 'react-test-renderer';
jest.useFakeTimers('legacy');

// describe('<App />', () => {
//   it('has 1 child', () => {
//     const tree = renderer.create(<Text>Button</Text>).toJSON();
//     console.log('tree: ', tree);

//     // expect(tree.children.length).toBe(1);
//   });
// });

// const Button = ({ title }: { title: string }) => {
//   return (
//     <TouchableOpacity>
//       <Text>{title}</Text>
//     </TouchableOpacity>
//   );
// };

describe('Button component', () => {
  beforeEach(cleanup);
  afterEach(cleanup);

  it('should render Button component correctly', () => {
    // const { toJSON } = render(<Button title="Button" />);
    // expect(toJSON()).toMatchSnapshot();
    // render(<Title title='Button' />);
    const tree = renderer.create(<Title>Title Text</Title>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
