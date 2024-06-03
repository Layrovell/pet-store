import React from 'react';
import { CheckBox as UICheckBox, CheckBoxProps } from '@ui-kitten/components';

interface Props extends CheckBoxProps {
  title?: string;
  children: JSX.Element;
}

const Checkbox: React.FC<Props> = React.memo((props) => {
    return (
      <UICheckBox {...props}>{props.children}</UICheckBox>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.checked === nextProps.checked;
  }
);

export default Checkbox;
