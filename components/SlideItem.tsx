import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Azkar } from "@/types";
// import { Progress } from "./ui/progress";
import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get("screen");

interface SlideItemProps {
  item: Azkar;
}

const SlideItem = ({ item }: SlideItemProps) => {
  const translateYImage = new Animated.Value(40);
  const [completeCount, setCompleteCount] = React.useState(0);

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
      {/* {item.count !== 0 && <Text style={styles.count}>{item.count}</Text>} */}
      {item.count !== 0 && (
        <View
          style={{
            // position: "absolute",
            // bottom: 0,
            // left: 0,
            // right: 0,
            // top: 150,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (completeCount < item.count) {
                setCompleteCount(completeCount + 1);
              }
            }}
          >
            <Progress.Circle
              progress={completeCount / item.count}
              size={80}
              indeterminate={false}
              showsText={true}
              textStyle={{ fontSize: 40, fontWeight: "semibold" }}
              formatText={() =>
                completeCount === 0 ? `${item.count}` : `${completeCount}`
              }
              //   fill={item.count === completeCount ? "#16a34a" : "transparent"}
              //   textStyle={{
              //     color: item.count === completeCount ? "white" : "black",
              //   }}
              //   formatText={() => `${completeCount}/${item.count}`}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    // alignItems: "center",
    // paddingVertical: 14,
    textAlign: "right",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
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
