import React from 'react';
import { Card as UICard, CardProps } from '@ui-kitten/components';

interface Props extends CardProps {};

 const Card: React.FC<Props> = (props): React.ReactElement => {
  return (
    <UICard {...props}>
      {props.children}
    </UICard>
  )
 }
export default Card;
