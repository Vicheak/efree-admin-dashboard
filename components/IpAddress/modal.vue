<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">
            {{ props.actionType && $t(props.actionType) }}
            {{ $t("ip_address") }}
          </h4>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="() => closeModal()"
          ></button>
        </div>
        <div class="modal-body p-l-25 p-r-25">
          <form class="theme-form">
            <div class="row">
              <div class="col-sm-12">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-3">
                      <label>{{ $t("name") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('name')"
                        required
                        v-model="form.name"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div class="form-group required mb-3">
                      <label>{{ $t("ip_address") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('ip_address')"
                        required
                        v-model="form.ip_address"
                        :class="{ 'is-invalid': v$.ip_address.$error }"
                        @change="v$.ip_address.$touch"
                      />
                      <span
                        class="invalid-feedback"
                        v-if="v$.ip_address.$error"
                        >{{ v$.ip_address.$errors[0].$message }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
            @click="() => save(true)"
          >
            {{ $t("save_new") }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="() => save(false)"
          >
            {{ $t("save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useVuelidate } from "@vuelidate/core";
  import { required, email, minLength, maxLength } from "@vuelidate/validators";
  import { appConst } from "~/constants/app";
  import { ipAddressApi } from "~/constants/api";
  import { useUserStore } from "~/store/user";
  import { storeToRefs } from "pinia";

  const userStore = useUserStore();
  const { auth } = storeToRefs(userStore);
  const props = defineProps({
    actionType: String,
  });
  const state = reactive({
    modal: null,
  });

  const defaultForm = {
    name: null,
    ip_address: null,
    created_by: null,
    branch_id: null,
  };
  const rowID = ref(null);
  const form = reactive({});

  const rules = computed(() => {
    return {
      ip_address: {
        required,
        maxLength: maxLength(100),
        $autoDirty: true,
      },
      note: {
        maxLength: maxLength(255),
        $autoDirty: true,
      },
    };
  });

  const v$ = useVuelidate(rules, form);
  const emit = defineEmits(["closeModal"]);
  const fileInput = ref(null);

  onMounted(() => {
    setDefaultForm();
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal = new bootstrap.Modal("#modal");
  });

  const showModal = async (editId = null) => {
    state.modal.show();
    rowID.value = editId;
    setDefaultForm();
    if (editId) {
      const data = await ifetch(ipAddressApi.get_by_id, { id: editId });
      Object.assign(form, data);

      form.image_display = empty(data.image)
        ? appConst.defaultImage
        : getImagePath(data.image);
      form.image = data.image;
    }
  };

  const chooseImage = () => {
    fileInput.value.click();
  };
  const onFileChange = ($event) => {
    const files = $event.target.files || $event.dataTransfer.files;

    if (files[0]) {
      if (files[0].size > 2 * 1024 * 1024) {
        form.image = appConst.defaultImage;
        return;
      }
      const reader = new FileReader();

      reader.onload = function (e) {
        form.image = "";
        form.image = e.target.result;
        form.image_display = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    } else {
      form.image = appConst.defaultImage;
    }
  };

  const closeModal = (isRefresh = false) => {
    setDefaultForm();
    state.modal.hide();
    emit("closeModal", isRefresh);
  };

  const save = async (isNew = false) => {
    const result = await v$.value.$validate();
    if (result) {
      let url = ipAddressApi.store;
      if (props.actionType === appConst.modalAction.update) {
        url = ipAddressApi.update;
      }

      await ifetch(url, form);
      iAlert().success();
      setDefaultForm();
      emit("closeModal", true);
      if (!isNew) closeModal(true);
    } else {
      iAlert().invalidInput();
    }
  };

  const setDefaultForm = () => {
    Object.assign(form, defaultForm);
    form.created_by = auth.value.id;
    form.branch_id = auth.value.branch_id;
    v$.value.$reset();
  };

  defineExpose({
    showModal,
  });
</script>
