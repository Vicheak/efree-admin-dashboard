<template>
    <div class="form-group">
        <label class="col-form-label">{{ $t('username') }}</label>
        <input class="form-control" name="username" type="text" :value="value" @change="vValue.$touch" />
        <span v-if="vValue.$error">{{ vValue.$errors[0].$message }}</span>
    </div>
</template>
<script setup>
    const props = defineProps(['modelValue', 'vValue'])

    const value = computed({
        get() {
            return props.modelValue
        },
        set(value) {
            emit('update:modelValue', value)
        }
    })
</script>