/**
 * 加载图片资源方法，
 * 外部定位的要定位到src目录下 ：../../src/assets/img/9.gif  js 中
 * Vue界面中写的：可以相对定位 ： ../../../assets/img/9.gif
 */
// 打包时资源不能打包进去
// export const useLoadImg = (path: string) => {
//   return new URL(path, import.meta.url).href
// }

/**
 * 加载图片资源方法，
 * 外部定位的要定位到src目录下 ：../../src/assets/img/9.gif  js 中
 * Vue界面中写的：可以相对定位 ： ../../../assets/img/9.gif
 * @param fileName
 * @param dir
 * @returns
 */
export const useGetImageUrl = (fileName: string, dir?: string): string => {
  if (dir == null || dir === undefined) dir = 'img'
  // return new URL(`../src/assets/${dir}/${fileName}`, import.meta.url).href
  // const t = new URL(`@/assets/${dir}/${fileName}`, import.meta.url).href
  // const t1 = new URL(`../assets/${dir}/${fileName}`, import.meta.url).href
  // console.log('>>>>>>t,t1>>>', t, t1)
  // debugger
  // return t1
  return new URL(`../assets/${dir}/${fileName}`, import.meta.url).href

  // return new URL(`${href}`, import.meta.url).href         这种打包的时候，会取扫码太多东西，可能会报错：  [vite:import-glob] EPERM: operation not permitted, scandir 'M:\System Volume Information'
  // return new URL(`../../assets/${dir}/${fileName}`, import.meta.url).href
}

