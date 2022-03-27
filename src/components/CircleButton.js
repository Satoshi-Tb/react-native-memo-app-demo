import { StyleSheet, Text, View } from "react-native";
import { string } from "prop-types";

export const CircleButton = (props) => {
  const { children } = props;
  return (
    <View style={styles.cricleButton}>
      <Text style={styles.cricleButtonLabel}>{children}</Text>
    </View>
  );
};

CircleButton.propTypes = {
  children: string.isRequired,
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
