import { useDark, useToggle } from '@vueuse/core'

export const isDark = useDark()
export const useToggleDark = useToggle(isDark)
