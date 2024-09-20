import Header from "@/components/Header";
import QiblaCompass from "@/components/QiblaCompass";
import { useColorScheme } from "@/lib/useColorScheme";
import { SafeAreaView, Text, View } from "react-native";

const Qibla = () => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="">
      <Header
        title="أتجاه القبلة"
        chevronTitle="الرئيسية"
        viewChevron={false}
        viewList={false}
      />
      <View className="mx-auto my-auto">
        <QiblaCompass
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          backgroundColor="transparent"
          compassImage={
            colorScheme === "dark"
              ? require("../../assets/images/compass_dark.png")
              : require("../../assets/images/compass_light.png")
          }
          textStyles={{
            textAlign: "center",
            fontSize: 24,
            fontFamily: "HelveticaNeueLTArabic-Roman",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Qibla;
