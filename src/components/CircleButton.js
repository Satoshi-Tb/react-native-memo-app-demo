import { StyleSheet, TouchableOpacity } from "react-native";
import { string, shape, func } from "prop-types";
import { Icon } from "./Icon";

export const CircleButton = (props) => {
  const { style = null, name, onPress = null } = props;
  return (
    <TouchableOpacity style={[styles.cricleButton, style]} onPress={onPress}>
      <Icon name={name} size={40} color="white" />
    </TouchableOpacity>
  );
};

CircleButton.propTypes = {
  name: string.isRequired,
  style: shape(),
  onPress: func,
};

const styles = StyleSheet.create({
  cricleButton: {
    backgroundColor: "#467FD3",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 40,
    bottom: 40,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    elevation: 8,
  },
  cricleButtonLabel: {
    color: "#ffffff",
    fontSize: 40,
    lineHeight: 40,
  },
});
