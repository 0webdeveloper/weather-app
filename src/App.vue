<template>
    <div id="app">
        <div class="container" >
            <div v-if="!isLoad">
                <h2 class="widget-title">Виджет погоды</h2>
            </div>
            <div v-else>
                <h2 class="widget-title">Идет загрузка .....</h2>
            </div>

        <div class="container-cards">
        <widget
            v-for="city in get_weather"
            :key="city.id"
            :city="city"
            />
        </div>
        </div>
    </div>
</template>

<script>
import Widget from "@/components/Widget.vue";
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'App',
    components: {
        Widget
    },
    computed: {
        ...mapState({
            isLoad: state => state.weather.isLoad,
        }),
        ...mapGetters({
            get_weather: 'weather/get_weather'
        })
    },
    methods: {
        ...mapActions({
            fetch_forecast: 'weather/fetch_forecast',
            fetch_coords: 'weather/fetch_coords'
        })
    },
    async mounted() {
        await this.fetch_coords();
        await this.fetch_forecast();
    }
}
</script>

<style scoped lang="scss">
.widget-title {
    font-size: 2rem;
    font-weight: 700;
}
.container-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
}
</style>
