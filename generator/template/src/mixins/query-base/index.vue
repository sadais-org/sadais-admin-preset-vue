<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Base'
})
export default class extends Vue {
  // 缓存路由的时候，如果配置了handleQuery，则会自动触发
  activated() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that: any = this
    this.$nextTick(() => {
      that.handleQuery && that.handleQuery()
    })
  }
}
</script>
