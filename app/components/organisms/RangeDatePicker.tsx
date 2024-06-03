import React from 'react';
import { RangeDatepicker as UIRangeDatepicker, RangeDatepickerProps } from '@ui-kitten/components';

interface Props extends RangeDatepickerProps {}

const RangeDatePicker: React.FC<Props> = (props) => {
  return (
    <UIRangeDatepicker {...props} />
  );
};


export default RangeDatePicker;
