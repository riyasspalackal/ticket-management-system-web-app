<template>
  <div class="col-12 .col-md-2">
    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
      <q-card flat bordered class="">
        <q-card-section>
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
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section>
          <IEcharts ref="stack_bar" :option="stackedBarOptions" :resizable="true" style="height:270px" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>


import Router from "src/router/routes";
import IEcharts from 'vue-echarts-v3/src/full.js';
import Request from 'src/pages/registration/service';

const service = new Request();

export default {
  name: 'SignInForm',
  components:{
  IEcharts
  },
  data () {
    return {
      username: '',
      password: '',
      authError : false,
      events:[],
      ticketsStatics:[],
      stackedBarOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(50,50,50,0.9)',

        },
        legend: {
          bottom: 0,
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : '#676767'
          }
        },
        color: ['#3395dd', '#ed892d', '#34393b'],
        // legend: {
        //     y: "bottom",
        //     data: [{name: 'Territory Sales', icon: 'circle'}, {
        //         name: 'Remaining Nation Sales',
        //         icon: 'circle'
        //     }]
        // },
        grid: {
          bottom: '10%',
          left: '15%',
          top: '9%'
        },
        calculable: true,
        xAxis: {
          type: 'value',
          position: 'top',
          axisLine: {
            show: false
          },
         
        },
        yAxis: [{
          type: 'category',
          data: ['Golden Ticket', 'Silver Ticket', 'Platinum Ticket'],
          axisLabel: {
            fontSize: 12,
            color: this.$q.dark.isActive ? 'white' : '#676767'
          }
        }],
        series: [{
          name: 'Available Ticket',
          type: 'bar',
          stack: 'A',
          data: ''

        }, {
          name: 'Booked Tickets',
          type: 'bar',
          stack: 'A',
          data: ''
        }]
      }
    }
  },
  computed: {
    
  },
  methods: {
    submit () {
     
    },
    changeEvent(event) {
      this.stackedBarOptions.yAxis[0].data = [];
      this.stackedBarOptions.series[0].data = [];
      this.stackedBarOptions.series[1].data = [];
      this.ticketsStatics.forEach(element => {
        if (element.evt_id == event.id) {
          this.stackedBarOptions.yAxis[0].data.push(element.ticket_type)
          this.stackedBarOptions.series[0].data.push(element.available_ticket)
          this.stackedBarOptions.series[1].data.push(element.capacity - element.available_ticket)
        }
      });
    },
    getEventList() {
      service.getAllEvent().then(
        result => {
          if (!result.data.status) {
            this.events = result.data;
          }
        }, error => {})
    },
    getAllTicketStatics() {
      service.getAllTicketStatics().then(
        result => {
          if (!result.data.status) {
            this.ticketsStatics = result.data;
          }
          console.log(this.ticketsStatics);
        }, error => {})
    },
  },
  mounted(){
    this.getEventList();
    this.getAllTicketStatics();
    this.stackedBarOptions.series[0].data = [100, 200, 500];
    this.stackedBarOptions.series[1].data =[100, 180, 250];
    this.$forceUpdate();
  }
}
</script>

<style >
.my-card{
  width: '100%',
  max-width '300px'
}
  
</style>
<style scoped>
  .blue_dark {
    background-color: #082f56;
  }

  .green_dark {
    background-color: #084a0b;
  }

  .orange_dark {
    background-color: #64350e;
  }
</style>