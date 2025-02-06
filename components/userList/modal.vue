<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">
            {{ $t(props.actionType) }} {{ $t("user") }}
          </h4>
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
                <div class="form-group mb-3">
                  <label class="required">{{ $t("name") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="$t('name')"
                    required
                    v-model="form.full_name"
                    :class="{ 'is-invalid': v$.full_name.$error }"
                    @change="v$.full_name.$touch"
                  />
                  <span class="invalid-feedback" v-if="v$.full_name.$error">{{
                    v$.full_name.$errors[0].$message
                  }}</span>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group mb-3">
                  <label>{{ $t("username") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="$t('username')"
                    v-model="form.username"
                    :class="{ 'is-invalid': v$.username.$error }"
                    @change="v$.username.$touch"
                  />
                  <span class="invalid-feedback" v-if="v$.username.$error">{{
                    v$.username.$errors[0].$message
                  }}</span>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group mb-3">
                  <label class="col-form-label">Password</label>
                  <div class="form-input position-relative">
                    <input
                      :type="passwordInputType"
                      class="form-control"
                      :placeholder="$t('password')"
                      v-model="form.password"
                      :class="{ 'is-invalid': v$.password.$error }"
                      @change="v$.password.$touch"
                      autocomplete="off"
                    /><!---->
                    <div class="show-hide">
                      <Icon
                        class="cursor-pointer"
                        @click="onTogglePassword"
                        :name="passwordIcon"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group mb-3">
                  <label>{{ $t("check_ip_address") }}</label>
                  <select
                    class="form-control form-select"
                    v-model="form.check_user"
                  >
                    <option value="" selected disabled>
                      {{ $t("please_select") }}
                    </option>
                    <option
                      v-for="obj in checkUserEnum.list"
                      :key="obj.key"
                      :value="obj.value"
                    >
                      {{ $t(obj.key) }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group mb-3">
                  <label>{{ $t("user_type") }}</label>
                  <select
                    class="form-control form-select"
                    v-model="form.user_type_id"
                    :class="{ 'is-invalid': v$.user_type_id.$error }"
                    @change="
                      v$.user_type_id.$touch;
                      userTypeChange($event);
                    "
                  >
                    <option value="" selected disabled>
                      {{ $t("please_select") }}
                    </option>
                    <option
                      v-for="obj in userTypes"
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
              <div class="col-sm-12" v-if="showCompany">
                <div class="form-group mb-3">
                  <label>{{ $t("company") }}</label>
                  <select
                    class="form-control form-select"
                    v-model="form.company_id"
                    :class="{ 'is-invalid': v$.company_id.$error }"
                    @change="v$.company_id.$touch"
                  >
                    <option value="" selected disabled>
                      {{ $t("please_select") }}
                    </option>
                    <option
                      v-for="obj in companyStore.getList"
                      :key="obj.index"
                      :value="obj.id"
                    >
                      {{ getNameByLocal(obj.company_name) }}
                    </option>
                  </select>
                  <span class="invalid-feedback" v-if="v$.company_id.$error">{{
                    v$.company_id.$errors[0].$message
                  }}</span>
                </div>
              </div>
              <div class="col-sm-12" v-if="showBranch">
                <div class="form-group mb-3">
                  <label>{{ $t("branch") }}</label>
                  <select
                    class="form-control form-select"
                    v-model="form.branch_id"
                    :class="{ 'is-invalid': v$.branch_id.$error }"
                    @change="v$.branch_id.$touch"
                  >
                    <option value="" selected disabled>
                      {{ $t("please_select") }}
                    </option>

                    <option
                      v-for="obj in branch.getList.value"
                      :key="obj.code"
                      :value="obj.id"
                    >
                      {{ getNameByLocal(obj.branch_name, "name") }}
                    </option>
                  </select>
                  <span class="invalid-feedback" v-if="v$.branch_id.$error">{{
                    v$.branch_id.$errors[0].$message
                  }}</span>
                </div>
              </div>
              <div class="col-sm-12" v-if="showRole">
                <div class="form-group mb-3">
                  <label>{{ $t("role") }}</label>
                  <select
                    class="form-control form-select"
                    v-model="form.role_id"
                    :class="{ 'is-invalid': v$.role_id.$error }"
                    @change="v$.role_id.$touch"
                  >
                    <option value="" selected disabled>
                      {{ $t("please_select") }}
                    </option>
                    <option
                      v-for="obj in role.list"
                      :key="obj.index"
                      :value="obj.id"
                    >
                      {{ obj.role_name }}
                    </option>
                  </select>
                  <span class="invalid-feedback" v-if="v$.role_id.$error">{{
                    v$.role_id.$errors[0].$message
                  }}</span>
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
  </div>
</template>
<script setup>
  import { required, email, minLength, maxLength } from "@vuelidate/validators";
  import { appConst } from "~/constants/app";
  import { userAPI } from "~/constants/api";
  import { useUserTypeStore } from "~/store/user_type";
  import { useUserStore } from "~/store/user";
  import { useCompanyStore } from "~/store/company";
  import { useBranchStore } from "~/store/branch";
  import { storeToRefs } from "pinia";
  import { checkUserEnum } from "~/composables/enum";
  const userStore = useUserStore();
  const { auth } = storeToRefs(userStore);

  const props = defineProps({
    actionType: appConst.modalAction.add,
  });
  const state = reactive({
    modal: null,
  });

  let form = reactive({
    id: null,
    full_name: null,
    username: null,
    password: null,
    user_type_id: null,
    company_id: null,
    branch_id: auth.value.branch_id,
    role_id: null,
    check_user: checkUserEnum.uncheck,
  });

  let role = reactive({ list: [] });

  let passwordInputType = ref("password");
  let passwordShowHideIcon = reactive({
    show: "zondicons:view-show",
    hide: "bx:bxs-hide",
  });
  let passwordIcon = ref(passwordShowHideIcon.show);

  const onTogglePassword = () => {
    if (passwordInputType.value === "password") {
      passwordInputType.value = "text";
      passwordIcon.value = passwordShowHideIcon.hide;
    } else if (passwordInputType.value === "text") {
      passwordInputType.value = "password";
      passwordIcon.value = passwordShowHideIcon.show;
    }
  };

  const rules = computed(() => {
    let password = {};
    if (props.modalAction == appConst.modalAction.add) {
      password = {
        required,
        $autoDirty: true,
      };
    }
    return {
      full_name: {
        required,
        maxLength: maxLength(100),
        $autoDirty: true,
      },
      username: {
        required,
        maxLength: maxLength(100),
        $autoDirty: true,
      },
      password,
      user_type_id: {
        required,
        $autoDirty: true,
      },
      company_id: {
        $autoDirty: true,
      },
      branch_id: {
        $autoDirty: true,
      },
      role_id: {
        required,
        $autoDirty: true,
      },
    };
  });

  const v$ = vuelidate(rules, form);
  const emit = defineEmits(["closeModal"]);
  const userTypeStore = useUserTypeStore();

  const companyStore = useCompanyStore();
  const branchStore = useBranchStore();
  const branch = storeToRefs(branchStore);

  const showCompany = computed(() => {
    return form.user_type_id == userTypeStore.COMPANY && userStore.isSuperUser;
  });

  const showBranch = computed(() => {
    return (
      form.user_type_id == userTypeStore.BRANCH &&
      (userStore.isSuperUser || userStore.isCompanyUser)
    );
  });

  const userTypes = computed(() => {
    return userTypeStore.getListAll.filter(
      (obj) => obj.level <= userStore.authLevel
    );
  });

  const showRole = computed(() => {
    return !empty(form.user_type_id);
  });

  onMounted(() => {
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal_demo = new bootstrap.Modal("#modal");
  });

  const showModal = async (editId = null) => {
    state.modal_demo.show();
    if (editId) {
      // const data = await ifetch(userAPI.get_edit, { id: editId });
      // Object.assign(form, data);
      userTypeChange();
    }
  };

  const save = async () => {
    const result = await v$.value.$validate();
    if (result) {
      let url = userAPI.store;
      if (props.actionType == appConst.modalAction.update) {
        url = userAPI.update;
      }
      await ifetch(url, form);
      useNuxtApp().$showToast({
        msg: "New branch has been added ",
        type: "success",
      });
      closeModal(true);
    } else {
      useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
    }
  };

  const userTypeChange = async ($event) => {
    // const data = await ifetch(userAPI.get_role, {
    //   user_type_id: form.user_type_id,
    // });
    // role.list = data;
  };

  const closeModal = (isRefresh = false) => {
    clearForm();
    v$.value.$reset();
    state.modal_demo.hide();
    form.branch_id = auth.value.branch_id;
    emit("closeModal", isRefresh);
  };

  const clearForm = () => {
    for (var key in form) {
      form[key] = null;
    }
  };

  defineExpose({
    showModal,
  });
</script>
