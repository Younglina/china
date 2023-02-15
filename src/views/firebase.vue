<!-- <script setup>
import { doc, getDoc } from "firebase/firestore";
import { database } from '@/firebase'
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { database } from '@/firebase'
  // 获取所有commnet
  // const fireRef = collection(database, 'comment') 
  // const querySnapshot = getDocs(fireRef)
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // }); 
  // 结果类似于： txc => {data: [{1},{2},{3}]}; yyc: {data: [{1},{2},{3}]}
  // 获取单个类型的comment
  const docRef = doc(database, 'comment', detailData.key)
  const docSnap = await getDoc(docRef);
  let comments = []
  if (docSnap.exists()) {
    const arrCommnet = docSnap.data().data
    comments = arrCommnet.map(item => JSON.parse(item))
  }
  // const commentDoc = doc(database, 'comment', areaKey)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  // const docSnap = await getDoc(commentDoc);
  // if(docSnap.exists()){
  //   await updateDoc(commentDoc, {
  //     data: arrayUnion(commentData)
  //   });
  // }else{
  //   await setDoc(doc(database, "comment", areaKey), {
  //     data: [commentData]
  //   });
  // }
</script>
<template lang="">
  <div>
    
  </div>
</template>
<style lang="">
  
</style> -->