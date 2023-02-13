<script setup>
import { ref, reactive } from 'vue'
import { showToast, showLoadingToast, closeToast, showSuccessToast } from 'vant'
import 'vant/es/toast/style';
import { useRouter, useRoute } from 'vue-router'
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { database } from '@/firebase'

const route = useRoute()
const router = useRouter()
let commentObj = reactive({ content: '', nickname: '' }) // 留言
async function setCommnetData() {
  if(!commentObj.content){
    showToast('还没有填写提交内容哦');
    return 
  }
  showLoadingToast({
    message: '提交中...',
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner',
  });
  const { areaKey } = route.query
  const commentDoc = doc(database, 'comment', areaKey)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  const docSnap = await getDoc(commentDoc);
  const commentData = `{"nickname":"${commentObj.nickname || '没有昵称的网友'}","content": "${commentObj.content}","datetime":"${(new Date().toLocaleString()).replaceAll('/', '-')}"}`
  if(docSnap.exists()){
    await updateDoc(commentDoc, {
      data: arrayUnion(commentData)
    });
  }else{
    await setDoc(doc(database, "comment", areaKey), {
      data: [commentData]
    });
  }
  closeToast();
  showSuccessToast({
    message: '提交成功',
    duration: 600
  })
  setTimeout(()=>{
    router.go(-1)
  }, 1000)
}
</script>

<template>
  <div>
    <van-field v-model="commentObj.nickname" style="margin-bottom: 10px;" label="昵称" placeholder="请输入昵称" />
    <van-field v-model="commentObj.content" style="margin-bottom: 10px;" label="留言" rows="2" autosize type="textarea"
      placeholder="说点什么吧~" />
    <button @click="setCommnetData">保存</button>
  </div>
</template>