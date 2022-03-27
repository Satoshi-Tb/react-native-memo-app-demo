import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export const MemoList = () => {
  //TODO テストデータ
  const memoList = [
    { id: 1, title: "買い物リスト1", date: "2021年12月31日" },
    { id: 2, title: "買い物リスト2", date: "2021年12月31日" },
    { id: 2, title: "買い物リスト3", date: "2021年12月31日" },
  ];

  return (
    <View>
      {memoList.map((todo) => (
        <View style={styles.memoListItem} key={todo.id}>
          <View>
            <Text style={styles.memoListItemTitle}>{todo.title}</Text>
            <Text style={styles.memoListItemDate}>{todo.date}</Text>
          </View>
          <View>
            <Feather name="x" size={16} color="#B0B0B0" />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.25)",
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
});
