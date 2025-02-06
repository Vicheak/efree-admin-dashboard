function goTo({ path, query = {} }) {
    const { $i18n } = useNuxtApp();
    const locale = $i18n.locale.value;
    const defaultLocale = $i18n.defaultLocale;
    const localizedPath = locale === defaultLocale ? path : `/${locale}${path}`;
    return navigateTo({ path: localizedPath, query });
  }
  
  export default goTo;
  