import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { CircleButton } from "../components/CircleButton";
import { Loading } from "../components/Loading";
import { auth, db } from "../lib/firebase";
import { translateErrors } from "../utils";

export const MemoCreateScreen = (props) => {
  const { navigation } = props;
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (memo === "") {
      Alert.alert("Warning", "メモ本文を入力してください。");
      return;
    }
    setLoading(true);
    try {
      const { currentUser } = auth;
      const ref = collection(db, `users/${currentUser.uid}/memos`);
      await addDoc(ref, {
        bodyText: memo,
        updatedAt: new Date(),
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
      const err = translateErrors(error.code);
      Alert.alert(err.title, err.description);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Loading isLoading={loading} />
      <View style={styles.inputContainer}>
        <TextInput
          value={memo}
          multiline={true}
          style={styles.input}
          onChangeText={(text) => setMemo(text)}
          autoFocus={true}
          keyboardType="ascii-capable"
        />
      </View>
      <CircleButton name="check" color="white" onPress={handlePress} />
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
