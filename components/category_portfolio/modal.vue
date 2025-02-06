<template>
  <div class="modal modal-lg fade" id="modal">
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
            <div class="col-12">
              <div class="col-12">
                <div class="text-center m-t-25">
                  <img
                    :src="getImagePath(form.image,'category')"
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
              <div
                class="form-group mt-2"
                v-for="(item, index) in languageList"
                :key="index"
              >
                <label class="required" :for="`name-${item.code}`">{{
                  `${$t("name")} (${item.code.toUpperCase()})`
                }}</label>
                <input
                  v-model="form.temp_name[index].department"
                  type="text"
                  class="form-control"
                  :id="`name-${item.code}`"
                  :placeholder="`${$t('name')} (${item.code.toUpperCase()})`"
                  :class="{
                    'is-invalid': v$.temp_name[index].department.$error,
                  }"
                  @change="v$.temp_name[index].department.$touch"
                  required
                  autocomplete="off"
                />
                <span
                  class="invalid-feedback"
                  v-if="v$.temp_name[index].department.$error"
                >
                  {{
                    $t("name") +
                    " (" +
                    item.code.toUpperCase() +
                    ") " +
                    $t(v$.temp_name[index].department.$errors[0].$message)
                  }}
                </span>
              </div>
              <!-- <div class="form-group mb-2">
                <label for="link" class="required">{{ $t("type") }}</label>
                <select
                  class="form-select"
                  v-model="form.type"
                  :class="{ 'is-invalid': v$.type.$error }"
                  @change="v$.type.$touch"
                >
                  <option :value="null" selected>
                    {{ $t("please_select") }}
                  </option>
                  <option
                    v-for="(obj, index) in categoryType.lists"
                    :key="index"
                    :value="obj.id"
                  >
                    {{ $t(obj.name) }}
                  </option>
                </select>
                <span class="invalid-feedback" v-if="v$.type.$error">{{
                  v$.type.$errors[0].$message
                }}</span>
              </div> -->
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
import { useLanguageStore } from "~/store/language";
const languageList = useLanguageStore().lists;
const branchStore = useBranchStore();
const categoryType = useCategoryType();
const categoryList = useCategoryList();
const props = defineProps({
  actionType: String,
});
const state = reactive({
  modal: null,
});

const defaultForm = {
  id: null,
  temp_name: languageList.map((lang) => ({
      language_id: lang.id,
      language_code: lang.code,
      department: null,
    })),
  type: categoryType.portfolio,
  image: null,
  slug: null,
};
let form = reactive({
  ...defaultForm,
});

// watch(
//   () => languageList,
//   (newList) => {
//     defaultForm.temp_name = newList.map((lang) => ({
//       language_id: lang.id,
//       language_code: lang.code,
//       department: null,
//     }));
//     setDefaultForm();
//   },
//   { immediate: true }
// );

const rules = computed(() => {
  return {
    temp_name: languageList.map(() => ({
      department: {
        required,
        $autoDirty: true,
      },
    })),
  };
});
const v$ = vuelidate(rules, form);
const emit = defineEmits(["closeModal"]);
let targetFile = ref(null);
let aspectRatio = ref(null);
let cropWidth = ref(null);
let cropHeight = ref(null);
const fileInput = ref(null);
const cropImageModal = ref(null);
const hideShowCropperImage = ref(false);
const imagePath = ref(null);

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
  fileInput.value.value = null; 
};
const imagecroped = (data) =>{
  form.image = data;
}
onMounted(() => {
  setDefaultForm();
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal = new bootstrap.Modal("#modal");
});

const showModal = (editId = null, row) => {
  state.modal.show();
  if (editId) {
    const parsedName = JSON.parse(rowId.name);

    form.temp_name = defaultForm.temp_name.map((defaultItem) => ({
      ...defaultItem,
      department: parsedName[defaultItem.language_code] || null,
    }));
    const { id, type, image,slug } = row;
    form.id = id;
    form.type = type;
    form.image = image;
    form.slug = slug;
  } else {
    setDefaultForm();
  }
};
const save = async (event) => {
  const result = await v$.value.$validate();
  if (result) {
    let url = categoryAPI.store;
    if (props.actionType == appConst.modalAction.update) {
      url = categoryAPI.update;
    }
    const nameMap = form.temp_name.reduce((acc, item) => {
      acc[item.language_code] = item.department;
      return acc;
    }, {});
    form.name = JSON.stringify(nameMap)
    form.branch_id = branchStore.branch_id;
    form.slug = convertToSlug(form.name);
    const data = await ifetch(url, form);
    iAlert().success();
    categoryList.setData(data.data);
    if (event) {
      emit("closeModal", true);
      closeModal(true);
    } else {
      setDefaultForm();
    }
  } else {
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};

const setDefaultForm = () => {
  Object.assign(form, defaultForm);
  form.temp_name = defaultForm.temp_name.map((item) => ({ ...item }));
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
