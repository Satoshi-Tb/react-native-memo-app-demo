import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "./Icon";
import { useNavigation } from "@react-navigation/native";
import { shape, string, instanceOf, arrayOf } from "prop-types";

export const MemoList = (props) => {
  const { memoList } = props;
  //TODO テストデータ
  // const memoList = [
  //   { id: 1, title: "買い物リスト1", date: "2021年12月31日" },
  //   { id: 2, title: "買い物リスト2", date: "2021年12月31日" },
  //   { id: 3, title: "買い物リスト3", date: "2021年12月31日" },
  // ];

  const navigation = useNavigation();

  return (
    <View>
      {memoList.map((memo) => (
        <TouchableOpacity
          style={styles.memoListItem}
          key={memo.id}
          onPress={() => {
            navigation.navigate("MemoDetail");
          }}
        >
          <View>
            <Text style={styles.memoListItemTitle}>{memo.body}</Text>
            <Text style={styles.memoListItemDate}>{String(memo.date)}</Text>
          </View>
          <TouchableOpacity style={styles.memoDelete}>
            <Icon name="delete" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        </TouchableOpacity>
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
  memoDelete: {
    padding: 8,
  },
});

MemoList.propTypes = {
  memoList: arrayOf(
    shape({
      id: string,
      title: string,
      body: string,
      date: instanceOf(Date),
    })
  ).isRequired,
};
