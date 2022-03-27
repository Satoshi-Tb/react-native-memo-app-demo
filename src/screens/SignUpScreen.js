import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { AppBar } from "../components/AppBar";
import { Button } from "../components/Button";

export const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput value="Email" style={styles.input} />
        <TextInput value="Password" style={styles.input} />
        <Button label="Submit" />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Log In.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  innerContainer: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dddddd",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467FD3",
  },
});
