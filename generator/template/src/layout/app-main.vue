<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- 编辑页面不缓存 ，最多缓存20个实例-->
      <keep-alive :max="20" :include="cachedViews">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'

@Component({
  name: 'AppMain'
})
export default class extends Vue {
  private get cachedViews() {
    return AppModule.cachedViews
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  overflow: hidden;
  padding-top: 12px;
  background: $body-bg;
}
</style>
