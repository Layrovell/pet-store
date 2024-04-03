import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  name: any;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
}

const Icon: React.FC<Props> = ({
  name,
  size = 40,
  backgroundColor,
  iconColor = "#fff",
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: backgroundColor || '',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MaterialIcons name={name} size={size * 0.5} color={iconColor} />
    </View>
  );
};

export default Icon;
