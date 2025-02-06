<template>
  <div class="modal fade" id="profile-modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">
            {{ props.actionType && $t(props.actionType) }} {{ $t("profile") }}
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
                    readonly
                    autocomplete="off"
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
                  <label>{{ $t("user_type") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="$t('user_type')"
                    readonly
                    :value="form.type"
                  />
                </div>
              </div>
              <div class="col-sm-12" v-if="showCompany">
                <div class="form-group mb-3">
                  <label>{{ $t("company") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="$t('company')"
                    readonly
                    :value="form.company_name"
                  />
                </div>
              </div>
              <div class="col-sm-12" v-if="showBranch">
                <div class="form-group mb-3">
                  <label>{{ $t("branch") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="$t('branch')"
                    readonly
                    :value="form.branch_name"
                  />
                </div>
              </div>
              <div class="col-sm-12" v-if="showRole">
                <div class="form-group mb-3">
                  <label>{{ $t("role") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="$t('role')"
                    readonly
                    :value="form.role_name"
                  />
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
  import { storeToRefs } from "pinia";
  import { useUserStore } from "~/store/user";
  import { required, email, minLength, maxLength } from "@vuelidate/validators";
  import { appConst } from "~/constants/app";
  import { userAPI } from "~/constants/api";
  import { useUserTypeStore } from "~/store/user_type";
  import { useCompanyStore } from "~/store/company";
  import { useBranchStore } from "~/store/branch";
  import { useBootstrapStore } from "~/store/bootstrap";

  const userStore = useUserStore();
  const { auth } = storeToRefs(userStore);
  const openProfileModal = ref(false);

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
    branch_name: null,
    company_name: null,
    type: null,
    role_name: null,
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

  const showModal = async (editId = null) => {
    openProfileModal.value = true;
    state.modal.show();
    if (editId) {
      // const data = await ifetch(userAPI.get_edit, { id: editId });
      // Object.assign(form, data);
      userTypeChange();
    }
  };

  const save = async () => {
    const result = await v$.value.$validate();
    if (result) {
      await ifetch(userAPI.update, form);
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
    useBootstrapStore().closeProfileModal();
  };

  const clearForm = () => {
    for (var key in form) {
      form[key] = null;
    }
  };

  onMounted(async () => {
    // const data = await ifetch(userAPI.get_edit, { id: auth.value.id });
    // Object.assign(form, data);
    userTypeChange();
  });
</script>
