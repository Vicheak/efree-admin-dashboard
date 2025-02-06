import { useLanguageStore } from "~/store/language";

function getNameByLang(data, key = null) {
  const { langLangauge1: langCode } = useLanguageStore();

  if (Array.isArray(data)) {
    const nameObj = data.find(
      (item) => item?.code === langCode || item?.language_code === langCode
    ) || data.find(
      (item) => item?.code === 'en' || item?.language_code === 'en'
    );
    return nameObj ? (key ? nameObj[key] : nameObj) : null;
  }

  if (typeof data === "string") {
    try {
      const parsedData = JSON.parse(data);
      return parsedData[langCode] || parsedData['en'] || null;
    } catch (error) {
     return "Invalid JSON string provided:";
    }
  }
  return null;
}

export default getNameByLang;
