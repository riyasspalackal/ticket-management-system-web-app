<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
      title="Treats"
      :data="eventList"
      :columns="columns"
      row-key="name"
    >

      <template v-slot:top-right="props">
          <q-btn @click="new_Event=true" outline color="primary" label="Create booking" class="q-mr-xs"/>

          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
            </q-tooltip>
          </q-btn>

          
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            > {{mode==='grid' ? 'List' : 'Grid'}}
           
            </q-tooltip>
          </q-btn>

         
        </template>


      <template v-slot:body="props">
        <q-tr :props="props">
          
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          <q-td  style="text-align: center;width: 20px;">
           
            <q-btn color="secondary" :label="props.expand ? 'Hide' : 'View Tickets'" @click="props.expand = !props.expand" />
          </q-td>
          
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <p v-for="key in JSON.parse(props.row.ticket)">
             
              <span>{{key.ticket_type }}</span> : <span>{{key.booked }}</span>
            </p>
          </q-td>
        </q-tr>
      </template>

    </q-table>
    </q-card>
    <q-dialog v-model="new_Event">
      <bookinfForm :eventId="editEventId" @emitFromBooking="saveEventReg"></bookinfForm>
    </q-dialog>
  </q-page>
</template>

<script>
    import {exportFile} from "quasar";
    import Request from './service';
    import lineup from './lineup'
    import bookinfForm from './bookinfForm'
    const service = new Request();


    export default {
        components:{
          lineup,
          bookinfForm
        },
        data() {
            return {
               days: [ ],
                date: '',
                filter: "",
                Event: {
                  golden_ticket:{},
                  platinum_ticket:{},
                  silver_ticket:{}
                },
                lineup:[{
                  "desc":'',
                  "date": new Date()
                }],
                new_Event: false,
                mode: "list",
                editEventId:null,
                columns: [
                    {
                        name: "desc",
                        required: true,
                        label: "Customer Name",
                        align: "left",
                        field: row => row.name,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: "Email",
                        align: "left",
                        label: "Description",
                        field: "email",
                        sortable: true
                    },
                    {
                        name: "Phone",
                        align: "left",
                        label: "Location",
                        field: "phone",
                        sortable: true
                    }
                    
                ],
                eventList : [],
                pagination: {
                    rowsPerPage: 10
                }
            };
        },
        methods: {
           addNewLineUp(){
             this.lineup.push({
                  "desc":'',
                  "date": new Date()
                })
           },
           // new events pull when submit event registartion form 
          saveEventReg(data) {
            if (data) {
              this.new_Event= false;
              this.editEventId = null;
              this.$q.notify({
                  color: 'secondary',
                  message: 'Ticket Booked Successfully'
                })
              this.getBookedHistory()
            }
          },
           getBookedHistory(){
             this.$q.loading.show();
             let data=[]
             this.eventList=[];
             service.getAllBooking().then(
             result => {
               this.$q.loading.hide();
               if (!result.data.status) {
                data = result.data;
               }
               data.forEach(element => {
                 this.eventList.push({
                   name: element.customer_name,
                   email:element.customer_email,
                   phone:element.phone_number,
                   id:element.id,
                   ticket:element.ticket_history,
                 })
               });
              console.log(this.eventList);
             }, error => {})
           },
           editEvent(id){
             this.editEventId = id;
             this.new_Event=true
           },
           
        },
        mounted(){
          this.getBookedHistory()
        }
    };
</script>
