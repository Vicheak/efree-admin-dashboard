<template>
  <div class="col-sm-12 pt-3 col-xl-12">
    <div class="card b-t-primary border-3">
      <div class="card-header">
        <div class="row gy-3 gy-lg-0 align-items-center">
          <div class="col-6">
            <h4 class="mb-0">{{ $t(props.title) }}</h4>
          </div>
          <div class="col-6">
            <div
              class="d-flex flex-wrap justify-content-end gap-2 dropdown-basic"
            >
              <div class="d-flex align-items-center gap-2">
                <button
                  class="btn btn-outline-primary"
                  v-if="buttonExcel"
                  @click="emit('excelClick')"
                >
                  <Icon name="uiw:file-excel" /> Excel
                </button>
                <button
                  class="btn btn-outline-primary"
                  v-if="buttonPrint"
                  @click="emit('printClick')"
                >
                  <Icon name="ic:outline-local-printshop" /> {{ $t("print") }}
                </button>
              </div>
              <button
                class="btn btn-outline-primary"
                @click="handleRefresh"
                v-if="buttonRefresh"
              >
                <Icon name="uil:sync" />
                {{ $t("refresh") }}
              </button>
              <button
                @click="emit('addClick')"
                class="btn btn-primary"
                v-if="buttonAdd"
              >
                <Icon name="mdi:plus-thick" /> {{ $t("add") }}
              </button>
              <slot name="top-button-action"></slot>

              <div v-if="enableActionDropdown" class="dropdown mb-0"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body" v-if="cardBody">
        <div class="row gy-3 gy-lg-0">
          <div class="col-12 col-lg-6">
            <div class="d-flex justify-content-start flex-wrap gap-2">
              <div class="dropdown mb-0">
                <button
                  class="btn btn-lightGray"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ tableSize }}
                  <span class="ms-1"
                    ><Icon name="fluent:caret-down-20-filled"
                  /></span>
                </button>
                <ul class="dropdown-menu">
                  <li
                    v-for="row in pageOption"
                    :key="row.index"
                    @click="pageOptionChange(row)"
                  >
                    <a class="dropdown-item" href="#">{{ row }}</a>
                  </li>
                </ul>
              </div>
              <div v-if="enableSort" class="dropdown mb-0">
                <button
                  class="btn btn-lightGray"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ $t("sort_by") }} {{ $t(sortByLabel) }}
                  <span class="ms-1"
                    ><Icon name="fluent:caret-down-20-filled"
                  /></span>
                </button>
                <ul class="dropdown-menu">
                  <li @click="sortBy = ''">
                    <a class="dropdown-item" href="#">{{ $t("reset") }}</a>
                  </li>
                  <li
                    v-for="obj in sortableColumn"
                    :key="obj.index"
                    @click="sortByChange(obj.key, obj.label)"
                  >
                    <a class="dropdown-item" href="#">{{ $t(obj.label) }}</a>
                  </li>
                </ul>
              </div>
              <div v-if="enableSort" class="dropdown mb-0">
                <button
                  class="btn btn-lightGray"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ $t(sortType) }}
                  <span class="ms-1"
                    ><Icon name="fluent:caret-down-20-filled"
                  /></span>
                </button>
                <ul class="dropdown-menu">
                  <li @click="sortTypeChange('asc')">
                    <a class="dropdown-item" href="#">{{ $t("asc") }}</a>
                  </li>
                  <li @click="sortTypeChange('desc')">
                    <a class="dropdown-item" href="#">{{ $t("desc") }}</a>
                  </li>
                </ul>
              </div>
              <div class="dropdown mb-0">
                <button
                  class="btn btn-lightGray"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class=""><Icon name="pajamas:eye-slash" /></span>
                </button>
                <ul class="dropdown-menu">
                  <li
                    v-for="obj in showColumn.value"
                    :key="obj.index"
                    @click="toggleColumn(obj)"
                  >
                    <a class="dropdown-item" style="float: right">
                      {{ $t(obj.label) }}
                      <span class="ms-1" v-if="obj.hide"
                        ><Icon name="pajamas:eye-slash"
                      /></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-6">
            <div class="d-flex justify-content-end gap-1">
              <div style="width: 350px">
                <IDatePicker
                  v-if="enableDatePicker"
                  v-model="filter.dateFilter"
                  :multiCalendars="multiCalendars"
                  :range="dateRange"
                  :enableTimePicker="enableTimePicker"
                  :format="
                    props.dateFormatNoTime
                      ? 'DD-MM-YYYY'
                      : 'DD-MM-YYYY HH:mm:ss'
                  "
                  @dateChange="
                    (value) => {
                      dateFilter = value;
                      emit('dateFilterChange', value);
                    }
                  "
                />
              </div>

              <div class="">
                <div class="d-flex justify-content-between gap-2">
                  <div class="file-content h-50" style="flex: 1">
                    <div class="form-inline box-search-header">
                      <div
                        style="width: 100%"
                        class="form-group mb-0 d-flex align-items-center"
                      >
                        <input
                          class="form-control-plaintext"
                          type="text"
                          v-model="filter.search"
                          style="flex: 1"
                          :placeholder="$t('search')"
                          @keyup.enter="inputSearch"
                          @input="onSearchChange"
                        />
                        <p style="font-size: large; margin-bottom: 1px">
                          <kbd>&crarr;</kbd>
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    v-if="enableFilter"
                    class="btn btn-primary"
                    type="button"
                    aria-expanded="false"
                    @click="handleToggleFilter"
                  >
                    <span><Icon name="charm:filter" /></span>
                  </button>
                </div>
              </div>
              <!-- <div class="col-2 w-fit"></div> -->
            </div>
          </div>
        </div>
      </div>
      <div v-if="enableFilter">
        <Transition name="slide-fade" mode="out-in">
          <div class="card-footer" v-show="toggleFilter">
            <div class="mt-2"></div>
            <form class="theme-form">
              <div class="row">
                <slot name="filter" />
              </div>
            </form>

            <div class="mt-1"></div>
            <div class="row">
              <div class="col">
                <div class="d-flex gap-1 justify-content-end">
                  <button class="btn btn-primary" @click="emit('filterClick')">
                    {{ $t("filter") }}
                  </button>
                  <button
                    class="btn btn-outline-secondary"
                    @click="emit('resetFilterClick')"
                  >
                    {{ $t("reset") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { permissionConst } from "~/constants/permission";
  import Cookies from "js-cookie";
  import { useRoleModuleStore } from "~/store/role_module";
  import moment from "moment";
  const props = defineProps({
    dateFormat: {
      type: String,
      default: "DD-MM-YYYY HH:mm:ss",
    },
    multiCalendars:{
      type: Boolean,
      default: true,
    },
    enableTimePicker:{
      type: Boolean,
      default: true,
    },
    dateRange:{
      type: Boolean,
      default: true,
    },
    dateFormatNoTime: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    titleIcon: {
      type: String,
      default: "",
    },
    buttonRefresh: {
      type: Boolean,
      default: true,
    },
    buttonAdd: {
      type: Boolean,
      default: true,
    },
    buttonExcel: {
      type: Boolean,
      default: false,
    },
    buttonPrint: {
      type: Boolean,
      default: false,
    },
    enableFilter: {
      type: Boolean,
      default: false,
    },
    enableDatePicker: {
      type: Boolean,
      default: false,
    },
    enableSort: {
      type: Boolean,
      default: true,
    },
    enableActionDropdown: {
      type: Boolean,
      default: false,
    },
    sortColumn: {
      type: Array,
      default: () => {
        return [];
      },
    },
    filter: {
      type: Object,
      default: () => ({
        search: null,
        branch_id: null,
        dateFilter: null,
      }),
    },
    cardBody:{
      type:Boolean,
      default: true,
    },
    showAddAction: {
      type: Boolean,
      default: true,
    },
    defaultDateFilter: {
      type: Object,
      default: null,
    },
  });

  const emit = defineEmits([
    "addClick",
    "resetFilterClick",
    "filterClick",
    "excelClick",
    "printClick",
    "reloadData",
    "toggleColumn",
    "dateFilterChange",
    "resetPagination",
  ]);

  const filter = reactive(props.filter);
  const roleModuleStore = useRoleModuleStore();
  const sortBy = ref("");
  const sortByLabel = ref("");
  const sortType = ref("desc");
  const tableSize = ref("10");
  const dateFilter = ref(props.defaultDateFilter);
  const { $i18n } = useNuxtApp();
  watch(
    () => props.defaultDateFilter,
    () => {
      dateFilter.value = props.defaultDateFilter;
      // emit('dateFilterChange', dateFilter.value);
    }
  );
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
      value: [
        moment().startOf("week").toDate(),
        moment().endOf("week").toDate(),
      ],
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
      value: [
        moment().startOf("year").toDate(),
        moment().endOf("year").toDate(),
      ],
    },
    {
      label: $i18n.t("last_year"),
      value: [
        moment().subtract(1, "year").startOf("year").toDate(),
        moment().subtract(1, "year").endOf("year").toDate(),
      ],
    },
  ]);

  let showColumn = reactive({ value: [] });
  showColumn.value = props.sortColumn;

  const pageOption = [5, 10, 20, 50, 100];
  const toggleFilter = ref(false);
  const sortableColumn = computed(() => {
    return props.sortColumn.filter((obj) => obj.sort == true);
  });

  //   const formatDate = () => {
  //   if (!props.defaultDateFilter) {
  //     console.error('Default date filter is undefined or null.');
  //     return ['', '']; // Return empty strings or any other default values
  //   }

  //   const startDate = props.defaultDateFilter[0];
  //   const endDate = props.defaultDateFilter[1];

  //   // Check if startDate and endDate are valid Date objects
  //   if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
  //     console.error('Invalid date format in defaultDateFilter:', props.defaultDateFilter);
  //     return ['', '']; // Return empty strings or any other default values
  //   }

  //   const momentStartDate = moment(startDate);
  //   const momentEndDate = moment(endDate);

  //   if (!momentStartDate.isValid() || !momentEndDate.isValid()) {
  //     console.error('Invalid date format in defaultDateFilter:', props.defaultDateFilter);
  //     return ['', '']; // Return empty strings or any other default values
  //   }

  //   const formattedStartDate = momentStartDate.format('DD/MM/YYYY');
  //   const formattedEndDate = momentEndDate.format('DD/MM/YYYY');

  //   return [formattedStartDate, formattedEndDate];
  // }

  onMounted(() => {
    const defaultSortColumn = props.sortColumn.find(
      (obj) => obj.defaultSortBy == true
    );
    if (defaultSortColumn) {
      sortBy.value = defaultSortColumn.key;
      sortType.value = defaultSortColumn.defaultSortType;
    }
    setShowColumn();

    // emit("reloadData");
    // const startDate = new Date();
    // const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    // date.value = [startDate, endDate];
  });

  const handleRefresh = function () {
    filter.search = "";
    emit("reloadData");
  };
  const handleToggleFilter = function () {
    toggleFilter.value = !toggleFilter.value;
  };
  const pageOptionChange = (row) => {
    tableSize.value = row;
    emit("reloadData");
  };
  const sortByChange = (value, label) => {
    sortBy.value = value;
    sortByLabel.value = label;
    emit("reloadData");
  };
  const sortTypeChange = (value) => {
    sortType.value = value;
    emit("reloadData");
  };
  const inputSearch = (value) => {
    emit("resetPagination");
    emit("reloadData");
  };

  const onSearchChange = (value) => {
    filter.search = filter.search.trimStart();
    if (filter.search === "") emit("reloadData");
  };
  const setShowColumn = () => {
    let hideColumn = Cookies.get(
      `${roleModuleStore.current_module}-table-header`
    );
    if (empty(hideColumn)) {
      return;
    } else {
      hideColumn = JSON.parse(hideColumn);
      // hideColumn
      let displayColunm = props.sortColumn;
      hideColumn.forEach((obj) => {
        displayColunm.map((ele) => {
          if (ele.key == obj.key && obj.hide) {
            ele.hide = true;
          }
        });
      });
      showColumn.value = displayColunm;
    }
  };

  const toggleColumn = (obj) => {
    const column = props.sortColumn;
    column.map((ele) => {
      if (ele.key == obj.key) {
        if (ele.hide) ele.hide = false;
        else ele.hide = true;
      }
      return ele;
    });
    showColumn.value = [];
    showColumn.value = column;
    Cookies.set(
      `${roleModuleStore.current_module}-table-header`,
      JSON.stringify(props.sortColumn)
    );
    emit("toggleColumn");
  };

  defineExpose({
    filter,
    sortBy,
    sortType,
    tableSize,
    dateFilter,
  });
</script>
1
