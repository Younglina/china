<script setup>
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { database } from '@/firebase'
import { useFirestore } from '@vueuse/firebase/useFirestore'

const fireRef = collection(database, 'comment')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
const querySnapshot = await getDocs(fireRef, 'txc');
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});
</script>

<template>
  <div>
    <button @click="writeUserData">writeUserData</button>
  </div>
</template>