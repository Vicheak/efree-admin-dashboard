<template>
  <div class="">
    <IFormHeader
      title="promotion"
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
      <template #top-button-action>
        <button class="btn btn-warning" @click="goTo({ path: '/product' })">
          <Icon
            name="material-symbols:arrow-back-ios-rounded"
            size="20"
          ></Icon>
          {{ $t("back") }}
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
      <template #action="{ row }">
        <IDropdown>
          <IDropdownOption
            label="edit"
            icon="material-symbols:edit-square-outline"
            @click="editItem(row.promotionId, row)"
          />
          <IDropdownOption
            label="delete"
            icon="mdi:trash-can-outline"
            @click="deleteItem(row.promotionId)"
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
      <template #endDate="{row}">
        <span>{{ dateTimeFormat(row.endDate) }}</span>
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
import ActionModal from "~/components/promotion/modal.vue";
import { categoryAPI } from "~/constants/api";
import { appConst, msgConst } from "~/constants/app";
import { permissionConst } from "~/constants/permission";
import { useCategoryList } from "~/store/category_list.js";
import { useCategoryType } from "~/store/category_type.js";
import { useBranchStore } from "~/store/branch";
import { useUserStore } from "~/store/user";
import { ro } from "date-fns/locale";
// "2024-12-31T23:59:59" ,27-02-2025 13:32:00
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
    label: "typeEn",
    key: "typeEn",
    sort: false,
    textAlign: "left",
    textAlign: "center",
  },

  {
    label: "typeKh",
    key: "typeKh",
    sort: true,
    textAlign: "left",
  },
  {
    label: "discount",
    key: "discount",
    sort: true,
    textAlign: "left",
  },
  {
    label: "maxDiscount",
    key: "maxDiscount",
    sort: true,
    textAlign: "left",
  },
  {
    label: "usageLimit",
    key: "usageLimit",
    sort: true,
    textAlign: "left",
  },
  {
    label: "applicableCustomer",
    key: "applicableCustomer",
    sort: true,
    textAlign: "left",
  },
  {
    label: "endDate",
    key: "endDate",
    textAlign: "center",
  },
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
const route = useRoute();
const addNew = () => {
  actionType.value = appConst.modalAction.add;
  modal.value.showModal(null,null,route.query.id);
};

onMounted(() => {
  getData();
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
  var id = route.query.id
  const data = await fetch(`https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/promotions/list/${id}`, {
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
    lists.value = data.payload;
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  })
};
// Authorization: userStore.logged ? `Bearer ${userStore.token}` : "",  
const deleteItem = (promotionId) => {
  let productId = route.query.id
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
        await fetch(`https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/promotions/${productId}/${promotionId}`, {
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
  modal.value.showModal(id, row,route.query.id);
};

const closeModal = (refresh) => {
  if (refresh) getData();
};

const toggleColumn = () => {
  formTable.value.setShowColumn();
};
</script>
