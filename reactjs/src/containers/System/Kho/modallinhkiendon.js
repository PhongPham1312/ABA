import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Khomanage.scss'
import { toast } from 'react-toastify';
import Select from 'react-select';
import { createlinhkiendon } from '../../../services/userService';

class ModalLinhkiendon extends Component {

    constructor(props){
        super(props);
        this.state = {
            listhinhthuc: [],
            selectedHinhthuc: '',
            donmay: '',
            linhkien: "",
            linhkienngay: '',
            linhkiengia: '',
            linhkienuser: '',
            loaitien: ''
        }
    }

    componentDidMount() {
        this.getTodayFormatted()
       this.setState({
            listhinhthuc : [
            {label: 'AS', value: '1'},
            {label: 'TM', value: '2'}
        ],
        donmay: this.props?.id
       })
    }

    // get ngày tháng
    getTodayFormatted = () => {
        const today = new Date();
        const day = today.getDate();        // Lấy ngày (1–31)
        const month = today.getMonth() + 1; // Lấy tháng (0–11) nên phải +1
        this.setState({linhkienngay: `${day}.${month}`})
    };

    // định dạng giá tiền
    formatNumber = (value) => {return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');};
    removeSpaces = (value) => {return value.replace(/\s/g, '');};
    // onchang input
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value/* .toUpperCase() */
        });
    };

    checkValue = () => {
        const { linhkien, linhkiengia, selectedHinhthuc } = this.state;

        if (!linhkien?.trim()) {
            window.confirm("Thiếu tên linh kiện!");
            return false;
        }

        if (!linhkiengia?.trim()) {
            window.confirm("Thiếu giá linh kiện!");
            return false;
        }

        if (!selectedHinhthuc || !selectedHinhthuc.label) {
            window.confirm("Thiếu hình thức chuyển!");
            return false;
        }

        return true;
    };


    // add kho
    handleAdd = async() => {
        if(this.checkValue() === true) {
            let res = await createlinhkiendon({
                donmay: this.state.donmay,
                linhkien: this.state.linhkien,
                linhkiengia: this.removeSpaces(this.linhkiengia),
                linhkienuser: this.state.linhkienuser,
                loaitien: this.state.selectedHinhthuc.label,
                linhkienngay: this.state.linhkienngay
            })

            if(res.errCode === 0){
                toast.success('cập nhật linh kiện thành công')
                await this.props.getalldon();
                this.props.onlinhkien()
            }
        }
    }

    handleEnterPress = async (e) => {
        if (e.key === 'Enter') {
           await this.handleAdd(); // Gọi hàm xử lý khi Enter
        }
    };

    render() {
        return (
          <div className='Modal'>
            <div className='modal-container'>
                {/* close modal */}

                <div className='close'>
                    <i class="fa-solid fa-circle-xmark" 
                    onClick={() => this.props.onlinhkien()}
                    ></i>
                </div>

                <div className='modal-input-form'>
                    <label>linh kiện</label>
                    <input type='text' name="linhkien"
                        value={this.state.linhkien}
                        onChange={this.handleInputChange}
                        placeholder='nhập tên linh kiện!'/>
                </div>

                <div className='modal-input-form'>
                    <label>giá</label>
                    <input type='text' name="linhkiengia"
                        value={this.formatNumber(this.state.linhkiengia)}
                        onChange={this.handleInputChange}
                        placeholder='nhập tên linh kiện!'/>
                </div>

                <div className='modal-input-form'>
                    <label>hình thức chuyển</label>
                    <Select
                        options={this.state.listhinhthuc}
                        value={this.state.selectedHinhthuc}
                        onChange={(selected) => this.setState({ selectedHinhthuc: selected })}
                        placeholder="Chọn hình thức"
                    />
                </div>

                <div className='modal-input-form'>
                    <label>người nhận</label>
                    <input type='text' name="linhkienuser"
                        value={this.state.linhkienuser}
                        onChange={this.handleInputChange}
                        placeholder='người nhận nếu có'/>
                </div>

                {/* btn  */}
                <div>
                    <button className="modal-add">
                        <div className='add' onClick={this.handleAdd}>Thêm</div>
                    </button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalLinhkiendon));
