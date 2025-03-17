import IMask from 'imask'
import type { DirectiveBinding } from '@vue/runtime-core'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const inputEl = el.querySelector('input') || el
    IMask(inputEl, binding.value)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const inputEl = el.querySelector('input') || el
    IMask(inputEl, binding.value)
  }
}
