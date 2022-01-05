import debounce from 'lodash/debounce'

const attrName = "data-scroll-position";
export default {
  install(Vue) {
    Vue.directive("keep-scroll", {
      bind(el, binding, vnode) {
        // 兼容el-table，表格内滚动
        if(el.classList.contains('el-table')) {
          const elTableScroll = el.querySelector('.el-table__body-wrapper')
          elTableScroll && (el = elTableScroll)
        }
        // 监听滚动事件，记录滚动位置
        el.addEventListener("scroll", debounce(e => {
          e = e.target;
          e.setAttribute(attrName, e.scrollLeft + "-" + e.scrollTop);
        }, 50) , false);

        // 初始化滚动位置
        const restore = (el, attr) => {
          setTimeout(() => {
            // 设置延时，等待vue渲染完成
            attr = attr.split("-");
            el.scrollLeft = attr[0];
            el.scrollTop = attr[1];
          }, 50)
        };
        // https://github.com/mark-hahn/vue-keep-scroll/pull/4
        vnode.context.$on("hook:activated", () => {
          const refs = el.parentElement.querySelectorAll(`[${attrName}]`);
          [].forEach.call(refs, ref => {
            const attr = ref.getAttribute(attrName);
            attr && restore(ref, attr);
          });
        });
      }
    });
  }
};