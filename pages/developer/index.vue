<template>
  <div>
    <IFormHeader
      title="module"
      :sortColumn="tableHeader"
      :moduleKey="moduleKey"
      :enableFilter="false"
      :filter="filter"
      ref="formHeader"
      @toggleColumn="toggleColumn"
      @addClick="openAddModal"
      @reloadData="getData"
      @filterClick="getData"
    >
      <template #top-button-action>
        <button class="btn btn-primary" @click="syncModule">
          <i class="icofont icofont-chart-pie-alt"></i> {{ $t("sync") }}
        </button>
      </template>
    </IFormHeader>
    <IFormTable
      :tableHeader="tableHeader"
      :tableData="lists"
      :pagination="pagination"
      @paginationChange="getData"
      ref="formTable"
    >
      <template #action="row">
        <IDropdown>
          <IDropdownOption
            icon="material-symbols:edit-square-outline"
            label="edit"
            @click="editItem(row.id)"
          />
          <IDropdownOption
            icon="mdi:trash-can-outline"
            label="delete"
            @click="deleteItem(row.id)"
          />
        </IDropdown>
      </template>

      <template #module_name="{ module_name }">
       <span class="text-capitalize"> {{ $t(module_name) }}</span>
      </template>

      <template #permission="{ permission }">
        <div style="display: flex; flex-wrap: wrap">
          <div v-for="obj in permission" :key="obj.index">
            <span class="badge badge-primary rounded-pill me-1">{{
              obj.permission_name
            }}</span>
          </div>
        </div>
      </template>
    </IFormTable>
    <actionModal
      ref="modal"
      :actionType="actionType"
      @closeModal="closeModal"
    />
  </div>
</template>

<script setup>
import actionModal from "~/components/module/modal";
import { appConst } from "~/constants/app";
import { moduleAPI } from "~/constants/api";
import { moduleKey } from "~/constants/moduleKey";
const module_key = "module";
let tableHeader = [
  {
    label: "action",
    key: "action",
    sort: false,
    textAlign: "center",
    classes: "action-dropdown",
    headerClasses: "action-dropdown",
  },
  {
    label: "module_name",
    key: "module_name",
    sort: true,
  },
  {
    label: "module_key",
    key: "module_key",
    sort: true,
  },
  {
    label: "feature",
    key: "feature",
    sort: false,
  },
  {
    label: "permission",
    key: "permission",
    sort: true,
  },
];
const pagination = ref({
  currentPage: 1,
  per_page: 10,
  total: 0,
  to: 0,
  from: 0,
  last_page: 0,
});
let lists = ref([]);
const actionType = ref("");
const modal = ref(null);
const formHeader = ref(null);
const formTable = ref(null);

onMounted(() => {
  getData();
});

const getData = async () => {
  let input = getInput();
  const data = await ifetch(moduleAPI.get, input);
  setInput(data);
};

const setInput = (data) => {
  lists.value = data.data;
  pagination.value = data.pagination;
};
const getInput = () => {
  return {
    page: formTable.value.currentPage,
    table_size: formHeader.value.tableSize,
    filter: formHeader.value.filter,
    sort_by: formHeader.value.sortBy,
    sort_type: formHeader.value.sortType,
  };
};
const editItem = async (id) => {
  actionType.value = appConst.modalAction.update;
  modal.value.showModal(id);
};

const deleteItem = async (id) => {
  const { $i18n } = useNuxtApp();
  swal({
    title: $i18n.t("are_you_sure"),
    text: $i18n.t("cannot_revert_this"),
    icon: "question",
    showCancelButton: true,
    confirmButtonText: $i18n.t("ok"),
    cancelButtonText: $i18n.t("cancel"),
    reverseButtons: true,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return new Promise(async (resolve) => {
        await ifetch(moduleAPI.delete, { id: id });
        iAlert().success();
        getData();
        resolve();
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
};

const syncModule = async () => {
  await ifetch(moduleAPI.sync_module);
  iAlert().success();
  getData();
};

const openAddModal = () => {
  actionType.value = appConst.modalAction.add;
  modal.value.showModal();
};
const closeModal = (refresh) => {
  if (refresh) {
    getData();
  }
};
</script>
