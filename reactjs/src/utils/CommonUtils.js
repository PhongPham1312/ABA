import { reject } from "lodash";

class CommonUtils {
    static isNumber1(number) {
        if (number === 1) return true;
        return false;
    }
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }

    // get tháng
    static getCurrentMonth = () => {
        const today = new Date();
        return today.getMonth() + 1; // Tháng trong JS tính từ 0 đến 11 nên +1
    };

    // kiểm tra chuổi
    static kiemTraChuoi = (chuoiCha, chuoiCon) => {
        return chuoiCha.includes(chuoiCon);
    };

}

export default CommonUtils;