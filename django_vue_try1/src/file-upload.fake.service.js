


const BASE_URL = 'http://localhost:8000';
const url = `${BASE_URL}/api/file/`;

function upload(formData) {

    const photos = formData.getAll('photos');

    console.dir(formData)

    //post(url,photos[0],function(data,status){
     // console.log(`${data} and status is ${status}`)
    //})
    const promises = photos.map((x) => getImage(x)
        .then(img => ({
            id: img,
            originalName: x.name,
            fileName: x.name,
            url: img
        })));
    return Promise.all(promises);
}

function getImage(file) {
    return new Promise((resolve, reject) => {
        const fReader = new FileReader();
        const img = document.createElement('img');

        fReader.onload = () => {
            img.src = fReader.result;
            resolve(getBase64Image(img));
        }

        fReader.readAsDataURL(file);

    })
}

function getBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = img.src;

    console.log(dataURL);

    var xhttp=new XMLHttpRequest();


    xhttp.onreadystatechange=function(){
      console.log("success")
    }

    xhttp.open("POST",url,true);
    var obj = "{\"fileName\":"+"\""+img.src+"\"}";
    console.log(obj);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
    xhttp.send(obj);

    return dataURL;
}

export { upload }

