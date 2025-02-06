<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{$t('detail')}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="container modal-body">
          <div v-html="data"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{$t('close')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const state = reactive({
    modal: '',
  });

const data = ref(null)

const showModal = async (modalData) => {
    // Assign the passed modalData to the ref
    data.value = modalData;
    // Assuming state.modal is initialized elsewhere
    state.modal.show();
};
  onMounted(() => {
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal = new bootstrap.Modal("#modal");
  });

  defineExpose({
    showModal,
  });
</script>