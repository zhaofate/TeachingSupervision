// menuStore.js
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu',{
  state: () => ({
      // @ts-ignore
      menuList1:JSON.parse(localStorage.getItem('menuList1')) || menuList1,
      // @ts-ignore
      menuList2:JSON.parse(localStorage.getItem('menuList2')) || menuList1,
      // @ts-ignore
      menuList3:JSON.parse(localStorage.getItem('menuList3')) || menuList1,
  }),
  actions: {
    updateMenuList(newMenuList,index) {
      if (index === 1) {
        this.menuList1 = newMenuList;
        localStorage.setItem('menuList1', JSON.stringify(newMenuList));
      }
      if (index === 2) {
        this.menuList2 = newMenuList;
        localStorage.setItem('menuList2', JSON.stringify(newMenuList));
      }
      if (index === 3) {
        this.menuList3 = newMenuList;
        localStorage.setItem('menuList3', JSON.stringify(newMenuList));
      }
    },
  },
});


const menuList1 = [
  {
    icon: "assessment",
    label: "督导评价",
    separator: false,
    path: "evaluate"
  },
  {
    icon: "send",
    label: "督导反馈",
    separator: false,

  },
  {
    icon: "question_answer",
    label: "教师互评",
    separator: false,
    path: "assessment"
  },
  {
    icon: "bubble_chart",
    label: "评价分析",
    separator: false,
  },
  {
    icon: "upcoming",
    label: "消息中心",
    separator: false,
  },
  {
    icon: "account_circle",
    label: "个人中心",
    separator: false,
  },
]

const menuList2 = [
  {
    icon: "sticky_note_2",
    label: "教师信息",
    separator: false,
  },
  {
    icon: "cast_for_education",
    label: "督导课表",
    separator: false,
  },
  {
    icon: "splitscreen",
    label: "督导任务",
    separator: false,
  },
  {
    icon: "assessment",
    label: "督导评价",
    separator: false,
  },
  {
    icon: "send",
    label: "督导反馈",
    separator: false,
  },
  {
    icon: "bubble_chart",
    label: "评价分析",
    separator: false,
  },
  {
    icon: "upcoming",
    label: "消息中心",
    separator: false,
  },
  {
    icon: "account_circle",
    label: "个人中心",
    separator: false,
  },
];

const menuList3 = [
  {
    icon: "sticky_note_2",
    label: "教师信息",
    separator: false,
  },
  {
    icon: "golf_course",
    label: "督导课表",
    separator: false,
  },
  {
    icon: "splitscreen",
    label: "督导任务",
    separator: false,
  },
  {
    icon: "cast_for_education",
    label: "督导评教",
    separator: false,
  },
  {
    icon: "assessment",
    label: "督导评价",
    separator: true,
  },
  {
    icon: "send",
    label: "督导反馈",
    separator: true,
  },
  {
    icon: "bubble_chart",
    label: "评价分析",
    separator: true,
  },
  {
    icon: "upcoming",
    label: "消息中心",
    separator: false,
  },
  {
    icon: "account_circle",
    label: "个人中心",
    separator: false,
  },
  {
    icon: "error",
    label: "错误日志",
    separator: false,
  },
  {
    icon: "subject",
    label: "操作日志",
    separator: false,
  },
  {
    icon: "manage_history",
    label: "敏感词管理",
    separator: false,
  },
];