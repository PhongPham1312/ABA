import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './ThuChiNam.scss'
import CommonUtils from '../../../utils/CommonUtils';
import { getallasthang } from '../../../services/tienmat';
import ModalAS from './Modal/ModalAS';
import { isEmpty } from 'lodash';

class ThuChiTm extends Component {

    constructor(props){
        super(props);
        this.state = {
            thang:  '',
            listdata: [],
            onModalAS: false,
            typeModal: "",
        }
    }


    async componentDidMount() {
        this.setState({
            thang: CommonUtils.getCurrentMonth()
        })
        await this.getallthang(this.props.match?.params?.id)

    }

    getallthang = async (thang) => {
        let res = await getallasthang(thang)
        if (res && res.errCode === 0 && res.data) {
           this.setState({
            listdata: res.data
           })
        }
        else  this.setState({
            listdata: []
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


    
    render() {
        let {listdata } = this.state
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>

                      {/* link name */}
                        <div className='m-2 header-thuchi'>
                            <span><i class="fa-solid fa-arrow-left" onClick={() => this.gotolink(`thuchi`)}></i> THU CHI TM THÁNG {this.state.thang}</span>
                            <button className="btn-add-user" onClick={() => this.onmodalas('THÊM THU CHI')}><i className="fas fa-plus"></i> </button>
                            </div>
                    
                    {/* list kho */}
                    <div className='list-user'>
                        {listdata &&  !isEmpty(listdata) && 
                            Object.entries(listdata).map(([day, items]) => (
                                <div key={day}>
                                     <h5 className='mt-3'>{day}.{this.props.match?.params?.id}</h5>
                                    <ul className='list-as-li'>
                                        {items.map(item => (
                                            <li className='list-as-item' key={item.id}>
                                                <div className='table'>{this.formatNumber(item.money)}</div>
                                                <div className='table'>{item.content}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {this.state.onModalAS === true &&
                   <ModalAS 
                      type='tm'
                      typeModal = {this.state.typeModal}
                      onModalAS = {this.onmodalas}
                      getallthang = {this.getallthang}
                      thang = {this.props.match?.params?.id}
                      />
                }
                
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThuChiTm));
