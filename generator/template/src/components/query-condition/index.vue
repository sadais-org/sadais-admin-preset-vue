<template>
  <div class="query-condition">
    <div ref="condition" class="condition pi-flex" :style="[conditionStyle]">
      <div class="pi-flex-sub">
        <slot />
      </div>
      <div v-if="showToogleBtn">
        <el-button @click="handleToogleBtnClick">{{ btnText }}</el-button>
      </div>
    </div>
    <div v-if="$slots.btns" class="condition-footer pi-solid-top-1">
      <slot name="btns"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'

const TAG = 'QueryCondition'
let timer: any = null

@Component({
  name: TAG
})
export default class extends Vue {
  @PropSync('expand', { type: Boolean }) syncedExpand!: boolean

  @Prop({ type: String, default: '.el-form-item', required: false })
  private targetRowExpression!: string // 最小行高获取表达式

  private rowHeight = 33 // 行高度
  private conditionHeight = 0 // 条件区域高度

  get btnText() {
    return this.syncedExpand ? '收起' : '展开'
  }

  get showToogleBtn() {
    return this.conditionHeight > this.rowHeight
  }

  get conditionStyle() {
    const style: any = {}
    if (this.syncedExpand && this.conditionHeight) {
      style.maxHeight = this.conditionHeight + 'px'
    }
    if (!this.syncedExpand && this.rowHeight) {
      style.maxHeight = this.rowHeight + 'px'
    }
    return style
  }

  mounted() {
    this.syncConditionHeight()
  }

  syncConditionHeight() {
    const condition = this.$refs.condition as Element
    // 计算rowHeight
    const row = condition.querySelector(this.targetRowExpression) as Element
    if (row) {
      clearTimeout(timer)
      timer = null

      if (!condition || !condition.scrollHeight) return
      // 容器高度
      const conditionHeight = condition.scrollHeight
      this.conditionHeight = conditionHeight
      const rowStyle = getComputedStyle(row)
      const marginTop = parseInt(rowStyle.marginTop.replace('px', ''))
      const marginBottom = parseInt(rowStyle.marginBottom.replace('px', ''))
      this.rowHeight = row.scrollHeight + marginTop + marginBottom
    } else {
      timer = setTimeout(() => {
        this.syncConditionHeight()
      }, 200)
    }
  }

  handleToogleBtnClick() {
    this.syncConditionHeight()
    this.syncedExpand = !this.syncedExpand
  }
}
</script>

<style lang="scss" scoped>
.query-condition {
  padding: 12px;
  margin-bottom: 12px;
  background-color: #ffffff;

  .condition {
    overflow: hidden;
    transition: all ease-in-out 0.3s;
  }
  .condition-footer .el-button {
    margin-top: 10px;
    margin-bottom: 0;
  }
}
</style>
