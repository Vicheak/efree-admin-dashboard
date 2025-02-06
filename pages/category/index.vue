<template>
  <div class="">
    <IFormHeader
      title="category"
      :sortColumn="tableHeader"
      :moduleKey="moduleKey"
      :enableFilter="false"
      :filter="filter"
      ref="formHeader"
      @toggleColumn="toggleColumn"
      @addClick="addNew"
      @reloadData="getData"
      @filterClick="getData"
    >
    </IFormHeader>
    
    <IFormTable
      :tableHeader="tableHeader"
      :tableData="lists"
      :pagination="pagination"
      @paginationChange="getData"
      ref="formTable"
    >
      <template #action="{ row }">
        <IDropdown>
          <IDropdownOption
            label="edit"
            icon="material-symbols:edit-square-outline"
            @click="editItem(row.id, row)"
          />
          <IDropdownOption
            label="delete"
            icon="mdi:trash-can-outline"
            @click="deleteItem(row.id)"
          />
        </IDropdown>
      </template>
      <template #image="{row}">
        <img :src="row.imageUrl" @error="onImageError(row)" height="40px" :alt="row.imageUrl">
        <!-- <img src="D:/ITCB_News/Admin/Image/logo-news.png" height="40px" alt=""> -->
      </template>
      <template #kh_name="{row}">
        <span>{{ row.nameKh }}</span>
      </template>
      <template #en_name="{row}">
        <span>{{ row.nameEn }}</span>
      </template>
    </IFormTable>

    <ActionModal
      ref="modal"
      :actionType="actionType"
      @closeModal="closeModal"
    />
  </div>
</template>

<script setup>
import ActionModal from "~/components/category/modal.vue";
import { categoryAPI } from "~/constants/api";
import { appConst, msgConst } from "~/constants/app";
import { permissionConst } from "~/constants/permission";
import { useCategoryList } from "~/store/category_list.js";
import { useCategoryType } from "~/store/category_type.js";
import { useBranchStore } from "~/store/branch";
import { useUserStore } from "~/store/user";

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
    label: "image",
    key: "image",
    sort: false,
    textAlign: "left",
    textAlign: "center",
  },

  {
    label: "kh_name",
    key: "kh_name",
    sort: true,
    textAlign: "left",
  },
  {
    label: "en_name",
    key: "en_name",
    sort: true,
    textAlign: "left",
  },
  // {
  //   label: "created_at",
  //   key: "created_at",
  //   sort: true,
  //   classes: "createdby-col",
  //   textAlign: "center",
  //   textAlignHeader: "center",
  // },
  // {
  //   label: "copy_link",
  //   key: "copy_link",
  //   textAlign: "center",
  // },
];
let lists = ref([]);
const formHeader = ref(null);
const modal = ref();
const formTable = ref(null);
const actionType = ref("add");
const categoryList = useCategoryList();
const categoryType = useCategoryType();
const branchStore = useBranchStore();
const userStore = useUserStore();
const branch_id = ref(null)
const pagination = ref({
  currentPage: 1,
  per_page: 10,
  total: 0,
  to: 0,
  from: 0,
  last_page: 0,
});
const filter = reactive({
  search: "",
  branch_id: null,
});

const addNew = () => {
  actionType.value = appConst.modalAction.add;
  modal.value.showModal();
};

onMounted(() => {
  getData();
  // getTest()
  if (checkCookieExpiration()) {
    console.log('Access token is still valid.');
  } else {
    console.error('Access token has expired or does not exist.');
    useUserStore().clearToken();
  }
});
const onImageError = (row) =>{
  row.imageUrl = appConst.defaultImage
}
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
watch(
  () => branchStore.branch_id,
  (val) => {
    getData();
  }
);
const getData = async () => {
  const data = await fetch("https://efree.cheakautomate.online/gateway/CATEGORY/api/v1/categories", {
    method: 'GET', // Specify the method as GET
    headers: {
        'Content-Type': 'application/json',
        Authorization: "",  
    }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    categoryList.setData(data.payload);
    lists.value = data.payload;
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    categoryList.setData([]);
    categoryList.setPagination({
      currentPage: 1,
      per_page: 10,
      total: 0,
      to: 0,
      from: 0,
      last_page: 0,
    })
  })
};
const deleteItem = (id) => {
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
        await fetch("https://efree.cheakautomate.online/gateway/CATEGORY/api/v1/categories/" + id, {
          method: 'DELETE', // Specify the method as GET
          headers: {
              'Content-Type': 'application/json',
              Authorization: userStore.logged ? `Bearer ${userStore.token}` : "",  
          }
        }).then((response) => response.json())
        .then((data) => {
          iAlert().success();
          getData();
          resolve();
        })
        
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
};

//Copy link category to survey

const copyLinkCategory = async (slug) => {
  let linkToCopy = useRuntimeConfig().public.domainSurvey+ slug;
  try {
    await navigator.clipboard.writeText(linkToCopy);

      iAlert().copySuccess();
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

const editItem = async (id, row) => {
  actionType.value = appConst.modalAction.update;
  modal.value.showModal(id, row);
};

const closeModal = (refresh) => {
  if (refresh) getData();
};

const toggleColumn = () => {
  formTable.value.setShowColumn();
};
</script>
