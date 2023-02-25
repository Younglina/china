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
  const myCos = new COS({
    ...COS_CONFIG,
    SimpleUploadMethod: 'putObject',
  });
  let commnetData = []
  try {
    const data = await myCos.getObject({
      ...BUCKET_CONFIG,
      Key: `${type}.json`
    })
    // 将获取到的 data.Body 转换成 JSON 对象
    commnetData = JSON.parse(data.Body.toString());
  } catch (err) {
    if(err.code === 'NoSuchKey'){
      console.log('没有对应的评论文件，创建一个')
    }else{
      console.log(err);
    }
  }
  return commnetData
}

export const uploadComment = async (type, data) => {
  const myCos = new COS({
    ...COS_CONFIG,
    SimpleUploadMethod: 'putObject',
  });
//   myCos.headObject({
//     ...BUCKET_CONFIG,
//     Key: `${type}.json`,
// }, function(err, cdata) {
//     if (err) return console.log(err);
//     // 首先取到要追加的文件当前长度，即需要上送的Position
//     var position = cdata.headers['content-length'];
//     myCos.appendObject({
//         ...BUCKET_CONFIG,
//         Key: `${type}.json`,
//         Body: JSON.stringify([data], null, " "), /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
//         Position: position, // 初次上传为0
//     }, function(err, data) {
//         console.log(err || data);
//     });
// });
  const commentData = await getCommnet(type)
  commentData.unshift(data)
  await myCos.putObject({
    ...BUCKET_CONFIG,
    Key: `${type}.json`,
    Body: JSON.stringify(commentData, null, " "),
  })
}