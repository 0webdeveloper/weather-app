<template>
    <div class="list">
        <sortable
            v-for="(item, index) in listData"
                  v-model="dragData"
            :key="item.id"
            :index="index"
            drag-direction="vertical"
            replace-direction="vertical"

            @sortend="sortend($event, listData)"

            @real-click="click"
        >
            Item {{ item.name }}
        </sortable>
    </div>
</template>

<script>
import Sortable from 'vue-drag-sortable'

export default {
    components: {
        Sortable
    },
    data () {
        return {
            dragData: {},
            listData: this.$store.getters.get_weather
        };
    },
    methods: {
        click (e) {
            console.log(e.target)
        },
        sortend (e, list) {
            const { oldIndex, newIndex } = e
            this.rearrange(list, oldIndex, newIndex)
        },
        rearrange (array, oldIndex, newIndex) {
            if (oldIndex > newIndex) {
                array.splice(newIndex, 0, array[oldIndex])
                array.splice(oldIndex + 1, 1)
            }
            else {
                array.splice(newIndex + 1, 0, array[oldIndex])
                array.splice(oldIndex, 1)
            }
        }
    }
}
</script>

<style>
.list {
    width: 300px;
    height: 400px;
    overflow: auto;
    background: lightslategray;
    position: relative;
    padding: 5px;
}
/* dragging item will be added with a `dragging` class */
/* so you can use this class to define the appearance of it */
.list > *.dragging {

    /*box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);*/
}
.drag-sortable {
    margin-bottom: 20px;
    position: relative;
    cursor: pointer;
    padding: 16px 35px;
    background: #fff;
    width: 100%;
}
</style>