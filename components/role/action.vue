<template>
  <!-- <Breadcrumbs :main="$t('user_role')" :title="role_title" /> -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12 mt-3">
        <div class="card">
          <div class="card-header b-t-primary border-3">
            <div class="row">
              <div class="col-12 col-lg-6">
                <h5>{{ $t("add_role") }}</h5>
              </div>
              <div class="col-12 col-lg-6">
                <div
                  class="d-flex flex-wrap justify-content-start justify-content-lg-end gap-2 dropdown-basic"
                ></div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="theme-form">
              <div class="row">
                <div class="col-4">
                  <label class="required">{{ $t("role_name") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="$t('role_name')"
                    v-model="form.role_name"
                    :class="{ 'is-invalid': v$.role_name.$error }"
                    @change="v$.role_name.$touch"
                    required
                  />
                  <span class="invalid-feedback" v-if="v$.role_name.$error">{{
                    v$.role_name.$errors[0].$message
                  }}</span>
                </div>
                <div class="col-4">
                  <label class="required">{{ $t("user_type") }}</label>

                  <select
                    class="form-control"
                    v-model="form.user_type_id"
                    :class="{
                      'is-invalid': v$.user_type_id.$error,
                      'form-select': true,
                    }"
                    @change="v$.user_type_id.$touch"
                  >
                    <option value="" selected disabled>
                      {{ $t("please_select") }}
                    </option>
                    <option
                      v-for="obj in userTypeStore.getList"
                      :key="obj.index"
                      :value="obj.id"
                    >
                      {{ $t(obj.type) }}
                    </option>
                  </select>
                  <span
                    class="invalid-feedback"
                    v-if="v$.user_type_id.$error"
                    >{{ v$.user_type_id.$errors[0].$message }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-3">
          <div class="col-sm-12">
            <div class="d-flex justify-content-between align-items-center">
              <h5>{{ $t("permission") }} :</h5>
              <button @click="save" class="btn btn-primary">
                <Icon name="mdi:content-save" /> {{ $t("save") }}
              </button>
            </div>
          </div>

          <div class="mt-3">
            <div
              class="row gy-4"
              v-for="(item, index) in form.module_permission"
              :key="index"
            >
              <div class="card">
                <div class="card-body">
                  <div class="row gy-3">
                    <div class="col-sm-12">
                      <div
                        class="border-bottom pb-2 d-flex justify-content-between align-items-center"
                      >
                        <h6 style="font-weight: bold">
                          {{ $t(item.module_name) }}
                        </h6>
                        <div
                          class="checkbox"
                          :class="[
                            item.checked
                              ? 'checkbox-solid-info'
                              : 'checkbox-dark',
                          ]"
                        >
                          <input
                            v-model="item.checked"
                            :id="`chk-permission-${index}`"
                            type="checkbox"
                            @change="tickAllPermission(item, index)"
                            style="width: 20px"
                          />
                          <label :for="`chk-permission-${index}`">{{
                            $t("select_all")
                          }}</label>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-12">
                      <div class="d-flex gap-3 flex-wrap">
                        <div
                          class="form-group"
                          v-for="(permission, perIndex) in item.permission"
                          :key="perIndex"
                        >
                          <div
                            class="checkbox"
                            :class="[
                              permission.checked
                                ? 'checkbox-solid-info'
                                : 'checkbox-dark',
                            ]"
                          >
                            <input
                              :id="`chk-permission-${index}-${perIndex}`"
                              type="checkbox"
                              v-model="permission.checked"
                              style="width: 20px"
                              @change="checkTickAllPermission"
                            />
                            <label
                              :for="`chk-permission-${index}-${perIndex}`"
                              >{{ $t(permission.permission_name) }}</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button @click="save" class="btn btn-primary">
                <Icon name="mdi:content-save" /> {{ $t("save") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { roleAPI } from "~/constants/api";
import { appConst } from "~/constants/app";
import { required, maxLength } from "@vuelidate/validators";
import { useUserTypeStore } from "~/store/user_type";

const userTypeStore = useUserTypeStore();

const props = defineProps({
  actionType: {
    type: Number,
    default: appConst.formAction.add,
  },
});
let form = reactive({
  id: null,
  role_name: null,
  user_type_id: userTypeStore.getList[0].id,
  role_module: [],
  module_permission: [],
});
let selectAll = ref(false);

const rules = computed(() => {
  return {
    role_name: {
      required,
      maxLength: maxLength(255),
      $autoDirty: true,
    },
    user_type_id: {
      required,
      $autoDirty: true,
    },
  };
});

const v$ = vuelidate(rules, form);

onMounted(() => {
  if (props.actionType == appConst.formAction.add) {
    getModulePermission();
  } else {
    if (empty(useRoute().query.id)) {
      navigateTo("/users/user_role");
    } else {
      getForUpdate();
    }
  }
});

const getModulePermission = async () => {
  const data = await ifetch(roleAPI.getModulePermission);
  for (const obj of data) {
    form.module_permission.push(obj);
  }
};

const tickAllPermission = (module_item, module_index) => {
  form.module_permission[module_index].permission.forEach((obj) => {
    if (form.module_permission[module_index].checked) {
      obj.checked = true;
    } else {
      obj.checked = false;
    }
  });
  var i = 0;
  for (let index = 0; index < form.module_permission.length; index++) {
    if (form.module_permission[index].checked == true) {
      i = i + 1;
    }
  }
  if (form.module_permission.length == i) {
    selectAll = true;
  } else {
    selectAll = false;
  }
};
const checkTickAllPermission = () => {
  form.module_permission.forEach((module_obj) => {
    let total_permission = module_obj.permission.length;
    let total_check_permission = 0;
    module_obj.permission.forEach((permission_obj) => {
      if (permission_obj.checked == true) {
        total_check_permission++;
      }
    });
    if (
      total_permission == total_check_permission &&
      total_check_permission > 0
    ) {
      module_obj.checked = true;
    } else {
      module_obj.checked = false;
    }
  });
  var i = 0;
  for (let index = 0; index < form.module_permission.length; index++) {
    if (form.module_permission[index].checked == true) {
      i = i + 1;
    }
  }
  if (form.module_permission.length == i) {
    selectAll = true;
  } else {
    selectAll = false;
  }
};
const getForUpdate = async () => {
  const data = await ifetch(roleAPI.get_update, { id: useRoute().query.id });
  // console.log(form)
  // form = Object.assign({}, data.role)
  form.id = data.role.id;
  form.role_name = data.role.role_name;
  form.user_type_id = data.role.user_type_id;

  data.module_permission.forEach((module_item_obj) => {
    module_item_obj.permission.forEach((permission_obj) => {
      module_item_obj.checked = false;
      data.role_module.forEach((role_module_obj) => {
        if (role_module_obj.permission_id === permission_obj.id) {
          permission_obj.checked = true;
        }
      });
    });
  });
  form.role_module = data.role_module;
  form.module_permission = data.module_permission;
  checkTickAllPermission();

  let i = 0;
  for (let index = 0; index < form.module_permission.length; index++) {
    if (form.module_permission[index].checked == true) {
      i = i + 1;
    }
  }
  if (form.module_permission.length == i) {
    selectAll = true;
  } else {
    selectAll = false;
  }
};

const save = async () => {
  const result = await v$.value.$validate();
  if (result) {
    let url = roleAPI.store;
    if (props.actionType == appConst.formAction.update) {
      url = roleAPI.update;
    }
    await ifetch(url, form);
    iAlert().success();
    useRouter().push({ path: "/users/user_role" });
  }
};
</script>
<style lang="scss"></style>
