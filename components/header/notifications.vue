<template>
  <div class="d-flex">
    <li class="onhover-dropdown mx-2">
      <div class="notification-box position-relative">
        <icon
          class="text-white"
          style="stroke: rgb(255 255 255 / 90%) !important"
          name="material-symbols:notifications-active-outline"
        ></icon>
        <span
          v-if="
            userStore.getNotificationRequest.reduce((a, b) => {
              return parseFloat(a) + parseFloat(b.count);
            }, 0) > 0
          "
          class="badge rounded-pill badge-warning position-absolute"
          style="top: -10px; right: -15px"
          >{{
            userStore.getNotificationRequest.reduce((a, b) => {
              return parseFloat(a) + parseFloat(b.count);
            }, 0)
          }}</span
        >
      </div>
      <div
        class="onhover-show-div notification-dropdown active"
        :class="{ active: notification }"
      >
        <h6 class="f-18 mb-0 dropdown-title">Notitication Request</h6>
        <ul style="height: 300px; overflow-y: auto">
          <li
            v-for="item in userStore.getNotificationRequest"
            :key="item.id"
            @click="readNotificationRequest(item)"
            class="b-l-warning shadow border-4"
            :class="[
              item.status == statusEnum.disable ? 'bg-body' : 'bg-transparent',
            ]"
          >
            <div class="row">
              <div class="col-10 two-line text-dark d-flex align-items-center">
                {{ $t(item.label) }}
              </div>
              <div class="col-2" style="padding-left: 0px; padding-right: 0px">
                <span
                  v-if="item.count > 0"
                  class="rounded-pill font-white badge badge-warning"
                >
                  {{ item.count }}
                </span>
              </div>
            </div>
          </li>
        </ul>
        <li class="text-center"></li>
      </div>
    </li>
    <li class="onhover-dropdown mx-2">
      <div class="notification-box position-relative">
        <svg class="notification-icon">
          <use
            href="@/assets/svg/icon-sprite.svg#notification"
            @click="notification_open()"
          ></use>
        </svg>

        <span
          v-if="
            userStore.getNotificationList &&
            userStore.getNotificationList.filter(
              (notification) => notification.status === 0
            ).length > 0
          "
          class="badge rounded-pill badge-primary position-absolute"
          style="top: -10px; right: -15px"
          >{{
            userStore.getNotificationList.filter(
              (notification) => notification.status === 0
            ).length
          }}</span
        >
      </div>
      <div
        class="onhover-show-div notification-dropdown active"
        :class="{ active: notification }"
      >
        <h6 class="f-18 mb-0 dropdown-title">Notitications</h6>
        <ul style="height: 300px; overflow-y: auto">
          <li
            v-for="item in userStore.getNotificationList"
            :key="item.id"
            @click="readNotification(item)"
            class="b-l-primary shadow border-4"
            :class="[
              item.status == statusEnum.disable ? 'bg-body' : 'bg-transparent',
            ]"
          >
            <div
              class="row"
              :class="[item.status == 0 ? 'text-opacity-100' : 'opacity-30']"
            >
              <div class="col-8 two-line text-dark d-flex align-items-center">
                {{ item.title }}
              </div>
              <div
                class="col-4 font-danger two-line"
                style="padding-left: 0px; padding-right: 0px"
              >
                {{ moment(item.created_at).fromNow() }}.
              </div>
            </div>
          </li>
        </ul>
        <li class="text-center">
          <span class="f-w-700" @click="checkAll()">Check all</span>
        </li>
      </div>
    </li>
  </div>
</template>

<script setup>
import { moduleKey } from "~/constants/moduleKey";
import moment from "moment";
import { onMounted, ref } from "vue";
import { onMessage } from "firebase/messaging";
import sound from "@/public/notification_effect.mp3";
import { useUserStore } from "@/store/user.js";
import { notificationApi } from "~/constants/api";
//deposit
import CheckBankDeposit from "~/components/deposit/check_bank.vue";
import TopupDeposit from "~/components/deposit/topup.vue";
//withdraw
import CheckBankWithdraw from "~/components/withdraw/check_bank.vue";
import TopupWithdraw from "~/components/withdraw/topup.vue";

let open_notification = ref(false);
let notification = ref(false);
const userStore = useUserStore();
//deposit
const checkDepositBankShow = ref(false);
const modalDepositCheckBank = ref(null);
const modalDepositTopup = ref(null);
const modalTopupDepositShow = ref(false);
//withdraw
const checkWithdrawBankShow = ref(false);
const modalWithdrawCheckBank = ref(null);
const modalWithdrawTopupShow = ref(false);
const modalWithdrawTopup = ref(null);
let audio = reactive("");
onMounted(async () => {
  await startListeners();
});
const emit = defineEmits(["readNotification"]);
const notification_open = () => {
  open_notification.value = !open_notification.value;
};
// FCM NOTIFICATION FUNCTIONS
const startListeners = async () => {
  await startOnMessageListener();
  // await startTokenRefreshListener();
  // await requestPermission();
  // await getIdToken();
  // listenersStarted = true;
};

const getNotificationRequest = async () => {
  await ifetch(notificationApi.notificationRequest).then((res) => {
    userStore.setNotificationRequest(res.notification_request);
  });
};

const getNotificationLists = async () => {
  await ifetch(notificationApi.getNotificationList, {
    loading: false,
  }).then((res) => {
    userStore.setNotificationList(res.notification_list);
  });
};

const startOnMessageListener = async () => {
  const { $messaging } = useNuxtApp();
  onMessage($messaging, (payload) => {
    playNotification();
    userStore.setTotalPendingTransaction(
      JSON.parse(payload.data.total_pending_transaction)
    );
    getNotificationLists();
    getNotificationRequest();
    let redirect = "";
    if (
      payload.data.type == notificationTypeEnum.deposit_check_bank ||
      payload.data.type == notificationTypeEnum.deposit_topup ||
      payload.data.type == notificationTypeEnum.deposit_reject ||
      payload.data.type == notificationTypeEnum.deposit_complete
    ) {
      redirect = "deposit";
    } else if (
      payload.data.type == notificationTypeEnum.withdraw_check_bank ||
      payload.data.type == notificationTypeEnum.withdraw_complete ||
      payload.data.type == notificationTypeEnum.withdraw_reject ||
      payload.data.type == notificationTypeEnum.withdraw_topup
    ) {
      redirect = "withdraw";
    } else if (
      payload.data.type == notificationTypeEnum.new_account_registration
    ) {
      redirect = "/account/account";
    }
    useNuxtApp().$showToast({
      msg: payload.notification.title,
      type: "success",
      draggablePercent: 0.6,
      icon: "fa fa-volume-up",
      time: 7000,
      closeOnClick: false,
      redirect: redirect,
    });
    console.log("Message received. ", payload);
  });
};
const playNotification = () => {
  let notification = new Audio(sound);
  notification.play();
};
const readNotification = async (item) => {
  await ifetch(notificationApi.readNotification, {
    id: item.id,
  }).then((res) => {
    userStore.setNotificationList(res.notification_list.data);
    userStore.setNotificationRequest(res.total_notification_request);
    if (
      item.noti_type == notificationTypeEnum.deposit_check_bank ||
      item.noti_type == notificationTypeEnum.deposit_topup ||
      item.noti_type == notificationTypeEnum.deposit_reject ||
      item.noti_type == notificationTypeEnum.deposit_complete
    ) {
      // checkBankDepositAction({});
      return navigateTo("/deposit");
    } else if (
      item.noti_type == notificationTypeEnum.withdraw_check_bank ||
      item.noti_type == notificationTypeEnum.withdraw_complete ||
      item.noti_type == notificationTypeEnum.withdraw_reject ||
      item.noti_type == notificationTypeEnum.withdraw_topup
    ) {
      // checkBankWithdrawAction({});
      return navigateTo("/withdraw");
    } else if (
      item.noti_type == notificationTypeEnum.new_account_registration
    ) {
      return navigateTo("/account/account");
    }
  });
};

//deposit
const checkBankDepositAction = async (item) => {
  checkDepositBankShow.value = true;
  nextTick(() => {
    modalDepositCheckBank.value.showModal(item);
  });
};
const topupDepositAction = (item) => {
  modalTopupDepositShow.value = true;
  nextTick(() => {
    modalDepositTopup.value.showModal(item);
  });
};
const closeCheckBankModal = (isRefresh) => {
  checkDepositBankShow.value = false;
};
const closeDepositTopupModal = (isRefresh) => {
  modalTopupDepositShow.value = false;
};
//end deposit

//withdraw
const checkBankWithdrawAction = async (item) => {
  checkWithdrawBankShow.value = true;
  nextTick(() => {
    modalWithdrawCheckBank.value.showModal(item);
  });
};
const closeWithdrawCheckBankModal = (isRefresh) => {
  checkWithdrawBankShow.value = false;
};
const topupWithdrawAction = (item) => {
  modalWithdrawTopupShow.value = true;
  nextTick(() => {
    modalWithdrawTopup.value.showModal(item);
  });
};
const closeWithdrawTopupModal = (isRefresh) => {
  modalWithdrawTopupShow.value = false;
};
//end withdraw
const checkAll = () => {
  return navigateTo("/notifications");
};
const readNotificationRequest = async (item) => {
  return navigateTo(item.redirect + "?status=" + item.status);
  // await ifetch(notificationApi.readNotificationRequest, {
  //   noti_type: item.noti_type,
  // }).then(() => {

  // });
};
</script>
<style>
.dark-only .notification-icon {
  stroke: white !important;
}
</style>
