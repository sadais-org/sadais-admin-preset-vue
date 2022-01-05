<!--
 * @Author: zhangzhenfei
 * @Date: 2021-12-15 10:27:09
 * @LastEditTime: 2021-12-15 10:29:10
 * @LastEditors: zhangzhenfei
 * @Description: 
 * @FilePath: /sadais-admin/src/layout/components/side-bar/sidebar-item-link.vue
-->
<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isExternal } from '@/utils/validate'
@Component({
  name: 'SidebarItemLink'
})
export default class extends Vue {
  @Prop({ required: true }) private to!: string
  private isExternal = isExternal
}
</script>
