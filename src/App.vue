<template>
    <div id="app">
        <div class="container" >
            <div v-if="!isLoad">
                     <h1>Виджет погоды</h1>
            </div>
            <div v-else>
                <h1>Идет загрузка .....</h1>
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

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    line-height: 2;
}
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}
.container-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
}
</style>
