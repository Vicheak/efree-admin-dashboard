<template>
  <li class="onhover-dropdown">
    <div class="translate_wrapper">
      <div class="current_lang">
        <div class="lang" @click="display()">
          <i class="flag-icon" :class="langIcon"></i>
          <span class="lang-txt">{{ langLanguage }}</span>
        </div>
      </div>
    </div>
    <div
      class="onhover-show-div lang-dropdown active"
      :class="{ active: notification }"
    >
      <ul>
        <li class="lang" v-for="locale in availableLocales" :key="locale.code">
          <a
          href="#"
          @click.prevent="() => { changeLocale(locale); navigateToPath(locale.code); }"
          style="width: 100%"
        >
          <i class="flag-icon" :class="locale.icon"></i>
          <span class="lang-txt">{{ locale.name }}</span>
        </a>
        </li>
      </ul>
    </div>
  </li>
  <!-- <div class="translate_wrapper onhover-dropdown" :class="{ active: isActive }">
    <div class="current_lang">
      <div class="lang" @click="display()">
        <i class="flag-icon" :class="langIcon"></i
        ><span class="lang-txt">{{ langLangauge }}</span>
      </div>
    </div>

    <div class="more_lang" :class="{ active: isActive }">
      <div class="lang" v-for="locale in availableLocales" :key="locale.code">
        <nuxt-link :to="switchLocalePath(locale.code)" style="width: 100%">
          <i class="flag-icon" :class="locale.icon"></i>
          <span class="lang-txt" @click="changeLocale(locale)"
            >{{ locale.name }}
          </span>
        </nuxt-link>
      </div>
    </div>
  </div> -->
</template>
<script setup>
import { useLanguageStore } from "~~/store/language";

const isActive = ref(false);
const languageStore = useLanguageStore();
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();



const navigateToPath = (localeCode) => {
  const newPath = switchLocalePath(localeCode);
  if (newPath) {
    router.push(newPath); // Navigate to the new locale path
  }
};

const availableLocales = computed(() =>
  locales.value.filter((l) => l.code !== locale.value)
);

const currentLocale = computed(() =>
  locales.value.find((l) => l.code === locale.value) || {}
);
const langIcon = computed(() => currentLocale.value.icon || "flag-icon-us");
const langLanguage = computed(() => currentLocale.value.code || "EN");

const display = () => {
  isActive.value = !isActive.value;
};

const changeLocale = (newLocale) => {
  document.body.className = document.body.className
    .split(" ")
    .filter((cls) => !cls.startsWith("lang-"))
    .join(" ")
    .trim();
  document.body.classList.add(`lang-${newLocale.code}`);

  locale.value = newLocale.code;
  localStorage.setItem("currentLanguage", newLocale.code);
  localStorage.setItem("currentLanguageIcon", newLocale.icon);

  languageStore.changeLang(newLocale);
};

onMounted(() => {
  const storedLanguage = {
    code: localStorage.getItem("currentLanguage") || "EN",
    icon: localStorage.getItem("currentLanguageIcon") || "flag-icon-us",
  };
  languageStore.changeLang(storedLanguage);
  document.body.classList.add(`lang-${storedLanguage.code}`);
});
</script>
