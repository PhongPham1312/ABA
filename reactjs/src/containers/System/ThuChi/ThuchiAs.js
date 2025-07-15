import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './ThuChiNam.scss'
import CommonUtils from '../../../utils/CommonUtils';

class ThuChiAs extends Component {

    constructor(props){
        super(props);
        this.state = {
            thang:  '',
        }
    }   


    async componentDidMount() {
        this.setState({
            thang: CommonUtils.getCurrentMonth()
        })

    }

     gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
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
        let {listthuchi } = this.state
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>

                     {/* list user option */}
                    <div className='user-container kho-container'>
                        <ul>
                            <li className={this.props.match.path.toLowerCase().includes("as") === true ? 'li1' : ''} >AS</li>
                            <li onClick={() => this.gotolink(`thuchi-tm`)} className={this.props.match.path.toLowerCase().includes("tm") === true ? 'li1' : ''} >TM</li>
                        </ul>
                    </div>

                     {/* link name */}
                        <div className='m-2'>
                            <i class="fa-solid fa-arrow-left" onClick={() => this.gotolink(`home`)}
                            ></i> THU CHI AS THÁNG {this.state.thang}
                            </div>
                    
                    {/* list kho */}
                    <div className='list-user'>
                        <button className="btn-add-user" onClick={() => this.onModalthuchi('THÊM THU CHI')}>
                                <i className="fas fa-plus"></i> 
                            </button>

                        <div className='list-kho list-thuchi'>
                        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThuChiAs));
