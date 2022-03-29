import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { CircleButton } from "../components/CircleButton";
import { LogOutButton } from "../components/LogOutButton";
import { MemoList } from "../components/MemoList";

export const MemoListScreen = (props) => {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <MemoList />
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate("MemoCreate");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
});
