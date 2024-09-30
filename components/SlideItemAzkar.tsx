import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Text } from "@/components/ui/text";

import React, { useEffect } from "react";
import { Azkar } from "@/types";
// import { Progress } from "./ui/progress";
import * as ProgressReact from "react-native-progress";
import { cn } from "@/lib/utils";
import { ChevronLeft, RotateCcw } from "lucide-react-native";
import { Button } from "./ui/button";
import Swiper from "react-native-swiper";
import { images } from "@/constants/indxe";
import { Progress } from "./ui/progress";
import { useColorScheme } from "@/lib/useColorScheme";

const { width, height } = Dimensions.get("screen");

interface SlideItemProps {
  item: Azkar;
  itemLength?: number;
  data?: Azkar[];
}

const SlideItemAzkar = ({ item, itemLength, data }: SlideItemProps) => {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const translateYImage = new Animated.Value(40);
  const [completeCount, setCompleteCount] = React.useState(0);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  const calcProgress = () => {
    if (itemLength && data && data.indexOf(item) === itemLength - 1) {
      return 100;
    } else {
      return data && itemLength && (data.indexOf(item) / itemLength) * 100;
    }
  };

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
      <ScrollView scrollEnabled={item.zekr.length > 500} className="">
        <View style={styles.container}>
          {/* <View className="py-4">
            <Progress value={calcProgress()} />
          </View> */}
          <TouchableWithoutFeedback
            onPress={() => {
              if (completeCount < item.count) {
                setCompleteCount(completeCount + 1);
              }
            }}
          >
            <View>
              <View className="rounded-3xl">
                <ImageBackground
                  resizeMode="cover"
                  source={images.islamicPattern}
                  style={{
                    padding: 10,
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <Text
                    // style={styles.title}
                    className={cn(
                      "text-xl text-white text-center",
                      // item.zekr.includes(
                      //   "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ"
                      // )
                      //   ? "text-center"
                      //   : "text-right",
                      // item.zekr.includes(
                      //   "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ"
                      // )
                      //   ? "text-center"
                      //   : "text-right",
                      // item.zekr.includes("بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم")
                      //   ? "text-center"
                      //   : "text-right",
                      item.zekr.match(/\d+/g)
                        ? "font-amiriRegular leading-loose"
                        : "font-normal"
                    )}
                  >
                    {item.zekr}
                  </Text>
                </ImageBackground>
              </View>
              <Text className="text-right text-lg mt-9">
                {item.description}
              </Text>
              {item.reference !== "" && (
                <Text
                  style={styles.reference}
                  className={cn(
                    "",
                    isDarkColorScheme ? "text-white" : "text-muted-foreground"
                  )}
                >
                  ({item.reference})
                </Text>
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
          </TouchableWithoutFeedback>
          {item.count !== 0 && (
            <View className="h-screen">
              <TouchableWithoutFeedback
                onPress={() => {
                  if (completeCount < item.count) {
                    setCompleteCount(completeCount + 1);
                  }
                }}
              >
                <View className="h-screen"></View>
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          height: 170,
          width: "100%",
          borderTopColor: isDarkColorScheme ? "#1a1a1a" : "#E5E7EB",
          borderTopWidth: 1,
          backgroundColor: isDarkColorScheme ? "#1a1a1a" : "white",
        }}
      >
        <View
          className={cn(
            "flex flex-row  items-center p-4 ",
            item.count !== 0 ? "justify-between" : "justify-center"
          )}
        >
          <Text>
            {itemLength && data && `${data.indexOf(item) + 1}/${itemLength}`}
          </Text>
          <View></View>
          <View>
            {item.count !== 0 && (
              <View
                className="pr-6"
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
                  <View
                    className={cn(
                      "rounded-full",
                      isDarkColorScheme ? "bg-muted" : "bg-white"
                    )}
                  >
                    <ProgressReact.Circle
                      progress={completeCount / item.count}
                      size={80}
                      indeterminate={false}
                      showsText={true}
                      textStyle={{
                        fontSize: 40,
                        fontWeight: "semibold",
                      }}
                      formatText={() => completeCount}
                      color="#eaa92d"
                      borderWidth={1}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
          <View></View>
          {item.count !== 0 && (
            <TouchableOpacity
              onPress={() => {
                setCompleteCount(0);
              }}
            >
              <RotateCcw
                size={20}
                color={isDarkColorScheme ? "white" : "black"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default SlideItemAzkar;

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
    // color: "#333",
    textAlign: "right",
    marginTop: 10,
  },
  count: {
    fontSize: 32,
    color: "#333",
    textAlign: "center",
  },
});
