import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import CommonUtils from '../../../../../utils/CommonUtils';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { getAllCustomer, createCustomer, getAllLoaiMay } from '../../../../../services/userService';

class Modal extends Component {

    constructor(props){
        super(props);
        this.state = {
            thang: '',
            onModal: false,
            ngaymua: '',
            selectedOptionnguoimua: null,
            optionnguoimua: [],
            selectedOptiondienthoai: null,
            optiondienthoai: [],
            selectedOptionloaimay: null,
            optionloaimay: [],
            optionHinhThucThu : [
                {value: 'AS', label: "AS"},
                {value: 'TM', label: "TM"}
            ],
            selectedHinhThucThu: '',
            hinhthucthungay:''
        }
    }


     async componentDidMount() {
        this.setState({
            thang: CommonUtils.getCurrentMonth()
        })
        this.getNgayThangNam()
        await this.getallcustomer()
        await this.getallmay()
    }

    getallmay = async () => {
        let res = await getAllLoaiMay();
        if (res && res.errCode === 0 && res.giaList.length > 0) {
            let datanguoiban = [];
            res.giaList.forEach((item) => {
                datanguoiban.push({
                    label: item.name,
                    value: item.name,
                });
            });

            this.setState({
                optionloaimay: datanguoiban,
            });
        } else {
            this.setState({
                optionloaimay: [],
            });
        }
    }

    // get all customer
    getallcustomer = async () => {
        let res = await getAllCustomer();
        if (res && res.errCode === 0 && res.customers.length > 0) {
            let datanguoiban = [];
            let datadienthoainguoiban = [];

            res.customers.forEach((item) => {
                datanguoiban.push({
                    label: `${item.name} _ ${this.formatSoDienThoai(item.phone)}`,
                    value: item.name,
                });

                datadienthoainguoiban.push({
                    label: this.formatSoDienThoai(item.phone),
                    value: item.phone,
                });
            });

            this.setState({
                optionnguoimua: datanguoiban,
                optiondienthoai: datadienthoainguoiban,
            });
        } else {
            this.setState({
                optionnguoimua: [],
                optiondienthoai: [],
            });
        }
    };


    formatSoDienThoai = (so) => {
        if (!so) return '';
        const cleaned = so.replace(/\D/g, ''); // bỏ ký tự không phải số

        if (cleaned.length !== 10) return so; // nếu không đúng 10 số thì trả nguyên

        const phan1 = cleaned.slice(0, 4);
        const phan2 = cleaned.slice(4, 8);
        const phan3 = cleaned.slice(8);

        return `${phan1}.${phan2}.${phan3}`;
    };

    // lấy ngày thnáng năm hiện tại
    getNgayThangNam = () => {
        const today = new Date();
        const ngay = today.getDate();
        const thang = today.getMonth() + 1; // Tháng bắt đầu từ 0
        const nam = today.getFullYear();
        this.setState({
            ngaymua: `${ngay}.${thang}.${nam}`,
            hinhthucthungay: `${ngay}.${thang}.${nam}`
        })
    };

    // select
    // khi chọn người bán
    handleChange = (field, newValue) => {
        this.setState({ [field]: newValue });
    };

    // khi tạo mới người bán
    handleCreate = (fieldOption, fieldValue, inputValue) => {
        const newOption = {
            value: inputValue.toLowerCase().replace(/\s+/g, '-'),
            label: inputValue,
        };

        this.setState((prevState) => ({
            [fieldOption]: [...prevState[fieldOption], newOption],
            [fieldValue]: newOption,
        }));
    };

    handleAddDon = async () =>{
        console.log(this.state)
        /* await createCustomer({
            name: this.state.selectedOptionnguoimua.value,
            phone: this.state.selectedOptiondienthoai.value,
            type: 'khách điện thoại'
        }) */
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    formatNumberWithSpace = (value) => {
        if (!value) return '';
        // Bỏ các dấu cách cũ
        const number = value.toString().replace(/\s+/g, '');
        // Format lại với dấu cách
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    handleGiaChange = (event) => {
        const rawValue = event.target.value.replace(/\s+/g, ''); // bỏ khoảng trắng
        if (!/^\d*$/.test(rawValue)) return; // chỉ cho nhập số

        const formatted = this.formatNumberWithSpace(rawValue);
        this.setState({ gia: formatted });
    };

    render() {
        return (
            <div className="modal-phone">
                <div className='modal-container'>
                    <div className='close'>
                        <i className="fa-solid fa-circle-xmark" onClick={() => this.props.handleOnModal('')}></i>
                    </div>
                    <div className='header'>{this.props.header}</div>

                    {/* thông tin người bán */}
                    <div className='form-content'>
                        <div className='form-content-item'>
                            <label>ngày</label>
                            <input type='text'  
                                value={CommonUtils.rutGonNgay(this.state.ngaymua)}
                                name='ngaymua'
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className='form-content-item form-content-item1'>
                            <label>người bán</label>
                            <CreatableSelect
                                isClearable
                                onChange={(val) => this.handleChange('selectedOptionnguoimua', val)}
                                onCreateOption={(val) =>
                                    this.handleCreate('optionnguoimua', 'selectedOptionnguoimua', val)
                                }
                                options={this.state.optionnguoimua}
                                value={this.state.selectedOptionnguoimua}
                            />
                        </div>

                        <div className='form-content-item form-content-item1'>
                            <label>điện thoại</label>
                            <CreatableSelect
                                isClearable
                                onChange={(val) => this.handleChange('selectedOptiondienthoai', val)}
                                onCreateOption={(val) =>
                                    this.handleCreate('optiondienthoai', 'selectedOptiondienthoai', val)
                                }
                                options={this.state.optiondienthoai}
                                value={this.state.selectedOptiondienthoai}
                            />
                        </div>
                    </div>

                    <div className='form-content-item form-content-item1'>
                            <label>tên máy</label>
                            <CreatableSelect
                                isClearable
                                onChange={(val) => this.handleChange('selectedOptionloaimay', val)}
                                onCreateOption={(val) =>
                                    this.handleCreate('optionloaimay', 'selectedOptionloaimay', val)
                                }
                                options={this.state.optionloaimay}
                                value={this.state.selectedOptionloaimay}
                            />
                    </div>

                    <div className='form-content-item'>
                            <label>số máy</label>
                            <input type='text'  
                                value={this.state.somay}
                                name='somay'
                                onChange={this.handleInputChange}

                            />
                    </div>

                    <div className='form-content-item'>
                            <label>số sêri</label>
                            <input type='text'  
                                value={this.state.seri}
                                name='seri'
                                onChange={this.handleInputChange}
                            />
                    </div>


                    <div className='form-content'>
                        <div className='form-content-item'>
                            <label>giá</label>
                            <input className='input-gia' type='text'  
                                value={this.state.gia}
                                name='gia'
                                onChange={this.handleGiaChange}
                            />
                        </div>

                        <div className='form-content-item'>
                            <label>hình thức chi</label>
                            <Select 
                                isClearable
                                options={this.state.optionHinhThucThu}
                                value={this.state.selectedHinhThucThu}
                                onChange={(selectedOption) =>
                                    this.setState({ selectedHinhThucThu: selectedOption })
                                }
                            />
                        </div>

                        <div className='form-content-item form-content-item1'>
                            <label>ngày</label>
                            <input className='input-gia' type='text'  
                                value={CommonUtils.rutGonNgay(this.state.hinhthucthungay)}
                                name='hinhthucthungay'
                                onChange={this.handleInputChange}
                            />
                        </div>

                    </div>


                    <div className='btn'>
                        <button onClick={this.handleAddDon}>thêm</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
