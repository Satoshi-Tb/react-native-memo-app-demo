import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { CircleButton } from "../components/CircleButton";
import { LogOutButton } from "../components/LogOutButton";
import { MemoList } from "../components/MemoList";
import { auth, db } from "../lib/firebase";

export const MemoListScreen = (props) => {
  const { navigation } = props;
  const [memoList, setMemoList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  //TODO useEffectブロックが複数の場合、実行順序は？
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      console.log("memo list fetch start");
      const { currentUser } = auth;
      const ref = collection(db, `users/${currentUser.uid}/memos`);
      const q = query(ref, orderBy("updatedAt", "desc"));

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            items.push({
              body: data.bodyText,
              date: data.updatedAt.toDate(),
              id: doc.id,
            });
          });
          setMemoList(items);
        },
        (error) => {
          console.log(error);
          Alert.alert("Error", "メモリスト取得エラー");
        }
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "メモリスト取得エラー");
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <MemoList memoList={memoList} />
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
