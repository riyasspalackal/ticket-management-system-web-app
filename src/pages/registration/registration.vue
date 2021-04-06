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
          <q-td  style="text-align: center;">
            <!-- <q-btn label="ddd" size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" /> -->
            <q-btn color="secondary" :label="props.expand ? 'Hide' : 'View lineups'" @click="props.expand = !props.expand" />
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
      <EventRegForm @emitFromEventRegForm="saveEventReg"></EventRegForm>
    </q-dialog>
  </q-page>
</template>

<script>
    import {exportFile} from "quasar";
    import Request from './service';
    import lineup from './lineup'
    import EventRegForm from './eventRegForm'
    const service = new Request();

    function wrapCsvValue(val, formatFn) {
        let formatted = formatFn !== void 0 ? formatFn(val) : val;

        formatted =
            formatted === void 0 || formatted === null ? "" : String(formatted);

        formatted = formatted.split('"').join('""');

        return `"${formatted}"`;
    }

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
              this.$q.notify({
                  color: 'secondary',
                  message: 'New Event Registered sucessfully'
                })
              this.getEventList()
            }
          },
           getEventList(){
             let data=[]
             service.getAllEvent().then(
             result => {
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
               console.log(this.eventList);

             }, error => {})
           }
        },
        mounted(){
          this.getEventList()
          console.log(process.env.LOGIN_END_POINT);
           
        }
    };
</script>
