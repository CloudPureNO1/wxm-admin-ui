<template>
    <div class="header" @dblclick="layoutStore.toggleFullScreen">
        <div v-if="layoutStore.isVertical"
            :class="{ 'header-btn': layoutStore.isVertical, 'header-btn__padding': layoutStore.isVertical && layoutStore.isHeaderMain }">
            <!-- 菜单折叠 -->
            <div v-if="layoutStore.collapse" class="fold-expand" @click="collapseChange">
                <svg-icon name="expand" class="icon-svg" />
            </div>
            <div v-else class="fold-expand" @click="collapseChange">
                <svg-icon name="fold" class="icon-svg" />
            </div>
            <!-- 系统标题 水平-->
            <div v-if="layoutStore.isHeaderMain" class="title"> {{ $t('SYSTEM_NAME') }}</div>
            <!-- 面包屑 -->
            <wxm-bread-crumb v-if="!layoutStore.isHeaderMain" class="bread-crumb" />
            <div else class="title">&nbsp;</div>
        </div>
        <!-- 系统标题 水平-->
        <div v-if="!layoutStore.isVertical" class="header-title">{{ $t('SYSTEM_NAME') }}</div>
        <!-- 菜单 水平 -->
        <wxm-menu v-if="!layoutStore.isVertical" key="header-menu" class="header-menu" />
        <div class="header-right">
            <!-- 全屏 -->
            <div class="dark item" @click="layoutStore.toggleFullScreen">
                <template v-if="!layoutStore.fullScreen">
                    <svg-icon name="full-screen" class="icon-svg" />
                </template>
                <template v-else>
                    <svg-icon name="full-screen-exit" class="icon-svg" />
                </template>
            </div>
            <!-- 国际化 -->
            <!---element plus el-dropdown 默认中  2.2.34 样式有问题，且不支持自定义元素，采用2.2.30 支持

Dropdown-Menu Slots#
插槽名	说明	子标签
—	下拉菜单的内容	Dropdown-Item

            Dropdown 插槽#
插槽名	说明	子标签
—	下拉菜单的内容。 注意：必须是有效的 html DOM 元素（例如 <span>、<button> 等）或 el-component，以附加监听触发器	—
dropdown	下拉列表，通常是 <el-dropdown-menu> 组件	Dropdown-Menu

不支持自定义的组件，不采用
                                    -->
            <el-dropdown class="item">
                <svg-icon name="i18n" class="icon-svg" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="changeLocale('zh-cn')">
                            <svg-icon name="zh-cn" class="icon-svg" /><span style="margin-left:10px;">{{
        $t('Home.I18n.zhCn') }}</span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="changeLocale('en')">
                            <svg-icon name="en" class="icon-svg" /><span style="margin-left:10px;">{{ $t('Home.I18n.en')
                                }}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

            <el-dropdown class="item">
                <svg-icon name="font-size" class="icon-svg" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="changeSize('large')">
                            &nbsp;<svg-icon name="font-size-large" class="icon-svg" /><span style="margin-left:10px;">{{
        $t('Home.sizeLarge') }}</span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="changeSize('default')">
                            <svg-icon name="font-size-default" class="icon-svg" /><span style="margin-left:10px;">{{
        $t('Home.sizeDefault') }}</span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="changeSize('small')">
                            &nbsp;<svg-icon name="font-size-small" class="icon-svg" /><span style="margin-left:10px;">{{
        $t('Home.sizeSmall') }}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

            <!--   effect="customized"  el-dropdown 默认中  2.2.34 样式有问题，且不支持自定义元素，采用2.2.30 支持-->
            <!-- <el-tooltip effect="customized">
                <div class="item w-color"><svg-icon name="i18n" class="icon-svg" /></div>
                <template #content>
                    <ul>
                        <li @click="changeLocale('zh-cn')">
                            <svg-icon name="zh-cn" class="icon-svg" />
                            <span style="margin-left:10px;">{{ $t('Home.I18n.zhCn') }}</span>
                        </li>
                        <li @click="changeLocale('en')">
                            <svg-icon name="en" class="icon-svg" /><span style="margin-left:10px;">{{ $t('Home.I18n.en')
                            }}</span>
                        </li>

                    </ul>
                </template>
            </el-tooltip>

            <el-tooltip effect="customized">
                <div class="item"><svg-icon name="font-size" class="icon-svg" /></div>
                <template #content>
                    <ul>
                        <li @click="changeSize('large')">
                            &nbsp;<svg-icon name="font-size-large" class="icon-svg" /><span style="margin-left:10px;">{{
                                $t('Home.sizeLarge') }}</span>
                        </li>
                        <li @click="changeSize('default')">
                            <svg-icon name="font-size-default" class="icon-svg" /><span style="margin-left:10px;">{{
                                $t('Home.sizeDefault') }}</span>
                        </li>
                        <li @click="changeSize('small')">
                            &nbsp;<svg-icon name="font-size-small" class="icon-svg" /><span style="margin-left:10px;">{{
                                $t('Home.sizeSmall') }}</span>
                        </li>
                    </ul>
                </template>
            </el-tooltip> -->

            <!-- 暗夜模式 -->
            <div class="dark item" @click="useToggleDark()">
                <Moon v-if="isDark" class="icon item" />
                <Sunny v-else class="icon item" />
            </div>
            <el-dropdown :size="systemStore.size">
                <el-badge :value="12" class="badge-item" @click="showMsg">
                    <Bell class="bell-icon" />
                </el-badge>
            </el-dropdown>

            <!-- 头像 -->
            <div class="avatar-box" @click.prevent="handleUserCenter">
                <el-avatar :shape="shape" :size="systemStore.size" :fit="fit" :src="src" class="item avatar" />
            </div>

            <!-- 设置 -->
            <div class="drop-menu item">
                <el-dropdown :size="systemStore.size">
                    <el-icon class="item">
                        <Setting />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item icon="User">{{ $t('Home.personalCenter') }}</el-dropdown-item>
                            <el-dropdown-item icon="SwitchButton" @click="loginOut">{{ $t('Home.exit')
                                }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown :size="systemStore.size">
                    <el-icon class="item">
                        <CaretBottom />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="changeMode('horizontal')">
                                <svg-icon name="layout-01" /><span style="margin-left:10px;">{{
        $t('Home.Layout.topAndBottom') }}</span>
                            </el-dropdown-item>
                            <el-dropdown-item @click="layoutStore.changeLayout('header-main')">
                                <svg-icon name="layout-02" /><span style="margin-left:10px;">{{
        $t('Home.Layout.TopAndLeftAndRight') }}</span>
                            </el-dropdown-item>
                            <el-dropdown-item @click="layoutStore.changeLayout('aside-main')">
                                <svg-icon name="layout-02" /><span style="margin-left:10px;">{{
        $t('Home.Layout.LeftAndRight') }}</span>
                            </el-dropdown-item>
                            <el-dropdown-item @click="layoutStore.toggleShowTags">
                                <svg-icon name="switch-tags" /><span style="margin-left:10px;">{{ $t('Home.showTags')
                                    }}</span>
                            </el-dropdown-item>
                            <el-dropdown-item @click="layoutStore.changeMenuBgColor('')">
                                <svg-icon name="switch-tags" /><span style="margin-left:10px;">{{
        $t('Home.MenuColor.default') }}</span>
                            </el-dropdown-item>
                            <el-dropdown-item @click="layoutStore.changeMenuBgColor('#2c3e50')">
                                <svg-icon name="switch-tags" /><span style="margin-left:10px;">{{
        $t('Home.MenuColor.2c3e50') }}</span>
                            </el-dropdown-item>
                            <el-dropdown-item @click="layoutStore.changeMenuBgColor('#409eff')">
                                <svg-icon name="switch-tags" /><span style="margin-left:10px;">{{
                                    $t('Home.MenuColor.409eff') }}</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogVisible" title="" top="5vh" width="80%" :fullscreen="dialogFullscreen"
        :close-on-press-escape="false" :close-on-click-modal="false" class="datax-info-dialog">
        <template #header>
            <span v-if="dialogVisible">用户中心</span>
            <i style="float:right;margin-right:30px;" @click="dialogFullscreen = !dialogFullscreen">
                <el-icon>
                    <FullScreen />
                </el-icon>
            </i>
        </template>
        <el-card shadow="never">
            <WxmUserCenter v-if="dialogVisible" />
        </el-card>
    </el-dialog>
</template>

<script lang="ts" setup type="module">
//   import UserCenter from './UserCenter.vue'
  import { ref, provide } from 'vue'
  import type { Ref } from 'vue'

  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { useToggleDark, isDark } from '../../composable/dark'
  import { useGetImageUrl } from '../../composable/staticImgUtil'
  import { useLayoutStore } from '../../stores/layout'
  import { useSystemStore } from '../../stores/system'
  import Http from '../../util/axios/axios-util'
  import { useAlert } from '../../composable/commFn'

  const router = useRouter()
  const systemStore = useSystemStore()
  const changeLocale = (locale: string) => {
    systemStore.changeLocale(locale)
  }
  const changeSize = (sz: string) => {
    systemStore.changeSize(sz)
  }

  const layoutStore = useLayoutStore()
  const collapseChange = () => {
    layoutStore.toggleCollapse()
  }
  const changeMode = (mode: string) => {
    layoutStore.changeMode(mode)
  }

  const shape = ref<any>('circle')
  const fit = ref<any>('cover')
  const src: Ref<string> = ref('')  // 或者  const srt=ref<string>('')

  src.value = useGetImageUrl('9.gif')

  //   console.log('>>>>>>>>>avator：>>>>>>', src.value)

  const loginOut = () => {
    // 调用logout接口，退出登录
    // this.$router.push('/login')
    Http.post('/logout').then((resp: any) => {
      if (resp.data.code !== '0') {
        useAlert('退出登录失败：' + resp.data.message, 'error')
        return false
      }
      ElMessage({ type: 'success', message: resp.data.message })
      let keys = Object.keys(sessionStorage)
      if (keys.length > 0) {
        keys.forEach(key => sessionStorage.removeItem(key))
      }
      keys = Object.keys(localStorage)
      if (keys.length > 0) {
        keys.forEach(key => localStorage.removeItem(key))
      }
      router.push('/login')
    }).catch((err: any) => {
      useAlert('退出登录失败：' + err.message || err, 'error')
    })
  }

  const showMsg = () => {
    alert('message')
  }

  // 用户中心 对话框
  const handleUserCenter = () => {
    dialogVisible.value = true
  }
  const dialogVisible = ref<boolean>(false)
  const dialogFullscreen = ref<boolean>(false)
  const resetAvatarSrc = (url: string) => {
    src.value = url
  }
  const closeUserCenter = () => {
    dialogVisible.value = false
  }
  provide('resetAvatarSrc', resetAvatarSrc)
  provide('closeUserCenter', closeUserCenter)

</script>

<style scoped lang="scss">
/**菜单居右 */
.flex-grow {
    flex-grow: 1;
}

@mixin base {
    // line-height: var(--el-menu-item-height);
    padding: 5px 0;
    border-bottom: 1px solid var(--el-menu-border-color);
}

@mixin center {
    justify-content: center;
    align-items: center;
}

.header {
    display: flex;
    flex-direction: row;

    .fold-expand {
        display: flex;
        // width: 1em;
        // height: 1em;
        // color: var(--el-text-color-regular);
        // font-size: 1.5rem;

        &:hover {
            color: var(--el-color-primary)
        }
    }

    .title {
        align-items: center;
        justify-content: start;
        padding-left: 10px;
        font-size: 20px;
    }

    .header-btn {
        flex: 1;
        display: flex;
        align-items: center;

        @include base;
        font-size: 25px;
        cursor: pointer;

        padding-left: 10px;
    }

    .header-btn__padding {
        padding-left: var(--el-menu-base-level-padding);
    }

    .drop-menu {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 98%;
        padding: 0 10px 0 0;
    }

    .header-menu {
        //flex:1;
        overflow: hidden;
    }

    .header-right {
        // flex:1;
        display: flex;
        align-items: center;
        justify-content: end;
        padding-right: 10px;
        @include base;

        .avatar-box {
            display: flex;

            &:hover {

                // background: var(--el-color-primary);
                // box-shadow: 5px 5px 10px var(--el-text-color-regular);
                .avatar {
                    // &:hover{
                    //   zoom: 1.25;
                    // }

                    // &:hover,
                    // &:focus,
                    // &:active {
                    //   -webkit-transform: translateY(-5px);
                    //   transform: translateY(-5px);

                    //   &::before {
                    //     opacity: 1;
                    //     -webkit-transform: translateY(5px);
                    //     transform: translateY(5px);
                    //   }
                    // }
                    &:hover {
                        border-radius: 0;
                    }
                }
            }
        }

        .icon {
            width: 1em;
            height: 1em;
            // margin-right: 8px;
            color: var(--el-text-color-regular);
            font-size: 1.2rem;
        }

        .bell-icon {
            width: 1.25rem;
            height: 1.25rem;
            color: var(--el-text-color-regular);
            font-size: 1.2rem;

            &:hover {
                color: var(--el-color-primary)
            }
        }

        .dark {
            display: flex;
            @include center;
            color: var(--el-text-color-regular)
        }

        .item {
            padding: 0 10px;

            &:hover {
                color: var(--el-color-primary) !important;
            }
        }
    }

    .header-title {
        /* display: flex; */
        /* align-items: center; */
        /* justify-content: start; */

        display: flex;
        align-items: center;
        padding-left: 10px;
        // line-height: var(--el-menu-item-height);
        border-bottom: 1px solid var(--el-menu-border-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-grow: 1;
    }

    .badge-item {
        margin-right: 40px;
        cursor: pointer;
    }

    .bread-crumb {
        margin-left: 10px;
    }

    .icon-svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    .w-color {
        color: var(--el-text-color-regular);
    }

    :deep(.el-sub-menu__title) {
        display: flex;
        align-items: center;
        // height: var(--el-menu-item-height);
        height: 100% !important;
        //  line-height: var(--el-menu-item-height);
        line-height: 1 !important;
        font-size: var(--el-menu-item-font-size);
        color: var(--el-menu-text-color);
        padding: 0 var(--el-menu-base-level-padding);
        list-style: none;
        cursor: pointer;
        position: relative;
        transition: border-color var(--el-transition-duration), background-color var(--el-transition-duration), color var(--el-transition-duration);
        box-sizing: border-box;
        white-space: nowrap;
        padding-right: calc(var(--el-menu-base-level-padding) + var(--el-menu-icon-width));
    }
}
</style>

<style lang="scss">
@mixin wxm-ul {
    padding: 5px 0 !important;
    margin: 0 !important;
    background-color: var(--el-bg-color-overlay) !important;
    border: none !important;
    border-radius: var(--el-border-radius-base) !important;
    box-shadow: none !important;
    list-style: none !important;

}

@mixin wxm-li {
    align-items: center;
    white-space: nowrap;
    list-style: none;
    // line-height: 22px;
    padding: 5px 16px;
    margin: 0;
    font-size: var(--el-font-size-base);
    color: var(--el-text-color-regular);
    cursor: pointer;
    outline: 0;
}

.el-popper.is-customized {
    /* Set padding to ensure the height is 32px */
    padding: 5px 0;
    /* background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129)); */
    background: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color-light);
    box-shadow: var(--el-dropdown-menu-box-shadow);

    ul {
        @include wxm-ul();

        li {
            @include wxm-li();

            &:hover {
                color: var(--el-menu-active-color);
                background-color: var(--el-color-primary-light-9);
            }
        }
    }
}

.el-popper.is-customized .el-popper__arrow::before {
    /* background: linear-gradient(45deg, #b2e68d, #bce689); */
    right: 0;
    background: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color-light);
}
</style>
