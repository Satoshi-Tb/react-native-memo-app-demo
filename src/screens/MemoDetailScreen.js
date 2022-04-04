import { useState, useEffect } from "react";
import { string, shape } from "prop-types";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { CircleButton } from "../components/CircleButton";
import { Loading } from "../components/Loading";
import { auth, db } from "../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { dateToString } from "../utils";

export const MemoDetailScreen = (props) => {
  const { navigation, route } = props;
  const { id } = route.params;
  const [memo, setMemo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let unsubscribe = () => {};
    try {
      console.log("memo list fetch start");
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
          Alert.alert("Error", "メモ取得エラー");
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert("Error", "メモ取得エラー");
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Loading isLoading={loading} />
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>
          {memo?.body ?? ""}
        </Text>
        <Text style={styles.memoDate}>{dateToString(memo?.date)}</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>{memo?.body ?? ""}</Text>
      </ScrollView>
      <CircleButton
        style={{ top: 60, bottom: "auto" }}
        name="pencil"
        onPress={() => {
          navigation.navigate("MemoEdit", { id: memo?.id ?? "" });
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
  memoHeader: {
    backgroundColor: "#467FD3",
    height: 96,
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: "#ffffff",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
  },
  memoDate: {
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
  },
});

MemoDetailScreen.propTypes = {
  route: shape({ params: shape({ id: string }) }).isRequired,
};
