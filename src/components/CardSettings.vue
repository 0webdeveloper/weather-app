<template>
  <div class="settings">
    <div class="settings__header">
      <h4>Settings</h4>
      <svg
        @click="$emit('closeSetting')"
        class="settings__close"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
        ></path>
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
    >
      <svg
        class="settings__bars"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.166a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
        ></path>
      </svg>

      <p>{{ item.name }}</p>

    <svg 
    @click="delete_card(item.id, index)"
        class="settings__trash"
    fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
    </svg>
    </sortable>
    <transition name="fade">
      <div class="settings__footer" v-if="watch_city_length !== 3">
        <p>Add location:</p>
        <widget-input @closeSettings="$emit('closeSetting')" />
      </div>
    </transition>
  </div>
</template>

<script>
import Sortable from 'vue-drag-sortable'
import WidgetInput from '@/components/Widget-input.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Sortable,
    WidgetInput,
  },
  data() {
    return {
      dragData: {},
    }
  },
  computed: {
    ...mapGetters({
      listData: 'weather/get_weather',
      watch_city_length: 'weather/watch_city_length',
    }),
  },
  methods: {
    sortend(e, list) {
      const { oldIndex, newIndex } = e
      this.rearrange(list, oldIndex, newIndex)
    },
    rearrange(array, oldIndex, newIndex) {
      if (oldIndex > newIndex) {
        array.splice(newIndex, 0, array[oldIndex])
        array.splice(oldIndex + 1, 1)
        this.$store.commit('weather/reorder_city', array)
      } else {
        array.splice(newIndex + 1, 0, array[oldIndex])
        array.splice(oldIndex, 1)
        this.$store.commit('weather/reorder_city', array)
      }
    },
    delete_card(id, index) {
      this.listData.splice(index, 1)
      this.$emit('delete_card', id)
    },
  },
}
</script>

<style scoped lang="scss">
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
    width: 20px;
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
  width: calc(100% - 30px);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
