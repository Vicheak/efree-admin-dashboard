<template>
    <NuxtImg
      :src="imgSrc"
      :format="props.format"
      loading="lazy"
      :placeholder="props.placeholder"
      densities="x1 x2"
      :width="props.width"
      :height="props.height"
      :alt="props.alt"
      :sizes="props.sizes"
    ></NuxtImg>
</template>

<script setup>
const props = defineProps({
    src: {
      type: String,
      default:"/images/default.jpg"
    },
    alt: {
      type: String,
      default:""
    },
    width: {
        type: [Number,String],
        default: 'auto'
    },
    height: {
        type: [Number,String],
        default: 'auto'
    },
    placeholder:{
        type: [Array, String],
        default: ()=>{return [30,20]}
    },
    format:{
        type: String,
        default: 'webp'
    },
    sizes:{
        type:String,
        default: '100vw sm:50vw md:400px'
    }
})
const imgSrc = computed(()=>{
    if(empty(props.src)){
        return '/images/default.jpg'
    }else{
        return props.src
    }
})
</script>

<style lang="scss" scoped>

</style>