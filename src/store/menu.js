// menuStore.js
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    // @ts-ignore
    menuList1: JSON.parse(localStorage.getItem("menuList1")) || menuList1,
    // @ts-ignore
    menuList2: JSON.parse(localStorage.getItem("menuList2")) || menuList2,
    // @ts-ignore
    menuList3: JSON.parse(localStorage.getItem("menuList3")) || menuList3,
  }),
  actions: {
    updateMenuList(newMenuList, index) {
      if (index === 1) {
        this.menuList1 = newMenuList;
        localStorage.setItem("menuList1", JSON.stringify(newMenuList));
      }
      if (index === 2) {
        this.menuList2 = newMenuList;
        localStorage.setItem("menuList2", JSON.stringify(newMenuList));
      }
      if (index === 3) {
        this.menuList3 = newMenuList;
        localStorage.setItem("menuList3", JSON.stringify(newMenuList));
      }
    },
    updateTrue(path, index) {
      if (index === 1) {
        const newMenuList = this.menuList1.map((item) => {
          if (item.path == path) {
            item.separator = true;
          } else {
            item.separator = false;
          }
        });
        localStorage.setItem("menuList1", JSON.stringify(newMenuList));
      }
      if (index === 2) {
        const newMenuList = this.menuList2.map((item) => {
          if (item.path == path) {
            item.separator = true;
          } else {
            item.separator = false;
          }
        });
        localStorage.setItem("menuList2", JSON.stringify(newMenuList));
      }
    },
  },
});

const menuList1 = [
  {
    icon: "assessment",
    label: "督导评价",
    separator: false,
    path: "evaluate",
  },
  {
    icon: "question_answer",
    label: "教师互评",
    separator: false,
    path: "assessment",
  },
  {
    icon: "bubble_chart",
    label: "评价分析",
    separator: false,
    path: "analysis",
  },
  {
    icon: "school",
    label: "课程中心",
    separator: false,
    path: "course",
  },
  {
    icon: "upcoming",
    label: "消息中心",
    separator: false,
    path: "message",
  },
  {
    icon: "account_circle",
    label: "个人中心",
    separator: false,
    path: "person",
  },
];

const menuList2 = [
  {
    icon: "sticky_note_2",
    label: "教师信息",
    separator: false,
    path: "teachers",
  },
  {
    icon: "cast_for_education",
    label: "督导课表",
    separator: false,
    path: "sCourse",
  },
  {
    icon: "splitscreen",
    label: "督导任务",
    separator: false,
    path: "task",
  },
  {
    icon: "assessment",
    label: "督导评价",
    separator: false,
    path: "sEvaluate",
  },
  {
    icon: "send",
    label: "督导反馈",
    separator: false,
    path: "sFeedback",
  },
  {
    icon: "upcoming",
    label: "消息中心",
    separator: false,
    path: "sMessage",
  },
  {
    icon: "account_circle",
    label: "个人中心",
    separator: false,
    path: "sPerson",
  },
];

const menuList3 = [
  {
    icon: "sticky_note_2",
    label: "用户管理",
    separator: false,
    path: "lTeacher",
  },
  {
    icon: "golf_course",
    label: "课程中心",
    separator: false,
    path: "lCourse",
  },
  {
    icon: "splitscreen",
    label: "督导任务",
    separator: false,
    path: "lTask",
  },
  {
    icon: "manage_history",
    label: "敏感词管理",
    separator: false,
    path: "word",
  },
  {
    icon: "account_circle",
    label: "个人中心",
    separator: false,
    path: "lPerson",
  },
  {
    icon: "error",
    label: "错误日志",
    separator: false,
    path: "error",
  },
  {
    icon: "subject",
    label: "操作日志",
    separator: false,
    path: "operate",
  },
];
