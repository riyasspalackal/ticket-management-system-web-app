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
              <q-item-label class="q-pb-xs">Event Name</q-item-label>
              <q-input  dense outlined v-model="Event.evt_name" ref="evt_name" label="Event Name"
               :rules="[val => !!val || 'Field is required']" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Event Description</q-item-label>
              <q-input dense outlined v-model="Event.evt_desc" label="Event discription" ref="evt_desc"  :rules="[val => !!val || 'Field is required']" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Location</q-item-label>
              <q-input dense outlined v-model="Event.location" ref="location" label="location" :rules="[val => !!val || 'Field is required']" />
            </q-item-section>
          </q-item>

          <q-item>
            <div class="q-pa-md row items-start q-gutter-md">
              <q-card class="my-card" v-for="ticket in tickets">
              
                <q-card-actions vertical>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Enter ticket details</q-item-label>
                    <q-input  dense outlined v-model="ticket.ticket_type" label="Enter ticket type" />
                    <q-input style="margin-top:20px" type="number" dense outlined v-model="ticket.capacity" label="Enter ticket capacity" />
                    <q-input type="number" style="margin-top:20px" dense outlined v-model="ticket.price" label="Enter price" />
                  </q-item-section>

                </q-card-actions>
              </q-card>
             
              <q-card class="my-card">
                <q-card-section class="q-pt-xs">
                   <q-btn size="sm" color="negative" round dense @click="tickets.push({ ticket_type:'', capacity:'', price: '' })" icon="add" />

                </q-card-section>
              </q-card>
              
            </div>
          </q-item>

        </q-list>

      </q-form>

      <q-form class="q-gutter-md">

        <q-card-section>
          <div class="text-h6">
            Event Lineup Details
          </div>
        </q-card-section>
        <q-list v-for="eventLineup in lineup">
          <q-card class="my-card">
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs"> Event Lineup Description</q-item-label>
                <q-input v-model="eventLineup.lineup_desc" label="Description" />
              </q-item-section>

            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs"> Event Lineup Date and Time</q-item-label>
                <div>
                  <q-input filled v-model="eventLineup.date_and_time">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-date v-model="eventLineup.date_and_time" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>

                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time v-model="eventLineup.date_and_time" mask="YYYY-MM-DD HH:mm" format24h>
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </q-item-section>
            </q-item>
          </q-card>
        </q-list>
        <q-btn color="primary" label="Add Event lineup" @click="addNewLineUp()" />
      </q-form>
    </q-card-section>

    <q-card-actions align="right" class="text-teal">
      <q-btn label="Save" @click="save()" type="submit" color="primary"  />
    </q-card-actions>
  </q-card>
</template>
<script>
    import {exportFile} from "quasar";
    import Request from './service';
    import lineup from './lineup'
    const service = new Request();

    function wrapCsvValue(val, formatFn) {
        let formatted = formatFn !== void 0 ? formatFn(val) : val;

        formatted =
            formatted === void 0 || formatted === null ? "" : String(formatted);

        formatted = formatted.split('"').join('""');

        return `"${formatted}"`;
    }

    export default {
        props:['eventId'],
        components:{
          lineup
        },
        data() {
            return {
               days: [ ],
                date: '',
                filter: "",
                Event: {
                },
                lineup:[{
                  "lineup_desc":'',
                  "date_and_time": new Date()
                }],
                tickets:[{
                  ticket_type:'',
                  capacity:'',
                  price: ''
                }]
               
              
            };
        },
        methods: {
           addNewLineUp(){
             this.lineup.push({
                  "lineup_desc":null,
                  "date_and_time": new Date()
                })
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
                let lineUp = [];
                lineUp = this.lineup.filter((item) => {
                  if (item.lineup_desc) {
                    return item
                  }
                })
                let tickets = [];
                tickets = this.tickets.filter((item) => {
                  if (item.ticket_type) {
                    return item
                  }
                })
                console.log(lineUp);
                let data;
                data= {...JSON.parse(JSON.stringify(this.Event)), ...{"event_lineup" : lineUp},...{"tickets" : tickets}};
                if (!this.eventId) {
                  console.log(data);
                  service.submitEventRegistration(data).then(
                    result => {
                      this.$emit('emitFromEventRegForm', true);
                    }, error => {})
                }else{
                console.log(data); 
                service.updateEvent(data,this.eventId).then(
                    result => {
                      this.$emit('emitFromEventRegForm', true);
                    }, error => {})
                }     
              }
             
            
           },
           getEventDetails(id){
             service.getEventDetails(id).then(
               result => {
                 console.log(result);
                 this.lineup = [];
                 this.lineup = result.data.event_lineup ? result.data.event_lineup: '';
                 this.tickets = result.data.ticket ?  result.data.ticket : '';
                 this.Event = result.data;
                 this.Event = {
                  evt_desc: result.data.evt_desc ? result.data.evt_desc : '',
                  evt_name: result.data.evt_name ? result.data.evt_name : '', 
                  location: result.data.location ? result.data.location : '', 
                  
                  }
               }, error => {})
           }
        },
        mounted(){
           this.eventId ? this.getEventDetails(this.eventId) : ''
        }
    };
</script>