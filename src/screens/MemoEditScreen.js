import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { CircleButton } from "../components/CircleButton";
import { Loading } from "../components/Loading";
import { auth, db } from "../lib/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { shape, string } from "prop-types";
import { translateErrors } from "../utils";

export const MemoEditScreen = (props) => {
  const { navigation, route } = props;
  const { id } = route.params;
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    const { currentUser } = auth;
    const ref = doc(db, `users/${currentUser.uid}/memos/${id}`);
    try {
      await updateDoc(ref, {
        bodyText: memo.body,
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

  useEffect(() => {
    setLoading(true);
    let unsubscribe = () => {};
    try {
      const { currentUser } = auth;
      const ref = doc(db, `users/${currentUser.uid}/memos/${id}`);
      unsubscribe = onSnapshot(
        ref,
        (doc) => {
          const data = doc.data();
          setMemo({
            body: data.bodyText,
            date: data.updatedAt.toDate(),
            id: doc.id,
          });
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          const err = translateErrors(error.code);
          Alert.alert(err.title, err.description);
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      const err = translateErrors(error.code);
      Alert.alert(err.title, err.description);
    }
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Loading isLoading={loading} />
      <View style={styles.inputContainer}>
        <TextInput
          value={memo?.body ?? ""}
          multiline={true}
          style={styles.input}
          onChangeText={(text) => setMemo({ ...memo, body: text })}
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
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 27,
  },
});

MemoEditScreen.propTypes = {
  route: shape({ params: shape({ id: string }) }).isRequired,
};
