<template>
  <div>
    <IFormHeader
      title="product"
      :sortColumn="tableHeader"
      :moduleKey="moduleKey"
      :enableFilter="false"
      :filter="filter"
      :button-add="true"
      ref="formHeader"
      :button-refresh="true"
      :enableDatePicker="false"
      @addClick="openAddModal"
      @toggleColumn="toggleColumn"
      @filterClick="getData"
      @reloadData="getData"
      @resetFilterClick="onResetFilter"
    >
    <template #top-button-action>
        <button class="btn btn-success" @click="importExcell">
          <Icon
            name="mdi:database-import"
            size="20"
          ></Icon>
          {{ $t("import") }}
        </button>
      </template>
    </IFormHeader>
      <IFormTable
      :tableHeader="tableHeader"
      :tableData="lists"
      :pagination="pagination"
      @paginationChange="getDataByPage"
      ref="formTable"
      >
      <template #action="{ row }">
          <IDropdown>
            <li @click="update(row)">
              <a  class="dropdown-item">
                <div class="d-flex align-items-center">
                  <Icon
                    size="18"
                    class="me-3"
                    name="material-symbols:edit-square-outline"
                  />
                  <span>{{ $t("edit") }}</span>
                </div>
              </a>
            </li>
          <!-- <IDropdownOption
              label="edit"
              icon="material-symbols:edit-square-outline"
              v-can="permissionConst.UPDATE"
              @click="() => update(row)"
          /> -->
          <IDropdownOption
              label="delete"
              icon="mdi:trash-can-outline"
              @click="deleteItem(row)"
          />
          <IDropdownOption
              :label="$t('view')+' '+ $t('description')"
              icon="material-symbols:visibility-outline"
              @click="showModal(row)"
          />
          <li @click="viewPromotion(row)">
              <a  class="dropdown-item">
                <div class="d-flex align-items-center">
                  <Icon
                    size="18"
                    class="me-3"
                    name="material-symbols:table-eye-outline-sharp"
                  />
                  <span>{{ $t("view_promotion") }}</span>
                </div>
              </a>
            </li>
          </IDropdown>
      </template>
      <template #business_id="{business_id}">
          <span>{{ $t(businessTypeEnum.getKey(business_id)) }}</span>
      </template>
      <!-- <template #description="{description}">
          <span class="btn btn-warning" @click="viewDescription(description)">{{ $t('view') }} {{ $t('description') }}</span>
      </template> -->
      <template #status="{ status, row }">
          <StatusToggle
          :status="status"
          :row="row"
          @on-status-change="handleStatusChange"
          />
      </template>
      <template #name="{ row }">
        <span>{{ getNameByLang(row.post_translate, 'name') }}</span>
      </template>
      <template #price="{ price }">
        <span class="fw-bold">{{ currencyFormat(price) }}</span>
      </template>
      <template #image="{ row }">
          <img v-if="!row.basedImageUrl" height="40px" :src="getImagePath(row.basedImageUrl)" alt="">
          <img v-else height="40px"  @error="onImageError(row)" :src="row.basedImageUrl" :alt="row.basedImageUrl">
      </template>
      </IFormTable>
    <iViewDescription
      ref="modal"
      @closeModal="closeModal"
      :listDescription="listDescription"
    />
    <input
      ref="fileInput"
      style="display: none"
      type="file"
      accept=".xlsx"
      :multiple="false"
      @change="onFileChange"
    />
  </div>
</template>

<script setup>
import iViewDescription from "~/components/iComponents/iViewDescription.vue";
import { moduleKey } from "~/constants/moduleKey";
import { appConst } from "~/constants/app";
import { permissionConst } from "~/constants/permission";
import moment from "moment";
import { blogAPI } from "~/constants/api";
import { useBranchStore } from "~/store/branch";
import { useLanguageStore } from "~/store/language";
import menuTypeEnum from "~/composables/enum/menuTypeEnum";
import businessTypeEnum from "~/composables/enum/businessTypeEnum";
import { useCategoryType } from "~/store/category_type";
import { useUserStore } from "~/store/user";
import { useCategoryList } from "~/store/category_list.js";
const categoryList = useCategoryList();
const userStore = useUserStore();
import { get } from "@vueuse/core";
const useLanguage = useLanguageStore();
const languageList = ref(useLanguage.lists);
const tableHeader = ref([
  {
    label: "action",
    key: "action",
    sort: false,
    textAlign: "center",
    classes: "action-dropdown",
  },
  {
    label: "id",
    key: "productId",
    textAlign: "center",
  },
  {
    label: "image",
    key: "image",
    textAlign: "center",
  },
  {
    label: "kh_name",
    key: "nameKh",
    textAlign: "center",
  },
  {
    label: "en_name",
    key: "nameEn",
    textAlign: "center",
  },
  {
    label: "qty",
    key: "stockQty",
    textAlign: "center",
  },
  {
    label: "price",
    key: "price",
    textAlign: "right",
  },
  // {
  //   label: "meta_title",
  //   key: "metaTitle",
  //   textAlign: "center",
  // },
  // {
  //   label: "status",
  //   key: "status",
  //   textAlign: "center",
  // }
]);


const fileInput = ref(null);
const listDescription = ref([]);
const branchStore = useBranchStore();
const modal = ref();
const addModal = ref(null);
const actionType = ref("");
const branch_id=ref(null);
const pagination = ref({
  currentPage: 1,
  per_page: 10,
  total: 0,
  to: 0,
  from: 0,
  last_page: 0,
});

const formHeader = ref(null);
const formTable = ref(null);

let filter = reactive({
  search: null,
  category_id: useCategoryType().blog,
  menu_type: null,
  business_id: businessTypeEnum.kdas
});

const doneTypingInterval = ref(600);
const typingTimer = ref(null);
const onResetFilter = () => {
  filter.search = null;
  filter.category_id = null;
  filter.menu_type = null;
  filter.business_id = businessTypeEnum.KDAS
  getData();
}

let lists = ref([]);

onMounted(() => {
  getDataCategory();
  getData();
  if (checkCookieExpiration()) {
    console.log('Access token is still valid.');
  } else {
    console.error('Access token has expired or does not exist.');
    useUserStore().clearToken();
  }
});
const importExcell = async () => {
  const { $i18n } = useNuxtApp();
  swal({
    title: $i18n.t("are_you_sure"),
    text: $i18n.t("import_product_data_from_excell"),
    icon: "question",
    showCancelButton: true,
    confirmButtonText: $i18n.t("ok"),
    cancelButtonText: $i18n.t("cancel"),
    reverseButtons: true,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return new Promise(async (resolve) => {
        resolve();
        fileInput.value.click();
      });
    },
    // allowOutsideClick: () => !swal.isLoading(),
  });
}
const onFileChange = async ($event) => {
  const file = $event.target.files[0];
  const file_name = file.name;
  try {
    const myHeaders = new Headers();
      myHeaders.append("Authorization", userStore.logged ? `Bearer ${userStore.token}` : "");
      const formdata = new FormData();
      formdata.append("importFile", file, file_name);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
    await fetch(`https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/products/import`, requestOptions)
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the JSON from the response
    })
    .then(data => {
      getData();
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    })
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
const viewPromotion = async (row) => {
  await goTo({ path: "/product/promotion", query: { id: row.productId } });
}
const getDataCategory = async () => {
  await fetch("https://efree.cheakautomate.online/gateway/CATEGORY/api/v1/categories", {
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
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    categoryList.setData([]);
  })
};
const openAddModal = () => {
  goTo({ path: "/product/actions" });
};
const update = async (row) => {
  await goTo({ path: "/product/actions", query: { id: row.productId } });
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
const showModal = (row) => {
  
  listDescription.value = [
    {
      language_id: 1,
      language_code: "en",
      description: row.descriptionEn
    },
    {
      language_id: 2,
      language_code: "kh",
      description: row.descriptionKh
    }
  ];
  modal.value.showModal(listDescription.value);
};
const getDataByPage = (page) => {
  pagination.value.currentPage = page;
  getData();
}
const getData = async () => {
  const input = getInput();

  input.filter.business_id=businessTypeEnum.kdas
  try {
    await fetch(`https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/products/paginate?page=${pagination.value.currentPage}&size=${formHeader.value.tableSize}&sortBy=${formHeader.value.sortBy}&direction=${formHeader.value.sortType}`, {
    method: 'GET', // Specify the method as GET
    headers: {
        'Content-Type': 'application/json',
        Authorization: userStore.logged ? `Bearer ${userStore.token}` : "",
    }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    setInput(data);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  })
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const setInput = (data) => {
  lists.value = data.payload.content;
  pagination.value.currentPage = parseInt(data.payload.page.number)+1;
  pagination.value.per_page = formHeader.value.tableSize;
  pagination.value.total =  data.payload.page.totalElements;
  pagination.value.to = (data.payload.page.number+1) * formHeader.value.tableSize;
  pagination.value.from = (data.payload.page.number) * formHeader.value.tableSize + 1;
  pagination.value.last_page = data.payload.page.totalPages;
};
const test = ref({
  currentPage: 1,
  per_page: 10,
  total: 0,
  to: 0,
  from: 0,
  last_page: 2,
});
const onImageError = (row) =>{
  row.basedImageUrl = appConst.defaultImage
}
const deleteItem = (row) => {
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
        try {
          await fetch(`https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/products/${row.productId}`, {
            method: 'DELETE', // Specify the method as GET
            headers: {
                'Content-Type': 'application/json',
                Authorization: userStore.logged ? `Bearer ${userStore.token}` : "",
            }
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json(); // Parse the JSON from the response
          })
          .then(data => {
            
            iAlert().success();
            getData();
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          })
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        resolve();
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
};


const toggleColumn = () => {
  formTable.value.setShowColumn();
};

const closeModal = (refresh) => {};

const handleStatusChange = async (value, row, reload) => {
  if (row.id) {
    await ifetch(blogAPI.updateStatus, {
      id: row.id,
      status: value ? 1 : 0,
    });
    getData();
  }
};


</script>

<style scoped>

</style>