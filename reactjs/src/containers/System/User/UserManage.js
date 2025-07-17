import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './UserManage.scss'
import Select from 'react-select';
import CommonUtils from '../../../utils/CommonUtils';
import { createUser, getAllUser , 
    getAllPosition, deleteUser ,
    getAllJob
} from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {listnamelink} from '../../../utils/constant'
class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            modal: false,
            name: '',
            phone: '',
            password: '',
            zalo: '',
            image_t: '',
            image_s: '',
            role: '',
            listPosition: [],
            selectedPosition: "",
            listJob: [],
            selectedJob: "",
            job: '',
            showMsg : '',
            hasZalo: true,
            listUser : [],
            linkName: "",
            modalInfo: false,
            useritem: '', 
            onLich: '',
            onLichsys: '',
            weekDays: [], // 🆕 thêm dòng này
            lichLam: {}
        }
    }

    async componentDidMount() {
        await this.getAllUser()
        this.setState({
            linkName: this.timTenTheoLink()
        })

    }

    // tìm namelink theo link
    timTenTheoLink = () => {
        const item = listnamelink.find(item => item.link === this.props.match?.url);
        return item ? item.name : null;
    };

    // get all user
    getAllUser = async () => {
        let res = await getAllUser();
        if (res && res.errCode === 0) {
                this.setState({
                    listUser: res.data
                })
            }
        else this.setState({
            listUser: []
        })
    }

    // check input phone zalo
    handleCheckboxChange = (e) => {
        this.setState({
            [e.target.name]: e.target.checked
        });
    }

    // get all position
    getAllPosition = async() => {
        let res = await getAllPosition();
        let result = [];
        if (res && res.data) {
            res.data.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                result.push(object);
            })
        }

        this.setState({
            listPosition: result
        })
    }

    // get all job
    getAllJob = async() => {
        let res = await getAllJob();
        let result = [];
        if (res && res.data) {
            res.data.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                result.push(object);
            })
        }

        this.setState({
            listJob: result
        })

    }


    // onchange select
    handleChangeSelect = (selected, type) => {
        if (type === 'position') {
            this.setState({
                selectedPosition: selected,
                role: selected ? selected.value : ''
            });
        }

        if (type === 'job') {
            this.setState({
                selectedJob: selected,
                job: selected ? selected.value : ''
            });
        }
    };


     gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    // change ảnh
    handleFileChange = (event, type) => {
    const file = event.target.files[0];
        if (file) {
            if (type === 'front') {
                this.setState({ frontFileName: file.name });
            } else if (type === 'back') {
                this.setState({ backFileName: file.name });
            }
        }
    }

    // on off modal
    handleOnModal = async () =>{
        await this.getAllPosition();
        await this.getAllJob();
        this.setState({
           modal: !this.state.modal 
        })
    }

    // xử lý nhập
    handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        this.setState(prevState => ({
            hasZalo: checked,
            zalo: checked ? prevState.phone : '' // nếu được check → lấy số phone, không thì xóa zalo
        }));
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            // Nếu đang check "Số này có Zalo" thì gán luôn zalo = phone
            this.setState(prevState => ({
                phone: value,
                zalo: prevState.hasZalo ? value : prevState.zalo
            }));
        } else {
            this.setState({
                [name]: value
            });
        }
    };

    // check input value
    checkInputValue = () => {
        const { name, phone, zalo, selectedPosition } = this.state;

        if (!name || name.trim() === '') {
            this.setState({
                showMsg: "Vui lòng nhập tên ! "
            })
            return false;
        }

        if (!zalo || zalo.trim() === '') {
            this.setState({
                showMsg: "Vui lòng nhập zalo ! "
            })
            return false;
        }

        if (!phone || phone.trim() === '') {
            this.setState({
                showMsg: "Vui lòng nhập số điện thoại ! "
            })
        }

        if (!zalo || zalo.trim() === '') {
            this.setState({
                showMsg: "Vui lòng nhập vị trí ! "
            })
        }

        if (!selectedPosition) {
            this.setState({
                showMsg: "Vui lòng nhập tên ! "
            })
        }

        return true; // Tất cả đều hợp lệ
    }

    // get name
    getLastName = (fullName) => {
        if (!fullName) return '';
        const parts = fullName.trim().split(/\s+/);
        return parts[parts.length - 1];
    };

    // bốn số cuối
    getLastFourDigits = (phoneNumber) => {
        if (!phoneNumber) return '';
        return phoneNumber.slice(-4);
    };

    // ghi tắt chức vụ
    generateShortCode = (text) => {
        if (!text) return '';
        // Tách từ, lấy chữ cái đầu tiên mỗi từ, viết thường
        const words = text.trim().split(/\s+/);
        const shortCode = words.map(word => word[0].toLowerCase()).join('');

        return shortCode + ' _ ';
    };

    // thêm người dùng
    handleAddUser = async () => {
        if(this.checkInputValue() === true) {
            let res = await createUser({
                name: this.state.name,
                phone: this.state.phone,
                password: this.getLastName(this.state.name)+this.getLastFourDigits(this.state.phone),
                zalo: this.state.zalo,
                image_t: this.state.image_t,
                image_s: this.state.image_s,
                role: this.state.role,
                job: this.state.job,
            })
            if (res && res.errCode === 0) {
                this.handleOnModal();
                await this.getAllUser();
                toast.success("Tạo nười dùng mới thành công!");
                this.setState({
                    name: '',
                    phone: '',
                    password: '',
                    zalo: '',
                    image_t: '',
                    image_s: '',
                    role: '',
                    job: '',
                })
                
            }
            else {
                this.handleOnModal();
                toast.error("Tạo người dùng mới không thành công!");
            }
        }
        
    }

    // onchange ảnh
    handleOnchangeImg = async (event, type) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            if (type === 'img-t') {
                this.setState({
                    image_t: base64,
                    frontFileName: file.name
                });
            } else if (type === 'img-s') {
                this.setState({
                    image_s: base64,
                    backFileName: file.name
                });
            }
        }
    };

    // delete user
     handleDeleteUser = async (id) => {
        if (!id) return;

        const confirm = window.confirm("Bạn có chắc chắn muốn ẩn người dùng này không?");
        if (!confirm) return;

        try {
            const res = await deleteUser(id);
            if (res && res.errCode === 0) {
                toast.success("Đã xóa người dùng thành công!");
               await this.getAllUser(); // gọi lại hàm load danh sách
            } else {
                toast.error(res.errMessage || "xóa người dùng thất bại");
            }
        } catch (error) {
            console.error(error);
            toast.error("Lỗi hệ thống khi xóa người dùng");
        }

     }

    formatPhone = (phone) => {
        if (!phone) return '';
        // Xóa khoảng trắng hoặc ký tự không phải số
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length !== 10) return phone; // nếu không phải 10 số thì giữ nguyên

        return `${cleaned.slice(0, 4)}.${cleaned.slice(4, 8)}.${cleaned.slice(8)}`;
    };

    onModalInfo = (item) => {
        this.setState({
            modalInfo : !this.state.modalInfo,
            useritem: item,
            onLich: ''
        })
    }

    formatMoney = (num) => {
        if (typeof num !== 'number') num = Number(num);
        return num.toLocaleString('fr-FR'); // dùng format của Pháp: dấu cách
    };

    multiplyAndFormat = (value, multiplier) => {
        if (!value || isNaN(value)) return '';
            const result = Number(value) * multiplier;

            return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

     onlich = (id) => {
        this.setState(prev => ({
            onLich: prev.onLich === id ? '' : id,
            onLichsys: false
        }));
    }

    onlichsys = (item) => {
        const weekDays = this.getWeekDays()
        this.setState(prev => ({
            onLichsys: !prev.onLichsys,
            onLich: '',
            useritem: item,
            weekDays // 🆕 gán danh sách ngày vào state
        }));
    };

    getWeekDays = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 (Chủ nhật) -> 6 (Thứ 7)

        // Lấy ngày đầu tuần (Thứ 2)
        const monday = new Date(today);
        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        monday.setDate(today.getDate() + diffToMonday);

        // Danh sách thứ
        const weekNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);

            const day = d.getDate();
            const month = d.getMonth() + 1;
            const year = d.getFullYear();
            const thu = weekNames[d.getDay()]; // Lấy thứ

            const formatted = `${thu} _ ${day}.${month}.${year}`;
            weekDays.push(formatted);
        }

        return weekDays;
    };


    getDayMonth = (dateString) => {
        if (!dateString) return '';
            const parts = dateString.split('.');
        if (parts.length < 2) return dateString;
            return `${parts[0]}.${parts[1]}`;
    };

    handleCheckLich = (day, ca) => {
        this.setState(prevState => {
            const lichLam = { ...prevState.lichLam };

            if (!lichLam[day]) {
                lichLam[day] = { CA1: false, CA2: false, CA3: false, CA4: false };
            }

            lichLam[day][ca] = !lichLam[day][ca];

            return { lichLam };
        });
    };


    handleSaveLich = async () => {
        const { lichLam, useritem } = this.state;
        const dataSend = [];

        Object.entries(lichLam).forEach(([day, caObj]) => {
            Object.entries(caObj).forEach(([ca, isChecked]) => {
                if (isChecked) {
                    dataSend.push({
                        userId: useritem.id,
                        day: `${day}.2025`, // nếu muốn thêm năm
                        ca: ca,
                    });
                }
            });
        });

        // Gửi dataSend lên server
        console.log(dataSend);

        // await saveLichUser(dataSend) // ← gọi API ở đây
        // toast.success("Đã lưu lịch làm!");
    };


    render() {
        let url = this.props.match.path === '/system/user-manage' ? true : false;
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                    {/* list user option */}
                    <div className='user-container'>
                        <ul>
                            <li onClick={() => this.gotolink('user-manage')} className={url === true ? 'li1' : ''}>NHÂN VIÊN</li>
                            <li onClick={() => this.gotolink('mark-manage')} className=''>SỈ DẮT MỐI</li>
                            <li onClick={() => this.gotolink('customer-manage')} className=''>KHÁCH HÀNG</li>
                        </ul>
                    </div>
                    <div className='m-2 header'>
                        <span><i class="fa-solid fa-arrow-left" onClick={() => this.gotolink('home')}></i> {this.state.linkName}</span>
                        <button className="btn-add-user" onClick={this.handleOnModal}><i className="fas fa-plus"></i> </button>
                    </div>

                    {/* list user */}
                    <div className='list-user'>
                        {this.state.listUser !== null && 
                                    this.state.listUser.map((item, index) => {
                                        return  (
                                            <li className='list-user-item'>
                                                <span>{this.generateShortCode(item.positionUser?.name) + item.name + ' _ ' + this.formatPhone(item.phone)}</span>
                                                <span className='list-user-item-span'>
                                                    <i class="fa-solid fa-arrow-right"  onClick={() => this.onlich(item.id)}></i>
                                                    {this.state.onLich === item.id &&
                                                        <ul>
                                                            <i class="fa-solid fa-circle-xmark" onClick={() => this.onlich('')}></i>
                                                            <li onClick={() => this.onlichsys(item)} > <i class="fa-solid fa-calendar-days"></i> lên lịch</li>
                                                            <li  onClick={() => this.onModalInfo(item)}> <i class="fa-solid fa-sack-dollar"></i> bảng lương</li>
                                                        </ul>
                                                    }
                                                </span>
                                            </li>
                                        )
                                    })
                                    
                                }

                    {/* modal len lich */}
                    {this.state.onLichsys === true && 
                        <div className='modal-info'>
                            <div className='modal-info-container'>
                            <span className='close-modal-info'>
                                <i className="fa-solid fa-circle-xmark" onClick={() => this.onlichsys('')}></i>
                            </span> 

                            <div className='header'>
                                {this.generateShortCode(this.state.useritem.positionUser?.name) + this.state.useritem.name} 
                                ( {this.formatPhone(this.state.useritem.phone)} )
                            </div>

                           <table className="table table-bordered">
                                <tbody>
                                    {this.state.weekDays.map((day, index) => {
                                    const shortDay = this.getDayMonth(day);
                                    const ca = this.state.lichLam[shortDay] || {};
                                    return (
                                        <tr key={index}>
                                        <td className='lenlich'>
                                            {shortDay} _{' '}
                                            <span>
                                            CA1 <input
                                                type="checkbox"
                                                checked={ca.CA1 || false}
                                                onChange={() => this.handleCheckLich(shortDay, 'CA1')}
                                            />
                                            </span>{' _ '}
                                            <span>
                                            CA2 <input
                                                type="checkbox"
                                                checked={ca.CA2 || false}
                                                onChange={() => this.handleCheckLich(shortDay, 'CA2')}
                                            />
                                            </span>{' _ '}
                                            <span>
                                            CA3 <input
                                                type="checkbox"
                                                checked={ca.CA3 || false}
                                                onChange={() => this.handleCheckLich(shortDay, 'CA3')}
                                            />
                                            </span>{' _ '}
                                            <span>
                                            CA4 <input
                                                type="checkbox"
                                                checked={ca.CA4 || false}
                                                onChange={() => this.handleCheckLich(shortDay, 'CA4')}
                                            />
                                            </span>
                                        </td>
                                        </tr>
                                    );
                                    })}
                                </tbody>
                                </table>
                                 <div className='div-btn'>
                                    <button className="btn-add-user" 
                                    onClick={this.handleSaveLich}>
                                         tạo
                                    </button>
                                </div>
                            </div>
                        </div>
                        }


                    {/* modal info */}
                     {this.state.modalInfo === true &&
                        <div className='modal-info'>
                            <div className='modal-info-container'>
                                 <span className='close-modal-info'><i class="fa-solid fa-circle-xmark" onClick={() => this.onModalInfo('')}></i></span>
                                <div className='header'>{this.generateShortCode(this.state.useritem.positionUser?.name) + this.state.useritem.name} ( {this.formatPhone(this.state.useritem.phone)} ) </div>
                                <div className='modal-info-content'>- lương : <span className='gia'>{this.formatMoney(this.state.useritem.jobUser.money)}</span> / 1 giờ x 4 tiếng = <span className='gia'>{this.multiplyAndFormat(this.state.useritem.jobUser.money, 4)}</span></div>
                                <div  className='modal-info-content'>- thời gian : CA1 (9h00 - 13h00 ) , CA2 ( 13h00 - 17h00 ) , CA3 ( 17h00 - 21h00 )</div>
                                <div  className='modal-info-content'>- nghỉ các ngày lễ 2/9 , 30/4 , 1/5 , tết 28 - 5 ( âm lịch ) nếu làm _ 30 000 / 1 giờ</div>

                                <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>15.7 _ CA2</td>
                                        <td>...</td>
                                    </tr>
                                    <tr>
                                        <td>16.7 _ CA2</td>
                                        <td>...</td>
                                    </tr>
                                    <tr>
                                        <td>17.7 _ CA2</td>
                                        <td>...</td>
                                    </tr>
                                    <tr>
                                        <td>18.7 _ CA2</td>
                                        <td>...</td>
                                    </tr>
                                    <tr>
                                        <td>19.7 _ CA2</td>
                                        <td>...</td>
                                    </tr>
                                    <tr >
                                        <td className='end-luong font-weight-bold'>tổng : <span>AS</span> : ... </td>
                                        <td className='enluong' >...</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </div>
                    }                   
                    </div>


                    {/* modal */}
                    {this.state.modal === true && 
                        <div className='modal-user'>
                        <div className='modal-user-container'>
                            <div className='modal-content-ss'>

                                {/* close */}
                                <span className='close-modal' onClick={this.handleOnModal}>x</span>

                                <div className='modal-user-header'>THÊM THÀNH VIÊN</div>
                                
                                {/* form thông tin */}
                                <div className='form-info'>
                                    {/* name */}
                                    <div className='input-info'>
                                        <label>Tên  </label>
                                        <input type='text'
                                         placeholder='Nhập tên thành viên'
                                         name='name'
                                         id='name'
                                         value={this.state.name}
                                         onChange={this.handleInputChange}
                                         />
                                         
                                    </div>

                                    {/* phone */}
                                    <div className='input-info'>
                                        <label className='dt'>Điện thoại</label>
                                        <input type='text'
                                         placeholder='Nhập số điện thoại thành viên'
                                         name='phone'
                                         id='phone'
                                         value={this.state.phone}
                                         onChange={this.handleInputChange}
                                         />
                                    </div>
                                    <div className="input-check">
                                            <input
                                                type="checkbox"
                                                id="hasZalo"
                                                name="hasZalo"
                                                checked={this.state.hasZalo}
                                                onChange={this.handleCheckboxChange}
                                            />
                                            <label htmlFor="hasZalo">Số này có Zalo</label>
                                        </div>
                                </div>

                                <div className='form-info'>
                                    {/* zalo */}
                                    <div className='input-info'>
                                            <label>Zalo</label>
                                            <input
                                                type='text'
                                                placeholder='Nhập Zalo'
                                                name='zalo'
                                                id='zalo'
                                                value={this.state.zalo}
                                                onChange={this.handleInputChange}
                                                disabled={this.state.hasZalo} // ⛔ khóa khi đang check
                                            />
                                    </div>

                                    {/* chức vụ */}
                                    <div className='input-info mt-1'>
                                        <label>Chức vụ</label>
                                        <Select
                                            value={this.state.selectedPosition}
                                            onChange={(selected) => this.handleChangeSelect(selected, 'position')}
                                            options={this.state.listPosition}
                                            placeholder="Chọn chức vụ"
                                        />
                                    </div>

                                    {/* công việc */}
                                    <div className='input-info'>
                                        <label>Vị trí</label>
                                        <Select
                                            value={this.state.selectedJob}
                                            onChange={(selected) => this.handleChangeSelect(selected, 'job')}
                                            options={this.state.listJob}
                                            placeholder="Chọn vị trí"
                                        />
                                    </div>
                                </div>

                                {/* add cccd */}
                               <div className='add-cccd'>
                                    <div className='cccd-t'>
                                        <label>Ảnh mặt trước</label>
                                        <label htmlFor="upload-front" className="upload-icon">
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        <input
                                            type="file"
                                            id="upload-front"
                                            accept="image/*"
                                            hidden
                                            onChange={(event) => this.handleOnchangeImg(event, 'img-t')}
                                        />
                                        {this.state.frontFileName && (
                                            <span className="file-name">{this.state.frontFileName}</span>
                                        )}
                                    </div>

                                    <div className='cccd-s'>
                                        <label>Ảnh mặt sau</label>
                                        <label htmlFor="upload-back" className="upload-icon">
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        <input
                                            type="file"
                                            id="upload-back"
                                            accept="image/*"
                                            hidden
                                            onChange={(event) => this.handleOnchangeImg(event, 'img-s')}
                                        />
                                        {this.state.backFileName && (
                                            <span className="file-name">{this.state.backFileName}</span>
                                        )}
                                    </div>
                                </div>

                                {/* show error message */}
                                {this.state.showMsg !== null && 
                                    <div className='error-message'>
                                        {this.state.showMsg}
                                </div>
                                }

                                {/* btn */}
                                <div className='div-btn'>
                                    <button className="btn-add-user" 
                                    onClick={this.handleAddUser}>
                                         Thêm
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManage));
