<template>
    <div class="weather-card">
        <svg
         class="gear-menu"
         @click="showSettings"
         width="800px" height="800px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" id="Editable-line" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="16" cy="16" fill="none" id="XMLID_224_" r="4" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><path d="  M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2  c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732  c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732  l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2  c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732  c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z  " fill="none" id="XMLID_242_" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></svg>

        <h2 class="weather-card__title">{{ city.name }}, {{city.country}}</h2>
        <h4> {{timestamp}} - {{ dataToday }}</h4>
        <div class="weather-card__body">
            <img
                :src="'http://openweathermap.org/img/wn/' + city.icon + '@4x.png'" alt=""
                class="weather-body__icon"
            >
            <p class="weather-body__temp">{{ Math.round(city.temp) }}°C</p>
        </div>
        <p class="weather-body__feels-like">
            Feels like <b>{{ city.feels_like }}°C</b>
        </p>
        <p class="weather-body__status">{{ city.description }}</p>

        <p class="">Humidity - <b>{{ city.humidity }}</b></p>
        <p>Wind speed - <b>{{ city.wind }}</b></p>

      <transition name="fade">
        <card-settings
            class="card-settings"
            v-if="isVisible"
            @delete_card="delete_card"
            @closeSetting="showSettings"/>
      </transition>
    </div>

</template>

<script>
import CardSettings from '@/components/CardSettings.vue'
export default {
    name: "Widget",
    data() {
        return {
          isVisible: false,
          dataToday: '',
          timestamp: ''
        }
    },
    components: {CardSettings},
    props: {
        city: {
            type: Object
        }
    },
    methods: {
      showSettings() {
        this.isVisible = !this.isVisible;
      },
      delete_card(id) {
        this.$store.commit('weather/remove_city', id);
      },
      getDayOfWeek() {
        const weekDays = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ]
        return weekDays[new Date().getDay()]
      },
      getNow() {
        const date = new Date()
        const result = date.toLocaleDateString({
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        this.timestamp = result;
      }
    },
  mounted() {
    this.dataToday = this.getDayOfWeek();
    this.getNow();
  }
}
</script>

<style scoped lang="scss">
.weather-card {
    background-color: #fff;
    position: relative;
    overflow: hidden;
    margin-top: 50px;
    flex: 1 1 0;
    padding: 30px 20px;
    border-radius: 10px;
    box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px 0 rgba(0,0,0,0.20);
    min-height: 450px;
    &__title {
        margin-top: 25px;
        font-size: 2.2rem;
        font-weight: 900;
    }
    &__body {
        display: flex;
        align-items: center;
    }
}
.weather-body__icon {
    width: 50%;
}
.weather-body__temp {
    font-family: 'Oswald', sans-serif;
    font-size: 3.5rem;
    white-space: nowrap;
    font-weight: 500;
}
.gear-menu {
    width: 100%;
    max-height: 25px;
    max-width: 25px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    transition: transform .3s ease-in-out;
    &:hover{
        transform: rotate(30deg);
    }
}
.card-settings {
    position: absolute;
    top:0;
    right:0;
    width: 100%;
    height: 100%;
}
// animation for <transition>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>