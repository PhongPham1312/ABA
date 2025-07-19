import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Select from 'react-select';
import { getAllPosition, getAllJob } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import { createOrUpdateLich , getLichByUserAndRange } from '../../../../services/lich';

class ModalLenLich extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            phone: '',
            password: '',
            ListPosition: [],
            ListJob: [],
            selectPosition: '',
            selectJob: '',
            currentWeek:[],
            nextWeek: [],
            lichHienThi: [], // 👉 THÊM DÒNG NÀY
            lichDaLuu: [] // để chứa lịch đã lưu
        }
    }

    async componentDidMount() {
        this.getCurrentAndNextWeek()
        await this.getalljob()
        await this.getallposition()
        await this.fetchLichDaLuu();
    }

    isCaChecked = (ngay, ca) => {
        const found = this.state.lichDaLuu.find(l => l.ngay === ngay);
        return found && found[ca] === '1';
    };

    fetchLichDaLuu = async () => {
        const userId = this.props.user.id;
        const { currentWeek, nextWeek } = this.state;
        console.log( this.props.user.id, currentWeek, nextWeek )

        const getRange = (week) => {
            if (week.length === 0) return [null, null];
            return [week[0].date, week[week.length - 1].date];
        };

        const [start, end] = getRange([...currentWeek, ...nextWeek]);

        if (start && end) {
            const res = await getLichByUserAndRange(userId, start, end);
            if (res && res.errCode === 0) {
                this.setState({ lichDaLuu: res.data });
            }
        }

        
    };

    getCurrentAndNextWeek = () => {
        const currentWeek = [];
        const nextWeek = [];

        const thuVN = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

        const startOfWeek = moment().startOf('isoWeek'); // Thứ 2 tuần hiện tại

        for (let i = 0; i < 7; i++) {
            const currentDate = startOfWeek.clone().add(i, 'days');
            const nextDate = startOfWeek.clone().add(i + 7, 'days');

            const formatNgay = (date) =>
            `${thuVN[date.day()]} _ ${date.date()}.${date.month() + 1}.${date.year()}`;

            currentWeek.push({
            display: formatNgay(currentDate),
            date: currentDate.format('YYYY-MM-DD'),
            });

            nextWeek.push({
            display: formatNgay(nextDate),
            date: nextDate.format('YYYY-MM-DD'),
            });
        }
        this.setState({
            currentWeek: currentWeek,
            nextWeek: nextWeek,
            lichHienThi: [...currentWeek, ...nextWeek] // 👉 Gộp cả 2 tuần
        })
    };
        
    
     gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    // position
    getallposition = async () => {
        let res = await getAllPosition();
        if(res && res?.errCode === 0){
            let options = res.data.map(item => ({
                label: item.name,
                value: item.id,
            }));
            this.setState({
                ListPosition: options
            })
        }
        else this.setState({
            ListPosition: []
        })
    }

    // job
    getalljob = async () => {
        let res = await getAllJob();
        if(res && res?.errCode === 0){
            let options = res.data.map(item => ({
                label: item.name,
                value: item.id,
            }));
            this.setState({
                ListJob: options
            })
        }
        else this.setState({
            ListJob: []
        })
    }


    // xử lý nhập
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Handle Select
    handleChangeSelect = (selectedOption, type) => {
        this.setState({
            [type]: selectedOption
        });
    }

    // luu lich lam
    handleSaveLichTuanHienTai = async () => {
        await this.luuLichTheoDanhSach(this.state.lichHienThi.slice(0, 7));
    };

    handleSaveLichTuanToi = async () => {
        await this.luuLichTheoDanhSach(this.state.lichHienThi.slice(7));
    };

    luuLichTheoDanhSach = async (danhSachLich) => {
        const form = document.querySelector('.modal-user-add-container');
        const dataLich = [];
        const userId = this.props.user.id;

        for (let item of danhSachLich) {
            const date = item.date;
            const ca1 = form.querySelector(`input[name="ca1-${date}"]`)?.checked ? 1 : 0;
            const ca2 = form.querySelector(`input[name="ca2-${date}"]`)?.checked ? 1 : 0;
            const ca3 = form.querySelector(`input[name="ca3-${date}"]`)?.checked ? 1 : 0;
            const ca4 = form.querySelector(`input[name="ca4-${date}"]`)?.checked ? 1 : 0;

            dataLich.push({ userId, ngay: date, ca1, ca2, ca3, ca4 });
        }

            const res = await createOrUpdateLich(dataLich);
            if (res && res.errCode === 0) {
                toast.success('Lưu lịch làm việc thành công');
                await this.fetchLichDaLuu(); // ✅ cập nhật lại lịch đã lưu
                this.props.onLenLich('');
            } else {
                toast.error('Lưu lịch thất bại');
            }
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






    render() {
        const thuVN = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const today = moment();
        const startOfWeek = today.clone().startOf('isoWeek');
        const isShowNextWeek = today.day() === 5 || today.day() === 6 || today.day() === 0;

        // Chia lịch thành 2 mảng
        const lichHienTai = this.state.lichHienThi.slice(0, 7);
        const lichTuanToi = this.state.lichHienThi.slice(7);

        return (
            <div className='modal-user'>
                <div className='modal-user-add-container'>
                    <div className='close'>
                        <i className="fa-solid fa-circle-xmark" onClick={() => this.props.onLenLich('')}></i>
                    </div>
                    <div className='header mt-3'>{this.props?.header}</div>

                    {/* Danh sách tuần kế tiếp (nếu có) */}
                    {isShowNextWeek && (
                        <>
                            <h5>📅 Tuần kế tiếp</h5>
                            <table className="table table-bordered">
                                <tbody>
                                    {lichTuanToi.map((item, index) => (
                                        <tr key={index}>
                                            <td>{this.rutGonNgay(item.display)}</td>
                                            <td>
                                                <input defaultChecked={this.isCaChecked(item.date, 'ca1')} name={`ca1-${item.date}`} type="checkbox" /> Ca 1
                                                <input defaultChecked={this.isCaChecked(item.date, 'ca2')} name={`ca2-${item.date}`} type="checkbox" className="ms-2" /> Ca 2
                                                <input defaultChecked={this.isCaChecked(item.date, 'ca3')} name={`ca3-${item.date}`} type="checkbox" className="ms-2" /> Ca 3
                                                <input defaultChecked={this.isCaChecked(item.date, 'ca4')} name={`ca4-${item.date}`} type="checkbox" className="ms-2" /> Ca 4
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    <div className='btn-modal'>
                        <div onClick={this.handleSaveLichTuanToi}>Thêm</div>
                    </div>

                    {/* Danh sách tuần hiện tại */}
                    <h5>📅 Tuần hiện tại</h5>
                    <table className="table table-bordered">
                        <tbody>
                            {lichHienTai.map((item, index) => (
                                <tr key={index}>
                                    <td>{this.rutGonNgay(item.display)}</td>
                                    <td>
                                        <input defaultChecked={this.isCaChecked(item.date, 'ca1')} name={`ca1-${item.date}`} type="checkbox" /> Ca 1
                                        <input defaultChecked={this.isCaChecked(item.date, 'ca2')} name={`ca2-${item.date}`} type="checkbox" className="ms-2" /> Ca 2
                                        <input defaultChecked={this.isCaChecked(item.date, 'ca3')} name={`ca3-${item.date}`} type="checkbox" className="ms-2" /> Ca 3
                                        <input defaultChecked={this.isCaChecked(item.date, 'ca4')} name={`ca4-${item.date}`} type="checkbox" className="ms-2" /> Ca 4
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='btn-modal'>
                        <div onClick={this.handleSaveLichTuanHienTai}>Thêm</div>
                    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalLenLich));
