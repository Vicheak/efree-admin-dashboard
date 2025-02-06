<template>
  <div>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col- d-flex">
            <h3>{{ props.title }}</h3>
          </div>
          <div class="col-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link :to="{ path: props.path }">

                  <svg class="stroke-icon">
                    <use href="@/assets/svg/icon-sprite.svg#stroke-home"></use>
                  </svg>
                </router-link></li>
              <li class="breadcrumb-item" v-if="main">{{ props.main }}</li>
              <li class="breadcrumb-item active" v-if="title">{{ props.title }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title:{
    type: String,
   default: "",
  },
  main: {
    type: String,
    default: ''
  },
  path:{
    type: String,
    default: '/'
  }
})
</script>
