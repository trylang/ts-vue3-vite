import { BasicLayout, BlankLayout, RouteView } from '@/layouts'
//路由配置
export const routerConfig = {
  // dashboard: {
  //   icon: "",
  //   path: "/abc"
  // },
  // studentList: {
  //   icon: "",
  //   path: "/bcd"
  // }
  dashboard: {
    icon: 'tutor-iconshouye',
  },
  course: {
    icon: 'tutor-iconkechengguanli',
  },
  homework: {
    icon: 'tutor-iconpigaiguanli',
  },
  teacherManage: {
    icon: 'tutor-iconjiaoshiguanli',
  },
  contentManage: {
    icon: 'tutor-iconwuliaoguanli',
  },
  contentManagePreview: {
    icon: 'tutor-iconwuliaoguanli',
  },
  communicateData: {
    icon: 'tutor-icongoutong',
  },
  supervisionManage: {
    icon: 'tutor-iconjianguan',
  },
  tacticConfig: {
    icon: 'tutor-iconcelve',
  },
  qualityManagement: {
    icon: 'tutor-iconzhengjiujiandutaizhang',
  },
}

// 前端路由表
// value可以定义为对象，支持定义查询字符串，例如{dashboard: { component: xxx, query: { id: 1 }}}；
export const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  Layout: RouteView,
  dashboard: () => import('@/views/home/index'),
  Exception404: () => import('@/views/exception/404'),
  // 课程管理
  courseManage: () =>
    import(
      /* webpackChunkName: "courseManage" */ '@/views/courseManage/CourseManage'
    ),
  // // 教师管理
  // teacherManage: () =>
  //   import(
  //     /* webpackChunkName: "teacherManage" */ "@/views/teacherManage/index"
  //   ),
  // // 课程数据
  // courseData: () =>
  //   import(
  //     /* webpackChunkName: "courseData" */ "@/views/courseManage/CourseData"
  //   ),
  // // 课程数据
  // courseData1: () =>
  //   import(
  //     /* webpackChunkName: "courseData" */ "@/views/courseManage/CourseData1"
  //   ),
  // 讲次详情
  // courseDetail: () =>
  //   import(
  //     /* webpackChunkName: "courseDetail" */ "@/views/courseManage/LessonDetail"
  //   ),
  // // 学员管理
  // studentManage: () =>
  //   import(
  //     /* webpackChunkName: "studentManage" */ "@/views/studentManage/StudentManage"
  //   ),
  // // 学员档案
  // studentRecord: () =>
  //   import(
  //     /* webpackChunkName: "studentRecord" */ "@/views/studentManage/StudentFile"
  //   ),
  // // 批改作业，首页
  // homeworkInfo: () =>
  //   import(/* webpackChunkName: "homeworkInfo" */ "@/views/homework/index"),
  // // 批改作业，课程列表
  // courseInfo: () =>
  //   import(/* webpackChunkName: "courseInfo" */ "@/views/homework/courselist"),
  // // 批改作业，课程详情
  // homeworkCourseDetail: () =>
  //   import(
  //     /* webpackChunkName: "homeworkCourseDetail" */ "@/views/homework/coursedetail"
  //   ),
  // // 批改作业，评语模板
  // homeworkCommentsTemplate: () =>
  //   import(
  //     /* webpackChunkName: "commentsTemplate" */ "@/views/homework/commentsTemplate"
  //   ),
  // // 批改作业，章节详情
  // sectionData: () =>
  //   import(
  //     /* webpackChunkName: "sectionData" */ "@/views/homework/lessondetail"
  //   ),
  // // 内容管理
  // contentManage: {
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "contentManage" */ "@/views/contentManage/contentManage"
  //     ),
  //   query: { edit: 1 }
  // },
  // // 内容管理
  // contentManagePreview: {
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "contentManage" */ "@/views/contentManage/contentManage"
  //     ),
  //   query: { edit: 2 }
  // },
  // // 辅导面板
  // coachPanel: () =>
  //   import(
  //     /* webpackChunkName: "coachPanel" */ "@/views/supervisionManage/coachPanelCourseList/index.vue"
  //   ),
  // // 辅导课程
  // coachPanelCourse: () =>
  //   import(
  //     /* webpackChunkName: "coachPanelCourse" */ "@/views/supervisionManage/coachPanelCourseList/index.vue"
  //   ),
  // // 辅导课程详情
  // coachPanelDetail: () =>
  //   import(
  //     /* webpackChunkName: "coachPanelDetail" */ "@/views/supervisionManage/coachPanelDetail/index.vue"
  //   ),
  // // 作业记录
  // OperationalRecords: () =>
  //   import(
  //     /* webpackChunkName: "coachPanelDetail" */ "@/views/homework/OperationalRecords"
  //   ),
  // phoneData: {
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "phoneData" */ "@/views/communicateData/phoneData/phoneData"
  //     )
  // },
  // // 策略配置
  // liveContentSafe: {
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "liveContentSafe" */ "@/views/tacticConfig/liveContentSafe"
  //     )
  // },
  // // 质检管理 - 质检任务
  // qualityTask: {
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "qualityTask" */ "@/views/qualityManagement/qualityTask/index.vue"
  //     )
  // },
  // qualityTaskDetail: {
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "qualityTaskDetail" */ "@/views/qualityManagement/qualityTaskDetail/index.vue"
  //     )
  // }
}
