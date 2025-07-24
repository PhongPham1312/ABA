import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './ThuChiNam.scss'
import CommonUtils from '../../../utils/CommonUtils';
import ModalAS from './Modal/ModalAS';
import { getallasthang } from '../../../services/sacombank';
import { isEmpty } from 'lodash';
class ThuChiAs extends Component {

    constructor(props){
        super(props);
        this.state = {
            thang:  '',
            onModalAS: false,
            typeModal: "",
            listAS:[]
        }
    }   


    async componentDidMount() {
        this.setState({
            thang: CommonUtils.getCurrentMonth()
        })
        await this.getallthang(this.props.match.params.id)
    }

    getallthang = async (thang) => {
        let res = await getallasthang(thang)
        if (res && res.errCode === 0 && res.data) {
           this.setState({
            listAS: res.data
           })
        }
        else  this.setState({
            listAS: []
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

    onmodalas = (type) => {
        this.setState({
            onModalAS : !this.state.onModalAS,
            typeModal: type
        })
    }

    formatGioPhutGiay(dateString) {
        try {
            if (!dateString || typeof dateString !== 'string') return '';
            const parts = dateString.split(' ');
            if (parts.length !== 2) return '';
            const time = parts[1]; // "05:15:04"
            const [h, m, s] = time.split(':');
            if (!h || !m || !s) return '';
            return `${h}.${m}.${s}`;
        } catch (err) {
            console.error('Lỗi formatGioPhutGiay:', err);
            return '';
        }
    }

    
    render() {
        let {listAS} = this.state
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>

                     {/* link name */}
                        <div className='m-2 header-thuchi'>
                            <span><i class="fa-solid fa-arrow-left" onClick={() => this.gotolink(`thuchi`)}></i> THU CHI AS THÁNG {this.state.thang}</span>
                            <button className="btn-add-user" onClick={() => this.onmodalas('THÊM THU CHI')}><i className="fas fa-plus"></i> </button>
                            </div>
                    
                    {/* list kho */}
                    <div className='list-user'>
                        {listAS &&  !isEmpty(listAS) && 
                            Object.entries(listAS).map(([day, items]) => (
                            <div key={day}>
                                <h5 className='mt-3'>{day}.{this.props.match?.params?.id}</h5>
                                <ul className='list-as-li'>
                                {items.map(item => (
                                    <li className='list-as-item' key={item.id} id={`${item.ngay}-${item.content}`}>
                                        <div className='table'>{this.formatNumber(item.money)}</div>
                                        <div className='table'>{item.content}</div>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            ))
                        }

                        {/* Modal */}
                        {this.state.onModalAS === true &&
                            <ModalAS 
                                type = 'as'
                                typeModal = {this.state.typeModal}
                                onModalAS = {this.onmodalas}
                                getallthang = {this.getallthang}
                                thang = {this.props.match?.params?.id}
                            />
                        }

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
