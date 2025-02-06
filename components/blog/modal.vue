<template>
    <div class="modal modal-xl fade" id="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="border-bottom: none">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="w-100">
                <div class="w-100 mb-5" v-for="item, index in listDescription" :key="index">
                    <h4 class="mb-2">{{ $t("description") }} ( {{ getCodeLanguage(item.language_id) }} )</h4>
                    <div class="border mb-3"></div>
                    <p v-html="item.description"></p>
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
  
  const getCodeLanguage = (id) => {
    const item = language.value.find((item) => item.id == id);
    return item.code.toLowerCase();
  }
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
  
  defineExpose({
    showModal,
  });
  </script>
  