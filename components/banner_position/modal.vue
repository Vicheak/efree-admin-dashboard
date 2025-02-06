<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ $t("banner_position") }}</h4>
          <button
            class="btn-close"
            type="button"
            @click="closeModal()"
          ></button>
        </div>
        <div class="modal-body p-l-25 p-r-25">
          <form class="theme-form">
            <div class="row">
              <div class="col-4">
                <div class="form-group">
                  <label class="required">{{ $t("page") }}</label>
                  <select
                    class="form-control"
                    v-model="form.page"
                    :class="{ 'is-invalid': v$.page.$error }"
                    @change="pageChange"
                  >
                    <option :value="null" disabled>
                      {{ $t("please_select") }}
                    </option>
                    <option
                      v-for="item in bannerPageEnum.list"
                      :key="item.index"
                      :value="item.value"
                    >
                      {{ $t(bannerPageEnum.getKey(item.value)) }}
                    </option>
                  </select>
                  <span class="invalid-feedback" v-if="v$.page.$error">
                    {{ v$.page.$errors[0].$message }}</span
                  >
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label class="required">{{ $t("position") }}</label>
                  <select
                    class="form-control"
                    :disabled="afterPageChange"
                    v-model="form.name"
                    :class="{ 'is-invalid': v$.name.$error }"
                    @change="v$.name.$touch"
                  >
                    <option :value="null" disabled>
                      {{ $t("please_select") }}
                    </option>
                    <option
                      v-for="item in position_list"
                      :key="item.index"
                      :value="item.value"
                    >
                      {{ $t(item.key) }}
                    </option>
                  </select>
                  <span class="invalid-feedback" v-if="v$.name.$error">{{
                    v$.name.$errors[0].$message
                  }}</span>
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label class="required">{{ $t("status") }}</label>
                  <select
                    v-model="form.status"
                    :class="{ 'is-invalid': v$.status.$error }"
                    @change="v$.status.$touch"
                    class="form-control"
                  >
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
              <div class="col-12 mt-2">
                <div class="form-group">
                  <label class="required">{{ $t("banner") }}</label>
                  <span>
                    <Icon
                      size="20"
                      class="text-primary"
                      name="material-symbols-light:image-outline-rounded"
                    ></Icon>
                  </span>
                  <div class="border border-gray rounded">
                    <div
                      v-if="nullToVoid(form.banner_position) == ''"
                      class="flex-column d-flex align-items-center justify-content-center p-5"
                    >
                      <p>{{ $t("please_select") + " " + $t("banner") }}</p>
                      <Icon
                        style="cursor: pointer"
                        @click="uploadBanner"
                        size="100"
                        class="text-gray"
                        name="material-symbols-light:add-photo-alternate-outline-rounded"
                      ></Icon>
                    </div>
                    <div
                      class="d-flex align-items-center"
                      style="flex-wrap: wrap"
                      v-else
                    >
                      <draggable
                        :list="form.banner_position"
                        class="draggable-list d-flex"
                        style="flex-wrap: wrap"
                      >
                        <transition-group>
                          <div
                            v-for="item in form.banner_position"
                            :key="item.index"
                            class="position-relative"
                          >
                            <Icon
                              name="material-symbols-light:cancel-outline-rounded"
                              class="position-absolute text-danger"
                              size="25"
                              style="right: 0px; top: 0px"
                              @click="removeBanner(item.id)"
                            ></Icon>
                            <img
                              :src="getImagePath(item.image, 'banner')"
                              class="m-3"
                              alt=""
                              height="200"
                            />
                          </div>
                        </transition-group>
                      </draggable>
                      <Icon
                        @click="uploadBanner"
                        size="100"
                        style="cursor: pointer"
                        class="text-gray"
                        name="material-symbols-light:add-photo-alternate-outline-rounded"
                      ></Icon>
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
    </div>

    <div v-if="showBannerModal">
      <BannerModal
        ref="bannerModal"
        @closeModal="bannerClose"
        @saveModal="saveModal"
      />
    </div>
  </div>
</template>
<script setup>
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { appConst } from "~/constants/app";
import { VueDraggableNext as draggable } from "vue-draggable-next";
import BannerModal from "./banner.vue";
import { nextTick } from "vue";
import { bannerPositionAPI } from "~/constants/api";

const props = defineProps({
  actionType: appConst.modalAction.add,
});
const state = reactive({
  modal: null,
});
const afterPageChange = ref(true);
const showBannerModal = ref(false);
const bannerModal = ref(null);
const position_list = ref([]);
const updateOldPosition = ref(true);
const updateOldPage = ref(true);
const defaultForm = {
  id: null,
  page: null,
  name: null,
  type: 1,
  status: statusEnum.enable,
  banner_position: [],
};
let form = reactive({
  page: null,
  type: 1, // 1: banner 2: video
  platform_type: bannerPlatformTypeEnum.web,
  banner_position: [],
  status: statusEnum.enable,
});
let reverting = ref(false);
let reverting_page = ref(false);
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
    name: {
      required,
      $autoDirty: true,
    },
  };
});
const emit = defineEmits(["closeModal"]);
const v$ = vuelidate(rules, form);

onMounted(() => {
  setDefaultForm();
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal_demo = new bootstrap.Modal("#modal");
});

watch(
  () => form.name,
  async (newValue, oldValue) => {
    if (oldValue !== newValue) {
      if (reverting.value) {
        reverting.value = false;
        return;
      }

      if (form.banner_position.length > 0) {
        const { $i18n } = useNuxtApp();
        if (updateOldPosition.value) {
          try {
            const result = await swal({
              title: $i18n.t("are_you_sure"),
              text: $i18n.t("it_will_delete_banner_below"),
              icon: "question",
              showCancelButton: true,
              confirmButtonText: $i18n.t("ok"),
              cancelButtonText: $i18n.t("cancel"),
              reverseButtons: true,
              showLoaderOnConfirm: true,
              allowOutsideClick: () => !swal.isLoading(),
            });

            if (result.isConfirmed) {
              form.banner_position = [];
            } else {
              reverting.value = true;
              form.name = oldValue; // Revert to old value if cancelled
            }
          } catch (error) {
            reverting.value = true;
            form.name = oldValue; // Revert to old value if there's an error
          }
        }
        updateOldPosition.value = true;
      }
    }
  },
  { immediate: true }
);
watch(
  () => form.page,
  async (newValue, oldValue) => {
    if (oldValue !== newValue) {
      if (reverting_page.value) {
        reverting_page.value = false;
        return;
      }
      if (updateOldPage.value) {
        if (form.banner_position.length > 0) {
          const { $i18n } = useNuxtApp();

          try {
            const result = await swal({
              title: $i18n.t("are_you_sure"),
              text: $i18n.t("it_will_delete_banner_below"),
              icon: "question",
              showCancelButton: true,
              confirmButtonText: $i18n.t("ok"),
              cancelButtonText: $i18n.t("cancel"),
              reverseButtons: true,
              showLoaderOnConfirm: true,
              allowOutsideClick: () => !swal.isLoading(),
            });

            if (result.isConfirmed) {
              form.banner_position = [];
            } else {
              reverting_page.value = true;
              form.page = oldValue; // Revert to old value if cancelled
            }
          } catch (error) {
            reverting_page.value = true;
            form.page = oldValue; // Revert to old value if there's an error
          }
        }
      }
      updateOldPage.value = true;
    }
  },
  { immediate: true }
);

const uploadBanner = async () => {
  const { $i18n } = useNuxtApp();
  if (nullToVoid(form.name) == "") {
    swal({
      icon: "warning",
      title: $i18n.t("position"),
      text: $i18n.t("please_select") + $i18n.t("position"),
    });
    return;
  }
  showBannerModal.value = true;
  // let type = bannerImageTypeEnum.mobile;
  // let image_type = bannerPageEnum.home;
  // if (form.page == bannerPageEnum.home && form.name == "slideshow") {
  //   image_type = bannerPageEnum.home;
  //   type = bannerPlatformTypeEnum.web;
  // }
  // if (form.page == bannerPageEnum.highlight && form.name == "banner") {
  //   image_type = bannerPageEnum.highlight;
  //   type = bannerPlatformTypeEnum.web;
  // }
  // if (form.page == bannerPageEnum.news && form.name == "slideshow") {
  //   image_type = bannerPageEnum.news;
  //   type = bannerPlatformTypeEnum.web;
  // } else if (form.page == bannerPageEnum.news && form.name == "banner") {
  //   image_type = bannerPageEnum.news;
  //   type = bannerPlatformTypeEnum.mobile;
  // }
  nextTick(() => {
    // bannerModal.value.showModal(image_type, type, form.banner_position);
    let position = ""
    position_list.value.forEach((obj) => {
      if (obj.value == form.name) {
        position = obj.id
      }
    })
    bannerModal.value.showModal(form.page, position, form.banner_position);
    
  });
};

const bannerClose = () => {
  showBannerModal.value = false;
};
const removeBanner = (id) => {
  const result = form.banner_position.filter((obj) => obj.id !== id);
  form.banner_position = result;
};
const pageChange = () => {
  afterPageChange.value = false;
  const page = bannerPageEnum.getKey(form.page);
  position_list.value = positionBannerListEnum[page];
  nextTick(() => {
    v$.value.$reset();
  });
};
const showModal = async (editId = null, editItem = {}) => {
  state.modal_demo.show();
  if (editId) {
    if (editItem.page == bannerPageEnum.news && editItem.name == "slideshow") {
      editItem.banner_position = editItem.banner_position
        .filter((obj) => nullToVoid(obj.image_mobile) !== "")
        .map((obj) => {
          obj.image = obj.image_mobile;
          return obj;
        });
    }

    Object.assign(form, editItem);
    updateOldPosition.value = false;
    updateOldPage.value = false;
    pageChange();
  }
};
const saveModal = (item) => {
  form.banner_position = item;
  
  
};
const closeModal = (isRefresh = false) => {
  setDefaultForm();
  state.modal_demo.hide();
  emit("closeModal", isRefresh);
};
const setDefaultForm = () => {
  Object.assign(form, defaultForm);
  v$.value.$reset();
};
const save = async () => {
  const result = await v$.value.$validate();
  const { $i18n } = useNuxtApp();
  if (result) {
    if (form.banner_position.length <= 0) {
      swal({
        icon: "warning",
        title: $i18n.t("banner"),
        text: $i18n.t("please_upload_banner"),
      });
      return;
    }
    let url = bannerPositionAPI.store;
    if (props.actionType == appConst.modalAction.update) {
      url = bannerPositionAPI.update;
    }
    await ifetch(url, form).then((res) => {
      closeModal(true);
    });
  } else {
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};
defineExpose({ showModal });
</script>
