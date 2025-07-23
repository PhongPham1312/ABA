import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAllPosition, getAllJob } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import { getLichByUser, updateLichStatus, ketthuctuan } from '../../../../services/lich';
import { getallcongthem , updateStatusAll } from '../../../../services/congthem';
import ModalCongthem from './ModalCongthem'

class ModalInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
             lichTheoTuan: [], // { week: [lich1, lich2, ...] },
              lichDaLuu: [],
              onAddCongthem : false,
              selectedLich: null, // dùng để xác định item đang được chọn
              congThemTheoNgay: [],
              ngayDaXacNhan: [], // lưu danh sách ngày đã xác nhận
              mocongthem: false,
              xacnhanthanhtoan: false,
              ngaythanhtoan:'...'
        }
    }

    async componentDidMount() {
        await this.getlichbyuser(this.props.user.id)
        await this.getallcongthembyuser(this.props.user.id);
        /* this.mergeCongThem(); */
    }

    tinhTongTienNgay = (item, money) => {
        let tienCa = 0;
        if (item.ca1 === '1') tienCa += this.props?.user?.jobUser?.money * 4;
        if (item.ca2 === '1') tienCa += this.props?.user?.jobUser?.money * 4;
        if (item.ca3 === '1') tienCa += this.props?.user?.jobUser?.money * 4;
        if (item.ca4 === '1') tienCa += this.props?.user?.jobUser?.money * 4;

        const congThem = this.state.congThemTheoNgay.find(ct => ct.ngay === item.ngay);
        const tienCongThem = congThem ? parseInt(congThem.thanhtien || 0) : 0;
        return tienCa + tienCongThem;
    };



   /*  mergeCongThem = () => {
        const { lichTheoTuan, congThemTheoNgay } = this.state;

        const lichMoi = lichTheoTuan.map((ngay) => {
            const cong = congThemTheoNgay.find((c) => c.ngay === ngay.ngay);
            return {
            ...ngay,
            congthem: cong ? cong.congthem : null
            };
        });

        this.setState({ lichTheoTuan: lichMoi });
        }; */

    getallcongthembyuser = async (id) => {
        let res = await getallcongthem(id)
        if (res && res.errCode === 0) {
            this.setState({ congThemTheoNgay: res.data });
        } else {
            this.setState({ congThemTheoNgay: [] });
        }
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
            const startOfWeek = dayMoment.clone().startOf('week'); // CHỦ NHẬT là ngày bắt đầu
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
        console.log(id)
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

    onaddcongthem = (item, e) => {
        this.setState({
            onAddCongthem: true,
        });
    }

    closeModalCongthem = () => {
        this.setState({
            onAddCongthem: false,
            selectedItem: null,
        });
    }
        getThanhTienTheoNgay = (ngay) => {
        const record = this.state.congThemTheoNgay.find(item => item.ngay === ngay);
        return record ? record.thanhtien : 0;
    };

    tinhSoCa = (item) => {
        let count = 0;
        if (item.ca1 === '1') count++;
        if (item.ca2 === '1') count++;
        if (item.ca3 === '1') count++;
        if (item.ca4 === '1') count++;
        return count;
    };

    formatNumberWithSpace = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    handleXacNhan = async (item) => {
        const { userid, ngay } = item;

    // Gọi API để set status = true
            const res = await updateLichStatus(userid, ngay);
           /*  await updateStatusAll(userid, ngay); */

            if (res && res.errCode === 0) {
                // Cập nhật vào state để hiện tổng tiền
                await this.getlichbyuser(this.props.user.id)
                await this.getallcongthembyuser(this.props.user.id);
                toast.success("cập nhật thành công")
            } else {
                toast.error('Cập nhật trạng thái thất bại!');
            }
            this.setState(prevState => ({
                ngayDaXacNhan: [...prevState.ngayDaXacNhan, ngay]
            }));
    };

    onModalcongthem = (item) => {
        this.setState({
            mocongthem: !this.state.mocongthem,
            usercongthem: item
        })

    }

    tinhTongTienTuan = (tuan, money) => {
        return tuan.reduce((tong, item) => {
            console.log(money)
            let tien = 0;

            // Tính tiền các ca
            if (item.ca1 === '1') tien += money * 4;
            if (item.ca2 === '1') tien += money * 4;
            if (item.ca3 === '1') tien += money * 4;
            if (item.ca4 === '1') tien += money * 4;

            // Tính tiền cộng thêm
            const congThem = this.state.congThemTheoNgay.find(ct => ct.ngay === item.ngay);
            const tienCongThem = congThem ? parseInt(congThem.thanhtien || 0) : 0;

            return tong + tien + tienCongThem;
        }, 0);
    };


    thanhtoan = () => {
        this.setState({
            xacnhanthanhtoan : !this.state.xacnhanthanhtoan
        })
    }

    goiXacNhanKetThucTuan = async (userid, danhSachNgay) => {
        let dsNgay = danhSachNgay.map(item => item.ngay);
        console.log(dsNgay)
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // tháng từ 0–11
        const day = String(today.getDate()).padStart(2, '0');

        let ngay = `${day}.${month}`;
        const res = await ketthuctuan(userid, dsNgay);
            if (res && res.errCode === 0) {
                toast.success('Xác nhận kết thúc tuần thành công!');
                this.setState({
                    ngaythanhtoan: ngay
                })
                await this.getlichbyuser(this.props.user.id)
                await this.getallcongthembyuser(this.props.user.id);
                this.thanhtoan()

            } else {
                toast.error('Xác nhận thất bại!');
                this.setState({
                    ngaythanhtoan:'...'
                })
            }
    };


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
                                return (
                                    <div key={index}>
                                        <table className="table table-bordered">
                                            <tbody>
                                                {tuan.sort((a, b) => new Date(a.ngay) - new Date(b.ngay))
                                                    .map((item, i) => (
                                                    <tr key={i}>
                                                        <td
                                                            className="lichtuan-item"
                                                            onClick={(e) => this.onaddcongthem(item, e)}
                                                        >
                                                            {this.dinhDangNgay(item.ngay)}
                                                            {
                                                                (item.ca1 === '1' || item.ca2 === '1' || item.ca3 === '1' || item.ca4 === '1') &&
                                                                ` _ ${this.gopCa(item)}`
                                                            }
                                                            {
                                                                Array.isArray(this.state.congThemTheoNgay) &&
                                                                this.state.congThemTheoNgay
                                                                    .filter(ct => ct.ngay === item.ngay)
                                                                    .map((ct, idx) => {
                                                                        const coCa = item.ca1 === '1' || item.ca2 === '1' || item.ca3 === '1' || item.ca4 === '1';
                                                                        return (
                                                                            <span key={idx}>
                                                                                {coCa ? ' + ' : ' _ '}
                                                                                {ct.congthem}
                                                                            </span>
                                                                        );
                                                                    })
                                                            }
                                                            <span className="themcongthem">
                                                                <i className="fa-solid fa-pen" onClick={() => this.onModalcongthem(item)}></i>
                                                            </span>
                                                             {/* Nút xác nhận chỉ hiện nếu có ca hoặc cộng thêm */}
                                                            {
                                                                (item.ca1 === '1' || item.ca2 === '1' || item.ca3 === '1' || item.ca4 === '1' ||
                                                                this.state.congThemTheoNgay.some(ct => ct.ngay === item.ngay)) && (
                                                                   !item.status &&
                                                                    <span className='xacnhan' onClick={() => this.handleXacNhan(item)}>
                                                                        <i className="fa-solid fa-right-from-bracket"></i>
                                                                    </span>
                                                                )
                                                            }
                                                                                                                                                                        </td>
                                                        <td>
                                                            {item.status ?  
                                                                <span className='tien'> {this.formatNumberWithSpace(this.tinhTongTienNgay(item))}</span> : "..."
                                                            }
                                                        </td>
                                                    </tr>
                                                ))}
                                                    <tr>
                                                        <td className='thanhtoan'><div>tổng : ( AS : { tuan.every(item => item.endtuan === '0') ? this.state.ngaythanhtoan: '...'} ) </div>
                                                        {/* Nếu tất cả endtuan = '0' và chưa xác nhận thanh toán */}

                                                            {tuan.every(item => item.endtuan === '0') && this.state.xacnhanthanhtoan === false && (
                                                                <span onClick={() => this.goiXacNhanKetThucTuan(this.props.user?.id, tuan)}>
                                                                    <span>Đã thanh toán</span>
                                                                </span>
                                                            )}

                                                        </td>
                                                        {tuan.every(item => item.endtuan === '1') ? 
                                                        <td><strong>{this.formatNumberWithSpace(this.tinhTongTienTuan(tuan, this.props?.user?.jobUser?.money))}</strong></td> :
                                                        <td>... </td>    
                                                    }
                                                    </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            })}


                            {this.state.mocongthem === true && 
                                <ModalCongthem 
                                    onModalcongthem = {this.onModalcongthem}
                                    user = {this.state.usercongthem}
                                    getlichbyuser = {this.getlichbyuser}
                                    getallcongthembyuser = {this.getallcongthembyuser}
                                />
                            }
                            
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
