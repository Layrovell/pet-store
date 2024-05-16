import Typography from '@components/Typography';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface Props {
  routeName: string;
  leftAction?: JSX.Element;
  rightAction?: JSX.Element;
}

const PageHeaderNavigation: React.FC<Props> = ({ routeName, leftAction, rightAction }) => {
  const isAction = leftAction || rightAction;

  return (
    <View style={styles({ isAction }).container}>
      {leftAction}
      <Typography variant='h4'>{routeName}</Typography>
      {rightAction}
    </View>
  );
};

const styles = (props: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingTop: 46,
      alignItems: 'center',
      justifyContent: props?.isAction ? 'space-between' : 'center',
      margin: 16,
    },
  });

export default PageHeaderNavigation;
