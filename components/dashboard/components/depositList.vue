<template>
  <div class="col-xxl-6 col-md-12 appointment-sec box-col-6">
    <div class="appointment">
      <div class="card p-2">
        <div class="card-header card-no-border">
          <div class="header-top">
            <h5 class="m-0">{{ $i18n.t("recent_deposit") }}</h5>
          </div>
        </div>
        <div class="card-body pt-0 activity-card">
          <div class="appointment-table customer-table table-responsive">
            <table class="table table-bordernone">
              <tbody>
                <tr v-for="item in deposit" :key="item">
                  <td class="img-content-box" style="width: 300px !important">
                    <span class="d-block f-w-500">
                      {{ item.full_name }}&nbsp;({{ item.nick_name }})
                    </span>
                    <span class="f-light">{{ item.product_name }}</span>
                  </td>
                  <td class="text-end">
                    <span class="text-success">
                      {{ currency(item.amount) }}
                      <!-- <span v-if="item.check == 1">
                      <Icon name="icon-park-outline:check-correct"></Icon>
                    </span>
                    <span v-else></span> -->
                    </span>
                    <span class="d-block f-light">{{
                      moment(item.transaction_date).format("DD-MM-YYYY")
                    }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- <div class="card-body pt-0">
          <div class="appointment-table table-responsive">
            <table class="table table-bordernone">
              <tbody>
                <tr v-for="item in deposit" :key="item">
                  <td class="img-content-box">
                    <span class="d-block f-w-500"> {{ item.full_name }} </span>
                    <span class="f-light">{{
                      moment(item.transaction_date, "YYYY-MM-DD HH:mm:ss").fromNow()
                    }}</span>
                  </td>
                  <td class="text-end">
                    <p class="m-0 font-success">{{ currency(item.amount) }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from "vue";
  import moment from "moment";
  const { $i18n } = useNuxtApp();
  const props = defineProps({
    deposit: {
      default: [],
      type: Object,
    },
  });
</script>
