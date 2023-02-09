<template>
    <div id="app">
        <div class="container">
        <h1>name count {{get_weather.length}} /  weather count{{get_weather.length}}</h1>
        <div class="container-cards">
        <widget
            v-for="city in get_weather"
            :key="city.id"
            :city="city"
            />

            <!-- <Board id="board-1">
                <Card
                    v-for="card in sortList"
                    :id=card.id
                    :key="card.id"
                    draggable="true"
                >
                    <p>{{card.name}}</p>
                </Card>
            </Board> -->
        </div>
        </div>
    </div>
</template>

<script>
import Widget from "@/components/Widget.vue";
import {mapGetters, mapActions} from 'vuex'
// import Board from '@/components/Board.vue';
// import Card from '@/components/Card.vue'



export default {
    name: 'App',
    // data() {
    //     return {
    //         sortList:[
    //             {id: 1, name:'Card one'},
    //             {id: 2, name:'Cart two'},
    //             {id: 3, name:'Card three'}
    //         ]
    //     }
    // },
    components: {
        Widget,
        // Card,
        // Board,
        // Sort
    },
    computed: {
        ...mapGetters(['get_weather', 'watch_warning'])
    },
    methods: {
        ...mapActions(['fetch_forecast', 'fetch_coords'])
    },
    async mounted() {

    },
    async beforeMount() {
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
body {
    line-height: 1.5;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
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
