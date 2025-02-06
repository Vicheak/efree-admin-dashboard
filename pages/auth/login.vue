<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 p-0">
          <div class="login-card">
            <div>
              <div>
                <a class="logo">
                  <img
                    class="img-fluid"
                    src="/images/e-free-logo.png"
                    alt="looginpage"
                    width="220px"
                  />
                </a>
              </div>
              <div class="login-main">
                <form class="theme-form">
                  <h4>Sign in to account</h4>
                  <p>Enter your email address & password to login</p>
                  <div class="form-group">
                    <label class="form-label">{{ $t("email") }}</label>
                    <input
                      class="form-control"
                      :class="{ 'is-invalid': v$.email.$error }"
                      name="email"
                      :placeholder="$t('email')"
                      v-model="form.email"
                      @change="v$.email.$touch"
                    />
                    <span class="invalid-feedback" v-if="v$.email.$error">{{
                      v$.email.$errors[0].$message
                    }}</span>
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">{{ $t("password") }}</label>
                    <div class="form-input position-relative">
                      <input
                        class="form-control"
                        :class="{ 'is-invalid': v$.password.$error }"
                        type="password"
                        name="password"
                        placeholder="*********"
                        v-model="form.password"
                        @change="v$.password.$touch"
                      />
                      <span
                        class="invalid-feedback"
                        v-if="v$.password.$error"
                        >{{ v$.password.$errors[0].$message }}</span
                      >
                    </div>
                  </div>
                  <div class="form-group mb-0">
                    <!-- <div class="checkbox p-0">
                      <input id="checkbox1" type="checkbox" />
                      <label class="text-muted" for="checkbox1"
                        >Remember password</label
                      >
                    </div>
                    <nuxt-link class="link" to="/authentication/forget_password"
                      >Forgot password?</nuxt-link
                    > -->
                    <div class="text-end mt-3">
                      <button
                        class="btn btn-primary btn-block w-100"
                        @click.prevent="login"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { required, minLength } from "@vuelidate/validators";
import { useUserStore } from "~/store/user";

// Set Layout
definePageMeta({
  layout: "login",
});

// Declare data
const form = reactive({
  email: "",
  password: "",
});

const userStore = useUserStore();

// Define validation rules
const rules = {
  email: {
    required,
  },
  password: {
    required,
    minLength: minLength(6),
  },
};

// Create validation object
const v$ = vuelidate(rules, form);

// Define login function
const login = async () => {
  if (v$.value.$invalid) return; // Check if form is invalid
  // console.log("form",form);
  
  // await fetch("https://efree.cheakautomate.online/gateway/api/v1/auth/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(form),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // localStorage.setItem("token", data.token);
  //     // localStorage.setItem("user", JSON.stringify(data.user));
  //     // navigateTo("/dashboard");
  //     console.log(data);
      
  //   });
  
  userStore.login(form);
};
</script>
