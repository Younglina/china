import COS from "cos-js-sdk-v5";
import Http from '@/utils/request.js'
import { getStore } from '@/store'
const ImageBaseUrl = 'https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/'
let imagesData = []

export const initAllImage = async() => {
  const myCos = new COS({
    SecretId: import.meta.env.VITE_SID,
    SecretKey: import.meta.env.VITE_SKEY,
  });
  const cosData = await myCos.getBucket({
    Bucket: "younglina-1256042946",
    Region: "ap-nanjing",
    // Prefix: 'jdz/',           /* Prefix表示列出的object的key以prefix开始，非必须 */
  });
  imagesData = cosData.Contents.map(item=>{
    return {Key: item.Key}
  })
  // const data = { Contents: [{ "Key": "bg.jpg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"e68e53eb2037aed73419d2b1dffe6db6\"", "Size": "765034", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "dtcs_1.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"3ee3414a7153194a5ce5e5341c9e0237\"", "Size": "627598", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "dtcs_2.jpeg", "LastModified": "2023-02-04T05:55:28.000Z", "ETag": "\"00b5b95509acc87adfb3bbb4428f91e1\"", "Size": "485932", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "flch_1.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"a100375becc62a862368da44cbc306d6\"", "Size": "263747", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "flch_2.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"8a342e0aa7d3eacde9930dc7a64ddae6\"", "Size": "416110", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "food.svg", "LastModified": "2023-02-04T05:55:44.000Z", "ETag": "\"07947abd61a6e17261cce0107158ca1b\"", "Size": "2157", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "game.svg", "LastModified": "2023-02-04T05:55:44.000Z", "ETag": "\"dec2eb77b048d46923fe042578cd481a\"", "Size": "1218", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "gy_1.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"15f8552502699c71627d9e6ec354bf09\"", "Size": "104213", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "gy_2.jpeg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"d1e0c13880a2dee0cf9b7fb53189c389\"", "Size": "133839", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "huahai_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"805f1817067347e082de84bfa7c9ee73\"", "Size": "748033", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "location.png", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"8b58f6a524168315da13ef9d8bfd2311\"", "Size": "8027", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "scenic.svg", "LastModified": "2023-02-04T05:55:44.000Z", "ETag": "\"1ae22a1f5fa2d93d2f265e5e930119da\"", "Size": "2359", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "tcbwg_1.jpg", "LastModified": "2023-02-04T05:55:29.000Z", "ETag": "\"d7b62b8054e7926743fb522a687c9bcd\"", "Size": "62142", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "txc_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"ea66ba36d9e2fc7af1f17aa48eb6df92\"", "Size": "491814", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "txc_2.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"4286d5fc7d37c5f7fbbf0151bc81e016\"", "Size": "317724", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "txc_3.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"cb788145a9d2b42df7f2ef627799c632\"", "Size": "328076", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "wenli_1.png", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"8fe36d40df691f6f818e1ca2600a62a6\"", "Size": "220463", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "wenli_2.png", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"2e416df27c522dadd8fa107fa9f38aeb\"", "Size": "106508", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "wenli_3.png", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"09af6b443bbedf51719f8235c4f15eb7\"", "Size": "473087", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yl_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"13697691db2a14eea2e11611019971c9\"", "Size": "76224", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_1.jpeg", "LastModified": "2023-02-04T05:55:30.000Z", "ETag": "\"1510742b7e8c7796e931b67ee1d06a00\"", "Size": "616557", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_2.jpeg", "LastModified": "2023-02-04T05:55:31.000Z", "ETag": "\"57a84e9b7141209b23563e5a432bf212\"", "Size": "1505676", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_3.jpeg", "LastModified": "2023-02-04T05:55:31.000Z", "ETag": "\"106196d1eedb3072b569940f5049e025\"", "Size": "845302", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }, { "Key": "yyc_4.jpeg", "LastModified": "2023-02-04T05:55:31.000Z", "ETag": "\"cd5f0686d272003e4c7b26ee9a4e45c2\"", "Size": "764587", "Owner": { "ID": "1256042946", "DisplayName": "1256042946" }, "StorageClass": "STANDARD" }] }
}

const formatImages = (img, requestData) => {
  const hashMap = {}
  const imgName = img ? img.split('.')[0] : '' // 类似 asdf_1.jpeg 获取.之前的名字
  let imgType = imgName ? imgName.split('_')[0] : ''
  if (!imgType) return
  if (!hashMap[imgType]) {
    hashMap[imgType] = requestData.find(item => item.key.includes(imgType)) || 'noImages'
  }
  if (hashMap[imgType] !== 'noImages') {
    hashMap[imgType].images.push(`${ImageBaseUrl}${img}`)
  }
}

const CacheData = {}
let store = null
export const getData = async (type) => {
  if(!store) store = getStore()
  if (CacheData[type]) return CacheData[type]
  const { data: requestData } = await Http.get(`/${type}`)
  imagesData.map(item => {
    formatImages(item.Key, requestData)
  })
  store[type] = requestData
  CacheData[type] = requestData
  return requestData
}

export const navCard = [
  { type: '美食', key: 'food', image: `${ImageBaseUrl}food.svg` },
  { type: '娱乐', key: 'paly', image: `${ImageBaseUrl}game.svg` },
  { type: '景点', key: 'scenic', image: `${ImageBaseUrl}scenic.svg` },
]
