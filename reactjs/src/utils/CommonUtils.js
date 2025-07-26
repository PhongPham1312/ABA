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

    // format tiền 
    static formatNumber = (value) => {
        if (!value && value !== 0) return '';

        // Chuyển thành chuỗi, loại khoảng trắng
        const strVal = String(value).trim();

        // Kiểm tra có dấu âm không
        const isNegative = strVal.startsWith('-');

        // Lấy phần số (loại bỏ mọi ký tự không phải số)
        let cleaned = strVal.replace(/\D/g, '');
        if (!cleaned) return '';

        // Ép về số, thêm lại dấu nếu âm
        const num = Number(cleaned) * (isNegative ? -1 : 1);

        // Format số có dấu cách: 1 000, 200 000
        const formatted = Math.abs(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        // Thêm dấu "+" hoặc "-"
        return (num < 0 ? '- ' : '+ ') + formatted;
    };
     
    static rutGonNgay = (chuoiNgay) => {
        if (!chuoiNgay) return '';
        const parts = chuoiNgay.split('.');
        if (parts.length !== 3) return chuoiNgay; // nếu không đúng định dạng thì trả nguyên

        const [ngay, thang] = parts;
        return `${ngay}.${thang}`;
    };


}

export default CommonUtils;