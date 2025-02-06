<template>
  <div class="col-xxl-4 col-sm-6 box-col-6">
    <div class="card profile-box" >
      <div class="card-body">
        <div class="media">
          <div class="media-body">
            <div class="greeting-user">
              <h4 class="f-w-600 mb-0">{{ greeting }}</h4>
              <p>{{$i18n.t("here_what_is_happening_in_your_account_today")}}</p>
              <div class="whatsnew-btn">
                <div class="btn hide-button">'</div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div class="cartoon">
          <img class="img-fluid" src="/images/dashboard/CashMarketIcon.png" alt="CashMarketIcon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
import moment from 'moment';
const {$i18n} = useNuxtApp();

const currentTime = ref(moment());
const greeting = ref('');

const updateGreeting = () => {
  const hour = currentTime.value.hours();
  if (hour >= 0 && hour < 12) {
    greeting.value = $i18n.t('good_morning');
  } else if (hour >= 12 && hour < 17) {
    greeting.value = $i18n.t('good_afternoon');
  } else {
    greeting.value = $i18n.t('good_evening');
  }
};

updateGreeting(); // Set the initial greeting

const intervalId = setInterval(() => {
  currentTime.value = moment();
  updateGreeting();
}, 1000);

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
:deep(.profile-box) {
  background: linear-gradient(90deg, #00A6FF 0%, #F63E5F 84.17%, #FF6161 100%);
  padding: 10px;
}
:deep(.hide-button){
  /*padding: 8px 12px !important;*/
  visibility: hidden;
}


</style>

