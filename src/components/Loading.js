import { bool } from "prop-types";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export const Loading = (props) => {
  const { isLoading = false } = props;
  return (
    isLoading && (
      <View style={styles.container}>
        <View style={styles.inner}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 5, // 最上段に配置させる指定
  },
  inner: {
    marginBottom: 80,
  },
});

Loading.propTypes = {
  isLoading: bool,
};
