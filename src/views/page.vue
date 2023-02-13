<script setup>
import { ref } from 'vue'
import { collection, doc, getDoc, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { database } from '@/firebase'

function setCommnetData(){
  const commentDoc = doc(database, 'comment','txc')
  updateDoc(commentDoc, {
      data: arrayUnion(`{"name":"testSet2","content": "test Content2"}`)
  });
}
let comments = ref([])
async function getCommentData() {
  // 获取所有commnet
  // const fireRef = collection(database, 'comment') 
  // const querySnapshot = getDocs(fireRef)
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // }); 
  // 结果类似于： txc => {data: [{1},{2},{3}]}; yyc: {data: [{1},{2},{3}]}
  // 获取单个类型的comment
  const docRef = doc(database, 'comment','txc')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    const arrCommnet = docSnap.data().data
    console.log(arrCommnet)
    comments.value = arrCommnet.map(item=>JSON.parse(item))
  }
}
getCommentData();
</script>

<template>
  <div>
    <button @click="setCommnetData">setCommnetData</button>
    <div v-for="item in comments" :key="item.content">
      {{ item.name }} : {{ item.content }}
    </div>
  </div>
</template>