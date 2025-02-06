<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ $t("banner") }}</h4>
          <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-l-25 p-r-25">
          <form class="theme-form">
            <div class="row">
              <div class="col-sm-8">
                <!-- @start status  -->
                <div class="row mb-2">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="required">{{ $t("status") }}</label>
                      <select v-model="form.status" :class="{ 'is-invalid': v$.status.$error }"
                        @change="v$.status.$touch" class="form-control">
                        <option :value="statusEnum.enable">
                          {{ $t("enable") }}
                        </option>
                        <option :value="statusEnum.disable">
                          {{ $t("disable") }}
                        </option>
                      </select>
                      <span class="invalid-feedback" v-if="v$.status.$error">{{
                        v$.status.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                </div>
                <!-- @start image type  -->
                <div class="row mb-2">
                  <div class="col-12 col-lg-6">
                    <div class="form-group">
                      <label class="required">{{ $t("page") }}</label>
                      <select class="form-control" v-model="form.page" :disabled="true" :class="{ 'is-invalid': v$.page.$error }"
                        @change="pageChange">
                        <option :value="null" disabled>
                          {{ $t("please_select") }}
                        </option>
                        <option v-for="item in bannerPageEnum.list" :key="item.index" :value="item.value">
                          {{ $t(bannerPageEnum.getKey(item.value)) }}
                        </option>
                      </select>
                      <span class="invalid-feedback" v-if="v$.page.$error">{{ v$.page.$errors[0].$message }}</span>
                    </div>
                  </div>
                  <div class="col-12 col-lg-6">
                    <div class="form-group">
                      <label class="required">{{ $t("position") }}</label>
                      <select class="form-control" :disabled="true" v-model="form.position_id"
                        :class="{ 'is-invalid': v$.position_id.$error }" @change="positionChange">
                        <option :value="null" disabled>
                          {{ $t("please_select") }}
                        </option>
                        <option v-for="item in position_list" :key="item.index" :value="item.id">
                          {{ $t(item.key) }}
                        </option>
                      </select>
                      <span class="invalid-feedback" v-if="v$.position_id.$error">{{
                        v$.position_id.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- start platform type  -->
                <!-- <div class="row mb-2">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="required">{{ $t("platform_type") }}</label>
                      <select
                        v-model="form.platform_type"
                        :class="{ 'is-invalid': v$.platform_type.$error }"
                        @change="onChangeImageType"
                        class="form-control"
                      >
                        <option :value="null" disabled>
                          {{ $t("platform_type") }}
                        </option>
                        <option
                          v-for="item in platform_list"
                          :key="item.index"
                          :value="item.value"
                        >
                          {{ $t(item.value) }}
                        </option>
                      </select>
                      <span
                        class="invalid-feedback"
                        v-if="v$.platform_type.$error"
                        >{{ v$.platform_type.$errors[0].$message }}</span
                      >
                    </div>
                  </div>
                </div> -->
                <!-- @start name  -->
                <div class="row mb-2">
                  <div class="col-12">
                    <div class="form-group">
                      <label>{{ $t("name") }}</label>
                      <input v-model="form.name" type="text" class="form-control" :placeholder="$t('name')" />
                    </div>
                  </div>
                </div>

                <!-- @start banner type  -->
                <div class="row mb-2">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="required">{{ $t("banner_type") }}</label>
                      <select v-model="form.type" class="form-control" :class="{ 'is-invalid': v$.type.$error }"
                        @change="v$.type.$touch">
                        <option :value="null" disabled>
                          {{ $t("banner_type") }}
                        </option>
                        <option v-for="item in bannerTypeEnum.list" :key="item.index" :value="item.value">
                          {{ $t(bannerTypeEnum.getKey(item.value)) }}
                        </option>
                      </select>
                      <span class="invalid-feedback" v-if="v$.type.$error">{{
                        v$.type.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- @start link -->
                <div class="row mb-2" v-if="form.type == bannerTypeEnum.link">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="required">{{ $t("link") }}</label> &nbsp;
                      <span style="color: gray">ex: http://www.example.com</span>

                      <input :class="{ 'is-invalid': v$.description.$error }" @change="v$.description.$touch"
                        v-model="form.description" type="text" class="form-control" :placeholder="$t('link')" />
                      <span class="invalid-feedback" v-if="v$.description.$error">{{ v$.description.$errors[0].$message
                        }}</span>
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <div class="row mb-2">
                  <div class="col-12 mb-2" v-if="form.type == bannerTypeEnum.detail">
                    <div class="form-group">
                      <label class="required" for="title">{{
                        $t("description")
                      }}</label>
                      <WangEditor ref="editor" :valueEditHtml="form.description" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <!-- @image -->
                <div class="col-12">
                  <div class="text-center m-t-25">
                    <label for="">{{ $t("image") }}</label>
                    <img :src="getImagePath(form.image, 'banner')" width="150" class="rounded mx-auto d-block" />
                  </div>
                  <div class="file-content text-center m-t-20">
                    <div class="media-body">
                      <div style="height: 0px; width: 0px; overflow: hidden">
                        <input ref="fileInput" style="display: none" type="file"
                          accept=".jpg, .jpeg, .gif, .png, .webp, .svg" :multiple="false" @change="onFileChange" />
                      </div>
                      <template v-if="platform_list.length > 0">
                        <div class="mb-2">
                          <b>{{ $t("image_size") }}: </b>
                          <div>
                            {{ platform_list[0].width }} X
                            {{ platform_list[0].height }}
                            <div class="mt-1">{{ $t("less_than_15_MB") }}</div>
                          </div>
                        </div>
                      </template>
                      <div class="btn btn-outline-primary ms-2" @click="chooseImage">
                        <vue-feather type="upload" class="text-top"></vue-feather>
                        {{ $t("choose_image") }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- @image mobile -->
                <div class="col-12">
                  <div class="text-center m-t-25">
                    <label for="">{{ $t("image_mobile") }}</label>
                    <img :src="getImagePath(form.image_mobile, 'banner')" width="150" class="rounded mx-auto d-block" />
                  </div>
                  <div class="file-content text-center m-t-20">
                    <div class="media-body">
                      <div style="height: 0px; width: 0px; overflow: hidden">
                        <input ref="fileInputMobile" style="display: none" type="file" accept=".jpg, .jpeg, .gif, .png, .webp, .svg"
                          :multiple="false" @change="onFileChangeMobile" />
                      </div>
                      <template v-if="platform_list.length > 0">
                        <div class="mb-2">
                          <b>{{ $t("image_size") }}: </b>
                          <div>
                            {{ platform_list[1].width }} X
                            {{ platform_list[1].height }}
                            <div class="mt-1">{{ $t("less_than_15_MB") }}</div>
                          </div>
                        </div>
                      </template>
                      <div class="btn btn-outline-primary ms-2" @click="chooseImageMobile">
                        <vue-feather type="upload" class="text-top"></vue-feather>
                        {{ $t("choose_image") }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal()">
            {{ $t("close") }}
          </button>
          <button class="btn btn-primary" @click="save">
            {{ $t("save") }}
          </button>
        </div>
      </div>
      <!-- Start modal-cropper-image Component -->
      <div v-if="hideShowCropperImage">
        <ModalCropperImage ref="modalShowCropperImage" :target-file.sync="targetFile" :aspectRatio="aspectRatio"
          :previewWidth="cropWidth" :previewHeight="cropHeight" :cropBoxResizable="false"
          @closeModal="closeModalCropperImage" @save="saveModalCropperImage" />
      </div>
      <!-- End modal-cropper-image Component -->
    </div>
  </div>
</template>
<script setup>
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { appConst } from "~/constants/app";
import { bannerAPI } from "~/constants/api";
import WangEditor from "~/components/WangEdiot.vue";
import ModalCropperImage from "~/components/ModalCropperImage.vue";
import { platformTypeEnum, positionBannerListEnum } from "~/composables/enum";
import { set } from "date-fns";

const props = defineProps({
  actionType: appConst.modalAction.add,
});
const state = reactive({
  modal: null,
});
const defaultForm = {
  id: null,
  page: 1,
  platform_type: null,
  name: null,
  type: null,
  status: statusEnum.enable,
  image: null,
  image_mobile: null,
  position_id: 1,
};
let targetFile = ref(null);
let aspectRatio = ref(null);
let cropWidth = ref(null);
let cropHeight = ref(null);
let oldImageType = ref(null);
const modalShowCropperImage = ref(null);
const hideShowCropperImage = ref(false);
let form = reactive({
  status: statusEnum.enable,
});

const rules = computed(() => {
  return {
    page: {
      required,
      $autoDirty: true,
    },
    status: {
      required,
      $autoDirty: true,
    },
    type: {
      required,
      $autoDirty: true,
    },
    description: {
      required,
      $autoDirty: true,
    },
    position_id: {
      required,
      $autoDirty: true,
    },
  };
});

const v$ = vuelidate(rules, form);
const emit = defineEmits(["closeModal"]);
const fileInput = ref(null);
const fileInputMobile = ref(null);
const imagePath = ref(null);
const oldPlatformType = ref(null);
const editor = ref(null);
const platform_list = ref([]);
const position_list = ref([]);
const afterPageChange = ref(true);
let imageSize = reactive({});

onMounted(() => {
  setDefaultForm();
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal_demo = new bootstrap.Modal("#modal");
});

watch(
  () => form.page,
  (newVal, oldVal) => {
    oldImageType.value = oldVal;
  }
);
watch(
  () => form.platform_type,
  (val) => {
    if (nullToVoid(val) != "") {
      const page = bannerPageEnum.getKey(form.page);
      imageSize = platformTypeEnum[page].find((obj) => {
        return obj.value == form.platform_type;
      });
    }
  },
  { immediate: true }
);
// watch(
//   () => form.platform_type,
//   (newVal, oldVal) => {
//     oldPlatformType.value = oldVal;
//   }
// );

const showModal = async (editId = null, editItem = {}) => {
  setDefaultForm();
  state.modal_demo.show();
  if (editId) {
    const { id,
      page,
      platform_type,
      name,
      type,
      status,
      image,
      image_mobile,
      position_id,
      description } = editItem;
    form.id = id;
    form.page = page;
    form.platform_type = platform_type;
    form.name = name;
    form.type = type;
    form.status = status;
    nextTick(()=>{
      form.position_id = position_id;
      afterPageChange.value = false;
      const pageLoad = bannerPageEnum.getKey(form.page);
      let position = '';
      position_list.value = positionBannerListEnum[pageLoad];
      position_list.value.forEach((obj) => {
        if (obj.id == position_id) {
          position = obj.value
        }
      })
      platform_list.value = platformTypeEnum[pageLoad][position];
    })
    
    form.image = image;
    form.image_mobile = image_mobile;
    form.description = description
    form.old_image=image
    form.old_image_mobile=image_mobile
    pageChange();

  }
  
};

const chooseImage = () => {
  const { $i18n } = useNuxtApp();
  if (nullToVoid(form.page) == "" || nullToVoid(form.position_id) == "") {
    swal({
      icon: "warning",
      title: $i18n.t("banner"),
      text: $i18n.t("please_select_page_and_position_first"),
    });
    return;
  }
  fileInput.value.click();
};

const onFileChange = ($event) => {
  const file = $event.target.files[0] || $event.dataTransfer.files[0];

  if (file) {
    if (file.size > 15000000) {
      fileInput.value = "";
      form.image = "";
      useNuxtApp().$showToast({
        msg: "Image file must be less than 15 MB.",
        type: "warning",
      });
      return;
    }
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (
      file.type.indexOf("image/") === -1 ||
      !allowedTypes.includes(file.type.toLowerCase())
    ) {
      swal({
        icon: "warning",
        title: "Image Validation",
        text: "Please select a JPG, JPEG, or GIF image file.",
      });
      return;
    }

    checkImageDimensions(file, platform_list.value[0], function (isValid) {
      if (isValid) {
        if (typeof FileReader === "function") {
          const reader = new FileReader();

          reader.onload = (event) => {
            form.image = "";
            form.image = event.target.result;
            // rebuild cropperjs with the updated source
            // cropper.value.replace(event.target.result);
          };

          reader.readAsDataURL(file);
        } else {
          swal({
            icon: "error",
            title: "Image Validation",
            text: "Sorry, FileReader API not supported",
          });
        }
      } else {
        swal({
          icon: "error",
          title: "Image Validation",
          text: `Image dimensions should be ${platform_list.value[0].width}x${platform_list.value[0].height} pixels.`,
        });
      }
    });
  }
};

const chooseImageMobile = () => {
  const { $i18n } = useNuxtApp();
  if (nullToVoid(form.page) == "" || nullToVoid(form.position_id) == "") {

    swal({
      icon: "warning",
      title: $i18n.t("banner"),
      text: $i18n.t("please_select_page_and_position_first"),
    });
    return;
  }
  fileInputMobile.value.click();
};

const onFileChangeMobile = ($event) => {
  const file = $event.target.files[0] || $event.dataTransfer.files[0];

  if (file) {
    if (file.size > 15000000) {
      fileInputMobile.value = "";
      form.image_mobile = "";
      useNuxtApp().$showToast({
        msg: "Image file must be less than 15 MB.",
        type: "warning",
      });
      return;
    }
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (
      file.type.indexOf("image/") === -1 ||
      !allowedTypes.includes(file.type.toLowerCase())
    ) {
      swal({
        icon: "warning",
        title: "Image Validation",
        text: "Please select a JPG, JPEG, or GIF image file.",
      });
      return;
    }

    checkImageDimensions(file, platform_list.value[1], function (isValid) {
      if (isValid) {
        if (typeof FileReader === "function") {
          const reader = new FileReader();

          reader.onload = (event) => {
            form.image_mobile = "";
            form.image_mobile = event.target.result;
          };

          reader.readAsDataURL(file);
        } else {
          swal({
            icon: "error",
            title: "Image Validation",
            text: "Sorry, FileReader API not supported",
          });
        }
      } else {
        swal({
          icon: "error",
          title: "Image Validation",
          text: `Image dimensions should be ${platform_list.value[1].width}x${platform_list.value[1].height} pixels.`,
        });
      }
    });
  }
};

const onChangeImageType = () => {
  //Check Select Platform
  if (nullToVoid(form.platform_type) == "") {
    form.page = oldImageType.value;
    const { $i18n } = useNuxtApp();
    swal({
      icon: "warning",
      title: $i18n.t("banner"),
      text: $i18n.t("please_select_platform_type"),
    });

    $nextTick(() => {
      $v.value.$reset();
    });

    return;
  }

  //Ask when already selected
  clearImageOnChange("page");

  //Clear Image when image type null
  if (nullToVoid(form.page) == "") {
    form.image = null;
  }
};

const clearImageOnChange = (onChangeType) => {
  const { $i18n } = useNuxtApp();
  if (
    nullToVoid(form.platform_type) != "" &&
    nullToVoid(form.page) != "" &&
    nullToVoid(form.image) != ""
  ) {
    swal({
      title: $i18n.t("are_you_sure"),
      text: $i18n.t("it_will_delete_the_image_above"),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: $i18n.t("ok"),
      cancelButtonText: $i18n.t("cancel"),
      reverseButtons: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        form.image = null;
      } else if (result.isDismissed) {
        if (onChangeType == "platform_type") {
          form.platform_type = oldPlatformType.value;
        } else if (onChangeType == "page") {
          form.page = oldImageType.value;
        }
      }
    });
  }
};

const openModalCropperImage = () => {
  aspectRatio.value = imageSize.width / imageSize.height;
  cropWidth.value = imageSize.width;
  cropHeight.value = imageSize.height;
  hideShowCropperImage.value = true;
  nextTick(() => {
    modalShowCropperImage.value.showModal(targetFile.value);
  });
};

const closeModalCropperImage = () => {
  hideShowCropperImage.value = false;
  fileInput.value = "";
  targetFile.value = null;
  aspectRatio.value = null;
  cropWidth.value = null;
  cropHeight.value = null;
};

const saveModalCropperImage = (base64) => {
  imagePath.value = "";
  form.image = base64;
  closeModalCropperImage();
};

const save = async () => {
  if (form.type == bannerTypeEnum.detail) {
    form.description = editor.value.getValue();
  }
  const result = await v$.value.$validate();
  const { $i18n } = useNuxtApp();
  if (result) {
    let url = bannerAPI.store;
    if (props.actionType == appConst.modalAction.update) {
      url = bannerAPI.update;
    }
    let input = JSON.parse(JSON.stringify(form));

    if (
      form.type == bannerTypeEnum.detail &&
      nullToVoid(input.description) == ""
    ) {
      swal({
        icon: "warning",
        title: $i18n.t("banner"),
        text: $i18n.t("please_input_description"),
      });
      return;
    }
    if (nullToVoid(input.image) == "") {
      swal({
        icon: "warning",
        title: $i18n.t("banner"),
        text: $i18n.t("please_upload_image"),
      });
      return;
    }
    await ifetch(url, form);
    iAlert().success();
    closeModal(true);
  } else {
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};

const closeModal = (isRefresh = false) => {
  setDefaultForm();
  state.modal_demo.hide();
  emit("closeModal", isRefresh);
};

const setDefaultForm = () => {
  Object.assign(form, defaultForm);
  const pageLoad = bannerPageEnum.getKey(form.page);
  let position = '';
  position_list.value = positionBannerListEnum[pageLoad];
  position_list.value.forEach((obj) => {
    if (obj.id == form.position_id) {
      position = obj.value
    }
  })
  platform_list.value = platformTypeEnum[pageLoad][position];
  v$.value.$reset();
};

const pageChange = () => {
  // afterPageChange.value = false;
  afterPageChange.value = false;
  const page = bannerPageEnum.getKey(form.page);
  position_list.value = positionBannerListEnum[page];
  platform_list.value = [];
  form.platform_type = null;
  form.position_id = null;
  imageSize = {};
  nextTick(() => {
    v$.value.$reset();
  });
};
const positionChange = () => {
  // afterPageChange.value = false;
  afterPageChange.value = false;
  const page = bannerPageEnum.getKey(form.page);
  let position = '';
  position_list.value.forEach((obj) => {
    if (obj.id == form.position_id) {
      position = obj.value
    }
  })
  platform_list.value = platformTypeEnum[page][position];
  form.platform_type = null;
  imageSize = {};
  nextTick(() => {
    v$.value.$reset();
  });
};

const checkImageDimensions = (file, platform, callback) => {
  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = function () {
    const width = img.width;
    const height = img.height;

    // Check the dimensions
    if (width === platform.width && height === platform.height) {
      callback(true); // Dimensions are correct
    } else {
      callback(false); // Dimensions are incorrect
    }

    // Clean up
    URL.revokeObjectURL(img.src);
  };

  img.onerror = function () {
    callback(false); // Error in loading image
  };
};

defineExpose({
  showModal,
});
</script>
