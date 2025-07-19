import db from "../models";

const createCongthem = async (data) => {
    try {
        const { userid, ngay, congthem, thanhtien } = data;

        if (!userid || !ngay || congthem === undefined || thanhtien === undefined) {
            return {
                errCode: 1,
                errMessage: "Thiếu thông tin bắt buộc!",
            };
        }

        // Kiểm tra nếu đã có bản ghi => cập nhật, chưa có => tạo mới
        const existing = await db.Congthem.findOne({
            where: { userid, ngay },
        });

        if (existing) {
            await db.Congthem.update(
                { congthem, thanhtien },
                { where: { userid, ngay } }
            );
        } else {
            await db.Congthem.create({ userid, ngay, congthem, thanhtien });
        }

        return {
            errCode: 0,
            message: "Lưu công thêm thành công",
        };
    } catch (e) {
        console.error(e);
        return {
            errCode: -1,
            errMessage: "Lỗi server",
        };
    }
};

const getCongthemByUserAndNgay = async (userid, ngay) => {
    try {
        if (!userid || !ngay) {
            return {
                errCode: 1,
                errMessage: "Thiếu userid hoặc ngày",
            };
        }

        const cong = await db.Congthem.findOne({
            where: { userid, ngay },
        });

        return {
            errCode: 0,
            data: cong || null,
        };
    } catch (e) {
        console.error(e);
        return {
            errCode: -1,
            errMessage: "Lỗi server",
        };
    }
};


module.exports = {
    createCongthem: createCongthem,
    getCongthemByUserAndNgay : getCongthemByUserAndNgay
}