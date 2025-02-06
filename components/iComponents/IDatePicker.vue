<template>
  <DatePicker
    v-model="value"
    :range="range"
    :multi-calendars="multiCalendars"
    :placeholder="$t('date')"
    :preset-dates="range ? presetDates : []"
    :format="formatDate"
    :enable-time-picker="enableTimePicker"
    :locale="locale"
    @cleared="cleared"
  >
    <template #preset-date-range-button="{ label, value, presetDate }">
      <span
        role="button"
        :tabindex="0"
        @click="presetDate(value)"
        @keyup.enter.prevent="presetDate(value)"
        @keyup.space.prevent="presetDate(value)"
      >
        {{ label }}
      </span>
    </template>
  </DatePicker>
</template>
<script setup>
import DatePicker from "@vuepic/vue-datepicker";
import moment from "moment";
import { useLanguageStore } from "~/store/language";

const { $i18n } = useNuxtApp();
const language = useLanguageStore().langLangauge;
const props = defineProps({
  modelValue: {
    default: [],
  },
  range: {
    type: Boolean,
    default: true,
  },
  multiCalendars: {
    type: Boolean,
    default: true,
  },
  format: {
    type: String,
    default: "DD-MM-YYYY HH:mm:ss",
  },
  dateOnly: {
    type: Boolean,
    default: false,
  },
  enableTimePicker: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:modelValue", "dateChange"]);
// const dateFilter = ref();
const presetDates = ref([
  {
    label: $i18n.t("today"),
    value: [moment().startOf("day").toDate(), moment().endOf("day").toDate()],
  },
  {
    label: $i18n.t("yesterday"),
    value: [
      moment().startOf("day").subtract(1, "day").toDate(),
      moment().endOf("day").subtract(1, "day").toDate(),
    ],
  },
  {
    label: $i18n.t("this_week"),
    value: [moment().startOf("week").toDate(), moment().endOf("week").toDate()],
  },
  {
    label: $i18n.t("last_week"),
    value: [
      moment().subtract(1, "week").startOf("week").toDate(),
      moment().subtract(1, "week").endOf("week").toDate(),
    ],
  },
  {
    label: $i18n.t("this_month"),
    value: [
      moment().startOf("month").toDate(),
      moment().endOf("month").toDate(),
    ],
  },
  {
    label: $i18n.t("last_month"),
    value: [
      moment().subtract(1, "month").startOf("month").toDate(),
      moment().subtract(1, "month").endOf("month").toDate(),
    ],
  },
  {
    label: $i18n.t("this_year"),
    value: [moment().startOf("year").toDate(), moment().endOf("year").toDate()],
  },
  {
    label: $i18n.t("last_year"),
    value: [
      moment().subtract(1, "year").startOf("year").toDate(),
      moment().subtract(1, "year").endOf("year").toDate(),
    ],
  },
]);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    const format = props.enableTimePicker ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
    if (props.range && value) {
      emit("dateChange", value ? [
        moment(value[0]).format(format),
        moment(value[1]).format(format),
      ] : null);
      emit("update:modelValue", value ? [
        moment(value[0]).format(format),
        moment(value[1]).format(format),
      ] : null);
    } else {
      emit("dateChange", value ? moment(value).format(format) : null);
      emit("update:modelValue", value ? moment(value).format(format) : null);
    }
  },
});

const locale = computed(() => {
  if (language == "kh") {
    return "km";
  } else {
    return "en";
  }
});


const cleared = () => {
  emit("update:modelValue", null);
  emit("dateChange", null);
};

const formatDate = (date) => {
  if (props.range && date) {
    return (
      moment(date[0]).format(props.format) +
      " ~ " +
      moment(date[1]).format(props.format)
    );
  } else {
    return moment(date).format(props.format);
  }
};
</script>
