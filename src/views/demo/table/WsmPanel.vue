<template>
    <div class="wsm-panel">
        <div class="wsm-panel__box">
            <div class="header">
                <div class="title">
                    <span class="pad">
                        <span v-if="!isEmpty(props.title)">
                            <span class="icon">丨</span>
                            <span>{{ props.title }}</span>
                        </span>
                        <span v-if="!isEmpty(props.msg)" class="msg">{{ props.msg }}</span>
                        <!-- <el-popover v-if="!isEmpty(props.multiMsg)" :width="multiMsgWidth" placement="top-start">
                            <template #reference>
                                <el-icon class="multi-icon">
                                    <QuestionFilled style="color:#409eff;" />
                                </el-icon>
                            </template>
                            <span v-html="props.multiMsg"></span>
                        </el-popover> -->
                    </span>
                </div>
                <div class="btn">
                    <slot name="btn" class="el-button"> </slot>
                </div>
                <el-popover v-if="!isEmpty(props.multiMsg)" :width="multiMsgWidth" placement="top-start">
                    <template #reference>
                        <el-button type="primary" plain :icon="QuestionFilled" class="right-btn"></el-button>
                    </template>
                    <span v-html="props.multiMsg"></span>
                </el-popover>
            </div>
            <div class="search">
                <slot name="search"></slot>
            </div>
            <div class="body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
  import { QuestionFilled } from '@element-plus/icons-vue'
  import { isEmpty } from 'lodash'
  const props = defineProps({
    title: { type: String, default: '' },
    // 总金额=医保支付金额+自费金额
    msg: { type: String, default: '' },
    // 多行或者比较多的信息,可以是html原始
    multiMsg: { type: String, default: '' },
    multiMsgWidth: { type: Number, default: 500 }
  })

</script>
<style scoped lang="scss">
.wsm-panel {
    //background-color: #f5f7fa;
    overflow: hidden;
    color: #303133;

    .wsm-panel__box {
        // margin: 5px;
        // border-top: 1px solid #cecece;
        // border-bottom: 1px solid #cecece;
        border: 1px var(--el-border-color) var(--el-border-style);

        .header {
            background-color: var(--el-fill-color-light);
            padding: 5px 10px 5px 10px;

            display: flex;
            flex-direction: row;
            align-items: center;

            .title {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                // width: 100%;
                margin-right: 10px;

                .msg {
                    margin: 0 20px;
                    color: #3ca0f6;
                    font-weight: 500;
                }

                .multi-icon {
                    // margin-left: 20px;
                    font-weight: 500;
                }

                .multi-msg {
                    font-size: var(--el-font-size-base);
                    color: #F56C6C !important;
                }

                .pad {
                    padding: 1px;
                }
            }

            .btn {
                display: flex;
                align-content: center;
                width:100%;
                // width:auto;
                flex: 1;
                // padding: 0 0 0 1rem;
            }

            span {
                font-size: var(--el-font-size-base);
                font-weight: 700;
                color: #3ca0f6;
            }

            .icon {
                color: #3ca0f6;
            }

            .border-line {
                border-bottom: 2px solid #cecece;
                padding: 5px;
            }

            .right-btn {
                margin-left: 0 !important;
                border-radius: 0 !important;

                // &:first-of-type{
                //     border-right:0 !important;
                // }
                &:first-of-type {
                    border-right: 1px solid var(--el-color-primary-light-5) !important;
                    border-left: 0 !important;
                }

                // &:not(:first-of-type) {
                //     //color:red !important;
                //     border-left: 0 !important;
                // }
            }
        }

        .search {
            padding: 5px 10px 5px 10px;
        }
    }
}
</style>
