<!-- 消息中心 -->


<template>
  <div style="color: #000">
    <div class="q-pa-md q-gutter-md">
      <div class="q-gutter-md q-ml-none">
        <q-list padding>
          <div v-for="(item, index) in msgList" :key="index">
            <q-item>
              <q-item-section avatar>
                <q-btn round icon="notifications">
                  <q-badge v-if="showBadgeList.includes(index)" floating color="red" rounded />
                </q-btn>
              </q-item-section>
              <q-item-section class="col-10"
                ><q-item-label
                  >{{ item.senderName}} 
                  <q-item-label caption class="q-mt-md">{{
                    item.sendTime
                  }}</q-item-label></q-item-label
                >
              </q-item-section>
              <q-item-section class="col-2">
                <q-btn
                v-if="showBadgeList.includes(index)"
                flat
                q-ml-md
                style="color: #ff0080"
                label="查看新的任务"
                @click="handleMsgBtn(index)"
              />
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup>
// @ts-ignore
import request from "@/api/index";
import { onMounted, ref } from "vue";
// @ts-ignore
import { useMenuStore } from "../../store/menu";
// @ts-ignore
import router from "@/router/index";
import { useQuasar } from 'quasar'

// @ts-ignore
import {useMsgsStore} from "@/store/msgs"

const msgsStore = useMsgsStore();

const $q = useQuasar()

const msgList = ref([]);
const showBadgeList =  ref([])
const {updateTrue} = useMenuStore();

// 点击消息弹框
const handleMsgBtn = (index) => {
  router.push("/task")
  updateTrue('evaluate',2);
  showBadgeList.value = showBadgeList.value.filter(i => i !== index);
  $q.localStorage.set("showBadgeList", showBadgeList.value)
  msgsStore.setMsgs(msgsStore.getMsgs() - 1)
}

onMounted(async () => {
  msgList.value = await getMessage();
  const data = msgList.value.map((item,index)=> index)
  showBadgeList.value = $q.localStorage.getItem("showBadgeList") || data;
  $q.localStorage.set("showBadgeList", showBadgeList.value)
});

// 获取消息列表
const getMessage = async () => {
  const res = await request.get("/super/notification");
  return res.data.data;
};
</script>
