import colors from '../config/colors';
import Icon from './Icon';

interface Props {
  iconColor?: string;
  size?: number;
  backgroundColor?: string;
}

const Logo: React.FC<Props> = ({ ...props }) => {
  return (
    <Icon
      name={'pets'}
      iconColor={props?.iconColor || 'white'}
      size={props?.size || 60}
      backgroundColor={props?.backgroundColor || colors.primary}
    />
  );
};

export default Logo;
