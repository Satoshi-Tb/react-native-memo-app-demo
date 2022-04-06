import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { CircleButton } from "../components/CircleButton";
import { LogOutButton } from "../components/LogOutButton";
import { MemoList } from "../components/MemoList";
import { auth, db } from "../lib/firebase";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { translateErrors } from "../utils";

export const MemoListScreen = (props) => {
  const { navigation } = props;
  const [memoList, setMemoList] = useState([]);
  const [loading, setLoading] = useState(false);

  //useEffectブロックの実行は、コードの上から順に実施されている
  //Firestoreからメモ一覧取得
  useEffect(() => {
    console.log("useEffect: fetch memo list");
    let unsubscribe = () => {};
    setLoading(true);
    try {
      const { currentUser } = auth;
      console.log("uid: " + currentUser.uid);
      const ref = collection(db, `users/${currentUser.uid}/memos`);
      const q = query(ref, orderBy("updatedAt", "desc"));

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log("onSnapshot start");
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
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          const err = translateErrors(error.code);
          Alert.alert(err.title, "メモ一覧取得に失敗しました");
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

  //ナビゲーションヘッダにログアウトボタン追加
  useEffect(() => {
    console.log("useEffect: add LogOutButton");
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  // Loadingコンポーネントを配置するのは、メモが0件の場合
  return memoList.length === 0 ? (
    <View style={emptyStyles.container}>
      <Loading isLoading={loading} />
      <View style={emptyStyles.inner}>
        <Text style={emptyStyles.title}>最初のメモを作成しよう！</Text>
        <Button
          style={emptyStyles.button}
          label="作成する"
          onPress={() => {
            navigation.navigate("MemoCreate");
          }}
        ></Button>
      </View>
    </View>
  ) : (
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

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: "center",
  },
});
