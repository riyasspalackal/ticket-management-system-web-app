<template>
  <div class="q-px-lg q-pb-md">
    <q-timeline color="secondary" v-for="linbeup in lineList">
      
      <q-timeline-entry
        :title="date_conversion(linbeup.date_and_time)"
        :subtitle="time_conversion(linbeup.date_and_time)"
      >
        <div>
         {{linbeup.lineup_desc}}
        </div>
      </q-timeline-entry>
      
    </q-timeline>
  </div>
</template>

<script>

import Request from './service';
const service = new Request();
import dateFormat from "dateformat";

export default {
  props:['eventId'],
  data () {
    return {
      lineList:[],
    }
  },
  methods: {
    getLineUpByEventId(id){
      service.getLineUpByEventId(id).then(
        result => {
        if (!result.data.status) {
          this.lineList = result.data;
        }
        console.log(this.lineList);
        }, error => {})
    },
    date_conversion(date){
      return dateFormat(date, 'dddd, mmmm d, yyyy')
    },
    time_conversion(time){
       return dateFormat(time, 'h:MM TT')
    }
  },
  mounted(){
    this.getLineUpByEventId(this.eventId);
  }
}
</script>

<style >  
</style>