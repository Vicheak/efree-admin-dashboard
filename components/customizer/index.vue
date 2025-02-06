<template>
  <div>
    <div class="customizer-links" :class="{ open: customizer }">
      <div class="nav flex-column nac-pills" id="c-pills-tab"></div>
    </div>
    <div class="customizer-contain" :class="{ open: customizer }">
      <div class="tab-content">
        <!-- <CustomizerConfiguration /> -->
        <div class="customizer-body custom-scrollbar">
          <CustomSetting />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from "pinia";
  import CustomizerSetting from "./customizersetting";
  import CustomizerConfiguration from "./customizerconfiguration";
  import CustomSetting from "./customsetting";
  import { useMenuStore } from "~~/store/menu";

  export default {
    name: "customizer",
    components: {
      CustomizerSetting,
      CustomizerConfiguration,
      CustomSetting,
    },
    computed: {
      ...mapState(useMenuStore, {
        customizer: "customizer",
      }),
    },
  };
</script>
