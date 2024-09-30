import { getAzkarByCate } from "@/services/AzkarService";
import { Azkar } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
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
import SlideItemAzkar from "@/components/SlideItemAzkar";
import { ArrowRight } from "lucide-react-native";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";

const AzkarCategory = () => {
  const local = useLocalSearchParams();
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

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
    <SafeAreaView
      className={cn("", isDarkColorScheme ? "bg-background" : "bg-white")}
    >
      {/* <Header
        title={local.category as string}
        chevronTitle="اذكار"
        viewList={false}
      /> */}
      <View
        className="flex flex-row gap-2 items-center justify-end  px-3 py-4"
        onTouchStart={() => {
          router.back();
        }}
      >
        <Text className="text-lg font-cairoBold">الأذكار</Text>
        <View
          className={cn(
            "rounded-full h-5 w-5 flex items-center justify-center",
            isDarkColorScheme ? "bg-white" : "bg-black"
          )}
        >
          <ArrowRight size={14} color={isDarkColorScheme ? "black" : "white"} />
        </View>
      </View>
      <View className="h-full">
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <SlideItemAzkar
                item={item}
                itemLength={data?.length}
                data={data}
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
