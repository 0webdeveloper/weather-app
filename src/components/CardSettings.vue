<template>
    <div class="settings">
        <div class="settings__header">
            <h4>Settings</h4>
            <svg
                @click="$emit('closeSetting')"
                class="settings__close"
                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
            </svg>
        </div>
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

            <img
                :src="require('@/assets/images/Bars4.svg')" alt=""
                class="settings__bars"
            >
             <p>{{ item.name }}</p>
                <img
                    :src="require('@/assets/images/trash.svg')" alt=""
                    @click="$emit('delete_card', item.id)"
                    class="settings__trash"
                >

        </sortable>
        <div class="settings__footer">
            <p>Add location:</p>
            <widget-input />
        </div>
    </div>
</template>

<script>
import Sortable from 'vue-drag-sortable'
import WidgetInput from "@/components/Widget-input.vue";

export default {
    components: {
        Sortable,
        WidgetInput
    },
    data () {
        return {
            dragData: {},
            listData: this.$store.getters.get_weather
        };
    },
    methods: {
        click (e) {

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

<style lang="scss">
.settings {
    width: 300px;
    height: 400px;
    overflow: auto;
    background: #fff;
    position: relative;
    padding: 15px;
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__close {
        width: 25px;
        cursor: pointer;
        &:hover {
            color: #cc0000;
        }
    }
    &__bars {
        width: 15px;
        margin-right: 15px;
    }
    &__trash {
        width:20px;
        margin-left: auto;
        cursor: pointer;
    }
    &__footer {
        margin-top: 40px;
        text-align: left;
        p {
            font-weight: bold;
            font-size: 13px;
        }
    }
}

.settings > *.dragging {
}
.drag-sortable {
    margin-top: 20px;
    position: relative;
    cursor: pointer;
    padding: 7px 10px;
    text-align: left;
    background: #f5f5f5;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>