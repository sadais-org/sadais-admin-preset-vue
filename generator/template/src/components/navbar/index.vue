<template>
  <div class="nav pi-justify-between pi-align-center">
    <div class="nav-title">{{ title }}</div>
    <div>
      <el-button @click="handleNaviBack">{{ backTitle }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'NavBar'
})
export default class extends Vue {
  @Prop({ type: String, default: '', required: false }) private title!: string
  @Prop({ type: String, default: '返回', required: false })
  private backTitle!: string
  @Prop({ type: Function, required: false }) private customBackFunc!: () => void

  handleNaviBack() {
    if (this.customBackFunc && typeof this.customBackFunc === 'function') {
      this.customBackFunc()
    } else {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  padding: 12px;
  background: #ffffff;
  .nav-title {
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
