<template>
  <q-card style="width: 800px; max-width: 60vw;">
    <q-card-section>
      <div class="text-h5">
        Add new event registration
        <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
      </div>
    </q-card-section>
    <q-separator inset></q-separator>
    <q-card-section class="q-pt-none">
      <q-form class="q-gutter-md">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Customer name</q-item-label>
              <q-input  dense outlined v-model="bookingHistory.customer_name" ref="evt_name" label="Enter customer Name"
               :rules="[val => !!val || 'Field is required']" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Email</q-item-label>
              <q-input dense outlined v-model="bookingHistory.customer_email" label="Enter customer email" ref="evt_desc"  :rules="[val => !!val || 'Field is required']" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Phone</q-item-label>
              <q-input dense outlined v-model="bookingHistory.phone_number" ref="location" label="location" :rules="[val => !!val || 'Field is required']" />
            </q-item-section>
          </q-item>

          <q-item>
            <div class="text-h6">Ticket details
            <q-btn-dropdown color="primary" label="Select event">
              <q-list>
                <q-item v-for="(key,index) in events" clickable v-close-popup @click="changeEvent(key)">
                  <q-item-section>
                    <q-item-label>{{key.evt_name}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          </q-item>

          <div class="q-pa-sm">
            <div class="q-gutter-sm row items-start" >
              <div v-for="(ticket,index) in tickets" >
                <q-item-label class="q-pb-xs">Available Tickets : {{ticket.available_ticket}}</q-item-label>
              
              <q-input standout @change="changeCapacity(ticket,index)" label="Enter tickets" v-model="ticket.booked" type="number" >
                <template v-slot:prepend>
                 {{ticket.ticket_type}}
                </template>
              </q-input>
              <!-- <q-item-label style="color:red" v-if="ticket.booked ? ticket.booked > ticket.available_ticket : ''" class="q-pb-xs">Enter Valid ticket</q-item-label> -->
              </div>

              
            </div>
          </div>

        </q-list>

      </q-form>
    </q-card-section>

    <q-card-actions align="right" class="text-teal">
      <q-btn label="Save" @click="save()" type="submit" color="primary"  />
    </q-card-actions>
  </q-card>
</template>
<script>
    
    import Request from './service';
    import lineup from './lineup'
    const service = new Request();

  
    export default {
        props:['eventId'],
        components:{
          lineup
        },
        data() {
            return {
               events: [],
                date: '',
                filter: "",
                bookingHistory: {
                },
                
                tickets:[],

              
            };
        },
        methods: {
           getEventList() {
             service.getAllEvent().then(
               result => {
                 if (!result.data.status) {
                   this.events = result.data;
                 }
               }, error => {})
           },
           changeEvent(event) {
        
             console.log(event);
             this.getTickets(event.id)

           },
           getTickets(id) {
             service.getTickets(id).then(
               result => {
                 console.log(result);
                 if (result.data.message) {
                   
                 } else {
                   this.tickets = result.data.ticket;
                 }
                 console.log(this.tickets);
               }, error => {})
           },
            changeCapacity(ticket,index){
              console.log(ticket);
              if (ticket.booked <= ticket.available_ticket) {
                 ticket.available_ticket = ticket.available_ticket - ticket.booked
              }
            },


           save() {
              this.$refs.evt_name.validate()
              this.$refs.location.validate()
              this.$refs.evt_desc.validate()
              if (this.$refs.evt_name.hasError || this.$refs.location.hasError || this.$refs.evt_desc.hasError) {
                this.formHasError = true
                this.$q.notify({
                  color: 'negative',
                  message: 'Please fill the form'
                })
              }else {
                
                 console.log(this.bookingHistory); 
                 console.log(this.tickets);
                  let data;
                data= {...this.bookingHistory,...{"tickets" : this.tickets}};
                console.log(data);
                service.booking(data).then(
                    result => {
                      this.$emit('emitFromBooking', true);
                    }, error => {})
              }
             
            
           }
        },
        mounted(){
           
           this.getEventList()
        }
    };
</script>