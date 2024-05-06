import { TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import Typography from './Typography';
import { TypographyType } from '../interface/theme';

interface Props {
  text: string;
  onPress: () => void;
  color?: string;
  variant?: TypographyType;
}

const Link: React.FC<Props> = ({ text, onPress, variant, color = colors.primary }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Typography variant={variant} color={color}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default Link;
