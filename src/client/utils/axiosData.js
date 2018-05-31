import Axios from "axios";
import { Toast } from 'antd-mobile';

const axiosData = (api, params) => {

    return Axios.post(api, params)
        .then(json => {
            const { code, message } = json.data;
            if (code !== '000') {
                return Promise.reject({ code, message });
            }
            return Promise.resolve(json.data);
        })
        .catch(error => {
            Toast.fail(error.message || '出错了，请稍后重试！', 2)
            // return Promise.resolve(error);
        });
}
export default axiosData;
