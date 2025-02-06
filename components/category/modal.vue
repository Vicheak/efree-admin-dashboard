<template>
  <div class="modal modal-xl fade" id="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ props.actionType && $t(props.actionType) }}
            {{ $t("category") }}
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
              <div class="col-12 col-lg-8">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-2">
                      <label for="en_name" class="required">{{ $t("en_name") }}</label>
                      <input
                        v-model="form.nameEn"
                        required
                        type="text"
                        class="form-control"
                        id="en_name"
                        :class="{ 'is-invalid': v$.nameEn.$error }"
                        @change="v$.nameEn.$touch"
                        :placeholder="$t('en_name')"
                      />
                      <span class="invalid-feedback" v-if="v$.nameEn.$error">{{
                        v$.nameEn.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-2">
                      <label for="kh_name">{{ $t("kh_name") }}</label>
                      <input
                        v-model="form.nameKh"
                        required
                        type="text"
                        class="form-control"
                        id="kh_name"
                        :placeholder="$t('kh_name')"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-2">
                      <label for="status" class="required">{{ $t("status") }}</label>
                      <select
                        class="form-select"
                        v-model="form.isActive"
                        :class="{ 'is-invalid': v$.isActive.$error }"
                        @change="v$.isActive.$touch"
                      >
                        <option value="1">
                          {{ $t("enable") }}
                        </option>
                        <option value="0">
                          {{ $t("disable") }}
                        </option>
                      </select>
                      <span class="invalid-feedback" v-if="v$.isActive.$error">{{
                        v$.isActive.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-4">
                <div class="text-center m-t-25">
                  <img
                    :src="form.image"
                    width="200"
                    class="rounded mx-auto d-block"
                  />
                </div>
                <div class="file-content text-center m-t-20">
                  <div class="media-body">
                    <div style="height: 0px; width: 0px; overflow: hidden">
                      <input
                        ref="fileInput"
                        style="display: none"
                        type="file"
                        accept=".png, .jpg, .jpeg, .gif, .webp, .svg"
                        :multiple="false"
                        @change="onFileChange"
                      />
                    </div>
                    <div
                      class="btn btn-outline-primary ms-2"
                      @click="chooseImage"
                    >
                      <vue-feather type="upload" class="text-top"></vue-feather>
                      Upload
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
  nameKh: null,
  nameEn: null,
  isActive: 1,
  descriptionKh: null,
  descriptionEn: null,
  image: appConst.defaultImage
};

let form = reactive({ ...defaultForm });

const rules = computed(() => {
  return {
    nameEn: {
      required,
      maxLength: maxLength(100),
      $autoDirty: true,
    },
    isActive: {
      required,
      $autoDirty: true,
    }
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

const showModal = (editId = null, row) => {
  imageFile.value = null;
  imageName.value = null;
  state.modal.show();
  if (editId) {
    const { id, nameEn,nameKh,descriptionEn,descriptionKh,imageUrl } = row;
    form.id = id;
    form.nameEn = nameEn;
    form.nameKh = nameKh;
    form.descriptionEn = descriptionEn;
    form.descriptionKh = descriptionKh;
    form.image = imageUrl
    if(nullToVoid(imageUrl) == ""){
      form.image = appConst.defaultImage
    }
  } else {
    setDefaultForm();
  }
};
const save = async (event) => {
  const result = await v$.value.$validate();
  if (result) {
    let url = "https://efree.cheakautomate.online/gateway/CATEGORY/api/v1/categories";
    let method = "POST";
    if (props.actionType == appConst.modalAction.update) {
      url = "https://efree.cheakautomate.online/gateway/CATEGORY/api/v1/categories/" + form.id;
      method = "PATCH";
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
      if(nullToVoid(imageFile.value) != "" && nullToVoid(imageName.value) != ""){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", userStore.logged ? `Bearer ${userStore.token}` : "");
        const formdata = new FormData();
        formdata.append("file", imageFile.value, imageName.value);
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow"
        };
        await fetch(`https://efree.cheakautomate.online/gateway/CATEGORY/api/v1/categories/upload/single/${data.payload.id}`, 
          requestOptions
        ).then((response) => response.json())
        .then((data) => {
          
        })
      }
      imageFile.value = null;
      imageName.value = null;
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
