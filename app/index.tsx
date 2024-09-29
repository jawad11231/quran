import { Text } from "@/components/ui/text";
import { images } from "@/constants/indxe";
import useGetPrayersTime from "@/utils/useGetPrayersTime";
import { Redirect, router } from "expo-router";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Settings,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import { getLocales } from "expo-localization";
import { getUserLocation } from "@/utils";
import { useEffect, useState } from "react";
import { MapPin, Settings2, SettingsIcon } from "lucide-react-native";

type Timings = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

const Page = () => {
  const { timings, isLoading, error } = useGetPrayersTime() as {
    timings: Timings;
    isLoading: boolean;
    error: string;
  };

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Location Loading....."
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  //check if location is enable or not
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync(); //returns true or false
    if (!enabled) {
      //if not enable
      Alert.alert("الموقع غير مفعل", "السماح بالوصول للموقع", [
        {
          text: "إلغاء",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "موافقة", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setLocationServicesEnabled(enabled); //store true into state
    }
  };
  //get current location
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync(); //used for the pop up box where we give permission to use location
    // console.log(status);
    if (status !== "granted") {
      Alert.alert(
        "تم رفض الوصول إلى الموقع",
        "يجب السماح بالوصول إلى الموقع لاستخدام هذه الميزة",
        [
          {
            text: "إلغاء",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "موافقة", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    //get current position lat and long
    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords);

    if (coords) {
      const { latitude, longitude } = coords;
      // console.log(latitude, longitude);

      //provide lat and long to get the the actual address
      let responce = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // console.log(responce);
      //loop on the responce to get the actual result
      for (let item of responce) {
        let address = `${item.city}, ${item.country}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const nextPrayer =
    // timings &&
    // (Object.keys(timings) as (keyof Timings)[]).find((key) => {
    //   const time = timings[key].split(" ")[0];
    //   const [hours, minutes] = time.split(":");
    //   const [currentHours, currentMinutes] = [
    //     new Date().getHours(),
    //     new Date().getMinutes(),
    //   ];
    //   const currentTime = currentHours * 60 + currentMinutes;
    //   const prayerTime = parseInt(hours) * 60 + parseInt(minutes);
    //   return prayerTime > currentTime
    timings &&
    (Object.keys(timings) as (keyof Timings)[]).find((key) => {
      const time = timings[key].split(" ")[0];
      const [hours, minutes] = time.split(":");
      const [currentHours, currentMinutes] = [
        new Date().getHours(),
        new Date().getMinutes(),
      ];
      const currentTime = currentHours * 60 + currentMinutes;
      const prayerTime = parseInt(hours) * 60 + parseInt(minutes);
      // if the next prayer is after midnight
      if (prayerTime < currentTime) {
        // return jajr
        return key === "Fajr";
      }
      return prayerTime > currentTime;
    });

  const calcHowManyTimeToNextPrayer = () => {
    if (nextPrayer && timings) {
      const time = timings[nextPrayer].split(" ")[0];
      const [hours, minutes] = time.split(":");
      const [currentHours, currentMinutes] = [
        new Date().getHours(),
        new Date().getMinutes(),
      ];
      const currentTime = currentHours * 60 + currentMinutes;
      const prayerTime = parseInt(hours) * 60 + parseInt(minutes);
      const diff = prayerTime - currentTime;
      const hoursDiff = Math.floor(diff / 60);
      const minutesDiff = diff % 60;
      if (hoursDiff < 0 || minutesDiff < 0) {
        return `${24 + hoursDiff}س و ${60 + minutesDiff}د`;
      }
      return `${hoursDiff}س و ${minutesDiff}د`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calcHowManyTimeToNextPrayer();
    }, 60000);
    return () => clearInterval(interval);
  }, [calcHowManyTimeToNextPrayer()]);

  // console.log("timings", timings);
  // console.log("nextPrayer", nextPrayer);
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex flex-col gap-4">
        <View className="flex-1">
          <View className="relative w-full h-[319px]">
            <ImageBackground
              source={images.homeBachground}
              className="z-0 w-full h-[319px]"
            >
              <View className="flex flex-col gap-11 pt-16 px-4">
                <View className="flex flex-row justify-between w-full">
                  <View className="flex flex-row gap-2">
                    <View className="p-2 h-3/4 bg-white/10 rounded-full">
                      <SettingsIcon size={16} color="white" />
                    </View>
                    <View
                      className="p-2 h-3/4 flex flex-row gap-1 bg-white/10 rounded-full justify-center items-center"
                      onTouchStart={() => {
                        router.push("/sabhaPage");
                      }}
                    >
                      <Text className="font-cairoBold text-white">سبحة</Text>
                      <Image
                        source={images.sabha}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 50,
                        }}
                      />
                    </View>
                  </View>
                  <View className="flex flex-col gap-1 items-end">
                    <Text className="text-xs text-white font-cairoBold">
                      <MapPin size={14} color="white" /> الموقع
                    </Text>
                    <Text className="text-sm text-white font-cairoBold">
                      {displayCurrentAddress}
                    </Text>
                  </View>
                </View>
                <View className="items-center mb-4">
                  {timings && (
                    <View className="">
                      <View className="flex flex-col items-center justify-center pt-4">
                        <Text className="text-4xl text-white font-cairoBold pt-4">
                          {timings &&
                            nextPrayer &&
                            timings[nextPrayer!].split(" ")[0]}
                        </Text>
                        <Text className="text-lg text-white font-cairoBold">
                          {timings && nextPrayer
                            ? nextPrayer !== "Sunrise" && `موعد أذان`
                            : ""}{" "}
                          {timings && nextPrayer === "Asr"
                            ? "العصر"
                            : nextPrayer === "Dhuhr"
                            ? "الظهر"
                            : nextPrayer === "Fajr"
                            ? "الفجر"
                            : nextPrayer === "Isha"
                            ? "العشاء"
                            : nextPrayer === "Maghrib"
                            ? "المغرب"
                            : ""}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
                {timings && nextPrayer !== "Sunrise" && (
                  <View className="items-end">
                    <View className="flex flex-row gap-1">
                      <View>
                        {timings && nextPrayer && (
                          <Text className="text-primary font-cairoBold">
                            {calcHowManyTimeToNextPrayer()}
                          </Text>
                        )}
                      </View>
                      <View>
                        {timings && nextPrayer ? (
                          <Text className="text-white font-cairoBold">
                            متبقى على الأذان
                          </Text>
                        ) : (
                          <View></View>
                        )}
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </ImageBackground>
          </View>
        </View>
        <View className="p-2 px-4 flex flex-col gap-4">
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
              <Text className="leading-8 text-white">
                اللهم أنت ربي لا إله إلا أنت خلقتني وأنا عبدك، وأنا على عهدك
                ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي،
                وأبوء بذنبي فاغفر لي، فإنه لا يغفر الذنوب إلا أنت.
              </Text>
            </ImageBackground>
          </View>
          <View>
            <Text className="text-2xl font-cairoBold pt-2">اكتشف التطبيق</Text>
            <Text className="text-sm text-muted-foreground">
              اكتشف المزايا والخصائص الكاملة لتطبيقنا
            </Text>
          </View>
          <View style={[styles.frameParent, styles.frameFlexBox]}>
            <TouchableOpacity
              style={[styles.frameGroup, styles.frameFlexBox]}
              onPress={() => router.push("/azkarPage")}
            >
              <View style={[styles.parent, styles.parentFlexBox]}>
                <Text style={[styles.text, styles.textTypo]}>الأذكار</Text>
                <Text style={styles.text1}>سكون الروح</Text>
              </View>
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={images.praying}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.frameGroup, styles.frameFlexBox]}
              onPress={() => router.push("/quranPage")}
            >
              <View style={[styles.parent, styles.parentFlexBox]}>
                <Text style={[styles.text2, styles.textTypo]}>
                  القرآن الكريم
                </Text>
                <Text style={styles.text1}>نور الهداية</Text>
              </View>
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={images.quran}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.frameGroup, styles.frameFlexBox]}
              onPress={() => router.push("/prayersPage")}
            >
              <View style={styles.parentFlexBox}>
                <Text style={[styles.text2, styles.textTypo]}>
                  اوقات الصلاة
                </Text>
                <Text style={styles.text1}>أوقات العبادة</Text>
              </View>
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={images.shalat}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.frameGroup, styles.frameFlexBox]}
              onPress={() => router.push("/qiblaPage")}
            >
              <View style={[styles.parent, styles.parentFlexBox]}>
                <Text style={[styles.text, styles.textTypo]}>القبلة</Text>
                <Text style={styles.text1}>اتجاه الصلاة</Text>
              </View>
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={images.nabawiMosque}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  frameFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  parentFlexBox: {
    // gap: 4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  textTypo: {
    color: "#111f20",
    fontFamily: "Alexandria-SemiBold",
    fontWeight: "600",
    lineHeight: 16,
    fontSize: 14,
    textAlign: "right",
  },
  text: {
    textAlign: "right",
    alignSelf: "stretch",
  },
  text1: {
    fontSize: 12,
    fontFamily: "Alexandria-Regular",
    color: "#999",
    textAlign: "right",
    alignSelf: "stretch",
  },
  parent: {
    width: 81,
  },
  frameChild: { width: 48, height: 48 },
  frameGroup: {
    borderRadius: 12,
    backgroundColor: "#fff",
    width: 173,
    height: 120,
    justifyContent: "flex-end",
    padding: 12,
    gap: 10,
  },
  text2: {
    textAlign: "right",
  },
  frameParent: {
    gap: 8,
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "stretch",
  },
});
