import { Text } from "@/components/ui/text";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import { useEffect, useState } from "react";
import { Ayah } from "@/types";
import { useQuery } from "react-query";
import Fav from "@/utils/Favs";
import { getSuraWithAyat } from "@/services/SurahsService";
import usePlayAyah from "@/utils/usePlayAyah";
import { ArrowRight } from "lucide-react-native";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";

const surah = () => {
  useKeepAwake();
  const local = useLocalSearchParams();
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  console.log(local);

  const [openedModal, setOpenModal] = useState(false);
  const [selectedAyah, setSelectedAyah] = useState<Ayah>();
  const [currentPage, setCurrentPage] = useState(1);

  //   const { data: Favs } = useQuery("favs", () => {
  //     return Fav.getFav();
  //   });

  //   {
  //     Favs?.map((fav) => {
  //       console.log(fav.id);
  //     });
  //   }

  const { isLoading, data, isFetched, isPreviousData } = useQuery(
    `sura${parseInt((local.id as string).split("s")[0])}`,
    () => {
      return getSuraWithAyat(parseInt((local.id as string).split("s")[0]));
    },
    { staleTime: Infinity }
  );

  const { playAyah, stop, isPlaying, isLoading: soundLoading } = usePlayAyah();

  const onPressAyah = (aya: Ayah) => {
    setSelectedAyah(aya);
    setOpenModal(true);
  };

  const [ayat, setAyat] = useState<string>("");

  //   if (ayat === "") {
  //     let ayat = "";
  //     data?.ayat.map((ayah, index) => {
  //       ayat += `${ayah.aya_text} ۝${ayah.aya_no} `;
  //     });
  //     setAyat(ayat);
  //   }

  if (ayat === "" && data) {
    let ayat = "";
    data?.ayat.map((ayah, index) => {
      ayat += `${ayah.aya_text}۝${ayah.aya_no} `;
    });
    setAyat(ayat);
  }

  useEffect(() => {
    if (ayat === "") {
      let ayat = "";
      data?.ayat.map((ayah, index) => {
        ayat += `${ayah.aya_text}۝${ayah.aya_no} `;
      });
      setAyat(ayat);
    }
  }, [ayat]);

  //   console.log(ayat);

  return (
    <SafeAreaView
      className={cn(
        "flex-1 ",
        isDarkColorScheme ? "bg-background" : "bg-gray-100"
      )}
    >
      <ScrollView className="flex-1">
        <View
          className="flex flex-row gap-2 items-center justify-end  px-3 py-4"
          onTouchStart={() => {
            router.back();
          }}
        >
          <Text className="text-lg font-cairoBold">القرآن الكريم</Text>
          <View
            className={cn(
              "rounded-full h-5 w-5 flex items-center justify-center",
              isDarkColorScheme ? "bg-white" : "bg-black"
            )}
          >
            <ArrowRight
              size={14}
              color={isDarkColorScheme ? "black" : "white"}
            />
          </View>
        </View>
        <View className="p-4">
          <View
            style={{
              padding: 16,
              borderRadius: 16,
              backgroundColor: isDarkColorScheme ? "#1a1a1a" : "#fdf6ea",
              borderStyle: "solid",
              borderColor: isDarkColorScheme ? "#1a1a1a" : "#e4e4e4",
              borderWidth: 1,
              flex: 1,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              alignItems: "center",
              paddingHorizontal: 16,
              gap: 30,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <View style={styles.parent} className="">
              <Text className="font-amiriQuranColored text-xl">
                {data?.name_ar}
              </Text>
              <Text className="font-amiriQuranColored text-xl">
                الجزء {data?.ayat[0].jozz}
              </Text>
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={require("../../assets/images/Rectangle 5.png")}
              />
            </View>
            <View>
              <Text
                className="text-center text-2xl font-amiriRegular"
                style={{
                  lineHeight: 45,
                }}
              >
                {ayat}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default surah;

const styles = StyleSheet.create({
  frameChild: {
    position: "absolute",
    marginLeft: -10,
    top: -16,
    left: "50%",
    borderRadius: 1,
    width: 16,
    height: 50,
    zIndex: 2,
  },
  parent: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 0,
  },
});
