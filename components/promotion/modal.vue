<template>
  <div class="modal modal-lg fade" id="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ props.actionType && $t(props.actionType) }}
            {{ $t("promotion") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-2">
                      <label for="typeEn" class="required">{{ $t("typeEn") }}</label>
                      <input
                        v-model="form.typeEn"
                        required
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': v$.typeEn.$error }"
                        @change="v$.typeEn.$touch"
                        :placeholder="$t('typeEn')"
                      />
                      <span class="invalid-feedback" v-if="v$.typeEn.$error">{{
                        v$.typeEn.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-2">
                      <label for="typeKh">{{ $t("typeKh") }}</label>
                      <input
                        v-model="form.typeKh"
                        type="text"
                        class="form-control"
                        id="typeKh"
                        :placeholder="$t('typeKh')"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-lg-6">
                    <div class="form-group required mb-2">
                      <label for="discount">{{ $t("discount") }}</label>
                      <input
                        v-model="form.discount"
                        required
                        type="text"
                        class="form-control"
                        id="discount"
                        :placeholder="$t('discount')"
                        :class="{ 'is-invalid': v$.discount.$error }"
                        @change="v$.discount.$touch"
                      />
                      <span class="invalid-feedback" v-if="v$.discount.$error">{{
                        v$.discount.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12 col-lg-6">
                    <div class="form-group required mb-2">
                      <label for="maxDiscount">{{ $t("maxDiscount") }}</label>
                      <input
                        v-model="form.maxDiscount"
                        required
                        type="text"
                        class="form-control"
                        id="maxDiscount"
                        :placeholder="$t('maxDiscount')"
                        :class="{ 'is-invalid': v$.maxDiscount.$error }"
                        @change="v$.maxDiscount.$touch"
                      />
                      <span class="invalid-feedback" v-if="v$.maxDiscount.$error">{{
                        v$.maxDiscount.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group required mb-2">
                      <label for="endDate">{{ $t("endDate") }}</label>
                      <IDatePicker
                        v-model="form.endDate"
                        :multi-calendars="false"
                        :range="false"
                        :placeholder="$t('endDate')"
                        @dateChange="changeDate"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group required mb-2">
                      <label for="usageLimit">{{ $t("usageLimit") }}</label>
                      <input
                        v-model="form.usageLimit"
                        required
                        type="text"
                        class="form-control"
                        id="usageLimit"
                        :placeholder="$t('usageLimit')"
                        :class="{ 'is-invalid': v$.usageLimit.$error }"
                        @change="v$.usageLimit.$touch"
                      />
                      <span class="invalid-feedback" v-if="v$.usageLimit.$error">{{
                        v$.usageLimit.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group required mb-2">
                      <label for="applicableCustomer">{{ $t("applicableCustomer") }}</label>
                      <input
                        v-model="form.applicableCustomer"
                        required
                        type="text"
                        class="form-control"
                        id="applicableCustomer"
                        :placeholder="$t('applicableCustomer')"
                        :class="{ 'is-invalid': v$.applicableCustomer.$error }"
                        @change="v$.applicableCustomer.$touch"
                      />
                      <span class="invalid-feedback" v-if="v$.applicableCustomer.$error">{{
                        v$.applicableCustomer.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-2">
                      <label for="status" class="required">{{ $t("status") }}</label>
                      <select
                        class="form-select"
                        v-model="form.status"
                      >
                        <option :value="true">
                          {{ $t("enable") }}
                        </option>
                        <option :value="false">
                          {{ $t("disable") }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="() => closeModal()"
          >
            {{ $t("close") }}
          </button>
          <button
            v-if="props.actionType && props.actionType !== 'update'"
            type="button"
            class="btn btn-primary"
            @click="() => save(false)"
          >
            {{ $t("save_new") }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="() => save(true)"
          >
            {{ $t("save") }}
          </button>
        </div>
      </div>
    </div>

    <CropImage
        ref="cropImageModal"
        :auto-zoom="false"
        :freeSize="true"
        :resizable="true"
        :movable="true"
        @imageCroped="imagecroped"
      ></CropImage>
  </div>
</template>

<script setup>
import moment from "moment";
import { defineProps, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { useCategoryType } from "~/store/category_type.js";
import { categoryAPI } from "~/constants/api";
import { appConst } from "~/constants/app";
import { useCategoryList } from "~/store/category_list.js";
import ModalCropperImage from "~/components/ModalCropperImage.vue";
import { useBranchStore } from "~/store/branch";
import { useUserStore } from "~/store/user";
import { end } from "@popperjs/core";
const branchStore = useBranchStore();
const categoryType = useCategoryType();
const categoryList = useCategoryList();
const userStore = useUserStore();
const props = defineProps({
  actionType: String,
});
const state = reactive({
  modal: null,
});


const defaultForm = {
  id: null,
  typeKh: null,
  typeEn: null,
  discount: null,
  maxDiscount: null,
  endDate: null,
  usageLimit: null,
  applicableCustomer: null,
  status: true,
};

let form = reactive({ ...defaultForm });

const rules = computed(() => {
  return {
    typeEn: {
      required,
      $autoDirty: true,
    },
    endDate: {
      required,
    },
    discount: {
      required,
    },
    maxDiscount: {
      required,
    },
    usageLimit: {
      required,
    },
    applicableCustomer: {
      required,
    },
  }
});
const v$ = vuelidate(rules, form);
const emit = defineEmits(["closeModal"]);
let targetFile = ref(null);
let aspectRatio = ref(null);
let cropWidth = ref(null);
let cropHeight = ref(null);
const fileInput = ref(null);
const cropImageModal = ref(null);
const modalShowCropperImage = ref(null);
const hideShowCropperImage = ref(false);
const imagePath = ref(null);
const imageName = ref(null);
const imageFile = ref(null);
const changeDate = (date) => {
  form.endDate = moment(date).format("YYYY-MM-DDTHH:mm:ss");
  console.log("endDateform", form.endDate);
  
}

const chooseImage = () => {
  fileInput.value.click();
};
const onFileChange = ($event) => {
  const files = $event.target.files || $event.dataTransfer.files;
  if (files[0]) {
    if (files[0].size > 15000000) {
      fileInput.value = "";
      form.image = "";
      useNuxtApp().$showToast({
        msg: "Image file must be less than 15 MB.",
        type: "warning",
      });
      return;
    }
    // Check if the file is an image and if it is of type jpg, jpeg, or gif
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (
      files[0].type.indexOf("image/") === -1 ||
      !allowedTypes.includes(files[0].type.toLowerCase())
    ) {
      swal({
        icon: "warning",
        title: "Image Validation",
        text: "Please select a JPG, JPEG, or GIF image file.",
      });
      return;
    }
  }
  
  cropImageModal.value.showModal($event);
  imageFile.value = files[0];
  imageName.value = files[0].name;
  fileInput.value.value = null; 
};
const imagecroped = async (data) =>{
  form.image = data;
}
onMounted(() => {
  setDefaultForm();
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal = new bootstrap.Modal("#modal");
});
const productId = ref(null);
const showModal = (editId = null, row,idOfProduct) => {
  state.modal.show();
  productId.value = idOfProduct
  if (editId) {
    const { promotionId, typeEn,typeKh,discount,maxDiscount,endDate,usageLimit,applicableCustomer,status } = row;
    form.id = promotionId;
    form.typeEn = typeEn;
    form.typeKh = typeKh;
    form.discount = discount;
    form.maxDiscount = maxDiscount;
    form.endDate = endDate;
    form.usageLimit = usageLimit;
    form.applicableCustomer = applicableCustomer;
    form.status = status;
  } else {
    setDefaultForm();
  }
};
const save = async (event) => {
  if(form.endDate==null || form.endDate=="" || form.endDate=="Invalid date"){
    const { $i18n } = useNuxtApp();
    swal({
      title: $i18n.t("Required"),
      text: $i18n.t("endDate_is_required"),
      icon: "question",
      showCancelButton: false,
      confirmButtonText: $i18n.t("ok"),
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {},
      allowOutsideClick: () => !swal.isLoading(),
    })
    return;
  }
  const result = await v$.value.$validate();
  if (result) {
    form.endDate = moment(form.endDate).format("YYYY-MM-DDTHH:mm:ss");
    let url = `https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/promotions/${productId.value}`;
    let method = "POST";
    if (props.actionType == appConst.modalAction.update) {
      url = `https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/promotions/${productId.value}/${form.id}`;
      method = "PUT";
    }
    const data = await fetch(url, {
      method: method, // Specify the method as GET
      headers: {
        "Content-Type": "application/json",
        Authorization: userStore.logged ? `Bearer ${userStore.token}` : "",
      },
      body: JSON.stringify(form),
    }).then((response) => response.json())
    .then(async (data) =>{
      iAlert().success();
      categoryList.setData(data.data);
      if (event) {
        emit("closeModal", true);
        closeModal(true);
      } else {
        setDefaultForm();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  } else {
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};

const setDefaultForm = () => {
  Object.assign(form, defaultForm);
  v$.value.$reset();
};

const closeModal = (isRefresh = false) => {
  setDefaultForm();
  if (isRefresh) {
    emit("closeModal", true);
  }
  state.modal.hide();
};

defineExpose({
  showModal,
});
</script>
