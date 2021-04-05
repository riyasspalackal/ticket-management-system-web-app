<template>

  <div class="col-12 .col-md-2">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">EVENT NAME</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi temporibus odio est accusamus consequatur
            eius saepe vitae eaque cum perspiciatis doloribus, nostrum quas amet sapiente veniam? Earum accusantium
            cupiditate voluptatum!
          </div>
          <div>
            <q-list>


              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="amber" name="local_movies" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Gold</q-item-label>
                  <q-item-label caption>Total Ticket : 500</q-item-label>
                  <q-item-label caption>Tickets Sold : 350</q-item-label>

                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="blue-grey-12" name="local_movies" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Silver</q-item-label>
                  <q-item-label caption>Total Ticket : 500</q-item-label>
                  <q-item-label caption>Tickets Sold : 350</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="grey-13" name="local_movies" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Platinum</q-item-label>
                 <q-item-label caption>Total Ticket : 500</q-item-label>
                  <q-item-label caption>Tickets Sold : 350</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
        </q-card-section>

      </q-card-section>


      <q-separator />


      <q-card-actions>
         <div class="text-overline">Event Time</div>
        <q-btn flat round icon="event" />
        <q-btn flat>
          5:30PM
        </q-btn>
        <q-btn flat>
          7:00PM
        </q-btn>
         <q-btn flat>
          9:00PM
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>



</template>

<script>


import Router from "src/router/routes";


export default {
  name: 'SignInForm',
  data () {
    return {
      username: '',
      password: '',
      authError : false
    }
  },
  methods: {
    submit () {
      //  this.$router.replace('dashboard');
    }
  }
}
</script>

<style >
.my-card{
  width: '100%',
  max-width '300px'
}
  
</style>