<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ $t("module") }}</h4>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-l-25 p-r-25">
          <form class="theme-form">
            <div class="row">
              <div class="col-sm-12">
                <div class="row">
                  <div class="col">
                    <div class="form-group mb-3">
                      <label>{{ $t("module_name") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('module_name')"
                        v-model="form.module_name"
                        :class="{ 'is-invalid': v$.module_name.$error }"
                        @change="v$.module_name.$touch"
                      />
                      <span
                        class="invalid-feedback"
                        v-if="v$.module_name.$error"
                        >{{ v$.module_name.$errors[0].$message }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="row">
                  <div class="col">
                    <div class="form-group mb-3">
                      <label>{{ $t("module_key") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('module_key')"
                        v-model="form.module_key"
                        :class="{ 'is-invalid': v$.module_key.$error }"
                        @change="v$.module_key.$touch"
                      />
                      <span
                        class="invalid-feedback"
                        v-if="v$.module_key.$error"
                        >{{ v$.module_key.$errors[0].$message }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <h6>{{ $t("permission") }}</h6>
              </div>
              <div
                class="col-12 m-t-5 m-b-5"
                v-for="(obj, index) in form.permission"
                :key="obj.index"
              >
                <div class="permission-name-box">
                  <div
                    style="float: left; margin-left: 15px"
                    class="checkbox checkbox-success"
                  >
                    <input id="checkbox-primary" type="checkbox" checked />
                    <label for="checkbox-primary">{{
                      obj.permission_name
                    }}</label>
                  </div>
                  <p style="float: right; margin-top: 10px; margin-right: 10px">
                    <i
                      style="cursor: pointer"
                      class="icon-close"
                      @click="removePermission(index)"
                    ></i>
                  </p>
                  <div style="clear: both"></div>
                </div>
              </div>
              <div class="col-12 m-t-5 m-b-5">
                <input
                  type="text"
                  class="form-control"
                  v-model="permissionName"
                  @keydown.enter="addNewPermission"
                  :placeholder="$t('add_permission')"
                />
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
  </div>
</template>
<script setup>
  import { required, email, minLength, maxLength } from "@vuelidate/validators";
  import { appConst } from "~/constants/app";
  import { moduleAPI } from "~/constants/api";

  const props = defineProps({
    actionType: appConst.modalAction.add,
  });
  const state = reactive({
    modal: null,
  });

  let form = reactive({
    id: null,
    module_key: null,
    module_name: null,
    permission: [],
  });
  let permissionName = ref("");
  let remove_permission = reactive([]);

  const rules = computed(() => {
    return {
      module_key: {
        required,
        maxLength: maxLength(100),
        $autoDirty: true,
      },
      module_name: {
        required,
        maxLength: maxLength(100),
        $autoDirty: true,
      },
    };
  });

  const v$ = vuelidate(rules, form);
  const emit = defineEmits(["closeModal"]);
  const fileInput = ref(null);

  onMounted(() => {
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal_demo = new bootstrap.Modal("#modal");
  });

  const showModal = async (editId = null) => {
    state.modal_demo.show();
    if (editId) {
      const data = await ifetch(moduleAPI.get_by_id, { id: editId });
      Object.assign(form, data);
    }
  };
  const save = async () => {
    const result = await v$.value.$validate();
    if (result) {
      let url = moduleAPI.store;
      if (props.actionType == appConst.modalAction.update) {
        url = moduleAPI.update;
        form.remove_permission = remove_permission;
      }
      // console.log(form.remove_permission);
      await ifetch(url, form);
      useNuxtApp().$showToast({
        msg: "New module has been added ",
        type: "success",
      });
      closeModal(true);
    } else {
      useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
    }
  };

  const addNewPermission = () => {
    if (!empty(permissionName)) {
      form.permission.push({
        id: null,
        permission_name: permissionName.value,
      });
      permissionName.value = null;
    }
  };

  const closeModal = (isRefresh = false) => {
    clearForm();
    v$.value.$reset();
    state.modal_demo.hide();
    emit("closeModal", isRefresh);
  };

  const removePermission = (index) => {
    if (!empty(form.permission[index]["id"])) {
      remove_permission.push(form.permission[index]);
    }
    form.permission.splice(index, 1);
  };

  const clearForm = () => {
    for (var key in form) {
      form[key] = null;
    }
    form.permission = [];
  };

  defineExpose({
    showModal,
  });
</script>
<style>
  .permission-name-box {
    border: 1px solid #dee2e6;
    border-radius: 5px;
    padding: 5px;
    position: relative;
    width: 100%;
  }
  .theme-form .checkbox label {
    padding-left: 20px;
  }
</style>
