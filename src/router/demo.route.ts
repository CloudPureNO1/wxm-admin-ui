const DemoRouter = [

  {
    path: 'demo',
    name: 'Demo',
    meta: { title: 'Menu.Demo.title', type: 'node' }, // 通过node 再面包屑中判断
    children: [
      {
        path: 'tinymce',
        name: 'Tinymce',
        component: () => import (/* webpackChunkName: "demo" */ '../views/demo/richEditor/TinyMCE.vue'),
        meta: { title: 'Menu.Demo.children.Tinymce.title' }
      },
      {
        path: 'imageCroppingMyself',
        name: 'ImageCroppingMyself',
        component: () => import (/* webpackChunkName: "demo" */ '../views/demo/img/ImageCroppingMyself.vue'),
        meta: { title: 'Menu.Demo.children.ImageCroppingMyself.title' }
      },
      {
        path: 'imageCropping',
        name: 'ImageCropping',
        component: () => import (/* webpackChunkName: "demo" */ '../views/demo/img/ImageCropping.vue'),
        meta: { title: 'Menu.Demo.children.ImageCropping.title' }
      },
      {
        path: 'qrcode',
        name: 'QrCode',
        component: () => import (/* webpackChunkName: "demo" */ '../views/demo/qrcode/QrCode.vue'),
        meta: { title: 'Menu.Demo.children.QrCode.title' }
      },
      {
        path: 'qrReader',
        name: 'QrReader',
        component: () => import (/* webpackChunkName: "demo" */ '../views/demo/qrcode/QrReader.vue'),
        meta: { title: 'Menu.Demo.children.QrReader.title' }
      },
      {
        path: 'jsonPretty',
        name: 'JsonPretty',
        component: () => import (/* webpackChunkName: "demo" */ '../views/demo/json/JsonPretty.vue'),
        meta: { title: 'Menu.Demo.children.JsonPretty.title' }
      },
      {
        path: 'opencv',
        name: 'OpenCV',
        component: () => import (/* webpackChunkName: "demo" */ '../views/demo/opencv/OpenCV.vue'),
        meta: { title: 'Menu.Demo.children.OpenCV.title', keepAlive: '0' }/** 0 ：false */
      },
      {
        path: 'opencv2',
        name: 'OpenCV2',
        component: () => import (/* webpackChunkName: "demo" */ '../views/demo/opencv/OpenCV2.vue'),
        meta: { title: 'Menu.Demo.children.OpenCV2.title', keepAlive: '0' }/** 0 ：false */
      }
    ]
  }

]

export default DemoRouter
