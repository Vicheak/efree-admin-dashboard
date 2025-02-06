<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="overflow-y: hidden"
      :style="'height:'+height+'px'"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { i18nChangeLanguage } from "@wangeditor/editor";
import { editorAPI } from "~/constants/api";
i18nChangeLanguage("en");
const valueHtml = ref();
const editorRef = shallowRef();
const mode = ref("default");
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  valueEditHtml: {
    type: String,
    default: "",
  },
  height: {
    type: Number,
    default: 500,
  },
});
watch(
  () => props.valueEditHtml,
  (newValue) => {
    if (nullToVoid(newValue) != null) {
      nextTick(()=>{
      valueHtml.value = newValue;
      })

    }
  },
  { immediate: true }
);

const getValue = () => {
  return valueHtml.value;
};

const insertedImages = ref(new Set());
const previousMedia = {
  images: new Set(),
  videos: new Set(),
};

const toolbarConfig = ref({
  toolbarKeys: [
    "headerSelect",
    // 'header1',
    // 'header2',
    // 'header3',
    "blockquote",
    "|",
    "bold",
    "underline",
    "italic",
    "color",
    "bgColor",
    "|",
    "fontSize",
    "fontFamily",
    "lineHeight",
    "|",
    "bulletedList",
    "numberedList",
    "todo",
    "justifyLeft",
    "justifyRight",
    "justifyCenter",
    "|",
    "emotion",
    "insertLink",
    "editLink",
    "unLink",
    // 'viewLink',
    // 'deleteImage',
    // 'editImage',
    // 'viewImageLink',
    // 'deleteVideo',
    "insertTable",
    "codeBlock",
    "|",
    "uploadImage",
    "uploadVideo",
    "insertVideo",
    "|",
    // 'codeSelectLang',
    "divider",
    // 'deleteTable',
    "|",
    "undo",
    "redo",
    "|",
  ],
});

const editorConfig = ref({
  placeholder: "Type here...",
  MENU_CONF: {
    fontFamily: {
      fontFamilyList: [
        "Arial",
        "Verdana",
        { name: "Tahoma", value: "Tahoma" },
        { name: "Hanuman Regular", value: "Hanuman Regular" },
        {
          name: "Khmer OS Siemreap Regular",
          value: "Khmer OS Siemreap Regular",
        },
        { name: "KhmerOS", value: "KhmerOS" },
        {
          name: "KhmerOS Battambang Regular",
          value: "KhmerOS Battambang Regular",
        },
        { name: "KhmerOS Bokor", value: "KhmerOS Bokor" },
        { name: "KhmerOS Fasthand", value: "KhmerOS Fasthand" },
        { name: "KhmerOS Freehand", value: "KhmerOS Freehand" },
        { name: "KhmerOS Kangrey", value: "KhmerOS Kangrey" },
        { name: "KhmerOS Moulpali", value: "KhmerOS Moulpali" },
        { name: "Koulen Regular", value: "Koulen Regular" },
      ],
    },
    uploadImage: {
      customUpload: async (file, insertFn) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          try {
            const base64String = await convertToWebp(file, false);
            const formData = { image: base64String, type: "image" };
            // const data = await ifetch(editorAPI.store, formData);
            // const src = getImagePath(data.image, "imagesEditor");
            insertFn(base64String, "");
          } catch (error) {
            console.error("Failed to upload image:", error);
          }
        };
        reader.readAsDataURL(file);
      },
    },
    uploadVideo: {
      customUpload: async (file, insertFn) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const base64String = reader.result;
            // const formData = { video: base64String, type: "video" };
            // const data = await ifetch(editorAPI.store, formData);
            // const src = getVideoPath(data.video, "videosEditor");
            insertFn(base64String, "");
          } catch (error) {
            console.error("Failed to upload video:", error);
          }
        };
        reader.readAsDataURL(file);
      },
    },
  },
  hoverbarKeys: {
    image: {
      menuKeys: [
        "imageWidth30",
        "imageWidth50",
        "imageWidth100",
        // 'editImage',
        "viewImageLink",
        "deleteImage",
      ],
    },
  },
});

const fill = (data) =>{
  valueHtml.value = data
}

const handleCreated = (editor) => {
  editorRef.value = editor;
};

const handleChange = () => {
  const currentMedia = {
    images: new Set(),
    videos: new Set(),
  };
  const editor = editorRef.value;

  if (editor) {
    // Collect current images
    editor.getElemsByType("image").forEach((img) => {
      currentMedia.images.add(img.src);
    });

    // Collect current videos
    editor.getElemsByType("video").forEach((video) => {
      currentMedia.videos.add(video.src);
    });

    // Find and delete removed images
    const deletedImages = [...previousMedia.images].filter(
      (img) => !currentMedia.images.has(img)
    );
    if (deletedImages.length > 0) {
      deletedImages.forEach((imgSrc) => {
        deleteImageFromServer(imgSrc);
      });
    }

    // Find and delete removed videos
    const deletedVideos = [...previousMedia.videos].filter(
      (video) => !currentMedia.videos.has(video)
    );
    if (deletedVideos.length > 0) {
      deletedVideos.forEach((videoSrc) => {
        deleteVideoFromServer(videoSrc);
      });
    }

    // Update previous media references
    previousMedia.images = currentMedia.images;
    previousMedia.videos = currentMedia.videos;
    nextTick(() => {
      emit("update:modelValue", valueHtml.value);
    });
  }
};

const deleteImageFromServer = async (imgSrc) => {
  const fileName = imgSrc.split("/").pop();
  const data = await ifetch(editorAPI.delete, {
    file: fileName,
    type: "image",
  });
};

const deleteVideoFromServer = async (videoSrc) => {
  const fileName = videoSrc.split("/").pop();
  const data = await ifetch(editorAPI.delete, {
    file: fileName,
    type: "video",
  });
};

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

defineExpose({
  editorRef,
  mode: "default", // or 'simple'
  valueHtml,
  toolbarConfig,
  editorConfig,
  handleCreated,
  handleChange,
  getValue,
  fill
});
</script>

<style scoped>
.editor-container {
  border: 1px solid #ccc;
  min-height: 300px;
}
</style>
