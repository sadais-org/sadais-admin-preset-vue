/* eslint-disable */
export const keepScroll = {
  bind() {
    var oldAttached = void 0
    // @ts-ignore
    console.log(this.el)
    // @ts-ignore
    this.el.addEventListener('scroll', function (e) {
      var ele
      ele = void 0
      ele = e.target
      return ele.setAttribute(
        'data-vuescrlpos',
        ele.scrollLeft + '-' + ele.scrollTop
      )
    })
    // @ts-ignore
    oldAttached = this.vm.attached
    // @ts-ignore
    this.vm.attached = function () {
      // @ts-ignore
      var args, ele, i, len, ref, ref1
      args = void 0
      ele = void 0
      i = void 0
      len = void 0
      ref = void 0
      ref1 = void 0
      args = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : []
      ref = this.$el.querySelectorAll('[data-vuescrlpos]')
      if (ref.length > 0) {
        i = 0
        len = ref.length
        while (i < len) {
          ele = ref[i]
          ref1 = ele.getAttribute('data-vuescrlpos').split('-')
          ele.scrollLeft = ref1[0]
          ele.scrollTop = ref1[1]
          i++
        }
      } else if (this.$el.hasAttribute('data-vuescrlpos')) {
        ref1 = this.$el.getAttribute('data-vuescrlpos').split('-')
        this.$el.scrollLeft = ref1[0]
        this.$el.scrollTop = ref1[1]
      }
      if (oldAttached !== void 0) {
        // @ts-ignore
        oldAttached.call.apply(
          oldAttached,
          [this].concat(Array.prototype.slice.call(args))
        )
      } else {
        void 0
      }
    }
    // @ts-ignore
    this.vm.$on('hook:attached', this.vm.attached)
  }
}
