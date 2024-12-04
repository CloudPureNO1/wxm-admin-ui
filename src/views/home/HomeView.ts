import { ref } from 'vue'
import { useGetImageUrl } from '../../composable/staticImgUtil'
const src = ref<string>('')
src.value = useGetImageUrl('9.gif')
export const init = () => {
  return { src }
}
