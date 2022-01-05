<template>
  <div class="pagination-container">
    <el-pagination
      :small="small"
      :background="background"
      :current-page.sync="syncedPageNo"
      :page-size.sync="syncedPageSize"
      :layout="layout"
      :page-sizes="pageSizesOptions"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync } from 'vue-property-decorator'

@Component({
  name: 'Pagination'
})
export default class extends Vue {
  @PropSync('pageNo', { type: Number, default: () => 1 })
  syncedPageNo!: number
  @PropSync('pageSize', { type: Number, default: () => 10 })
  syncedPageSize!: number
  @Prop({ required: true }) private total!: number
  @Prop({ default: () => [10, 20, 50, 100] }) private pageSizes!: number[]
  @Prop({ default: 'total, sizes, prev, pager, next' }) private layout!: string
  @Prop({ default: false }) private small!: boolean
  @Prop({ default: true }) private background!: boolean
  @Prop({ default: true }) private autoScroll!: boolean

  get pageSizesOptions() {
    if (this.pageSizes.includes(this.syncedPageSize)) {
      return this.pageSizes
    }
    return [this.syncedPageSize, ...this.pageSizes].sort((a, b) => a - b)
  }

  handleSizeChange() {
    this.$emit('pagination')
  }

  handleCurrentChange() {
    this.$emit('pagination')
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  padding-top: 16px;
  text-align: right;
  background: #ffffff;
  ::v-deep .el-pagination {
    font-weight: 400;
    li {
      border-radius: 6px;
    }
  }
}
</style>
