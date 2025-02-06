<!-- <template>
  <div class="col-xxl-8 col-lg-12 box-col-12">
    <div class="card p-1">
      <div class="card-header card-no-border">
        <h5>{{ $i18n.t("overall_balance_7_days") }}</h5>
      </div>
      <div class="card-body pt-0">
        <div class="row m-0 overall-card">
          <div class="col-xl-9 col-md-12 col-sm-7 p-0">
            <div class="chart-right">
              <div class="row">
                <div class="col-xl-12">
                  <div class="card-body p-0">
                    <div class="current-sale-container">
                      <apexchart
                        height="320"
                        type="line"
                        :options="apexDashboard"
                        :series="series3"
                      ></apexchart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-12 col-sm-5 p-0">
            <div class="row g-sm-4 g-2">
              <div
                class="col-xl-12 col-md-4"
                v-for="item in overallbalance"
                :key="item"
              >
                <div class="light-card balance-card widget-hover">
                  <div class="svg-box">
                    <Icon
                      class="svg-fill"
                      :name="item.iconName"
                      :class="'text-' + item.color"
                      size="50px"
                    />
                  </div>
                  <div>
                    <span class="f-light">{{ item.title }}</span>
                    <h6 class="mt-1 mb-0">{{ item.amount }}</h6>
                  </div>
                  <div class="ms-auto text-end">
                    <span :class="item.balanceClass">{{ item.balance }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="col-12 box-col-12">
    <div class="card">
      <div class="card-header card-no-border">
        <h5>{{ $i18n.t("overall_balance_7_days") }}</h5>
      </div>
      <div class="card-body pt-0">
        <div class="row m-0 overall-card overview-card">
          <div class="col-xl-9 col-md-8 col-sm-7 p-0 box-col-7">
            <div class="chart-right">
              <div class="row">
                <div class="col-xl-12">
                  <div class="card-body p-0">
                    <ul class="balance-data">
                      <li>
                        <span class="circle bg-primary"> </span
                        ><span class="f-light ms-1">{{ $t("expense") }}</span>
                      </li>
                      <li>
                        <span class="circle bg-success"></span
                        ><span class="f-light ms-1">{{ $t("deposit") }}</span>
                      </li>

                      <li>
                        <span class="circle bg-danger"> </span
                        ><span class="f-light ms-1">{{ $t("withdraw") }}</span>
                      </li>
                    </ul>
                    <div class="current-sale-container order-container">
                      <div class="overview-wrapper">
                        <apexchart
                          height="265"
                          type="line"
                          :options="apexDashboard"
                          :series="series3"
                        ></apexchart>
                        <!-- <apexchart
                          height="265"
                          type="line"
                          :options="apexDashboard"
                          :series="series3"
                        ></apexchart> -->
                      </div>
                      <div class="back-bar-container">
                        <!-- <apexchart height="195" type="bar" :options="ecomDashboard.options3"
                                                  :series="ecomDashboard.series3"></apexchart> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-12 col-sm-5 p-0">
            <div class="row g-sm-4 g-2">
              <div
                class="col-xl-12 col-md-4"
                v-for="item in overallbalance"
                :key="item"
              >
                <div class="light-card balance-card widget-hover">
                  <div class="svg-box">
                    <Icon
                      class="svg-fill"
                      :name="item.iconName"
                      :class="'text-' + item.color"
                      size="50px"
                    />
                  </div>
                  <div>
                    <span class="f-light">{{ item.title }}</span>
                    <h6 class="mt-1 mb-0">{{ item.amount }}</h6>
                  </div>
                  <div class="ms-auto text-end">
                    <span :class="item.balanceClass">{{ item.balance }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { $i18n } = useNuxtApp();
  // var primary = "#7366ff"

  const props = defineProps({
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  });

  const apexDashboard = ref({
    chart: {
      height: 300,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 0,
        blur: 4,
        color: "#000",
        opacity: 0.08,
      },
    },
    stroke: {
      width: [1, 1, 1],
      curve: "smooth",
    },
    grid: {
      show: true,
      borderColor: "var(--chart-border)",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    colors: ["#0c6efd", "#54BA4A", "#FF3364"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    markers: {
      discrete: [
        {
          seriesIndex: 1,
          dataPointIndex: 2,
          fillColor: "#7064F5",
          strokeColor: "var(--white)",
          size: 5,
          sizeOffset: 3,
        },
        {
          seriesIndex: 2, // Different series index
          dataPointIndex: 4,
          fillColor: "#54BA4A",
          strokeColor: "var(--white)",
          size: 5,
          sizeOffset: 3,
        },
        {
          seriesIndex: 3, // Another different series index
          dataPointIndex: 4,
          fillColor: "#e25160",
          strokeColor: "var(--white)",
          size: 5,
          sizeOffset: 3,
        },
      ],
      size: 5,
      strokeWidth: 0,
      hover: {
        size: 5,
        sizeOffset: 0,
      },
    },
    xaxis: {
      type: "category",
      tickPlacement: "between",
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        color: "var(--chart-border)",
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    yaxis: {
      min: 0,
      labels: {
        /**
         * Allows users to apply a custom formatter function to yaxis labels.
         *
         * @param { String } value - The generated value of the y-axis tick
         * @param { index } index of the tick / currently executing iteration in yaxis labels array
         */
        formatter: function (val, index) {
          return Math.round(val / 1000) * 1000;
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: false,
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 250,
          },
        },
      },
    ],
  });

  let series3 = ref([
    {
      name: $i18n.t("expense"),
      data: [],
      type: "area",
    },
    {
      name: $i18n.t("deposit"),
      data: [],
      type: "area",
    },
    {
      name: $i18n.t("withdraw"),
      data: [],
      type: "area",
    },
  ]);

  const overallbalance = ref([
    {
      iconName: "ic:outline-account-balance-wallet",
      title: $i18n.t("expense"),
      amount: currency(0),
      color: "primary",
    },
    {
      iconName: "solar:round-arrow-right-down-broken",
      title: $i18n.t("deposit"),
      amount: currency(0),
      color: "success",
    },
    {
      iconName: "solar:round-arrow-left-up-broken",
      title: $i18n.t("withdraw"),
      amount: currency(0),
      color: "danger",
    },
  ]);

  watch(
    () => {
      return props.data;
    },
    () => {
      series3.value = [
        {
          name: $i18n.t("expense"),
          data: props.data.map((item) => {
            return item.total_expense;
          }),
          type: "area",
        },
        {
          name: $i18n.t("deposit"),
          data: props.data.map((item) => {
            return item.total_deposit;
          }),
          type: "area",
        },
        {
          name: $i18n.t("withdraw"),
          data: props.data.map((item) => {
            return item.total_withdraw;
          }),
          type: "area",
        },
      ];
      let tempArray = props.data.map((item) => {
        return dateFormat(item.selected_date, "DD-MM", "");
      });
      apexDashboard.value = {
        ...apexDashboard.value,
        labels: tempArray,
      };

      overallbalance.value = [
        {
          iconName: "ic:outline-account-balance-wallet",
          title: $i18n.t("expense"),
          amount: currency(
            props.data.reduce((a, b) => {
              return parseFloat(a) + parseFloat(b.total_expense);
            }, 0)
          ),
          color: "primary",
        },
        {
          iconName: "solar:round-arrow-right-down-broken",
          title: $i18n.t("deposit"),
          amount: currency(
            props.data.reduce((a, b) => {
              return parseFloat(a) + parseFloat(b.total_deposit);
            }, 0)
          ),
          color: "success",
        },
        {
          iconName: "solar:round-arrow-left-up-broken",
          title: $i18n.t("withdraw"),
          amount: currency(
            props.data.reduce((a, b) => {
              return parseFloat(a) + parseFloat(b.total_withdraw);
            }, 0)
          ),
          color: "danger",
        },
      ];
    }
  );
</script>

<style scoped>
  :deep(.card) {
    color: inherit !important;
  }
</style>
