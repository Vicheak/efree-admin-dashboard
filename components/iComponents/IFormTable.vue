<template>
  <div :class="[{ 'border-none': showBorder }, showCard ? 'card' : '']">
    <div class="card-body">
      <div class="table-responsive table-striped overflow-visible">

        <table
          :class="{
            'table-striped': true,
            'table table-transparent': true,
          }"
          style="table-layout: auto; width: 100%"
        >
          <thead>
            <tr class="border-bottom-primary">
              <th v-if="multiSelect">
                <div
                  :style="{
                    width: '5px',
                    textAlign: 'center',
                  }"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="selectedAll"
                    :true-value="true"
                    :false-value="false"
                    @change="handleSelectedAll"
                  />
                </div>
              </th>
              <th
                v-for="obj in showColumn.list.filter(
                  (item) => !item.hide || item.hide === false
                )"
                :style="{
                  textAlign: obj.textAlign ? obj.textAlign : 'left',
                  whiteSpace: 'nowrap',
                }"
                scope="col"
                :key="obj.index"
                :class="obj?.headerClasses + ' ' + obj?.classes"
              >
                <div>
                  {{ $t(obj.label) }}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              :style="{
                background: item?.bgColor
                  ? item?.bgColor
                  : colorRow(
                      item.status === 0,
                      checkItemIsSelected(selectedItems, item)
                    ),
              }"
              v-for="(item, index) in props.tableData"
              :key="index"
              @click="handleRowClick(item)"
            >
              <td v-if="multiSelect">
                <div
                  :style="{
                    width: '5px',
                    textAlign: 'center',
                  }"
                >
                  <ICheckbox
                    :item="item"
                    @onSelectItem="handleSelectedItem"
                    :selectAll="checkItemIsSelected(selectedItems, item)"
                  />
                </div>
              </td>
              <td
                v-for="obj in showColumn.list.filter(
                  (item) => !item.hide || item.hide === false
                )"
                :key="obj?.key + obj?.index"
                :class="obj?.classes"
                :style="{
                  textAlign: obj?.textAlign ? obj?.textAlign : 'left',
                }"
              >
                <div
                  :class="obj?.classes"
                  :style="{
                    textAlign: obj?.textAlign ? obj?.textAlign : 'left',
                  }"
                >
                  <slot
                    v-if="!item.hide"
                    :style="{
                      textAlign: obj?.textAlign ? obj?.textAlign : 'left',
                    }"
                    :lists="props.tableData"
                    :row="item"
                    :index="index"
                    :name="obj?.key"
                    v-bind="item"
                    >{{ item[obj?.key] }}</slot
                  >
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="props.tableData.length > 0" class="bg-table-footer">
            <tr class="border-bottom-primary">
              <template
                v-for="obj in showColumn.list.filter(
                  (item) => !item.hide || item.hide === false
                )"
                :key="obj?.index"
              >
                <th
                  :colspan="obj?.colspan"
                  :class="`${obj?.footerClasses} ${obj?.classes}`"
                  :style="{
                    textAlign: obj?.textAlign ? obj?.textAlign : 'center',
                    whiteSpace: 'nowrap',
                  }"
                  scope="col"
                >
                  <template v-if="obj.footer == true">
                    <div
                      v-if="obj.footerSumCurrency"
                      :class="`${obj?.footerClasses} ${obj?.classes}`"
                      :style="{
                        textAlign: obj?.textAlign ? obj?.textAlign : 'center',
                        whiteSpace: 'nowrap',
                        color: obj?.footerTextColor,
                      }"
                    >
                      {{
                        currency(
                          props.tableData.reduce((accumulator, val) => {
                            return accumulator + parseFloat(val[obj.key]);
                          }, 0)
                        )
                      }}
                    </div>
                    <div
                      v-else-if="obj.footerSum"
                      :class="obj?.footerClasses"
                      :style="{
                        width: obj?.width ? obj?.width : '100%',
                        textAlign: obj?.textAlign ? obj?.textAlign : 'center',
                        whiteSpace: 'nowrap',
                        color: obj?.footerTextColor,
                      }"
                    >
                      {{
                        props.tableData.reduce((accumulator, val) => {
                          return accumulator + parseFloat(val[obj.key]);
                        }, 0)
                      }}
                    </div>
                    <!-- Object.values(props.tableFooter) -->
                    <div
                      v-else
                      :class="`${obj?.footerClasses} ${obj?.classes}`"
                      :style="{
                        textAlign: obj?.textAlign ? obj?.textAlign : 'center',
                        whiteSpace: 'nowrap',
                        color: obj?.footerTextColor,
                      }"
                    >
                      <slot
                        :name="obj.footerKey"
                        :sum="
                          props.tableData.reduce((accumulator, val) => {
                            return accumulator + parseFloat(val[obj.key]);
                          }, 0)
                        "
                        :row="props.tableData"
                      >
                        <div
                          :style="{ color: obj?.footerTextColor }"
                          v-html="obj?.translate ? $t(obj?.label) : obj?.label"
                        ></div>
                      </slot>
                    </div>
                  </template>
                </th>
              </template>
            </tr>
          </tfoot>
        </table>

        <div
          v-if="props.tableData.length < 1"
          class="table-min-height d-flex justify-content-center align-items-center w-100"
        >
          <h5 class="text-center">{{ $t("no-data") }}</h5>
        </div>
      </div>
      <table v-if="showTotalPegination" style="table-layout: auto; width: 100%">
        <thead>
          <tr>
            <th
              v-for="obj in showColumn.list.filter(
                (item) => !item.hide || item.hide === false
              )"
              :style="{
                width: obj.width ? obj.width : '150px',
                textAlign: obj.textAlignHeader ? obj.textAlignHeader : 'center',
                whiteSpace: 'nowrap',
              }"
              scope="col"
              :key="obj.index"
              :class="obj?.headerClasses"
              style="visibility: hidden"
            >
              {{ $t(obj.label) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              :colspan="obj?.colspan"
              :style="{
                textAlign: obj?.textAlignFooter
                  ? obj?.textAlignFooter
                  : 'center',
                whiteSpace: 'nowrap',
              }"
              scope="col"
              v-for="obj in Object.values(props.totalDataLists)"
              :key="obj?.index"
              :class="obj?.footerClasses"
              v-html="obj?.translate ? $t(obj?.label) : obj?.label"
            ></td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="props.tableData.length > 0 && props.showPagination"
        class="d-flex justify-content-between align-items-center mt-2 ipagination"
      >
        <div class="d-flex align-items-center gap-2">
          <div class="dropdown mb-0" v-if="showFooterRowSelect">
            <button
              class="btn btn-lightGray"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ tableSize }}
              <span class="ms-1">
                <Icon name="fluent:caret-down-20-filled" />
              </span>
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
          <p class="fw-bold text-gray mb-0 text-sm">
            {{ pagination.from + "-" +pagination.to  }} {{ $t("of") }} {{ pagination.total }}
          </p>
        </div>

        <div class="pagination">
          <vue-awesome-paginate
            :total-items="pagination.total"
            :items-per-page="pagination.per_page"
            :max-pages-shown="4"
            v-model="currentPage"
            @click="paginationChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoleModuleStore } from "~/store/role_module";
import Cookies from "js-cookie";
import { permissionConst } from "~/constants/permission";
const props = defineProps({
  tableHeader: {
    type: Array,
    default: () => {
      return [];
    },
  },
  tableData: {
    type: Array,
    default: [],
  },
  pagination: {
    type: Object,
    default() {
      return {
        currentPage: 1,
        per_page: 10,
        total: 0,
        to: 0,
        from: 0,
        last_page: 0,
      };
    },
  },
  height: {
    type: String,
    default() {
      return "68vh";
    },
  },
  tableFooter: {
    type: Object,
    default: () => {
      return [];
    },
  },
  footerCol: {
    type: Array,
    default: () => {
      return [];
    },
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  showBorder: {
    type: Boolean,
    default: false,
  },
  showCard: {
    type: Boolean,
    default: true,
  },
  multiSelect: {
    type: Boolean,
    default: false,
  },
  showTotalPegination: {
    type: Boolean,
    default: false,
  },
  totalDataLists: {
    type: Object,
    default: () => {
      return [];
    },
  },
  showFooterRowSelect: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
});

const tableSize = ref("10");
const currentPage = ref(1);
const pageOption = ref([5, 10, 20, 50, 100]);
const roleModuleStore = useRoleModuleStore();
let showColumn = reactive({ list: [] });
showColumn.list = props.tableHeader;

onMounted(() => {
  setShowColumn();
});

const setShowColumn = () => {
  let hideColumn = Cookies.get(
    `${roleModuleStore.current_module}-table-header`
  );
  if (empty(hideColumn)) {
    return;
  } else {
    hideColumn = JSON.parse(hideColumn);
    hideColumn = hideColumn.filter(
      (obj) => empty(obj.hide) || obj.hide == false
    );
    showColumn.list = [];
    showColumn.list = hideColumn;
  }
};

const emit = defineEmits(["paginateChange", "onSelectChange", "reloadData"]);
const paginationChange = (pageNum) => {
  emit("paginationChange", pageNum);
};

const selectedAll = ref(false);
const selectedItem = ref(false);
const selectedItems = ref([]);
watch(
  () => props.tableData,
  () => {
    selectedItems.value = [];
    selectedAll.value = false;
  }
);

const handleSelectedAll = (event) => {
  if (selectedAll.value) {
    selectedItems.value = props.tableData;
    emit("onSelectChange", props.tableData);
  } else {
    selectedItems.value = [];
    selectedItem.value = [];
    emit("onSelectChange", selectedItems.value);
  }
};

const handleSelectedItem = (selected, item) => {
  selectedAll.value = false;
  if (selectedItems.value.length === props.tableData.length) {
    selectedAll.value = true;
  }
  // if (selected) {
  //   selectedItems.value.push(item);
  // } else {
  //   selectedItems.value = selectedItems.value?.filter((el) => {
  //     return el.id !== item.id;
  //   });
  // }
  // emit("onSelectChange", selectedItems.value);
};

const checkItemIsSelected = (items, item) => {
  return items.some((it) => JSON.stringify(it) === JSON.stringify(item));
};

const handleRowClick = (item) => {
  if (props.multiSelect) {
    if (checkItemIsSelected(selectedItems.value, item)) {
      selectedItems.value = selectedItems.value?.filter((el) => {
        return JSON.stringify(el) !== JSON.stringify(item);
      });
    } else {
      selectedItems.value.push(item);
    }
    handleSelectedItem();
    emit("onSelectChange", selectedItems.value);
  }
};

const pageOptionChange = (row) => {
  tableSize.value = row;
  emit("reloadData");
};

const colorRow = (status, isRowSelected) => {
  const color = {
    selected: iColor().selectedRow,
    disable: iColor().disable,
  };

  if (status) {
    return color.disable;
  }
  if (isRowSelected) {
    return color.selected;
  }
  return "";
};

const changeRowBgColor = (color = "") => {
  return color;
};

defineExpose({
  currentPage,
  setShowColumn,
  tableSize,
});
</script>
<style>
.ipagination .pagination-container {
  column-gap: 4px;
  align-items: center;
}

.ipagination .paginate-buttons {
  background-color: var(--bs-pagination-bg);
  border: var(--bs-pagination-border-width) solid
    var(--bs-pagination-border-color);
  color: var(--theme-default);
  display: block;
  font-size: var(--bs-pagination-font-size);
  position: relative;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  height: 30px;
  min-width: 30px;
  border-radius: var(--bs-pagination-border-radius);
}

.dark-only .ipagination .paginate-buttons {
  background-color: #262932;
  border: var(--bs-pagination-border-width) solid #1d1e26;
}

.ipagination .back-button {
  border-bottom-left-radius: var(--bs-pagination-border-radius);
  border-top-left-radius: var(--bs-pagination-border-radius);
}

.ipagination .next-button {
  border-bottom-right-radius: var(--bs-pagination-border-radius);
  border-top-right-radius: var(--bs-pagination-border-radius);
}

.ipagination .back-button,
.ipagination .next-button {
  color: var(--theme-default) !important;

  line-height: 9px;
}

.ipagination .active-page {
  background-color: var(--theme-default) !important;
  border-color: var(--theme-default);
  color: #fff !important;
}

.ipagination .paginate-buttons:hover {
  background-color: #f5f5f5;
}

.ipagination .active-page:hover {
  background-color: #e5e5e5;
}

.ipagination .back-button svg {
  transform: rotate(180deg) translateY(0px);
}

.ipagination .next-button svg {
  transform: translateY(0px);
}

.ipagination .back-button:hover,
.ipagination .next-button:hover {
  background-color: var(--bs-pagination-hover-bg);
  border-color: var(--bs-pagination-hover-border-color);
  color: var(--bs-pagination-hover-color);
  z-index: 2;
}

.border-none {
  border: none !important;
}

tr:hover {
  cursor: pointer;
}

input[type="checkbox"] {
  cursor: pointer;
}
</style>
