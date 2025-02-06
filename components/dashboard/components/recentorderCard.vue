<template>
  <div class="col-xxl-6 col-md-12 col-sm-12">
    <div class="card ">
      <div class="card-header card-no-border">
        <div class="header-top">
          <h5>{{ $i18n.t("bank_balance") }}</h5>
          <div class="card-header-right-icon"></div>
        </div>
      </div>

      <div class="card-body pt-0">
        <div class="d-md-flex gap-3">
          <div class="w-md-50 d-flex flex-column align-items-center">
            <apexchart
              type="donut"
              width="150"
              :options="options"
              :series="series"
            ></apexchart>
            <strong class="mb-2 text-center w-100">{{$t('total')}}: {{currency(totalBalance)}}</strong>
          </div>

          <div class="flex-1 w-md-50 bank-list">
            <ul>
              <li
                class="list-style d-flex justify-content-between align-items-center mb-2"
                v-for="item in props.data"
                :key="item"
              >
                <div class="d-flex gap-3">
                  <img
                    height="30"
                    width="30"
                    class="object-contain bank-icon"
                    :src="getImagePath(item.image, 'bank')"
                    alt=""
                  />
                  <p style="font-size:12px;">{{ item.name }}</p>
                </div>
                <p style="font-size:12px;" class="fw-bold">{{ currency(item.balance) }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { $i18n } = useNuxtApp();
  const props = defineProps({
    data: {
      default: {},
      type: Object,
    },
  });

  let series = ref([]);

  const options = ref({
    chart: {
      width: 150,
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1500,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const totalBalance = ref(0)

  watch(
    () => props.data,
    (newData) => {
      let label = newData.map((item) => item.name);
      totalBalance.value = newData.reduce((a,b)=>{
      return a + parseFloat(b.balance)
    },0)
      series.value = newData.map((item) => parseFloat(item.balance));
      // console.log(props.data);
      options.value = {
        labels: label,
        chart: {
          width: 300,

          type: "donut",
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return label[opts.seriesIndex];
          },
        },

        fill: {
          type: "gradient",
        },

        legend: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 1500,
            options: {
              chart: {
                width: 250,
              },
            },
          },
        ],
      };
    }
  );
</script>

<style scoped>
  :deep(.card) {
    color: inherit !important;
  }
  .object-contain {
    object-fit: contain;
  }

  .list-style {
    background: var(--light-background);
    padding: 6px;
    border-radius: 5px;
  }

  .dark-only .list-style {
    background: #232733;
  }

  .bank-icon {
    background: #ffffff;
    padding: 3px;
    border-radius: 3px;
  }
  .w-45 {
    width: 45%;
  }
  .w-55 {
    width: 55%;
  }

  .bank-list {
    height: 300px;
    overflow-y: auto;
  }

  @media(min-width:768px){
    .w-md-50{
      width: 50% !important;

    }
  }
  ::-webkit-scrollbar {
    width: 5px; /* Set the width of the scrollbar */
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Color of the scrollbar handle */
    border-radius: 5px; /* Rounded corners for the scrollbar handle */
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Color of the scrollbar handle on hover */
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Color of the scrollbar track */
    border-radius: 5px; /* Rounded corners for the scrollbar track */
  }
  
  /* Track on hover */
  ::-webkit-scrollbar-track:hover {
    background: #eee; /* Color of the scrollbar track on hover */
  }
</style>
