import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { CircleButton } from "../components/CircleButton";

export const MemoCreateScreen = (props) => {
  const { navigation } = props;
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput value="" multiline={true} style={styles.input} />
      </View>
      <CircleButton
        name="check"
        color="white"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 27,
    paddingHorizontal: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  },
});
