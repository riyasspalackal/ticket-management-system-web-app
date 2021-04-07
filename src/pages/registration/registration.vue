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
          <q-btn @click="new_Event=true" outline color="primary" label="Add New" class="q-mr-xs"/>

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
            >{{mode==='grid' ? 'List' : 'Grid'}}
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
           
            <q-btn color="secondary" :label="props.expand ? 'Hide' : 'View lineups'" @click="props.expand = !props.expand" />
          </q-td>
          <q-td  style="text-align: center; width: 20px;">
            <q-btn size="sm" color="accent" round dense @click="editEvent(props.row.id)" icon="edit" />
            
          </q-td>
          <q-td  style="text-align: center; width: 20px;">
            <q-btn size="sm" color="negative" round dense @click="deleteEvent(props.row.id)" icon="delete" />
            
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <lineup v-if="props.expand" :eventId="props.row.id" ></lineup>
          </q-td>
        </q-tr>
      </template>

    </q-table>
    </q-card>
    <q-dialog v-model="new_Event">
      <EventRegForm :eventId="editEventId" @emitFromEventRegForm="saveEventReg"></EventRegForm>
    </q-dialog>
  </q-page>
</template>

<script>
    import {exportFile} from "quasar";
    import Request from './service';
    import lineup from './lineup'
    import EventRegForm from './eventRegForm'
    const service = new Request();


    export default {
        components:{
          lineup,
          EventRegForm
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
                        label: "Event Name",
                        align: "left",
                        field: row => row.name,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: "description",
                        align: "left",
                        label: "Description",
                        field: "evt_desc",
                        sortable: true
                    },
                    {
                        name: "location",
                        align: "left",
                        label: "Location",
                        field: "location",
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
                  message: 'New Event Registered sucessfully'
                })
              this.getEventList()
            }
          },
           getEventList(){
             this.$q.loading.show();
             let data=[]
             this.eventList=[];
             service.getAllEvent().then(
             result => {
               this.$q.loading.hide();
               if (!result.data.status) {
                data = result.data;
               }
               data.forEach(element => {
                 this.eventList.push({
                   name: element.evt_name,
                   evt_desc:element.evt_desc,
                   location:element.location,
                   id:element.id
                 })
               });
          
             }, error => {})
           },
           editEvent(id){
             this.editEventId = id;
             this.new_Event=true
           },
           deleteEvent(id) {
             this.$q.dialog({
               title: 'Confirm',
               message: `Are you sure to delete this event?`,
               color: 'negative',
               ok: `Yes, I'm sure`,
               cancel: true,
               default: 'cancel'
             }).onOk(() => {
             this.$q.loading.show();
             service.deleteEvent(id, this.eventId).then(
               result => {
                 this.getEventList()
               }, error => {}) })
           }
        },
        mounted(){
          this.getEventList()
        }
    };
</script>
