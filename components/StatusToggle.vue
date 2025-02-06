<template>
  <div>
    <div class="switch-sm">
      <label class="switch"
        ><input
          type="checkbox"
          true-value="1"
          false-value="0"
          @click="handleToggleStatus"
          v-model="checked" /><span class="switch-state"></span
      ></label>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    status: String | Number | Boolean,
    row: Object,
  });
  const checked = ref(props.status);
  const { $i18n } = useNuxtApp();

  const emit = defineEmits(["onStatusChange"]);
  const handleToggleStatus = (callback) => {
    let value;
    if (checked.value == 1) value = 0;
    else if (checked.value == 0) value = 1;
    swal({
      title: $i18n.t("are_you_sure"),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: $i18n.t("ok"),
      cancelButtonText: $i18n.t("cancel"),
      reverseButtons: true,
      allowOutsideClick: () => !swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        emit("onStatusChange", value, props.row, reload);
        iAlert().success();
      } else if (result.isDismissed) checked.value = props.status;
    });
  };
  const reload = () => {
    // checked.value = props.status;
  };

  // onMounted(() => {
  //   checked.value = props.status;
  // });
  watch(props, () => {
    checked.value = props.status;
  });
  // watch(checked.value, () => {
  //   checked.value = props.status;
  // });
</script>
