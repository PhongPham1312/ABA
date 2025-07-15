import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class ModalAS extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }   

    async componentDidMount() {

    }

    // định dạng giá tiền
    formatNumber = (value) => {
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


    render() {
        return (
            <div className="modal-thuchi">
                <div className='modal-thuchi-container'>
                    {/* header */}
                    <div className='close'><i class="fa-solid fa-circle-xmark"></i></div>
                    <div className='header'>{this.props.typeModal}</div>

                    {/* content */}
                    <div className='modal-thuchi-form'>
                        <label>ngày</label>
                        <input type='text' name="ngày"
                            value={this.state.ngay}
                            onKeyDown={this.handleEnterPress}
                            onChange={this.handleInputChange}
                            placeholder='nhập ngày'/>
                    </div>

                    <div className='modal-thuchi-form'>
                        <label>nội dung</label>
                        <input type='text' name="content"
                            value={this.state.content}
                            onKeyDown={this.handleEnterPress}
                            onChange={this.handleInputChange}
                            placeholder='nội dung thu chi   '/>
                    </div>

                    <div className='modal-thuchi-form'>
                        <label>thu chi</label>
                        <input type='text' name="money"
                            value={this.state.money}
                            onKeyDown={this.handleEnterPress}
                            onChange={this.handleInputChange}
                            placeholder='thu chi   '/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalAS));
