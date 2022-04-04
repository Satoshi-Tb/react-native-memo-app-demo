import { shape } from "prop-types";
import { string, func } from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Button = (props) => {
  const { label, onPress = null, style = null } = props;
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#467FD3",
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: "#ffffff",
  },
});

Button.propTypes = {
  label: string.isRequired,
  onPress: func,
  style: shape(),
};
