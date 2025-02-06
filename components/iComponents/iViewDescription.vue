<template>
    <div class="modal modal-xl fade show-description" id="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="border-bottom: none">
            <h3>{{ $t("description") }}</h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="w-100">
                <div class="w-100 mb-5">
                  <div class="row">
                    <div class="col-12">
                        <ul class="nav nav-tabs border-tab nav-primary mb-0 ul_tap" id="top-tab" role="tablist">
                            <li class="nav-item" v-for="item, index in listDescription" :key="index">
                                <a class="nav-link" @click="setIndexShow(index)" :class="{'active': index == 0}" id="top-home-tab" data-bs-toggle="tab" :href="'#' + item.language_code"
                                    role="tab" aria-controls="top-business_setting" aria-selected="false">{{ $t(item.language_code) }} 
                                </a>
                                <div class="material-border"></div>
                            </li>
                        </ul>
                        <div class="tab-content mt-3" v-for="item, index in listDescription" :key="index" :id="item.language_code">
                            <div class="tab-pane fade" :class="{'active show': index == indexShow}" :id="item.language_code" role="tabpanel" aria-labelledby="top-home-tab">
                                <div>
                                    <p v-html="item.description"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                    
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="() => closeModal()"
            >
              {{ $t("close") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, reactive, ref } from "vue";
  import { useLanguageStore } from "~/store/language";
  const useLanguage = useLanguageStore();
  const language = ref(useLanguage.lists);
  const props = defineProps({
    actionType: String,
  });
  
  const state = reactive({
    modal: null,
  });
  const listDescription = ref([]);
  
  const emit = defineEmits(["closeModal"]);
  
  onMounted(() => {
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal = new bootstrap.Modal("#modal");
  });
  
  const showModal = (description) => {
    listDescription.value = description;
    state.modal.show();
  };
  
  const closeModal = (isRefresh = false) => {
    state.modal.hide();
  };
  const indexShow = ref(0);
  const setIndexShow = (index) => {
    indexShow.value = index;
  }
  
  defineExpose({
    showModal,
  });
</script>
<style lang="scss">
  .show-description{
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
  }
  .show-description img{
    width: 100%;
  }
</style>
