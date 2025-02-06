<template>
  <!-- <Breadcrumbs main="Dashboard" title="dashboard" /> -->
  <div class="page-title">
    <div class="container-fluid">
      <div class="row widget-grid">
        <welcome-card />
        <purchasesale-card
          :data="data?.total_card"
          :total_register="data?.total_register"
        />
        <overallbalance-card
          v-if="
            hasPermission(
              permissionConst.VIEW_OVERALL_BALANCE,
              moduleKey.DASHBOARD
            )
          "
          :data="data?.overal_balance"
        />
        <transaction-chart
          v-if="
            hasPermission(
              permissionConst.VIEW_TRANSACTION_COUNT,
              moduleKey.DASHBOARD
            )
          "
          :data="data?.transaction_count"
        />
        <recentorder-card
          v-if="
            hasPermission(
              permissionConst.VIEW_BANK_BALANCE,
              moduleKey.DASHBOARD
            )
          "
          :data="data?.bank_balance"
        />

        <deposit-list
          v-if="
            hasPermission(
              permissionConst.VIEW_DEPOSIT_RECENT_LIST,
              moduleKey.DASHBOARD
            )
          "
          :deposit="data?.recent_deposit"
        />
        <withdraw-list
          v-if="
            hasPermission(
              permissionConst.VIEW_WITHDRAW_RECENT_LIST,
              moduleKey.DASHBOARD
            )
          "
          :withdraw="data?.recent_withdraw"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
  import WelcomeCard from "./components/welcomeCard";
  import PurchasesaleCard from "./components/purchasesaleCard";
  import RecentorderCard from "./components/recentorderCard";
  import OverallbalanceCard from "./components/overallbalanceCard";
  import DepositList from "./components/depositList";
  import WithdrawList from "./components/withdrawList";
  import TransactionChart from "./components/transactionChart";
  import { dashboardAPI } from "~/constants/api";
  import { permissionConst } from "~/constants/permission";
  import { moduleKey } from "~/constants/moduleKey";

  const data = ref();
  onMounted(() => {
    ifetch(dashboardAPI.get, {}).then((response) => {
      data.value = response;
    });
  });
</script>

<style scoped>
  .page-title {
    background-color: inherit !important;
    border-bottom: none !important;
  }
</style>
