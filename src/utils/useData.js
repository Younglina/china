import COS from "cos-js-sdk-v5";
import AV from 'leancloud-storage'
import { useStore } from '@/store'
AV.init({
    appId: 'eoqcmwvh2rt97nbGb2QBvMk3-gzGzoHsz',
    appKey: '1VZqMQ3JThd1fuTCyCbYTtsK',
    serverURL: 'https://eoqcmwvh.lc-cn-n1-shared.com'
});
const ImageBaseUrl = 'https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/'
const imagesData = []
const imagesDataHash = {}
const COS_CONFIG = {
  SecretId: import.meta.env.VITE_SID,
  SecretKey: import.meta.env.VITE_SKEY,
}
const BUCKET_CONFIG = {
  Bucket: "younglina-1256042946",
  Region: "ap-nanjing",
}
export const initAllImage = async () => {
  const myCos = new COS(COS_CONFIG);
  const cosData = await myCos.getBucket({
    Bucket: "younglina-1256042946",
    Region: "ap-nanjing",
  });
  // const cosData = { Contents: [{ "Key": "bg.jpg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"e68e53eb2037aed73419d2b1dffe6db6\"", "Size": "765034", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "dtcs_1.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"3ee3414a7153194a5ce5e5341c9e0237\"", "Size": "627598", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "dtcs_2.jpeg", "LastModified": "2023-02-04T05:55:28.000Z", "ETag": "\"00b5b95509acc87adfb3bbb4428f91e1\"", "Size": "485932", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "flch_1.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"a100375becc62a862368da44cbc306d6\"", "Size": "263747", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "flch_2.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"8a342e0aa7d3eacde9930dc7a64ddae6\"", "Size": "416110", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "food.svg", "LastModified": "2023-02-04T05:55:44.000Z", "ETag": "\"07947abd61a6e17261cce0107158ca1b\"", "Size": "2157", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "game.svg", "LastModified": "2023-02-04T05:55:44.000Z", "ETag": "\"dec2eb77b048d46923fe042578cd481a\"", "Size": "1218", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "gy_1.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"15f8552502699c71627d9e6ec354bf09\"", "Size": "104213", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "gy_2.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"d1e0c13880a2dee0cf9b7fb53189c389\"", "Size": "133839", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "huahai_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"805f1817067347e082de84bfa7c9ee73\"", "Size": "748033", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "location.png", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"8b58f6a524168315da13ef9d8bfd2311\"", "Size": "8027", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "scenic.svg", "LastModified": "2023-02-04T05:55:44.000Z", "ETag": "\"1ae22a1f5fa2d93d2f265e5e930119da\"", "Size": "2359", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "tcbwg_1.jpg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"d7b62b8054e7926743fb522a687c9bcd\"", "Size": "62142", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "txc_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"ea66ba36d9e2fc7af1f17aa48eb6df92\"", "Size": "491814", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "txc_2.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"4286d5fc7d37c5f7fbbf0151bc81e016\"", "Size": "317724", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "txc_3.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"cb788145a9d2b42df7f2ef627799c632\"", "Size": "328076", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "wenli_1.png", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"8fe36d40df691f6f818e1ca2600a62a6\"", "Size": "220463", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "wenli_2.png", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"2e416df27c522dadd8fa107fa9f38aeb\"", "Size": "106508", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "wenli_3.png", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"09af6b443bbedf51719f8235c4f15eb7\"", "Size": "473087", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yl_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"13697691db2a14eea2e11611019971c9\"", "Size": "76224", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"1510742b7e8c7796e931b67ee1d06a00\"", "Size": "616557", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_2.jpeg", "LastModified": "2023-02-04T05:55:31.000Z", "ETag": "\"57a84e9b7141209b23563e5a432bf212\"", "Size": "1505676", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_3.jpeg", "LastModified": "2023-02-04T05:55:31.000Z", "ETag": "\"106196d1eedb3072b569940f5049e025\"", "Size": "845302", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_4.jpeg", "LastModified": "2023-02-04T05:55:31.000Z", "ETag": "\"cd5f0686d272003e4c7b26ee9a4e45c2\"", "Size": "764587", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }] }
  cosData.Contents.map(item => {
    const imgName = item.Key.split('.')[0]// 类似 asdf_1.jpeg 获取.之前的名字
    let imgType = imgName ? imgName.split('_')[0] : ''
    if(item.Key.split('.')[1]!=='json'){
      imagesData.push({ Key: item.Key, imgType: imgType})
      if(!imagesDataHash[imgType]){
        imagesDataHash[imgType] = [`${ImageBaseUrl}${item.Key}`]
      }else{
        imagesDataHash[imgType].push(`${ImageBaseUrl}${item.Key}`)
      }
    }
  })
}

export const uploadImage = async (type, files, timekey) => {
    const myCos = new COS({
      ...COS_CONFIG,
      SimpleUploadMethod: 'putObject',
    });
    const formatFiles = files.map(item=>{
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

export const getCommnet = async (type) => {
  const query = new AV.Query(type);
  try{
    const requestData = await query.find()
    const formatData = requestData.map(item=>item.attributes)
    return formatData
  }catch(e){
    return []
  }
}
export const submitData = async (type, data) => {
  const commentObject = AV.Object(type);
  for(let key in data){
    commentObject.set(key, data[key]);
  }
  const finishComment = await commentObject.save()
  console.log(finishComment, 'comment finish')
}

export const getData = async (type) => {
  const store = useStore()
  const query = new AV.Query(type);
  try{
    const localPiniaData = JSON.parse(localStorage.getItem('china-pinia-info'))
    let formatData = []
    if(type!=='userInfo'){
      const requestData = await query.find()
      formatData = requestData.map(item=>item.attributes)
      formatData.map(item=>{
        item.images = imagesDataHash[item.key.split('_')[0]] || [`${ImageBaseUrl}noImg.svg`]
      })
    }else{
      formatData = localPiniaData.userInfo || null
    }
    const piniaData = localPiniaData || {}
    piniaData[type] = formatData
    store[type] = formatData
    localStorage.setItem('china-pinia-info', JSON.stringify(piniaData))
    return formatData
  }catch(e){
    console.dir(e)
    return []
  }
}

export const initData = async () => {
  await initAllImage()
  await getData('scenic')
  await getData('food')
  await getData('porcelain')
  getData('userInfo')
}

export const navCard = [
  { text: '美食', value: 'food', image: `${ImageBaseUrl}food.svg` },
  { text: '娱乐', value: 'play', image: `${ImageBaseUrl}game.svg` },
  { text: '景点', value: 'scenic', image: `${ImageBaseUrl}scenic.svg` },
  { text: '瓷器', value: 'porcelain', image: `${ImageBaseUrl}porcelain.svg` },
]

export const tabs = [
  {name: 'Home', path: '/', label: '主页', icon: 'wap-home-o'},
  {name: 'My', path: '/my', label: '我的', icon: 'user-o'},
]