import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../Text";
import colors from "../../config/colors";

interface Props {
  error?: any;
  visible?: boolean;
}

const ErrorMessage: React.FC<Props> = ({ error, visible }) => {
  if (!visible || !error) return null;

  return (
    <AppText style={styles.error}>
      {error}
    </AppText>
  )
};

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
  },
});

export default ErrorMessage;
