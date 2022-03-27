import { string } from "prop-types";
import { StyleSheet, View, Text } from "react-native";

export const Button = (props) => {
  const { label } = props;
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
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
};
