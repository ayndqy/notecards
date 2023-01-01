import type { Action } from 'svelte/action'
import autosize from 'autosize'

export const autoSize: Action = (node) => {
  const autosizedElement = autosize(node)

  return {
    destroy: () => autosize.destroy(autosizedElement),
  }
}
