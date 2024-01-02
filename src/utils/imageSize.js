/**
 * @author langji
 * @date  2023-08-15
 * @description 导出图片base64地址和原始宽高比例，宽度默认200，
 * **/
function getImageSize (url){
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.src = url
        img.onload = function(){
            resolve(img)
        }
    })
}

function getFileData(file) {
    return new Promise(function (resolve, reject) {
      let reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onload = function (event) {
        resolve(reader.result)
      }
    })
  }

export default async (file)=>{
    let url = await getFileData(file)
    let img = await getImageSize(url)
    console.log(img.width,img.height);
    return {
        src:url,
        w:200,
        h:Math.round(200/img.width*img.height)
    }
}