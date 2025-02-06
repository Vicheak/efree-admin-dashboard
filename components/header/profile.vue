<template>
  <li class="profile-nav onhover-dropdown pe-0 py-0">
    <div class="media profile-media">
      <!-- <img class="b-r-10" src="/images/dashboard/profile.png" alt="" /> -->
      <div class="media-body">
        <span>{{ auth.full_name }}</span>
        <p class="mb-0 font-roboto">
          {{ auth.role_name }} <i class="middle fa fa-angle-down"></i>
        </p>
      </div>
    </div>
    <ul class="profile-dropdown onhover-show-div active">
      <li style="white-space: nowrap;">
        <a @click="onEditProfile">
          <Icon name="ic:outline-person-outline"></Icon>
          <span>{{ $t("profile") }}</span>
        </a>
      </li>
      <li>
        <a @click="logout"
          ><vue-feather type="log-out"></vue-feather><span>{{$t('log_out')}}</span></a
        >
      </li>

      <li v-if="userStore.auth.user_type_id === 1">
        <a @click="serverLog">
          <Icon name="ph:code-duotone"></Icon>
          <span> Server Log</span>
        </a>
      </li>
    </ul>
  </li>
</template>

<script setup>
  import { storeToRefs } from "pinia";
  import { onMounted } from "vue";
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
  const logout = () => userStore.logout();

  const serverLog = () => {
    const baseUrl = useRuntimeConfig().public.baseUrl;
    window.open(baseUrl + "/logs", "_blank");
  };

  const viewTelescope = () => {
    const baseUrl = useRuntimeConfig().public.baseUrl;
    window.open(baseUrl + "/telescope", "_blank");
  };

  const props = defineProps({
    actionType: appConst.modalAction.add,
  });
  const editProfileModal = ref();
  const profileModal = useBootstrapStore();
  onMounted(() => {
    const bootstrap = useNuxtApp().$bootstrap;
    profileModal.setProfileModal(new bootstrap.Modal("#profile-modal"));

    editProfileModal.value = new bootstrap.Modal("#profile-modal");
  });
  async function onEditProfile() {
    profileModal.profileModal.show();
  }
</script>
