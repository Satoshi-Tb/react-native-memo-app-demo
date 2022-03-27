import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icomoon from "../../assets/fonts/icomoon.ttf";
import selection from "../../assets/fonts/selection.json";
import { string, number, oneOf } from "prop-types";
import { useFonts } from "@use-expo/font";

export const Icon = (props) => {
  const { name, size = 24, color = "#000000" } = props;
  const [fontLoaded] = useFonts({ icomoon: icomoon });
  const CustomIcon = createIconSetFromIcoMoon(selection);

  if (!fontLoaded) {
    return null;
  }
  return (
    <CustomIcon
      name={name}
      size={size}
      color={color}
      style={{ lineHeight: size - 1 }}
    />
  );
};

Icon.propTypes = {
  name: oneOf(["plus", "delete", "check", "pencil"]).isRequired,
  size: number,
  color: string,
};
