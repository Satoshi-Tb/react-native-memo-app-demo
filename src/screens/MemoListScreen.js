import { StyleSheet, View } from "react-native";
import { AppBar } from "../components/AppBar";
import { CircleButton } from "../components/CircleButton";
import { MemoList } from "../components/MemoList";

export const MemoListScreen = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <MemoList />
      <CircleButton>+</CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
});
