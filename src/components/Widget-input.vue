<template>
    <!-- <input class="weather-input" type="text" v-model.trim="city_name" @keydown="send_new_city"> -->
    <div class="widget-input-wrap">
        <input class="weather-input" type="text" v-model.trim="city_name" @keydown.enter="send_new_city">

        <img
            :src="require('@/assets/images/enter.svg')" alt=""
            class="enter-btn"
            @click="send_new_city"
        >
    </div>
</template>

<script>
export default {
    name: "Widget-input",
    data() {
        return {
            city_name: ''
        }
    },
    methods: {
        send_new_city(e) {
            // if (e.key == 'Enter' && this.city_name !== '') {
            if (this.city_name !== '') {
                this.$store.dispatch('set_new_city', this.city_name);
                this.city_name = '';
            }
        }
    }
}
</script>

<style scoped>
.widget-input-wrap {
    display: flex;
    align-items: center;
}
    .weather-input {
        display: block;
        width: 100%;
        padding: 10px;
        border: 1px solid #999;
        border-radius: 3px;
        margin: 5px auto;
        cursor: pointer;
    }
    .enter-btn {
        margin-left: 15px;
        max-width: 25px;
        cursor: pointer;
    }
</style>