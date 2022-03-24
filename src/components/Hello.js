import { View, Text, StyleSheet } from "react-native-web";
import { string, bool, shape } from "prop-types";

export const Hello = (props) => {
  const { children, bang = false, style = null } = props;
  const styles = StyleSheet.create({
    text: {
      color: "#ffffff",
      backgroundColor: "blue",
      fontSize: 40,
      fontWeight: "bold",
      padding: 16,
    },
  });

  const greeting = "Hello " + children + (bang ? "!" : "");

  return (
    <View>
      <Text style={[styles.text, style]}>{greeting}</Text>
    </View>
  );
};

Hello.propTypes = {
  children: string.isRequired,
  bang: bool,
  style: shape(),
};
