
<template>
    <div class="tinymce-box">
        <editor id="tinymce" v-model="tinymceHtml" :init="init" />
    </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'

  import { useBlobToBase64 } from '../../../composable/FileConversion'

  import tinymce from 'tinymce/tinymce'
  import 'tinymce/models/dom' // 特别注意 tinymce 6.0.0 版本之后必须引入，否则不显示
  import 'tinymce/themes/silver/theme'
  import Editor from '@tinymce/tinymce-vue' // 引入组件
  import 'tinymce/icons/default'
  // 都是富文本插件
  // import "tinymce/plugins/image";
  // import "tinymce/plugins/preview";
  // import "tinymce/plugins/media";
  // import "tinymce/plugins/link";
  // import "tinymce/plugins/code";
  // import "tinymce/plugins/table";
  // import "tinymce/plugins/lists";
  // import "tinymce/plugins/wordcount";
  // import "tinymce/plugins/fullscreen";
  // import "tinymce/plugins/emoticons";
  import 'tinymce/plugins/advlist' // 高级列表
  import 'tinymce/plugins/anchor' // 锚点
  import 'tinymce/plugins/autolink' // 自动链接
  import 'tinymce/plugins/autoresize' // 编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
  import 'tinymce/plugins/autosave' // 自动存稿
  import 'tinymce/plugins/charmap' // 特殊字符
  import 'tinymce/plugins/code' // 编辑源码
  import 'tinymce/plugins/codesample' // 代码示例
  import 'tinymce/plugins/directionality' // 文字方向
  import 'tinymce/plugins/emoticons' // 表情
  //   import 'tinymce/plugins/fullpage'; //文档属性
  import 'tinymce/plugins/fullscreen' // 全屏
  import 'tinymce/plugins/help' // 帮助
  // import 'tinymce/plugins/hr' // 水平分割线
  import 'tinymce/plugins/image' // 插入编辑图片
  import 'tinymce/plugins/importcss' // 引入css
  import 'tinymce/plugins/insertdatetime' // 插入日期时间
  import 'tinymce/plugins/link' // 超链接
  import 'tinymce/plugins/lists' // 列表插件
  import 'tinymce/plugins/media' // 插入编辑媒体
  import 'tinymce/plugins/nonbreaking' // 插入不间断空格
  import 'tinymce/plugins/pagebreak' // 插入分页符
  //   import 'tinymce/plugins/paste'; //粘贴插件
  import 'tinymce/plugins/preview' // 预览
  // import 'tinymce/plugins/print' // 打印
  import 'tinymce/plugins/quickbars' // 快速工具栏
  import 'tinymce/plugins/save' // 保存
  import 'tinymce/plugins/searchreplace' // 查找替换
  // import 'tinymce/plugins/spellchecker'  //拼写检查，暂未加入汉化，不建议使用
  //   import 'tinymce/plugins/tabfocus'; //切入切出，按tab键切出编辑器，切入页面其他输入框中
  import 'tinymce/plugins/table' // 表格
  import 'tinymce/plugins/template' // 内容模板
  //   import 'tinymce/plugins/textcolor'; //文字颜色
  // import 'tinymce/plugins/textpattern' // 快速排版
  //   import 'tinymce/plugins/toc'; //目录生成器
  import 'tinymce/plugins/visualblocks' // 显示元素范围
  import 'tinymce/plugins/visualchars' // 显示不可见字符
  import 'tinymce/plugins/wordcount' // 字数统计
  // 以上所有的样式在 node_modules 下面 tinymce 里面的 plugins 都能找到。
  const tinymceHtml = ref('请输入内容')
  const editorCurrent = ref<any>()
  const init = {
    // 初始化数据
    emoticons_database_url: '/emoticons/js/emojis.js', // 更改表情插件路径
    language_url: '/langs/zh-Hans.js', // 引入语言包（该语言包在public下，注意文件名称）
    language: 'zh-Hans', // 这里名称根据 zh-Hans.js 里面写的名称而定
    skin_url: '/skins/ui/oxide', // 这里引入的样式
    height: 600, // 限制高度
    plugins:
      "'print preview searchreplace autolink directionality emoticons visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave ", // 富文本插件
    toolbar:
      'MyFile MyCardBtn | bold italic underline strikethrough forecolor backcolor  link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat |  table image media charmap emoticons hr pagebreak insertdatetime print preview | code selectall | indent2em lineheight formatpainter axupimgs|cut copy paste pastetext |fullscreen undo redo restoredraft',

    setup: function (editor:any) {
      // 注册一个icon
      editor.ui.registry.addIcon(
        'my-shopping-cart',
        `<svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg>`
      )

      // 注册一个自定义的按钮
      editor.ui.registry.addButton('MyCardBtn', {
        icon: `my-shopping-cart`,
        onAction: function () {
          // that.isShowCard = true
          // that.editor = editor
        }
      })
      // 注册一个自定义的按钮
      editor.ui.registry.addButton('MyFile', {
        text: `附件`,
        onAction: function () {
          // that.isShowCard = true
          // that.editor = editor
          editorCurrent.value = editor

          console.log(editorCurrent, editor)
        }
      })
    },
    branding: false, // //是否禁用“Powered by TinyMCE”
    menubar: true, // 顶部菜单栏显示
    statusbar: true, // 最下方的元素路径和字数统计那一栏是否显示
    fontsize_formats:
      '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', // 字体大小
    font_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',

    // paste_convert_word_fake_lists: false, // 插入word文档需要该属性
    paste_webkit_styles: 'all',
    paste_merge_formats: true,
    nonbreaking_force_tab: false,
    paste_auto_cleanup_on_paste: false,
    file_picker_types: 'file',
    content_css: '/skins/content/default/content.css', // 以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
    // 图片上传
    images_upload_handler: (blobInfo:any) => new Promise((resolve, reject) => {
      if (blobInfo.blob().size / 1024 / 1024 > 122) {
        reject({ message: '上传失败，图片大小请控制在 2M 以内', remove: true })
        return
      } else {
        resolve(useBlobToBase64(blobInfo.blob()))
        // const ph = import.meta.env.VITE_BASE_PATH + ":" + import.meta.env.VITE_SERVER_PORT + "/"
        // let params = new FormData()
        // params.append('file', blobInfo.blob())

        // let config = {
        //     headers: {
        //         "Content-Type": "multipart/form-data",

        //     }
        // }

        // axios.post('xxxx', params, config).then(res => {
        //     if (res.data.code == 200) {
        //         resolve(ph + res.data.msg)  //上传成功，在成功函数里填入图片路径
        //     } else {
        //         reject('HTTP Error: 上传失败' + res.data.code);
        //         return
        //     }
        // }).catch(() => {
        //     reject('上传出错，服务器开小差了呢')
        //     return
        // })
      }
    }),

    // 文件上传
    file_picker_callback: (callback:Function, value:any, meta:any) => {
      // Provide file and text for the link dialog
      if (meta.filetype === 'file') {
        callback('mypage.html', { text: 'My text' })
      }

      // Provide image and alt text for the image dialog
      if (meta.filetype === 'image') {
        callback('myimage.jpg', { alt: 'My alt text' })
      }

      // Provide alternative source and posted for the media dialog
      if (meta.filetype === 'media') {
        callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' })
      }
    }
  }
  onMounted(() => {
    tinymce.init({}) // 初始化富文本
  })
</script>

