<template>
  <div>
    <div class="modal modal-md fade" id="ImageModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ $t("view_image") }}
            </h5>
          </div>

          <div class="modal-body">
            <img
              :src="getImagePath(img, pathName)"
              :alt="img"
              class="w-100 img-fluid rounded-2"
            />
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              {{ $t("close") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoleModuleStore } from "~/store/role_module";

const moduleKey = useRoleModuleStore();
const props = defineProps({
  path: {
    type: String,
    default: () => {},
  },
});
const state = reactive({
  modal: null,
});
const img = ref("");

const pathName = computed(() => props.path || moduleKey.current_module);

onMounted(() => {
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal = new bootstrap.Modal("#ImageModal");
});

const showModal = (image = null) => {
  nextTick(() => {
    img.value = image;
    state.modal.show();
  });
};

const closeModal = () => {
  state.modal.hide();
};

defineExpose({
  showModal,
});
</script>
<style scoped>
img{
  user-select: none;
}
</style>