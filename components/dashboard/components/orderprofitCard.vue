<template>
  <div></div>
</template>

<script setup>
  import { reactive } from "vue";

  var primary = "#7366ff";
  const { $i18n } = useNuxtApp();

  const options = reactive({
    chart: {
      type: "bar",
      width: 180,
      height: 120,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        vertical: true,
        columnWidth: "40%",
        barHeight: "80%",
        startingShape: "rounded",
        endingShape: "rounded",
      },
    },
    colors: [primary, primary, "#F2F3F7", "#F2F3F7"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    grid: {
      xaxis: {
        offsetX: -2,
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: -5,
      max: 5,
      show: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      shared: false,
      x: {
        show: false,
      },
      y: {
        show: false,
      },
      z: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      offsetX: 0,
      offsetY: 0,
      labels: {
        offsetX: 0,
        offsetY: 0,
        show: false,
      },
      axisBorder: {
        offsetX: 0,
        offsetY: 0,
        show: false,
      },
      axisTicks: {
        offsetX: 0,
        offsetY: 0,
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1760,
        options: {
          chart: {
            width: 160,
          },
        },
      },
      {
        breakpoint: 1601,
        options: {
          chart: {
            height: 110,
          },
        },
      },
      {
        breakpoint: 1560,
        options: {
          chart: {
            width: 140,
          },
        },
      },
      {
        breakpoint: 1460,
        options: {
          chart: {
            width: 120,
          },
        },
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: 290,
          },
        },
      },
      {
        breakpoint: 1110,
        options: {
          chart: {
            width: 200,
          },
        },
      },
      {
        breakpoint: 700,
        options: {
          chart: {
            width: 150,
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            width: 220,
          },
        },
      },
      {
        breakpoint: 420,
        options: {
          chart: {
            width: 150,
          },
        },
      },
    ],
  });
  const series = reactive([
    {
      name: "Daily",
      data: [
        2.15, 3, 1.5, 2, 2.4, 3, 2.4, 2.8, 1.5, 1.7, 3, 2.5, 3, 2, 2.15, 3, 1.1,
      ],
    },
    {
      name: "Weekly",
      data: [
        -2.15, -3, -1.5, -2, -2.4, -3, -2.4, -2.8, -1.5, -1.7, -3, -2.5, -3, -2,
        -2.15, -3, -1.1,
      ],
    },
    {
      name: "Monthly",
      data: [
        -2.25, -2.35, -2.45, -2.55, -2.65, -2.75, -2.85, -2.95, -3.0, -3.1,
        -3.2, -3.25, -3.1, -3.0, -2.95, -2.85, -2.75,
      ],
    },
    {
      name: "Yearly",
      data: [
        2.25, 2.35, 2.45, 2.55, 2.65, 2.75, 2.85, 2.95, 3.0, 3.1, 3.2, 3.25,
        3.1, 3.0, 2.95, 2.85, 2.75,
      ],
    },
  ]);
  const options2 = reactive({
    chart: {
      width: 200,
      height: 150,
      type: "line",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: "#16C7F9",
        opacity: 0.3,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#16C7F9"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    grid: {
      show: false,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        show: false,
      },
      z: {
        show: false,
      },
      marker: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1780,
        options: {
          chart: {
            width: 180,
          },
        },
      },
      {
        breakpoint: 1680,
        options: {
          chart: {
            width: 160,
          },
        },
      },
      {
        breakpoint: 1601,
        options: {
          chart: {
            height: 110,
          },
        },
      },
      {
        breakpoint: 1560,
        options: {
          chart: {
            width: 140,
          },
        },
      },
      {
        breakpoint: 1460,
        options: {
          chart: {
            width: 120,
          },
        },
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: 290,
          },
        },
      },
      {
        breakpoint: 1110,
        options: {
          chart: {
            width: 200,
          },
        },
      },
      {
        breakpoint: 700,
        options: {
          chart: {
            width: 150,
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            width: 220,
          },
        },
      },
      {
        breakpoint: 420,
        options: {
          chart: {
            width: 150,
          },
        },
      },
    ],
  });
  const series2 = reactive([
    {
      name: "Desktops",
      data: [210, 180, 650, 200, 600, 100, 800, 300, 500],
    },
  ]);
</script>
<style scoped>
  :deep(.card){
    color: inherit !important;
  }
</style>
