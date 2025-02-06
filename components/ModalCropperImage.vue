<template>
  <div style="z-index: 10000 !important" class="modal fade" id="cropperModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ $t("crop_image") }}</h4>
          <button class="btn-close" type="button" @click="clearForm"></button>
        </div>
        <div class="modal-body p-l-25 p-r-25">
          <div class="row">
            <div class="col-12">
              <input
                ref="input"
                type="file"
                name="image"
                accept=".jpg, .jpeg, .gif, .png, .webp, .svg"
                @change="setImage"
              />
              <vue-cropper
                ref="cropper"
                :aspect-ratio="aspectRatio"
                :src="imgSrc"
                :dragMode="dragMode"
                :cropBoxMovable="cropBoxMovable"
                :cropBoxResizable="cropBoxResizable"
                :background="background"
                preview=".preview"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div
            class="d-flex align-items-center"
            style="cursor: pointer; color: #008ecc; font-size: 20px"
          >
            <Icon
              class="simple-icon-picture me-3"
              name="material-symbols:image"
              size="25"
              @click.prevent="showFileChooser"
            ></Icon>
            <Icon
              class="simple-icon-refresh me-3"
              name="material-symbols:refresh-rounded"
              size="25"
              @click.prevent="reset"
            ></Icon>
            <Icon
              class="simple-icon-magnifier-add me-3"
              name="solar:magnifer-zoom-in-linear"
              size="25"
              @click.prevent="zoom(0.1)"
            ></Icon>
            <Icon
              class="simple-icon-magnifier-remove me-3"
              name="solar:magnifer-zoom-out-linear"
              size="25"
              @click.prevent="zoom(-0.1)"
            ></Icon>
            <Icon
              class="simple-icon-action-redo me-3"
              name="ic:sharp-rotate-right"
              size="25"
              @click.prevent="rotate(90)"
            ></Icon>
            <Icon
              class="simple-icon-action-undo me-3"
              name="ic:sharp-rotate-left"
              size="25"
              @click.prevent="rotate(-90)"
            ></Icon>
            <Icon
              id="flip_x"
              class="iconsminds-repeat-4 me-3"
              name="solar:flip-horizontal-linear"
              size="25"
              @click.prevent="flipX"
            ></Icon>
            <Icon
              id="flip_y"
              class="iconsminds-repeat-4"
              name="solar:flip-vertical-linear"
              size="25"
              @click.prevent="flipY"
            ></Icon>
          </div>
          <div>
            <button
              class="btn btn-outline-secondary btn-lg mx-2"
              @click="clearForm"
            >
              {{ $t("cancel") }}
            </button>
            <button class="btn btn-primary btn-lg" @click="save">
              {{ $t("crop") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

const props = defineProps({
  aspectRatio: {
    type: Number,
    default: 1 / 1,
  },
  dragMode: {
    type: String,
    default: "move",
  },
  cropBoxMovable: {
    type: Boolean,
    default: false,
  },
  cropBoxResizable: {
    type: Boolean,
    default: true,
  },
  background: {
    type: Boolean,
    default: true,
  },
  targetFile: {
    type: Event,
    default: () => {
      return {};
    },
  },
  previewWidth: {
    type: Number,
    default: 209,
  },
  previewHeight: {
    type: Number,
    default: 209,
  },
  buttonOptions: {
    type: Object,
    default: () => {
      return {};
    },
  },
  backdrop: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  modalShowCropperImage: null,
});
const imgSrc = ref("/default_background.jpg");
const cropper = ref(null);
const input = ref(null);
const cropImg = ref("");
const data = ref(null);
const modal = ref(false);
const showSeparator1 = ref(false);
const showSeparator2 = ref(false);

// watch(
//   () => props.targetFile,
//    (newValue) => {
//     alert(1);

//   },
//   {
//     immediate: true,
//   }
// );
watch(
  () => props.buttonOptions,
  (val) => {
    val.selectImage = val.selectImage ?? true;
    val.reset = val.reset ?? true;
    val.zoomIn = val.zoomIn ?? true;
    val.zoomOut = val.zoomOut ?? true;
    val.moveLeft = val.moveLeft ?? false;
    val.moveRight = val.moveRight ?? false;
    val.moveUp = val.moveUp ?? false;
    val.moveDown = val.moveDown ?? false;
    val.rotatePlus90 = val.rotatePlus90 ?? true;
    val.rotateMinus90 = val.rotateMinus90 ?? true;
    val.flipX = val.flipX ?? true;
    val.flipY = val.flipY ?? true;
    showSeparator();
  }
);

onMounted(() => {
  const bootstrapCropper = useNuxtApp().$bootstrap;
  state.modalShowCropperImage = new bootstrapCropper.Modal("#cropperModal", {
    backdrop: props.backdrop,
  });
});

const showModal = async (targetFile) => {
  state.modalShowCropperImage.show();
  setImage(targetFile);
  if (process.client) {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    let zIndex = 1050;
    backdrops.forEach((backdrop, index) => {
      backdrop.style.zIndex = zIndex + index * 10;
    });
  }
};

const emit = defineEmits(["closeModal", "save"]);

const showSeparator = () => {
  let options = props.buttonOptions;
  if (options.selectImage || options.reset) {
    showSeparator1.value = true;
  }
  if (
    options.zoomIn ||
    options.zoomOut ||
    options.moveLeft ||
    options.moveRight ||
    options.moveUp ||
    options.moveDown
  ) {
    showSeparator2.value = true;
  }
};

const setImage = (e) => {
  const file = e.target.files[0];
  if (file.type.indexOf("image/") === -1) {
    alert("Please select an image file");
    return;
  }

  // Check if the file is an image and if it is of type jpg, jpeg, or gif
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];
  if (
    file.type.indexOf("image/") === -1 ||
    !allowedTypes.includes(file.type.toLowerCase())
  ) {
    swal({
      icon: "warning",
      title: "Image Validation",
      text: "Please select a JPG, JPEG, or GIF image file.",
    });
    return;
  }

  if (typeof FileReader === "function") {
    const reader = new FileReader();

    reader.onload = (event) => {
      imgSrc.value = event.target.result;
      // rebuild cropperjs with the updated source
      cropper.value.replace(event.target.result);
    };

    reader.readAsDataURL(file);
  } else {
    alert("Sorry, FileReader API not supported");
  }
};

const showFileChooser = () => {
  input.value.click();
};
const reset = () => {
  cropper.value.reset();
};
const zoom = (percent) => {
  cropper.value.relativeZoom(percent);
};
const flipX = () => {
  const dom = document.getElementById("flip_x");
  let scale = dom.getAttribute("data-scale");
  scale = scale ? -scale : -1;
  cropper.value.scaleX(scale);
  dom.setAttribute("data-scale", scale);
};
const flipY = () => {
  const dom = document.getElementById("flip_y");
  let scale = dom.getAttribute("data-scale");
  scale = scale ? -scale : -1;
  cropper.value.scaleY(scale);
  dom.setAttribute("data-scale", scale);
};
const rotate = (deg) => {
  cropper.value.rotate(deg);
};
const cropImage = () => {
  cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
};

const getCropBoxData = () => {
  data.value = JSON.stringify(cropper.value.getCropBoxData(), null, 4);
};
const getData = () => {
  data.value = JSON.stringify(cropper.value.getData(), null, 4);
};
const move = (offsetX, offsetY) => {
  cropper.value.move(offsetX, offsetY);
};
const setCropBoxData = () => {
  if (!data.value) return;
  cropper.value.setCropBoxData(JSON.parse(data.value));
};
const setData = () => {
  if (!data.value) return;

  cropper.value.setData(JSON.parse(data.value));
};
const save = () => {
  let binary = cropper.value.getCroppedCanvas().toDataURL();
  emit("save", binary);
  cropper.value.destroy();
  state.modalShowCropperImage.hide();
};
const clearForm = () => {
  emit("closeModal", null);
  cropper.value.destroy();
  state.modalShowCropperImage.hide();
};

defineExpose({
  showModal,
  setImage,
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="file"] {
  display: none;
}
.preview {
  overflow: hidden;
  border: 1px solid red;
}

:deep(.modal-footer) {
  justify-content: space-between;
}
</style>
