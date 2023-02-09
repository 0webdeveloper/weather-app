<template>
    <div class="weather-card">
        <img
            :src="require('@/assets/images/gear.svg')"
            class="gear-menu" alt=""
            @click="showSettings"
        />

        <h2 class="weather-card__title">{{ city.name }}, {{city.country}}</h2>

        <div class="weather-card__body">
            <img
                :src="'http://openweathermap.org/img/wn/' + city.icon + '@2x.png'" alt=""
                class="weather-body__icon"
            >
            <p class="weather-body__temp">{{ Math.round(city.temp) }}°C</p>
        </div>
        <p class="weather-body__feels-like">
            Feels like {{ city.feels_like }}°C
        </p>
        <p class="weather-body__status">{{ city.description }}</p>

        <p class="">Humidity {{ city.humidity }}</p>
        <p>Wind speed{{ city.wind }}</p>

        <card-settings
            class="card-settings"
            v-if="isVisible"
            @delete_card="delete_card"
            @closeSetting="showSettings"/>
    </div>
</template>

<script>
import CardSettings from '@/components/CardSettings.vue'

export default {
    name: "Widget",
    data() {
        return {
            isVisible: false,
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
            this.$store.commit('remove_city', id);
        }
    }
}
</script>

<style scoped lang="scss">
.weather-card {
    width: 300px;
    position: relative;
    overflow: hidden;
    margin-top: 50px;
    flex: 1 1 0;
    padding: 30px 20px;
    border-radius: 10px;
    box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px 0 rgba(0,0,0,0.20);
    &__title {
        margin-top: 25px;
    }
    &__body {
        display: flex;
        align-items: center;
    }
}
.weather-body__icon {
    width: 100%;
}
.weather-body__temp {
    font-size: 3.5rem;
    white-space: nowrap;
    font-weight: 600;
}
.gear-menu {
    max-width: 25px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
}
.card-settings {
    position: absolute;
    top:0;
    right:0;
    width: 100%;
    height: 100%;
}
</style>