<template>
  <a-dropdown
    class="flex-center"
    :trigger="['click']"
    :visible="messageVisible"
    :getPopupContainer="getContainer"
    placement="bottomCenter"
  >
    <a-tooltip class="tutor-iconxiaoxi" @click.stop="openMessage()">
      <template slot="title">消息</template>
      <my-icon style="font-size: 25px" type="tutor-iconxiaoxi1" />
      <div class="num flex-center" v-if="messageNum">
        {{ messageNum > 99 ? '99+' : messageNum }}
      </div>
    </a-tooltip>
    <div slot="overlay" @click.stop class="message-overlay">
      <a-tabs size="small">
        <a-tab-pane key="1" :tab="tabBarExtraContent()">
          <div class="message-list" v-if="messageList.length">
            <div
              class="message-item"
              v-for="(message, key) of messageListComputed"
              :key="key"
            >
              <div class="item-title">
                <div class="item-title-header">
                  <div style="font-weight: 500">
                    {{ message.messageTitle }}
                  </div>
                  <div class="num" v-if="message.messageRead === 0"></div>
                </div>
                <div class="item-title-content">
                  {{ message.messageTime | filterMessageTime }}
                </div>
              </div>
              <div class="item-content" v-if="message.messageType !== 6">
                <span class="student-label" @click="toStudentDesc(message)">
                  {{ message.studentName }}
                </span>
                &nbsp;{{ message.actionName }}{{ message.courseName }}
              </div>
              <div class="item-content" v-else>
                <span class="student-label" @click="toStudentDesc(message)">
                  {{ message.studentName }}
                </span>
                &nbsp;从{{ message.courseName }}{{ message.actionName }}
              </div>
            </div>
            <div
              class="message-more flex-center"
              v-if="messageList.length > 6 && !messageShowMore"
            >
              <div class="more" @click="messageShowMore = true">显示更多>></div>
            </div>
          </div>
          <div v-else class="no-data">
            <img src="@/assets/noData.png" />
            <span>暂无学员变动消息</span>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-dropdown>
</template>

<script>
  import { messageQuery, messageRead } from '@/api/services/global'
  import { Logger } from '@aixuexi/tol-utils'
  import dataTrack from '@/amcLogs/dataTrack.json' // amc下载的原始json数据
  const logger = new Logger(dataTrack)
  import moment from 'moment'
  export default {
    data() {
      return {
        messageVisible: false,
        interval: {},
        messageList: [],
        messageShowMore: false,
        loadding: false,
        moment,
      }
    },
    computed: {
      messageNum() {
        return this.messageList.filter((item) => item.messageRead === 0).length
      },
      messageListComputed() {
        return this.messageShowMore
          ? this.messageList
          : this.messageList.slice(0, 6)
      },
    },
    filters: {
      filterMessageTime(time) {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
      },
      filterSearchTime(time) {
        return moment(time).format('周d HH:mm')
      },
    },
    watch: {
      messageVisible(newValue, oldValue) {
        if (!newValue && oldValue) {
          this.messageShowMore = false
          this.messageNum &&
            this.$http(
              messageRead({
                ids: this.messageList
                  .filter((item) => item.messageRead === 0)
                  // 测试
                  // .slice(0, 1)
                  .map((item) => item.messageId),
              })
            ).then(() => {
              this.getMessageList()
            })
          console.log('已读')
        }
      },
    },
    mounted() {
      this.getMessageList()
      this.interval = setInterval(this.getMessageList, 5 * 60 * 1000)
    },
    methods: {
      getContainer() {
        return this.$parent.$el
      },
      toStudentDesc(message) {
        this.$router.push({
          name: 'studentRecord',
          query: {
            courseId: message.courseId,
            classId: message.classId,
            axgStudentId: message.axgStudentId,
            institutionId: message.institutionId,
            students: JSON.stringify([
              {
                axgStudentId: message.axgStudentId,
                classId: message.classId,
                institutionId: message.institutionId,
              },
            ]),
          },
        })
      },
      tabBarExtraContent() {
        return (
          <div>
            <a-tooltip>
              <template slot="title">
                <span style="margin: 0 0 0 5px;">仅展示30天内的消息</span>
              </template>
              <my-icon type="tutor-icontishi" style="font-size:12px;" />
            </a-tooltip>
            <span style="font-weight: 500;">学员变动</span>
          </div>
        )
      },
      async getMessageList() {
        this.loadding = true
        const res = await this.$http(messageQuery({}))
        // res.data[0].messageRead = 0;
        this.messageList = res.data
        this.loadding = false
      },
      async openMessage() {
        this.$emit('closeSearch')
        if (!this.messageVisible) {
          if (this.loadding) return
          await this.getMessageList()
          this.$nextTick(() => {
            this.messageVisible = true
          })
          logger.sendAmcLog({
            aad: 'FDLSPT_39',
            pp1: {
              teacherId: this.$store.getters.baseInfo.id,
              time: new Date().getTime(),
            },
          })
        } else {
          this.closeMessage()
        }
      },
      closeMessage() {
        this.messageVisible = false
      },
    },
    destroyed() {
      clearInterval(this.interval)
    },
  }
</script>

<style lang="less" scoped>
  .tutor-iconxiaoxi {
    margin-right: 30px;
    cursor: pointer;
    position: relative;
    .num {
      position: absolute;
      min-width: 14px;
      height: 14px;
      padding: 1px 4px;
      font-weight: normal;
      font-style: normal;
      font-size: 10px;
      line-height: 14px;
      border-radius: 12px;
      top: -8px;
      right: -10px;
      background-color: red;
      color: white;
    }
  }
  .message-overlay {
    width: 289px;
    height: 458px;
    background: #ffffff;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    .message-list {
      .message-item {
        border-bottom: 1px solid #f4f4f4;
        margin: 0 16px 0;
        padding-bottom: 10px;
        .item-title {
          display: flex;
          justify-content: space-between;
          margin: 8px 0 6px;
          .item-title-header {
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 17px;
            position: relative;
            .num {
              position: absolute;
              top: 0;
              right: -6px;
              width: 4px;
              height: 4px;
              background: #ff3322;
              border-radius: 50%;
            }
          }
          .item-title-content {
            font-weight: normal;
            font-size: 12px;
            line-height: 17px;
            color: #999999;
          }
        }
        .item-content {
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 17px;
          color: #666666;
        }
      }
      .message-more {
        height: 40px;
        .more {
          font-size: 12px;
          color: #15d494;
          cursor: pointer;
        }
      }
    }

    .no-data {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: none;
      padding-top: 40px;
      color: #cccccc;
      font-weight: normal;
      font-size: 12px;
      img {
        width: 60px;
        height: 60px;
        margin-bottom: 20px;
      }
    }
    .student-label {
      cursor: pointer;
    }
  }
</style>
