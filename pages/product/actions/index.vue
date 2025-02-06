<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 mt-3">
          <div class="card">
            <div class="card-header b-t-primary border-3">
              <div class="row">
                <div
                  class="col-12 d-flex justify-content-between align-items-center"
                >
                  <h5 class="pb-0">{{ $t("product") }}</h5>
                  <div class="d-flex gap-2">
                    <button
                      class="btn btn-warning"
                      @click="goTo({ path: '/product' });"
                    >
                      <Icon
                        name="material-symbols:arrow-back-ios-rounded"
                        size="20"
                      ></Icon>
                      {{ $t("back") }}
                    </button>
  
                    <!-- <button class="btn btn-primary" @click="save('add')">
                      <Icon name="mdi:content-save-plus-outline" size="20"></Icon>
                      {{ $t("save_new") }}
                    </button> -->
                    <button class="btn btn-primary" @click="save('close')">
                      <Icon name="mdi:content-save-outline" size="20"></Icon>
                      {{ $t("save") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-lg-8">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group required">
                        <label for="category">{{ $t("category") }}</label>
                        <select 
                        v-model="form.categoryId"
                          name="" 
                          id="category"
                          class="form-select"
                          :class="{ 'is-invalid': v$.categoryId.$error }"
                          @change="v$.categoryId.$touch"
                        >
                          <option value="" selected>{{ $t("please_select") }}</option>
                          <option v-for="(item,index) in categories" :value="item.id">
                            {{ getNameByLang(item.name) }}
                          </option>
                        </select>
                        <span class="invalid-feedback" v-if="v$.categoryId.$error">{{
                          $t('category')+$t(v$.categoryId.$errors[0].$message)
                        }}</span>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group required">
                        <label for="namekh">{{ $t("name") }} ( {{ $t('kh') }} )</label>
                        <input
                          v-model="form.nameKh"
                          type="text"
                          class="form-control mb-2"
                          id="namekh"
                          :class="{ 'is-invalid': v$.nameKh.$error }"
                          @change="v$.nameKh.$touch"
                          :placeholder="$t('name') + ' ( ' + $t('kh') +' )'"
                        />
                        <span class="invalid-feedback" v-if="v$.nameKh.$error">{{
                          $t('name')+' ( '+$t('kh')+') '+$t(v$.nameKh.$errors[0].$message)
                        }}</span>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group required">
                        <label for="nameen">{{ $t("name") }} ( {{ $t('en') }} )</label>
                        <input
                          v-model="form.nameEn"
                          type="text"
                          class="form-control mb-2"
                          id="nameen"
                          :class="{ 'is-invalid': v$.nameEn.$error }"
                          @change="v$.nameEn.$touch"
                          :placeholder="$t('name') + ' ( ' + $t('en') +' )'"
                        />
                        <span class="invalid-feedback" v-if="v$.nameEn.$error">{{
                          $t('name')+' ( '+$t('en')+') '+$t(v$.nameEn.$errors[0].$message)
                        }}</span>
                      </div>
                    </div>
                    <div class="col-12 col-lg-6 mt-2">
                      <div class="form-group">
                        <label for="warranty_period">{{ $t("warranty_period") }}</label>
                        <input
                          v-model="form.warrantyPeriod"
                          type="text"
                          class="form-control mb-2"
                          id="warranty_period"
                          :placeholder="$t('warranty_period')"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-lg-6 mt-2">
                      <div class="form-group">
                        <label for="brand">{{ $t("brand") }}</label>
                        <input
                          v-model="form.brand"
                          type="text"
                          class="form-control mb-2"
                          id="brand"
                          :placeholder="$t('brand')"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-lg-6">
                      <div class="form-group required">
                        <label for="price">{{ $t("price") }}</label>
                        <div class="input-group">
                          <input
                            v-model="form.price"
                            type="text"
                            class="form-control mb-2"
                            id="price"
                            :class="{ 'is-invalid': v$.price.$error }"
                            @change="v$.price.$touch"
                            :placeholder="$t('price')"
                          />
                        </div>
                        <span class="invalid-feedback" v-if="v$.price.$error">
                          {{ $t('price') + ' ' + $t(v$.price.$errors[0]?.$message) }}
                        </span>
                      </div>
                    </div>
                    <div class="col-12 col-lg-6">
                      <div class="form-group required">
                        <label for="qty">{{ $t("qty") }}</label>
                        <input
                          v-model="form.stockQty"
                          type="text"
                          class="form-control mb-2"
                          id="qty"
                          :class="{ 'is-invalid': v$.stockQty.$error }"
                          @change="v$.stockQty.$touch"
                          :placeholder="$t('qty')"
                        />
                        <span class="invalid-feedback" v-if="v$.stockQty.$error">{{
                          $t('qty')+$t(v$.stockQty.$errors[0].$message)
                        }}</span>
                      </div>
                    </div>
                    <div class="col-12 col-lg-6">
                      <div class="form-group">
                        <label for="status">{{ $t("status") }}</label>
                        <select name="" id="status" class="form-control" v-model="form.status">
                          <option :value="true">{{ $t("enable") }}</option>
                          <option :value="false">{{ $t("disable") }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-lg-6">
                      <div class="form-group required">
                        <label for="second_hand">{{ $t("second_hand") }}</label>
                        <select name="" id="second_hand" class="form-control" v-model="form.isSecondHand">
                          <option :value="true">{{ $t("yes") }}</option>
                          <option :value="false">{{ $t("no") }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-4">
                  <div class="row">
                    <div class="col-12 mt-2">
                      <div>
                        <p for="image" class="text-center mb-2">
                          {{ $t("image") }}
                        </p>
                        <div class="text-center">
                          <img 
                            v-if="nullToVoid(form.img)==''"
                            :src="getImagePath(form.img,'post')"
                            width="220"
                            style="height: 220px; object-fit: cover"
                            class="rounded mx-auto d-block img-fluid"
                          />
                          <img 
                            v-else
                            :src="form.img"
                            width="220"
                            style="height: 220px; object-fit: cover"
                            class="rounded mx-auto d-block img-fluid"
                          />
                        </div>
                        <div class="file-content text-center m-t-20">
                          <div class="media-body">
                            <div
                              style="height: 0px; width: 0px; overflow: hidden"
                            >
                              <input
                                ref="fileInput"
                                style="display: none"
                                type="file"
                                accept=".jpg, .jpeg, .gif, .png, .webp, .svg"
                                :multiple="false"
                                @change="onFileChange"
                              />
                            </div>
                            <div class="d-flex flex-column gap-1">
                              <span
                                class="text-danger text-center"
                                style="font-size: 12px"
                                >{{ $t("less_than_15_MB") }}</span
                              >
                              <div align="center">
                                <div
                                  class="btn btn-outline-primary ms-2"
                                  @click="chooseImage"
                                >
                                  <vue-feather
                                    type="upload"
                                    class="text-top"
                                  ></vue-feather>
                                  {{ $t("upload") }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-4 mt-2">
                  <div class="form-group">
                    <label for="unit">{{ $t("unit") }}</label>
                    <input
                      v-model="form.weightType"
                      type="text"
                      class="form-control mb-2"
                      id="unit"
                      :placeholder="$t('unit')"
                    />
                  </div>
                </div>
                <div class="col-12 col-lg-4 mt-2">
                  <div class="form-group">
                    <label for="unit_value">{{ $t("unit_value") }}</label>
                    <input
                      v-model="form.weight"
                      type="text"
                      class="form-control mb-2"
                      id="unit_value"
                      :placeholder="$t('unit_value')"
                    />
                  </div>
                </div>
                <div class="col-12 col-lg-4 mt-2">
                  <div class="form-group">
                    <label for="dimension">{{ $t("dimension") }}</label>
                    <input
                      v-model="form.dimension"
                      type="text"
                      class="form-control mb-2"
                      id="dimension"
                      :placeholder="$t('dimension')"
                    />
                  </div>
                </div>
                <div class="col-12 col-lg-4">
                  <div class="form-group">
                    <label for="featured">{{ $t("featured") }}</label>
                    <select name="" id="featured" class="form-control" v-model="form.isFeatured">
                      <option :value="true">{{ $t("yes") }}</option>
                      <option :value="false">{{ $t("no") }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-12 col-lg-4">
                  <div class="form-group">
                    <label for="new_arrival">{{ $t("new_arrival") }}</label>
                    <select name="" id="new_arrival" class="form-control" v-model="form.isNewArrival">
                      <option :value="true">{{ $t("yes") }}</option>
                      <option :value="false">{{ $t("no") }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-12 col-lg-4">
                  <div class="form-group">
                    <label for="best_seller">{{ $t("best_seller") }}</label>
                    <select name="" id="best_seller" class="form-control" v-model="form.isBestSeller">
                      <option :value="true">{{ $t("yes") }}</option>
                      <option :value="false">{{ $t("no") }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-12 mt-2">
                  <div class="form-group">
                    <label for="meta_title">{{ $t("meta_title") }}</label>
                    <input
                      v-model="form.metaTitle"
                      type="text"
                      class="form-control mb-2"
                      id="meta_title"
                      :placeholder="$t('meta_title')"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label for="meta_description">{{ $t("meta_description") }}</label>
                    <textarea
                      v-model="form.metaDescription"
                      class="form-control"
                      rows="4"
                      id="meta_description"
                      :placeholder="$t('meta_description')"
                    >
                    </textarea>
                  </div>
                </div>
                <!-- List banner -->

                <div class="col-12 mt-2">
                  <div class="form-group">
                    <label class="required">{{ $t("gallery") }}</label>
                    <span>
                      <Icon
                        size="20"
                        class="text-primary"
                        name="material-symbols-light:image-outline-rounded"
                      ></Icon>
                    </span>
                    <div class="border border-gray rounded">
                      <div
                        v-if="form.gallery.length <= 0"
                        class="flex-column d-flex align-items-center justify-content-center p-5"
                      >
                        <p>{{ $t("please_upload") + " " + $t("gallery") }}</p>
                        <Icon
                          style="cursor: pointer"
                          @click="uploadGallery"
                          size="100"
                          class="text-gray"
                          name="material-symbols-light:add-photo-alternate-outline-rounded"
                        ></Icon>
                      </div>
                      <div
                        class="d-flex align-items-center"
                        style="flex-wrap: wrap"
                        v-else
                      >
                        <draggable
                          :list="form.gallery"
                          class="draggable-list d-flex"
                          style="flex-wrap: wrap"
                        >
                          <transition-group>
                            <div
                              v-for="item,index in form.gallery"
                              :key="index"
                              class="position-relative"
                            >
                              <Icon
                                name="material-symbols-light:cancel-outline-rounded"
                                class="position-absolute text-danger"
                                size="25"
                                style="right: 0px; top: 0px;cursor: pointer;"
                                @click="removeGallery(item.id,index)"
                              ></Icon>
                              <img
                                :src="item"
                                class="m-3"
                                alt=""
                                height="200"
                              />
                            </div>
                          </transition-group>
                        </draggable>
                        <Icon
                          @click="uploadGallery"
                          size="100"
                          style="cursor: pointer"
                          class="text-gray"
                          name="material-symbols-light:add-photo-alternate-outline-rounded"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 mt-2">
                  <div class="form-group required">
                    <label for="descriptionkh">{{ $t("description") }} ( {{ $t('kh') }} )</label>
                    <WangEditor ref="editor" :valueEditHtml="form.descriptionKh" v-model="form.descriptionKh" />
                  </div>
                </div>
                <div class="col-12 mt-2">
                  <div class="form-group required">
                    <label for="descriptionen">{{ $t("description") }} ( {{ $t('en') }} )</label>
                    <WangEditor ref="editor" :valueEditHtml="form.descriptionEn" v-model="form.descriptionEn" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Start modal-cropper-image Component -->
        <!-- <ModalCropperImage
          ref="modalShowCropperImage"
          :target-file.sync="targetFile"
          :aspectRatio="aspectRatio"
          :cropBoxResizable="false"
          @closeModal="closeModalCropperImage"
          @save="saveModalCropperImage"
        /> -->
        <!-- cropImage -->
        <CropImage
          ref="cropImageModal"
          :auto-zoom="false"
          :freeSize="true"
          :resizable="true"
          :movable="true"
          @imageCroped="imagecroped"
        ></CropImage>
      <!-- End modal-cropper-image Component -->
    </div>
  </template>
  
  <script setup>
  import moment from "moment";
  import { useCategoryList } from "~/store/category_list";
  import { required, email, minLength, maxLength } from "@vuelidate/validators";
  import { blogAPI } from "~/constants/api";
  import WangEditor from "~/components/WangEdiot.vue";
  import ModalCropperImage from "~/components/ModalCropperImage.vue";
  import businessTypeEnum from "~/composables/enum/businessTypeEnum";
  import { useLanguageStore } from "~/store/language";
  import { useCategoryType } from "~/store/category_type";
  import { useUserStore } from "~/store/user";
  const userStore = useUserStore();
  const languageStore = useLanguageStore();
  const language = ref(languageStore.lists);
  const modalShowCropperImage = ref(null);
  const hideShowCropperImage = ref(false);
  let aspectRatio = ref(480/260);
  let cropWidth = ref(null);
  let cropHeight = ref(null);
  const defaultForm = {
    id: '',
    nameEn: '',
    nameKh: '',
    descriptionEn: '',
    descriptionKh: '',
    price: '',
    stockQty: '',
    weightType: '',
    weight: '',
    dimension:'',
    brand: '',
    warrantyPeriod: '',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    shippingClass: 'Standard',
    returnPolicy: '30-day return policy',
    metaTitle: '',
    metaDescription: '',
    isSecondHand: false,
    secondHandDescription: '',
    categoryId: '',
    status: true,
    img: '',
    gallery: [],
  };
  const editor = ref(null);
  const categories = ref([]);
  const categoryList = useCategoryList();
  
  const imageName = ref(null);
  const imageFile = ref(null);
  const imageOfGallery = ref([]);
  const route = useRoute();
  const fileInput = ref(null);
  const cropImageModal = ref(null);
  let targetFile = ref(null);
  const voiceInput = ref(null);
  
  let form = reactive({
    ...defaultForm,
  });
  const changeDate = (date) => {
    form.publish_date = moment(date).format("YYYY-MM-DD");
  }
  const getListCategory =  () => {
    
    categoryList.lists.forEach((item) => {
    let name = {
        'en': item.nameEn,
        'kh': item.nameKh
      }
      name = JSON.stringify(name);
    let data = {
      id: item.id,
      name: name
    };
    categories.value.push(data);
  })
  };
  
  const rules = computed(() => {
    return {
      nameEn: {
        required,
        $autoDirty: true,
      },
      nameKh: {
        required,
        $autoDirty: true,
      },
      price: {
        required,
        $autoDirty: true,
      },
      stockQty: {
        required,
        $autoDirty: true,
      },
      categoryId: {
        required,
        $autoDirty: true,
      },
    };
  });
  const v$ = vuelidate(rules, form);
  
  onMounted(() => {
    if (!isEmpty(route.query)) {
      getData(route.query.id);
    } else {
      setDefaultForm();
    }
    getListCategory();
    if (checkCookieExpiration()) {
        console.log('Access token is still valid.');
    } else {
        console.error('Access token has expired or does not exist.');
        useUserStore().clearToken();
    }
  });
  // const copyNameEnglish = (code, index) => {
  //   if (code == "en") {
  //     form.slug = convertString(form.post_translate[index].name);
  //     form.meta_title = form.post_translate[index].name;
  //     form.name=form.post_translate[index].name
  //   }
  // }
  const typeImage = ref(null);
  const uploadGallery = ()=>{
    typeImage.value = "gallery";
    fileInput.value.click();
  }
  const removeGallery = (id , index) =>{
    const { $i18n } = useNuxtApp();
    swal({
      title: $i18n.t("are_you_sure"),
      text: $i18n.t("cannot_revert_this"),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: $i18n.t("ok"),
      cancelButtonText: $i18n.t("cancel"),
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise(async (resolve) => {
          form.gallery.splice(index,1);
          iAlert().success();
          resolve();
        });
      },
      allowOutsideClick: () => !swal.isLoading(),
    });
    
  }
  function convertString(input) {
      return input.toLowerCase().replace(/ /g, '-');
  }
  const chooseImage = () => {
    typeImage.value = "image"
    fileInput.value.click();
  };
  const onFileChange = ($event) => {
    const files = $event.target.files || $event.dataTransfer.files;
    if (files[0]) {
      if (files[0].size > 15000000) {
        fileInput.value = "";
        form.img = "";
        useNuxtApp().$showToast({
          msg: "Image file must be less than 15 MB.",
          type: "warning",
        });
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
        files[0].type.indexOf("image/") === -1 ||
        !allowedTypes.includes(files[0].type.toLowerCase())
      ) {
        swal({
          icon: "warning",
          title: "Image Validation",
          text: "Please select a JPG, JPEG, or GIF image file.",
        });
        return;
      }
    }
    
    cropImageModal.value.showModal($event);
    if(typeImage.value == "image"){
      imageFile.value = files[0];
      imageName.value = files[0].name;
    }else if(typeImage.value == "gallery"){
      imageOfGallery.value.push({
        imageFile: files[0],
        imageName: files[0].name
      })
    }
    fileInput.value.value = null; 
  };
  const imagecroped = (data) =>{
    if(typeImage.value=="image"){
      form.img = data;
    }
    else if(typeImage.value == "gallery"){
      form.gallery.push(data);
    }
  }
  
  const getInput = () => {
    language.value.forEach((lang,index) => {
      if (lang.code == "en") {
        form.name=form.post_translate[index].name
      }
    })
    return {
      id: form.id,
      img: form.img,
      category_id: form.categoryId,
      nameEn: form.nameEn,
      nameKh: form.nameKh,
      descriptionEn: form.descriptionEn,
      descriptionKh: form.descriptionKh,
      price: form.price,
      stockQty: form.stockQty,
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      isSecondHand: form.isSecondHand,
      secondHandDescription: form.secondHandDescription,
      status: form.status,
      weightType: form.weighType,
      weight: form.weight,
      dimension: form.dimension,
      shippingClass: form.shippingClass,
      brand: form.brand,
      warrantyPeriod: form.warrantyPeriod,
      returnPolicy: form.returnPolicy,
      isFeatured: form.isFeatured,
      isNewArrival: form.isNewArrival,
      isBestSeller:  form.isBestSeller,
      gallery: form.gallery,
    };
  };
  
  const setInput = (res) => {
    form.id = res.productId;
    form.img = res.basedImageUrl;
    form.categoryId = res.categoryId;
    form.nameEn = res.nameEn;
    form.nameKh = res.nameKh;
    form.descriptionEn = res.descriptionEn;
    form.descriptionKh = res.descriptionKh;
    form.price = res.price;
    form.stockQty = res.stockQty;
    form.metaTitle = res.metaTitle;
    form.metaDescription = res.metaDescription;
    form.isSecondHand = res.isSecondHand;
    form.secondHandDescription = res.secondHandDescription;
    form.status = res.status;
    form.weightType = res.weightType;
    form.weight = res.weight;
    form.dimension = res.dimension;
    form.shippingClass = res.shippingClass;
    form.brand = res.brand;
    form.warrantyPeriod = res.warrantyPeriod;
    form.returnPolicy = res.returnPolicy;
    form.isFeatured = res.isFeatured;
    form.brand = res.brand;
    form.categoryId = res.category.id;
  };
  
  const getData = async (id) => {
    await fetch("https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/products/"+id, {
      method: 'GET', // Specify the method as GET
      headers: {
          'Content-Type': 'application/json',
          Authorization: "",  
      }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON from the response
    })
    .then(data => {
      
      setInput(data.payload);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    })
    await fetch("https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/product-images/list/"+id, {
      method: 'GET', // Specify the method as GET
      headers: {
          'Content-Type': 'application/json',
          Authorization: "",  
      }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON from the response
    })
    .then(data => {
      
      setInputGallery(data.payload);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    })
  };
  const setInputGallery = (res) => {
    res.forEach((element,index) => {
      if(!element.isBased){
        form.gallery.push(element.imageBaseUrl);
      }
    });
  }
  const save = async (type) => {
    const result = await v$.value.$validate();
    if (result) {
      
      let url = "https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/products";
      let method = "POST";
      if (!isEmpty(route.query)) {
        url = url+"/" + route.query.id;
        method = "PUT";
      }
      await fetch(url, {
        method: method, // Specify the method as GET
        headers: {
          "Content-Type": "application/json",
          Authorization: userStore.logged ? `Bearer ${userStore.token}` : "",
        },
        body: JSON.stringify(form),
      }).then((response) => response.json())
      .then(async (data) =>{
        if(nullToVoid(imageFile.value) != "" && nullToVoid(imageName.value) != ""){
          const myHeaders = new Headers();
          myHeaders.append("Authorization", userStore.logged ? `Bearer ${userStore.token}` : "");
          const formdata = new FormData();
          formdata.append("file", imageFile.value, imageName.value);
          formdata.append("request", JSON.stringify({
                  descriptionEn: "Base image of product",
                  descriptionKh: ""
                }));
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
          };
          await fetch(`https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/product-images/single/${data.payload.productId}`, 
            requestOptions
          ).then((response) => response.json())
          .then((dataBaseImage) => {
            
          })
        }
        if(form.gallery.length > 0){
          const myHeaders = new Headers();
          myHeaders.append("Authorization", userStore.logged ? `Bearer ${userStore.token}` : "");
          const formdata = new FormData();
          imageOfGallery.value.forEach((item) => {
            formdata.append("files", item.imageFile, item.imageName);
          })
          // formdata.append("file", imageFile.value, imageName.value);
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
          };
          await fetch(`https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/product-images/multiple/${data.payload.productId}`, 
            requestOptions
          ).then((response) => response.json())
          .then((dataMultiImage) => {
            
          })
        }
        imageFile.value = null;
        imageName.value = null;
        imageOfGallery.value = [];
        iAlert().success();
        goTo({ path: "/product/" });
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
    }
    // const result = await v$.value.$validate();
    // if (result) {
    //   let url = "";
    //   if (!isEmpty(route.query)) {
    //     url = blogAPI.update;
    //   }
    //   let input = getInput();
      
    //   await ifetch(url, input);
    //   if (type === "add") {
    //     setDefaultForm();
    //     iAlert().success();
    //   } else if (type === "close") {
    //     goTo({ path: "/product/" });
    //     iAlert().success();
    //   }
    // } else {
    //   useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
    // }
  };
  
  const setDefaultForm = () => {
    Object.assign(form, defaultForm);
    v$.value.$reset();
  };
  </script>
  