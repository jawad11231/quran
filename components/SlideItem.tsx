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
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { Azkar } from "@/types";
// import { Progress } from "./ui/progress";
import * as Progress from "react-native-progress";
import { cn } from "@/lib/utils";
import { ChevronLeft, RotateCcw } from "lucide-react-native";
import { Button } from "./ui/button";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("screen");

interface SlideItemProps {
  item: Azkar;
  itemLength?: number;
  data?: Azkar[];
  scrollX: Animated.Value;
  handleOnScroll: (event: any) => void;
}

const SlideItem = ({
  item,
  itemLength,
  data,
  handleOnScroll,
  scrollX,
}: SlideItemProps) => {
  const translateYImage = new Animated.Value(40);
  const [completeCount, setCompleteCount] = React.useState(0);
  const [opening, setOpening] = React.useState<string | null>(null);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  // if (item.zekr.includes("أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ")) {
  //   setOpening("أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ");
  //   item.zekr = item.zekr.replace(
  //     "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ",
  //     ""
  //   );
  // }
  // if (item.zekr.includes("بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم")) {
  //   setOpening("بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ");
  //   item.zekr = item.zekr.replace("بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم", "");
  // }

  useEffect(() => {
    if (item.zekr.includes("أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ")) {
      setOpening("أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ");
      item.zekr = item.zekr.replace(
        "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ",
        ""
      );
    }
  }, [item.zekr.includes("أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ")]);

  useEffect(() => {
    if (item.zekr.includes("بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم")) {
      setOpening("بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ");
      item.zekr = item.zekr.replace("بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم", "");
    }
  }, [item.zekr.includes("بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم")]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (completeCount < item.count) {
            setCompleteCount(completeCount + 1);
          }
        }}
      >
        <View style={styles.container}>
          <View>
            <View
              style={{
                marginTop: 20,
              }}
            >
              {opening && (
                <Text className="text-right text-xl" key={opening}>
                  {opening}
                </Text>
              )}
            </View>
            <Text
              // style={styles.title}
              className={cn(
                "text-xl text-right ",
                item.zekr.match(/\d+/g)
                  ? "font-amiriRegular leading-loose"
                  : "font-normal"
              )}
            >
              {item.zekr}
            </Text>
            <Text className="text-right text-lg mt-12">{item.description}</Text>
            {item.reference !== "" && (
              <Text style={styles.reference}>({item.reference})</Text>
            )}
            {item.count !== 0 && (
              <View className="border-t border-border flex justify-center items-center p-2 mt-4">
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "light",
                    color: "grey",
                  }}
                >
                  {completeCount}/{item.count}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          height: 170,
          width: "100%",
          borderTopColor: "#E5E7EB",
          borderTopWidth: 1,
          // backgroundColor: "#F3F4F6",
        }}
      >
        <View className="flex flex-row justify-between items-center p-4">
          <Text>
            {itemLength && data && `${data.indexOf(item) + 1}/${itemLength}`}
          </Text>
          <Text>ff</Text>
          <View>
            {item.count !== 0 && (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (completeCount < item.count) {
                      setCompleteCount(completeCount + 1);
                    }
                  }}
                >
                  <View className="bg-white rounded-full">
                    <Progress.Circle
                      progress={completeCount / item.count}
                      size={80}
                      indeterminate={false}
                      showsText={true}
                      textStyle={{ fontSize: 40, fontWeight: "semibold" }}
                      formatText={() => completeCount}
                      // fill="white"
                      className="bg-white"
                      borderWidth={1}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              if (data) {
                scrollX.setValue(width * (data.length - 1));
              }
            }}
          >
            <ChevronLeft size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCompleteCount(0);
            }}
          >
            <RotateCcw size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // alignItems: "center",
    padding: 16,
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
  },
  title: {
    fontSize: 20,
    fontWeight: "semibold",
    color: "#333",
    textAlign: "right",
  },
  description: {
    fontSize: 18,
    marginTop: 50,
    color: "#333",
    textAlign: "right",
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
  },
  reference: {
    fontSize: 12,
    color: "#333",
    textAlign: "right",
    marginTop: 10,
  },
  count: {
    fontSize: 32,
    color: "#333",
    textAlign: "center",
  },
});
