import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAllPosition, getAllJob } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import { getLichByUser } from '../../../../services/lich';
import ModalCongthem from './ModalCongthem';

class ModalInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
             lichTheoTuan: {}, // { week: [lich1, lich2, ...] },
              lichDaLuu: [],
              onAddCongthem : false,
              selectedLich: null // dùng để xác định item đang được chọn
        }
    }

    async componentDidMount() {
        console.log(this.props.user.id)
        await this.getlichbyuser(this.props.user.id)
    }
    
     gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    chiaLichTheoTuan = (lichArray) => {
        const grouped = {};

        lichArray.forEach(item => {
            const dayMoment = moment(item.ngay);
            const startOfWeek = dayMoment.clone().startOf('isoWeek'); // Thứ 2 của tuần
            const weekKey = startOfWeek.format('YYYY-MM-DD');

            if (!grouped[weekKey]) {
                grouped[weekKey] = [];
            }
            grouped[weekKey].push(item);
        });

        return Object.values(grouped); // Trả về mảng các tuần
    };



    gopCa = (item) => {
        const ca = [];
        if (item.ca1 === '1') ca.push('Ca 1');
        if (item.ca2 === '1') ca.push('Ca 2');
        if (item.ca3 === '1') ca.push('Ca 3');
        if (item.ca4 === '1') ca.push('Ca 4');
        return ca.length > 0 ? ca.join(' + ') : '—';
    };

    dinhDangNgay = (ngay) => {
        const thuVN = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const m = moment(ngay);
        return `${thuVN[m.day()]} _ ${m.date()}.${m.month() + 1}`;
    };


    getlichbyuser = async (id) => {
        let res = await getLichByUser(id);
        if(res && res.errCode === 0){
            this.setState({ lichDaLuu: res.data });
        }
        else this.setState({ lichDaLuu: [] });
    }

    // viết tắt chức vụ
    vietTatChucVu = (chucVu) => {
        if (!chucVu) return '';

        const chuThuong = chucVu.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const tu = chuThuong.split(' ');

        const vietTat = tu.map(t => t[0]).join('') + ' _ ';
        return vietTat;
    };

    rutGonNgay = (chuoi) => {
        if (!chuoi) return '';
        // Tách chuỗi theo " _ "
        const [thu, ngayThangNam] = chuoi.split(' _ ');
        if (!thu || !ngayThangNam) return chuoi;
        // Tách ngày/tháng/năm
            const [ngay, thang] = ngayThangNam.split('.');
        // Trả về chuỗi rút gọn
        return `${thu} _ ${ngay}.${thang}`;
    };


    // format phone
    formatPhone = (phone) => {
        if (!phone) return '';
        
        // Xóa tất cả ký tự không phải số
        const digits = phone.replace(/\D/g, '');

        // Tách thành nhóm 4 số
        const parts = digits.match(/.{1,4}/g);

        // Ghép các nhóm lại bằng dấu chấm
        return parts ? parts.join('.') : '';
    };

    formatNumberWithSpace(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    multiplyAndFormat(a, b) {
        const result = a * b;
        return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    renderLichTuan = (tuan, index) => {
        // Lọc các ngày có ít nhất 1 ca
        const ngayCoCa = tuan.filter(item =>
            item.ca1 === '1' || item.ca2 === '1' || item.ca3 === '1' || item.ca4 === '1'
        );

        if (!ngayCoCa || ngayCoCa.length === 0) return null; // Nếu tuần không có ngày nào có ca, bỏ qua luôn

        return (
            <div key={index}>
                <table className="table table-bordered">
                    <tbody>
                        {ngayCoCa.map((item, i) => (
                            <tr key={i}>
                                <td>{this.dinhDangNgay(item.ngay)} _ {this.gopCa(item)}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    onaddcongthem = (item) => {
        this.setState(prevState => ({
            selectedLich: prevState.selectedLich && prevState.selectedLich.ngay === item.ngay ? null : item
        }));
    }

    render() {
        const cacTuan = this.chiaLichTheoTuan(this.state.lichDaLuu || []);
        return (
            <div className='modal-user'>
                <div className='modal-user-add-container'>
                    <div className='close'>
                        <i className="fa-solid fa-circle-xmark" onClick={() => this.props.onmodalinfo('')}></i>
                    </div>
                    <div className='name mt-3'>{this.vietTatChucVu(this.props.user.positionUser.name)} {this.props.user.name} ( {this.formatPhone(this.props.user.phone)} )</div>
                    <div className='modal-info-content'>- lương : <span>{this.formatNumberWithSpace(this.props?.user?.jobUser?.money)}</span> / 1 giờ x 4 tiếng = <span>{this.multiplyAndFormat(this.props?.user?.jobUser?.money, 4)}</span> </div>
                            <div className='modal-info-content'>- thời gian : CA1 ( 9h00 - 13h00 ) , CA2 ( 13h00 - 17h00 ) , CA3 ( 17h00 - 21h00 ) </div>
                            <div className='modal-info-content'> - nghỉ các ngày lễ 2/9 , 30/4 , 1/5 , tết 28 - 5 ( âm lịch ) nếu làm _ 30 000 / 1 giờ</div>
                              {cacTuan.map((tuan, index) => {
                                    const ngayCoCa = tuan.filter(item =>
                                    item.ca1 === '1' || item.ca2 === '1' || item.ca3 === '1' || item.ca4 === '1'
                                );

                                if (!ngayCoCa || ngayCoCa.length === 0) return null;

                                return (
                                    <div key={index}>
                                        <table className="table table-bordered">
                                            <tbody>
                                                {ngayCoCa.map((item, i) => (
                                                    <tr key={i}>
                                                        <td className='lichtuan-item' onClick={() => this.onaddcongthem(item)}>{this.dinhDangNgay(item.ngay)} _ {this.gopCa(item)} <span className='themcongthem'><i class="fa-solid fa-plus"></i></span>
                                                            {this.state.onAddCongthem === true && 
                                                                <ModalCongthem 
                                                                    onaddcongthem = {this.onaddcongthem}
                                                                />
                                                            }
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            })}

                            
                </div>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalInfo));
