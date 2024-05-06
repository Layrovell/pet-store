import React from "react";

import Typography from "../Typography";
import colors from "../../config/colors";

interface Props {
  error?: any;
  visible?: boolean;
}

const ErrorMessage: React.FC<Props> = ({ error, visible }) => {
  if (!visible || !error) return null;

  return (
    <>
      {Array.isArray(error) ? (
        error.map((err: string, idx) => (
          <Typography color={colors.danger} key={idx}>
            {err}
          </Typography>
        ))
      ) : (
        <Typography color={colors.danger}>{error.message || error}</Typography>
      )}
    </>
  );
};

export default ErrorMessage;
