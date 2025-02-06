<template>
  <div class="modal fade" id="modalBanner">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ $t("banner_list") }}</h4>
          <button class="btn-close" type="button" @click="closeModal"></button>
        </div>
        <div class="modal-body p-l-25 p-r-25">
          <div class="row">
            <div v-for="item in lists" :key="item.index" class="col-2">
              <img
                class="w-100"
                :class="[
                  item.on_selected
                    ? 'grayscale border border-3 border-primary'
                    : '',
                ]"
                style="cursor: pointer"
                :src="getImagePath(item.image, 'banner')"
                alt=""
                @click="selected(item)"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal()">
            {{ $t("close") }}
          </button>
          <button class="btn btn-primary" @click="save">
            {{ $t("save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { da } from "date-fns/locale";
import { bannerPositionAPI } from "~/constants/api";

const state = reactive({
  modal: null,
});
let lists = ref([]);
const emit = defineEmits(["saveModal"]);
onMounted(() => {
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal = new bootstrap.Modal("#modalBanner", {
    backdrop: false,
  });
});

const getInput = (image_type, type) => {
  return {
    filter: {
      image_type: image_type,
      type: type,
    },
  };
};

const getBanner = async (page, position, editItem) => {
  await ifetch(bannerPositionAPI.getBannerByType, {
    page: page,
    position_id: position,
  }).then((res) => {
    // if (
    //   image_type == bannerPageEnum.news &&
    //   type == bannerPlatformTypeEnum.web
    // ) {
    //   res = res
    //     .filter((obj) => nullToVoid(obj.image_mobile) !== "")
    //     .map((obj) => {
    //       obj.image = obj.image_mobile;
    //       return obj;
    //     });
    // }
    if (editItem.length > 0) {
      const result = res.map((item1) => {
        const matchingItem = editItem.find((item2) => item1.id === item2.id);
        if (matchingItem) {
          return { ...item1, on_selected: true };
        }
        return item1;
      });
      lists.value = result;
      lists.value.forEach((data) => {
        editItem.forEach((item) => {
          if(data.id == item.banner_id){
            data.on_selected = true
          }
        })
      })
    } else {
      lists.value = res;
      
    }
    
  });
};

const showModal = async (page = null, position = null, editItem = []) => {
  getBanner(page, position, editItem);
  state.modal.show();
};

const selected = (item) => {
  if (nullToVoid(item.on_selected) == "") {
    item.on_selected = true;
  } else {
    item.on_selected = !item.on_selected;
  }
};

const save = () => {
  const data = lists.value.filter((obj) => obj.on_selected == true);
  emit("saveModal", data);
  closeModal(false);
};

const closeModal = (isRefresh = false) => {
  state.modal.hide();
  emit("closeModal", isRefresh);
};

defineExpose({
  showModal,
});
</script>

<style>
.grayscale {
  filter: grayscale(30%);
}
</style>
