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
              <q-input dense outlined v-model="Event.evt_desc" label="Event Name" ref="evt_desc"  :rules="[val => !!val || 'Field is required']" />
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
              <q-card class="my-card">
                <q-card-section class="q-pt-xs">
                  <div class="text-h6">Gold</div>

                </q-card-section>

                <q-separator />

                <q-card-actions vertical>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Enter capacity and price</q-item-label>
                    <q-input type="number" dense outlined v-model="Event.golden_ticket.capacity" label="Capacity" />
                    <q-input type="number" style="margin-top:20px" dense outlined v-model="Event.golden_ticket.price" label="price" />
                  </q-item-section>

                </q-card-actions>
              </q-card>
              <q-card class="my-card">
                <q-card-section class="q-pt-xs">
                  <div class="text-h6">Silver</div>

                </q-card-section>

                <q-separator />

                <q-card-actions vertical>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Enter capacity and price</q-item-label>
                    <q-input dense outlined v-model="Event.silver_ticket.capacity" label="Capacity" />
                    <q-input style="margin-top:20px" dense outlined v-model="Event.silver_ticket.price" label="price" />
                  </q-item-section>

                </q-card-actions>
              </q-card>

              <q-card class="my-card">
                <q-card-section class="q-pt-xs">
                  <div class="text-h6">Platinum</div>

                </q-card-section>

                <q-separator />

                <q-card-actions vertical>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Enter capacity and price</q-item-label>
                    <q-input dense outlined v-model="Event.platinum_ticket.capacity" label="Capacity" />
                    <q-input style="margin-top:20px" dense outlined v-model="Event.platinum_ticket.price"
                      label="price" />
                  </q-item-section>

                </q-card-actions>
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
                <q-input v-model="eventLineup.desc" label="Description" />
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
        components:{
          lineup
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
                  "date_and_time": new Date()
                }],
               
              
            };
        },
        methods: {
           addNewLineUp(){
             this.lineup.push({
                  "desc":null,
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
                  if (item.desc) {
                    return item
                  }
                })
                console.log(lineUp);
                let data;
                data= {...JSON.parse(JSON.stringify(this.Event)), ...{"lineups" : lineUp}};
                console.log(data); 
                service.submitEventRegistration(data).then(
                 result => {
                   this.$emit('emitFromEventRegForm', true);
                 }, error => {})
              }
             
            
           }
        },
        mounted(){
           
        }
    };
</script>