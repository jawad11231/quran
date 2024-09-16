import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import React from "react";
import { Azkar } from "@/types";

const { width, height } = Dimensions.get("screen");

interface SlideItemProps {
  item: Azkar;
}

const SlideItem = ({ item }: SlideItemProps) => {
  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.zekr}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.reference}>{item.reference}</Text>
      </View>
      {item.count && <Text style={styles.count}>{item.count}</Text>}
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    // alignItems: "center",
    padding: 20,
    textAlign: "right",
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  image: {
    flex: 0.6,
  },
  content: {
    flex: 0.4,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: "#333",
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
  },
  reference: {
    fontSize: 12,
    color: "#333",
    textAlign: "left",
  },
  count: {
    fontSize: 32,
    color: "#333",
    textAlign: "center",
  },
});
