import COS from "cos-js-sdk-v5";
import AV from 'leancloud-storage'
import { useStore } from '@/store'
import noImg from '../assets/images/noImg.svg'
AV.init({
  appId: import.meta.env.VITE_APPID,
  appKey: import.meta.env.VITE_APPKEY,
  serverURL: import.meta.env.VITE_SERVERURL
});
export const ImageBaseUrl = import.meta.env.VITE_BASEURL
const imagesData = []
const imagesDataHash = {}
const COS_CONFIG = {
  SecretId: import.meta.env.VITE_SID,
  SecretKey: import.meta.env.VITE_SKEY,
}
const BUCKET_CONFIG = {
  Bucket: import.meta.env.VITE_BUCKET,
  Region: import.meta.env.VITE_REGION,
}
export const initAllImage = async () => {
  const store = useStore()
  const myCos = new COS(COS_CONFIG);
  const cosData = await myCos.getBucket(BUCKET_CONFIG);
  // const cosData = { Contents: [{ "Key": "bg.jpg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"e68e53eb2037aed73419d2b1dffe6db6\"", "Size": "765034", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "dtcs_1.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"3ee3414a7153194a5ce5e5341c9e0237\"", "Size": "627598", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "dtcs_2.jpeg", "LastModified": "2023-02-04T05:55:28.000Z", "ETag": "\"00b5b95509acc87adfb3bbb4428f91e1\"", "Size": "485932", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "flch_1.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"a100375becc62a862368da44cbc306d6\"", "Size": "263747", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "flch_2.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"8a342e0aa7d3eacde9930dc7a64ddae6\"", "Size": "416110", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "food.svg", "LastModified": "2023-02-04T05:55:44.000Z", "ETag": "\"07947abd61a6e17261cce0107158ca1b\"", "Size": "2157", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "game.svg", "LastModified": "2023-02-04T05:55:44.000Z", "ETag": "\"dec2eb77b048d46923fe042578cd481a\"", "Size": "1218", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "gy_1.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"15f8552502699c71627d9e6ec354bf09\"", "Size": "104213", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "gy_2.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"d1e0c13880a2dee0cf9b7fb53189c389\"", "Size": "133839", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "huahai_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"805f1817067347e082de84bfa7c9ee73\"", "Size": "748033", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "location.png", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"8b58f6a524168315da13ef9d8bfd2311\"", "Size": "8027", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "scenic.svg", "LastModified": "2023-02-04T05:55:44.000Z", "ETag": "\"1ae22a1f5fa2d93d2f265e5e930119da\"", "Size": "2359", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "tcbwg_1.jpg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"d7b62b8054e7926743fb522a687c9bcd\"", "Size": "62142", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "txc_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"ea66ba36d9e2fc7af1f17aa48eb6df92\"", "Size": "491814", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "txc_2.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"4286d5fc7d37c5f7fbbf0151bc81e016\"", "Size": "317724", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "txc_3.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"cb788145a9d2b42df7f2ef627799c632\"", "Size": "328076", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "wenli_1.png", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"8fe36d40df691f6f818e1ca2600a62a6\"", "Size": "220463", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "wenli_2.png", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"2e416df27c522dadd8fa107fa9f38aeb\"", "Size": "106508", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "wenli_3.png", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"09af6b443bbedf51719f8235c4f15eb7\"", "Size": "473087", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yl_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"13697691db2a14eea2e11611019971c9\"", "Size": "76224", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"1510742b7e8c7796e931b67ee1d06a00\"", "Size": "616557", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_2.jpeg", "LastModified": "2023-02-04T05:55:31.000Z", "ETag": "\"57a84e9b7141209b23563e5a432bf212\"", "Size": "1505676", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_3.jpeg", "LastModified": "2023-02-04T05:55:31.000Z", "ETag": "\"106196d1eedb3072b569940f5049e025\"", "Size": "845302", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_4.jpeg", "LastModified": "2023-02-04T05:55:31.000Z", "ETag": "\"cd5f0686d272003e4c7b26ee9a4e45c2\"", "Size": "764587", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }] }
  cosData.Contents.map(item => {
    let imgType = item.Key ? item.Key.split('_')[0] : ''
    // if (item.Key.split('.')[1] !== 'json') {
      imagesData.push({ Key: item.Key, imgType: imgType })
      if (!imagesDataHash[imgType]) {
        imagesDataHash[imgType] = [`${ImageBaseUrl}${item.Key}`]
      } else {
        imagesDataHash[imgType].push(`${ImageBaseUrl}${item.Key}`)
      }
    // }
  })
  store.allImages = imagesDataHash
}

export const uploadImage = async (type, files, timekey) => {
  const myCos = new COS({
    ...COS_CONFIG,
    SimpleUploadMethod: 'putObject',
  });
  const formatFiles = files.map(item => {
    return {
      ...BUCKET_CONFIG,
      Key: `${type}_${timekey}_${item.file.name}`,
      StorageClass: "STANDARD",
      Body: item.file, // 上传文件对象
    }
  })
  myCos.uploadFiles({
    files: formatFiles,
    SliceSize: 1024 * 1024 * 10,    /* 设置大于10MB采用分块上传 */
    onProgress: function (info) {
      var percent = parseInt(info.percent * 10000) / 100;
      var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
      console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
    },
    onFileFinish: function (err, data, options) {
      console.log(options.Key + '上传' + (err ? '失败' : '完成'));
    },
  }, function (err, data) {
    console.log(err || data);
  });
}

export const getCommnet = async (type, equal) => {
  const query = new AV.Query(type);
  try {
    if(equal){
      query.equalTo(equal.key, equal.value);
    }
    const requestData = await query.find()
    const formatData = requestData.map(item => {
      return {...item.attributes, id: item.id}
    })
    return formatData
  } catch (e) {
    console.log(e)
    return []
  }
}
export const submitData = async (type, data) => {
  const lcObj = AV.Object.extend(type);
  const commentObject = new lcObj();
  for (let key in data) {
    commentObject.set(key, data[key]);
  }
  const finishComment = await commentObject.save()
  return finishComment
}

export async function queryUser(name, pwd, permission) {
  const query = new AV.Query('user');
  query.equalTo('username', name);
  if (pwd) {
    query.equalTo('password', pwd);
  }
  if (permission) {
    query.containsAll('permission', permission);
  }
  const data = await query.find()
  if (data.length > 0) {
    return { ...data[0].attributes, userid: data[0].id }
  }
  return null
}

export async function queryByKey({tableName, key, value}) {
  const query = new AV.Query(tableName);
  query.equalTo(key, value);
  const data = await query.find()
  if (data.length > 0) {
    return { ...data[0].attributes, id: data[0].id }
  }
  return null
}

export const updataByKey = async (key, data) => {
  const store = useStore()
  const user = store.userInfo
  if(!data.userid) return
  const upData = AV.Object.createWithoutData('user', data.userid);
  delete data.userid
  if (key === 'likes') {
    const upLikes = AV.Object.createWithoutData(data.tableName, data.id);
    const likes = new Set(user.likes)
    if (data.value) {
      likes.add(data.areaKey)
      upLikes.increment('likes', 1)
    } else {
      likes.delete(data.areaKey)
      upLikes.increment('likes', -1)
    }
    upData.set('likes', [...likes]);
    await upData.save();
    await upLikes.save();
    store.userInfo.likes = [...likes]
  }
  if (key === 'comment') {
    upData.add('comment', data)
    // const comment = user.comment
    // upData.set('comment', [...comment, data]);
    await upData.save();
    // store.userInfo.comment.push(data)
  }
} 

export const verifyData = async (id) => {
  const verify = AV.Object.createWithoutData('verify', id);
  verify.set('isverify', 'yse');
  await verify.save();
}

export function isLogin() {
  const store = useStore()
  const localPiniaData = JSON.parse(localStorage.getItem('china-pinia-info') || '{}')
  const userInfo = localPiniaData.userInfo || store.userInfo
  return userInfo
}

export const getData = async (type) => {
  const store = useStore()
  try {
    const localPiniaData = JSON.parse(localStorage.getItem('china-pinia-info') || '{}')
    let formatData = []
    if (type !== 'userInfo') {
      const query = new AV.Query(type);
      if(type!=='userInfo'){
        query.addDescending("likes");
        query.addDescending("createdAt");
      }
      const requestData = await query.find()
      formatData = requestData.map(item => {
        return { ...item.attributes, id: item.id}
      })
      formatData.map(item => {
        let keys = item.key.split(',')
        if(keys.length>1){
          item.images = []
          keys.map(k=>{
            if(imagesDataHash[k]){
              item.images.push(...imagesDataHash[k])
            }
          })
        }else{
          item.images = imagesDataHash[item.key]
        }
        if(!item.images || item.images.length===0){
          item.images = [noImg]
        }
      })
    } else {
      const userInfo = localPiniaData.userInfo || null
      if (userInfo) {
        formatData = await queryUser(userInfo.username)
      } else {
        formatData = null
      }
    }
    const piniaData = localPiniaData
    piniaData[type] = formatData
    store[type] = formatData
    localStorage.setItem('china-pinia-info', JSON.stringify(piniaData))
    return formatData
  } catch (e) {
    console.dir(e)
    return []
  }
}

export const initData = async () => {
  try{
    await initAllImage()
  }finally{
    await getData('scenic')
    await getData('food')
    await getData('porcelain')
    await getData('userInfo')
  }
}

export const navCard = [
  { text: '美食', value: 'food', image: `${ImageBaseUrl}food.svg` },
  { text: '娱乐', value: 'play', image: `${ImageBaseUrl}game.svg` },
  { text: '景点', value: 'scenic', image: `${ImageBaseUrl}scenic.svg` },
  { text: '瓷器', value: 'porcelain', image: `${ImageBaseUrl}porcelain.svg` },
]

export const tabs = [
  { name: 'Home', path: '/', label: '主页', icon: 'wap-home-o' },
  { name: 'My', path: '/my', label: '我的', icon: 'user-o' },
]