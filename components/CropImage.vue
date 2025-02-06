<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="cropperImageModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ $t("crop_image") }}
          </h5>
        </div>

        <div class="modal-body p-l-25 p-r-25">
          <div class="row">
            <div class="col-12">
              <!-- <input
                ref="input"
                type="file"
                name="image"
                accept=".jpg, .jpeg, .gif, .png, .webp, .svg"
                hidden="true"
                @change="setImage"
              /> -->
              <Cropper
                class="cropper"
                :src="imgSrc"
                ref="cropper"
                :stencil-props="stencil"
                :auto-zoom="props.autoZoom"
                :check-cross-origin="true"
                :background="false"
                v-if="!props.freeSize"
                imageRestriction="stencil"
                background-class="cropper-background"
                :stencil-size="{ width: props.width, height: props.height }"
              />
              <Cropper
                class="cropper"
                :src="imgSrc"
                ref="cropper"
                :auto-zoom="props.autoZoom"
                :check-cross-origin="true"
                :background="false"
                background-class="cropper-background"
                v-else
              />
            </div>
          </div>
        </div>

        <div
          class="modal-footer d-flex justify-content-between align-items-center"
        >
          <div
            class="d-flex gap-2"
            style="cursor: pointer; color: #008ecc; font-size: 20px"
          >
            <Icon name="solar:refresh-circle-outline" size="25" @click.prevent="reset"></Icon>
            <Icon name="solar:magnifer-zoom-in-line-duotone" size="25" @click.prevent="zoomIn"></Icon>
            <Icon name="solar:magnifer-zoom-out-line-duotone" size="25" @click.prevent="zoomOut"></Icon>
            <Icon name="solar:flip-horizontal-line-duotone" size="25" @click.prevent="flip(true,false)"></Icon>
            <Icon name="solar:flip-vertical-line-duotone" size="25" @click.prevent="flip(false,true)"></Icon>
            <Icon name="material-symbols:rotate-90-degrees-cw-outline" size="25" @click.prevent="rotate(90)"></Icon>
            <Icon name="material-symbols:rotate-90-degrees-ccw-outline" size="25" @click.prevent="rotate(-90)"></Icon>
          </div>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-secondary" @click="modalHide">
              {{ $t("cancel") }}
            </button>
            <button type="button" class="btn btn-primary" @click="save">
              {{ $t("save") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import "vue-advanced-cropper/dist/theme.compact.css";
import imageBlobReduce from 'image-blob-reduce';

const props = defineProps({
  autoZoom: {
    type: Boolean,
    default: true,
  },
  width: {
    type: Number,
    default: 500,
  },
  height: {
    type: Number,
    default: 500,
  },
  movable: {
    type: Boolean,
    default: true,
  },
  resizable: {
    type: Boolean,
    default: true,
  },
  freeSize: {
    type: Boolean,
    default: false,
  },
});

const imgSrc = ref("/default_background.jpg");
const cropper = ref(null);
const reduce = imageBlobReduce();
const state = reactive({
  modal: null,
});
const emit = defineEmits(['imageCroped'])
const file = ref(null);

const reset = () => {
  cropper.value.reset();
};

const gcd = (a, b) => {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

const aspectRatio = computed(() => {
  if (props.width && props.height) {
    const divisor = gcd(props.width, props.height);
    const aspectWidth = props.width / divisor;
    const aspectHeight = props.height / divisor;
    return `${aspectWidth}/${aspectHeight}`;
  }
  return 16 / 9;
});

const zoomIn = () => {
  if (cropper.value) {
    cropper.value.zoom(1.2); 
  }
};

const zoomOut = () => {
  if (cropper.value) {
    cropper.value.zoom(0.8); 
  }
};

const flip = (x,y) => {
  const { image } = cropper.value.getResult();
			if (image.transforms.rotate % 180 !== 0) {
				cropper.value.flip(!x, !y);
			} else {
				cropper.value.flip(x, y);
			}
}

const rotate = (angle) => {
  if (cropper.value) {
    cropper.value.rotate(angle); 
  }
};

const stencil = computed(() => {
  return {
    aspectRatio: parseInt(aspectRatio),
    movable: props.movable,
    resizable: props.resizable,
    handlers: {},
  };
});

onMounted(() => {
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal = new bootstrap.Modal("#cropperImageModal", {
    backdrop: "static",
    keyboard: false,
  });
});

const save = async () => {
  if (cropper.value) {
    const { canvas } = cropper.value.getResult();

    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          const reducedBlob = await reduce.toBlob(blob, { max: 1080 }); 
          const reader = new FileReader();
          reader.onload = () => {
            const reducedDataUrl = reader.result;
            emit('imageCroped', reducedDataUrl);  
          };
          reader.readAsDataURL(reducedBlob);
        } catch (error) {
          console.error("Error reducing image:", error);
        }
      }
    }, "image/webp", 1); 
    cropper.value.reset();
    modalHide()
  }
};


const showModal = (targetFile) => {
  file.value = targetFile.target.files[0];
  state.modal.show();
};

watchEffect(() => {

  if (!file.value) return;
  if (file.value.type.indexOf("image/") === -1) {
    swal({
      icon: "warning",
      title: "Image Validation",
      text: "Please select an image file",
    });
    return;
  }
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];

  if (!allowedTypes.includes(file.value.type.toLowerCase())) {
    swal({
      icon: "warning",
      title: "Image Validation",
      text: "Please select a valid image file (JPG, JPEG, PNG, GIF, etc.).",
    });
    return;
  }

  if (typeof FileReader === "function") {
    const reader = new FileReader();

    reader.onload = (event) => {
      nextTick(() => {
        imgSrc.value = event.target.result; // Update the image source
        // You can rebuild the cropper here if needed
        // cropper.value.replace(event.target.result);
      });
    };

    reader.readAsDataURL(file.value);
  } else {
    swal({
      icon: "errror",
      title: "Oops!",
      text: "Sorry, FileReader API not supported",
    });
  }
});

const modalHide = () => {
  state.modal.hide();
};

defineExpose({
  showModal,
});
</script>

<style>
.cropper {
  height: 70vh;
  width: auto;
  background: #ddd;
}
.cropper-background {
  background: none;
}
.vue-advanced-cropper__foreground {
  height: 100% !important;
}
.vue-advanced-cropper__image-wrapper {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}

</style>
