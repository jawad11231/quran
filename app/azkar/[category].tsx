import { getAzkarByCate } from "@/services/AzkarService";
import { Azkar } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Animated,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Text } from "@/components/ui/text";
import { useQuery } from "react-query";
import Swiper from "react-native-swiper";
import PagerView from "react-native-pager-view";
import SlideItem from "@/components/SlideItemAzkar";
import Pagination from "@/components/Pagination";
import { Header } from "@/components/Header";
import SlideItemAzkar from "@/components/SlideItemAzkar";

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
    <SafeAreaView className="">
      <Header title={local.category as string} chevronTitle="اذكار" />
      <View className="h-full">
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <SlideItemAzkar
                item={item}
                itemLength={data?.length}
                data={data}
                handleOnScroll={handleOnScroll}
                scrollX={scrollX}
              />
            )}
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
