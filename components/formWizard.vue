<template>
  <div>
    <Wizard
      ref="wizard"
      :navigableTabs="navigableTabs"
      :custom-tabs="tabs"
      @updated:tabs="onTabAfterChange"
      @complete:wizard="wizardCompleted"
    >
      <div v-for="(tab, index) in tabs" :key="index">
        <slot
          :name="'step-' + index"
          class="col-xs-12"
          v-if="currentTabIndex == index"
        >
        </slot>
      </div>
      <template #back>
        <slot name="prev"></slot>
      </template>
      <template #next>
        <slot name="next"></slot>
      </template>
      <template #done>
        <slot name="done"></slot>
      </template>
      <template #footer>
        <slot name="footer">
          <button
            @click="prevStep"
            v-if="!currentTabIndex == 0"
            class="float-start"
          >
            Previous
          </button>
          <button
            @click="nextTab"
            v-if="!currentTabIndex == tabs.length - 1"
            class="float-end"
          >
            Next
          </button>
          <button
            @click="done"
            v-if="currentTabIndex == tabs.length - 1"
            class="float-end"
          >
            Save
          </button>
        </slot>
      </template>
      <!-- <template #footer="props">
        <div class="wizard-footer-left">
          <wizard-button
            v-if="props.activeTabIndex > 0 && !props.isLastStep"
            @click.native="props.prevTab()"
            :style="props.fillButtonStyle"
            >Previous</wizard-button
          >
        </div>
        <div class="wizard-footer-right">
          <wizard-button
            v-if="!props.isLastStep"
            @click.native="props.nextTab()"
            class="wizard-footer-right"
            :style="props.fillButtonStyle"
            >Next</wizard-button
          >

          <wizard-button
            v-else
            @click.native="alert('Done')"
            class="wizard-footer-right finish-button"
            :style="props.fillButtonStyle"
          >
            {{ props.isLastStep ? "Done" : "Next" }}</wizard-button
          >
        </div>
      </template> -->
    </Wizard>
  </div>
</template>
<script>
import "form-wizard-vue3/dist/form-wizard-vue3.css";
import Wizard from "form-wizard-vue3";
export default {
  components: {
    Wizard,
  },
  data() {
    return {
      currentTabIndex: 0,
      loading: false,
    };
  },
  props: {
    tabs: {
      type: Array,
      default: [],
    },
    navigableTabs: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // onChangeCurrentTab(index, oldIndex) {
    //   this.currentTabIndex = index;
    //   console.log(this.currentTabIndex);
    // },

    onTabAfterChange(tabs, currentTabIndex) {
      this.currentTabIndex = currentTabIndex;
      this.activateTab(this.currentTabIndex);

      // console.log(11, tabs);
      // console.log(22, currentTabIndex);
    },
    prevTab() {
      if (this.currentTabIndex > 0) {
        this.currentTabIndex -= 1;
        this.activateTab(this.currentTabIndex);
      }
    },
    nextTab() {
      if (this.currentTabIndex < this.tabs.length - 1) {
        this.currentTabIndex += 1;
        this.activateTab(this.currentTabIndex);
      }
    },
    tryChangeRoute(tab) {
      if (this.$router && tab.route) {
        this.$router.push(tab.route);
      }
    },
    deactivateTabs() {
      this.tabs.forEach((tab) => {
        tab.active = false;
      });
    },
    activateTab(index) {
      this.deactivateTabs();
      let tab = this.tabs[index];
      if (tab) {
        tab.active = true;
        tab.checked = true;
        this.tryChangeRoute(tab);
        this.$emit("tabChanged", this.currentTabIndex);
      }
    },

    changeTab(oldIndex, newIndex, emitChangeEvent = true) {
      let oldTab = this.tabs[oldIndex];
      let newTab = this.tabs[newIndex];
      if (oldTab) {
        oldTab.active = false;
      }
      if (newTab) {
        newTab.active = true;
      }
      if (emitChangeEvent && this.currentTabIndex !== newIndex) {
        this.emitTabChange(oldIndex, newIndex);
      }
      this.activeTabIndex = newIndex;
      this.activateTabAndCheckStep(this.activeTabIndex);
      return true;
    },
    activateTabAndCheckStep(index) {
      this.activateTab(index);
      if (index > this.maxStep) {
        this.maxStep = index;
      }
      this.activeTabIndex = index;
    },
    emitTabChange(prevIndex, nextIndex) {
      this.$emit("on-change", prevIndex, nextIndex);
      this.$emit("update:startIndex", nextIndex);
    },
    beforeTabChange(index, callback) {
      if (this.loading) {
        return;
      }
      let oldTab = this.tabs[index];
      if (oldTab && oldTab.beforeChange !== undefined) {
        let tabChangeRes = oldTab.beforeChange();
        // this.validateBeforeChange(tabChangeRes, callback);
      } else {
        callback();
      }
    },
  },
};
</script>
<!-- <script setup>
import "form-wizard-vue3/dist/form-wizard-vue3.css";
import Wizard from "form-wizard-vue3";
let currentTabIndex = reactive(0);
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
});
const wizard = ref(null);

const onTabBeforeChange = async () => {
  if (currentTabIndex === 0) {
  }
};
const wizardCompleted = () => {
  alert(123);
  return;
};

const nextTab = () => {
  emit("on-change", currentTabIndex, currentTabIndex + 1);
  alert("next");
};
const onSubmit = (event) => {
  alert(123);
};

defineExpose({
  onChangeCurrentTab,
  prevTab,
});
</script> -->
<style>
.fw-body-content {
  padding: 20px 10px !important;
}
.fw-footer {
  display: block !important;
}
</style>
