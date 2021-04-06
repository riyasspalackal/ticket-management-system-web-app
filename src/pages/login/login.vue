<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div
          id="particles-js"
          :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
        ></div>
        <q-btn
          color="white"
          class="absolute-top-right"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <q-card
          class="login-form"
          v-bind:style="
            $q.platform.is.mobile ? { width: '80%' } : { width: '30%' }
          "
        >
         </q-img>
          <q-card-section>
            <q-avatar
              size="74px"
              class="absolute"
              style="top: 0;right: 25px;transform: translateY(-50%);"
            >
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Log in to Dashboard
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="username" label="Username" lazy-rules />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn
                  label="Login"
                  
                  type="button"
                  color="primary"
                  @click="login()"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script type="text/javascript"></script>
<script>
  import axios from "axios";
  import { Notify } from "quasar";


  export default {
    data() {
      return {
        username: 'admin',
        password: 'admin123'
      }
    },
    methods: {
      login() {
        var data = {};
        data.username = this.username;
        data.password = this.password;
      
          axios.post(process.env.LOGIN_END_POINT, data)
            .then(res => {
              if (res.data.status == 'error') {
               
                Notify.create({
                  message: res.data.user_message,
                  color: 'negative',
                   icon: 'report_problem',
                   position: "top-right",
                });
                
              }else if(res.data.access_token){
                 localStorage.setItem("user_details", JSON.stringify(res.data))
                 this.$router.push('dashboard')
              }
            })
            .catch(e => {
              console.log(e);
            })
        
      },

    },
    mounted() {
      console.log(process.env.LOGIN_END_POINT);
    }
  }
</script>

<style>

.normal_gradient {
  background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #b61924 70%);
}
.dark_gradient {
  background: linear-gradient(145deg, rgb(11, 26, 61) 15%, #4c1014 70%);
}
.login-form {
  position: absolute;
}
</style>
