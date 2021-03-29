<template>
  <a-dropdown
    class="flex-center search"
    style="position: relative"
    :visible="searchVisible"
    placement="bottomCenter"
    :getPopupContainer="getContainer"
  >
    <div @click.stop class="search" style="width: 286px; background: #fff">
      <a-input-search
        v-model="searchText"
        :allowClear="true"
        @search="onSearch"
        placeholder="请输入学员姓名/id/手机号"
        style="width: 100%"
      />
    </div>
    <div slot="overlay" class="search-overlay" id="search-overlay" @click.stop>
      <div class="message-list" v-if="searchList.length">
        <div class="message-title">
          <div class="line"></div>
          <div class="title">学员</div>
        </div>
        <div class="list">
          <div
            class="message-item"
            v-for="(result, key) of searchListComputed"
            :key="key"
            @click="goToStudentDesc(result)"
          >
            <div class="item-name">
              <span style="font-weight: 500">{{ result.studentName }}</span
              >&nbsp;({{ result.axgStudentId }})
            </div>
            <div class="item-course">
              <span style="font-weight: 500">课程：</span
              >{{ result.courseName }}
            </div>
            <div class="item-time">
              <span style="font-weight: 500">课程时间：</span
              >{{ result.courseBeginTime }}
            </div>
          </div>
          <div
            v-if="searchList.length > 5 && !searchShowMore"
            class="message-more flex-center"
          >
            <div class="more" @click="searchShowMore = true">显示更多>></div>
          </div>
        </div>
      </div>
      <div class="no-data" v-else>
        <img src="@/assets/noData.png" />
        <span>暂无搜索结果</span>
      </div>
    </div>
  </a-dropdown>
</template>

<script>
  import { keywordSearch } from '@/api/services/global'
  export default {
    data() {
      return {
        searchVisible: false,
        searchShowMore: false,
        searchText: '',
        searchList: [],
      }
    },
    computed: {
      searchListComputed() {
        return this.searchShowMore
          ? this.searchList
          : this.searchList.slice(0, 3)
      },
    },
    methods: {
      getContainer() {
        return this.$parent.$el
      },
      closeSearch() {
        // this.searchText = "";
        this.searchVisible = false
      },
      goToStudentDesc(record) {
        this.closeSearch()
        this.$router.push({
          name: 'studentRecord',
          query: {
            courseId: record.courseId,
            classId: record.classId,
            axgStudentId: record.axgStudentId,
            institutionId: record.institutionId,
            students: JSON.stringify([
              {
                axgStudentId: record.axgStudentId,
                classId: record.classId,
                institutionId: record.institutionId,
              },
            ]),
          },
        })
      },
      onSearch(value) {
        if (value !== '') {
          this.$http(keywordSearch({ keyword: this.searchText })).then(
            (res) => {
              this.searchList = res.data
              this.searchVisible = true
              // !!!!!!
              this.$emit('closeMessage')
            }
          )
        } else {
          this.searchVisible = false
        }
      },
      visibleSearchChange(visible) {
        if (!visible) {
          this.searchShowMore = false
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .search {
    height: 50%;
    margin-right: 30px;
  }
  .search-overlay {
    width: 284px;
    min-height: 363px;
    max-height: 420px;
    background: #ffffff;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    .message-list {
      .message-title {
        display: flex;
        align-items: center;
        margin: 11px 16px;
        .line {
          width: 2px;
          height: 14px;
        }
        .title {
          padding-left: 4px;
          font-weight: 500;
        }
      }
      .list {
        margin-top: 4px;
        .message-item {
          padding: 13px 17px;
          border-bottom: 1px solid #f4f4f4;
          .item-name {
            font-size: 12px;
            line-height: 17px;
            color: #333333;
            margin-bottom: 9px;
          }
          .item-course {
            font-size: 12px;
            line-height: 17px;
            color: #333333;
            margin-bottom: 6px;
          }
          .item-time {
            font-size: 12px;
            line-height: 17px;
            color: #333333;
          }
        }
        .message-item:hover {
          background: #f9f9f9;
          cursor: pointer;
        }
        .more {
          color: #15d494;
          cursor: pointer;
          margin: 10px 0;
          font-size: 12px;
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
  }
</style>
