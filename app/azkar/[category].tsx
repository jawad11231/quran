import { getAzkarByCate } from "@/services/AzkarService";
import { Azkar } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Animated,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import Swiper from "react-native-swiper";
import PagerView from "react-native-pager-view";
import SlideItem from "@/components/SlideItem";
import Pagination from "@/components/Pagination";

const AzkarCategory = () => {
  const local = useLocalSearchParams();

  const { data, isLoading } = useQuery(
    `azkar${local.category}`,
    async () => getAzkarByCate(local.category as string),
    { staleTime: Infinity }
  );

  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      // console.log('viewableItems', viewableItems);
      setIndex(viewableItems[0].index);
    }
  ).current;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <View className="h-full">
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => <SlideItem item={item} />}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onScroll={handleOnScroll}
            onViewableItemsChanged={handleOnViewableItemsChanged}
            inverted={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AzkarCategory;
