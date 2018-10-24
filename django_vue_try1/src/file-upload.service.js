import * as axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3001';

function upload(formData) {
    const url = `${BASE_URL}/upload/`;
    console.dir(formData);
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/${img.url}` })));
}

export { upload }
