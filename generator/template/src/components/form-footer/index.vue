<template>
  <div class="form-footer pi-solid-top-1" :style="{ height: height }">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'FormFooter'
})
export default class extends Vue {
  @Prop({ type: String, default: '56px', required: false })
  private height!: string
}
</script>

<style lang="scss" scoped>
.form-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background: #ffffff;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
