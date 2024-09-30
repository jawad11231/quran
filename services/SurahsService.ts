import ayatData from "@/assets/data/ayat";
import surahsData from "@/assets/data/surahs";

export const getSuraWithAyat = (id: number) => {
  let sora = surahsData.filter((sora) => sora.number === id)[0];
  let ayat = ayatData.filter((aya) => aya.sora === id);
  return { ...sora, ayat: ayat };
};

export const getSuar = () => {
  return surahsData;
};

export const getAyatNumberBySuar = (id: number) => {
  return ayatData.filter((aya) => aya.sora === id).map((aya) => aya.aya_no)
    .length;
};

export default { getSuraWithAyat, getSuar, getAyatNumberBySuar };
