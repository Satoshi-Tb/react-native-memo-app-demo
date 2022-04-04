import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export const LogOutButton = () => {
  const navigation = useNavigation();
  //TODO メモリスト画面からログアウト後、memo取得動作が実行されfirebaseのパーミッションエラーとなる
  const handlePress = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: "LogIn" }],
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "ログアウトに失敗しました");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.label}>ログアウト</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
});
