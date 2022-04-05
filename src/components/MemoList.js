import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Icon } from "./Icon";
import { useNavigation } from "@react-navigation/native";
import { shape, string, instanceOf, arrayOf } from "prop-types";
import { dateToString, translateErrors } from "../utils";
import { Loading } from "./Loading";
import { auth, db } from "../lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const MemoList = (props) => {
  const { memoList } = props;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handlePress = (id) => {
    const { currentUser } = auth;
    if (currentUser) {
      Alert.alert("削除します", "よろしいですか？", [
        {
          text: "キャンセル",
          onPress: () => {},
        },
        {
          text: "削除する",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              const ref = doc(db, `users/${currentUser.uid}/memos/${id}`);
              await deleteDoc(ref);
            } catch (error) {
              console.log(error);
              const err = translateErrors(error.code);
              Alert.alert(err.title, err.description);
            } finally {
              setLoading(false);
            }
          },
        },
      ]);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => {
          navigation.navigate("MemoDetail", { id: item.id });
        }}
      >
        <View style={styles.memoInner}>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>
            {item.body}
          </Text>
          <Text style={styles.memoListItemDate}>{dateToString(item.date)}</Text>
        </View>
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => {
            handlePress(item.id);
          }}
        >
          <Icon name="delete" size={24} color="#B0B0B0" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.continer}>
      <Loading isLoading={loading} />
      <FlatList
        data={memoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  continer: {
    flex: 1,
  },
  memoInner: {
    flex: 1,
  },
});

MemoList.propTypes = {
  memoList: arrayOf(
    shape({
      id: string,
      body: string,
      date: instanceOf(Date),
    })
  ).isRequired,
};
