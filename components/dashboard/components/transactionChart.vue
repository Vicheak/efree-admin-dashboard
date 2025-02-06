<template>
  <div class="col-xxl-6 col-md-12 box-col-6">
    <div class="card p-2 height-equal">
      <div class="card-header card-no-border">
        <div class="header-top">
          <h5 class="m-0">{{ $i18n.t("transaction") }}</h5>
          <div class="card-header-right-icon">
            <!--            <DropDown2 />-->
          </div>
        </div>
      </div>
      <div class="card-body pt-0">
        <div class="schedule">
          <apexchart
            height="265"
            type="bar"
            :options="apexDashboard"
            :series="series"
          >
          </apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from "vue";

  const { $i18n } = useNuxtApp();

  const props = defineProps({
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  });

  const totalWithdraw = computed(() => {
    if (Array.isArray(props.data)) {
      return props.data
        .map((transaction) => parseFloat(transaction.total_withdraw) || 0)
        .reduce((total, current) => total + current, 0);
    }
    console.error(
      "Expected props.data to be an array, received:",
      typeof props.data
    );
    return 0;
  });
  const totalDeposit = computed(() => {
    if (Array.isArray(props.data)) {
      return props.data
        .map((transaction) => parseFloat(transaction.total_deposit) || 0)
        .reduce((total, current) => total + current, 0);
    }
    console.error(
      "Expected props.data to be an array, received:",
      typeof props.data
    );
    return 0;
  });

  const apexDashboard = reactive({
    chart: {
      type: "bar",
      height: 290,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        borderRadiusApplication: "end",
        horizontal: false,
      },
    },
    yaxis: {
      show: true,
      logBase: 10,
    },
    dataLabels: {
      enabled: true,
      style:{
        fontSize:"12px"
      }
    },
  });

  const series = ref([
    {
      name: $i18n.t("deposit"),
      color: "#54ba4a",
      data: [{ x: $i18n.t("mon"), y: [1] }],
    },
    {
      name: $i18n.t("withdraw"),
      color: "#fc5851",
      data: [{ x: $i18n.t("mon"), y: [2] }],
    },
    {
      name: $i18n.t("total"),
      color: iColor().primary,
      data: [{ x: $i18n.t("mon"), y: [3] }],
    },
  ]);

  watch(
    () => props.data,
    (newData) => {
      series.value = [
        {
          name: $i18n.t("deposit"),
          color: "#54ba4a",
          data: newData.map((item) => {
            return {
              x: dateFormat(item.selected_date, "DD-MM", ""),
              y: item.total_deposit,
            };
          }),
        },
        {
          name: $i18n.t("withdraw"),
          color: "#fc5851",
          data: newData.map((item) => {
            return {
              x: dateFormat(item.selected_date, "DD-MM", ""),
              y: item.total_withdraw,
            };
          }),
        },
        {
          name: $i18n.t("total"),
          color: iColor().primary,
          data: newData.map((item) => {
            return {
              x: dateFormat(item.selected_date, "DD-MM", ""),
              y: item.total,
            };
          }),
        },
      ];
    }
  );
</script>
