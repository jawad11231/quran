import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeQuran = async (
  number: number,
  surah: string,
  ayah: number
) => {
  try {
    await AsyncStorage.setItem("number", number.toString());
    await AsyncStorage.setItem("surah", surah);
    await AsyncStorage.setItem("ayah", ayah.toString());
  } catch (error) {
    console.log(error);
  }
};

export const getSaveQuran = async () => {
  try {
    const number = await AsyncStorage.getItem("number");
    const surah = await AsyncStorage.getItem("surah");
    const ayah = await AsyncStorage.getItem("ayah");
    if (number && surah && ayah) {
      return { number: parseInt(number), surah, ayah: parseInt(ayah) };
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveAddress = async (address: string) => {
  try {
    await AsyncStorage.setItem("address", address);
  } catch (error) {
    console.log(error);
  }
};

export const getAddress = async () => {
  try {
    const address = await AsyncStorage.getItem("address");
    if (address) {
      return address;
    } else {
      return "Location Loading.....";
    }
  } catch (error) {
    console.log(error);
  }
};
