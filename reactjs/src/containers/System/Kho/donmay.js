import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Khomanage.scss'
import tronxanh from '../../../assets/images/tronxanh.png'
import { listnamelink } from '../../../utils/constant';
import ModalDon from "./ModalDon"
import { getAllDon } from '../../../services/donService';
import { isEmpty } from 'lodash';
import ModalLinhkien from './modallinhkiendon';
import CommonUtils from '../../../utils/CommonUtils';

import Linklien from './linklien';

class DonMay extends Component {

    constructor(props){
        super(props);
        this.state = {
            modal: false,
            typemodal: '',
            listdon: [],
            modallinhkien: false,
            reloadTrigger: 0, // giá trị số để làm trigger
            modallinhkienid: ''

        }
    }


    async componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })

        await this.getalldon();

         
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.reload !== this.props.reload) {
            await this.getalldon();
        }
    }

    triggerReload = () => {
    this.setState((prev) => ({
        reloadTrigger: prev.reloadTrigger + 1
    }));
}

    // get all dọn may
    getalldon = async() => {
        let res = await getAllDon()
        if (res && res?.errCode === 0) {
            this.setState({
                listdon: res.data
            })
        } else {
            this.setState({ listdon: [] }); // nếu không có dữ liệu, reset về mảng rỗng
        }

    }

    handleOnModal = (type) => {
        this.setState({
            modal : !this.state.modal,
            typemodal: type
        })
        
    }

    // tìm namelink theo link
        timTenTheoLink = () => {
            const item = listnamelink.find(item => item.link === this.props.match?.path);
                return item ? item.name : null;
        };

     gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    

    // kieem tra url
    kiemTraChuoi = (chuoiCha, chuoiCon) => {
        return chuoiCha.includes(chuoiCon);
    };

    // định dạng giá tiền
    formatNumber = (value) => {return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');};

    // modal option
    onlinhkien = (type) =>{
        this.setState ({
            linkien: !this.state.linkien,
            modallinhkienid: type
        })
    }
    
    render() {
        let {modal , listdon} = this.state
        let url = this.kiemTraChuoi(this.props.match?.url, 'kho-don-mount' ) ? true : false;
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                    {/* modal */}
                    {modal === true &&
                        <ModalDon 
                        typemodal= {this.state.typemodal}
                        handleOnModal = {this.handleOnModal}
                        getAllDon = {this.getalldon}
                        />
                    }
                     
                    
                    {/* list user option */}
                    <div className='user-container kho-container'>
                        <ul>
                            <li onClick={() => this.gotolink(`kho-phone-mount/${this.props.match.params?.id}`)} >KHO HÀNG</li>
                            <li onClick={() => this.gotolink(`kho-sua-thay-mount/${this.props.match.params?.id}`)} className=''>SỬA , THAY</li>
                            <li onClick={() => this.gotolink(`kho-xac-mount/${this.props.match.params?.id}`)} className=''>XÁC</li>
                            <li onClick={() => this.gotolink(`kho-cam-mount/${this.props.match.params?.id}`)} >CẦM</li>
                            <li  className={url === true ? 'li1' : ''} >DỌN</li>
                        </ul>
                    </div>

                    {/* link name */}
                        <div className='m-2'>
                            <i class="fa-solid fa-arrow-left" onClick={() => this.gotolink(`kho-manage-month/${this.props.match.params?.id}`)}
                            ></i> {this.state.linkName}  {this.props.match?.params?.id}
                            </div>

                    {/* list kho */}
                    <div className='list-user'>
                        <div>
                            <button className="btn-add-user" onClick={() => this.handleOnModal('THÊM MÁY DỌN')}>
                                <i className="fas fa-plus"></i> 
                            </button>
                        </div>

                        <div className='list-kho'>
                            <ul>

                                {listdon && !isEmpty(listdon)  && listdon.map((item, index) => {
                                    return (
                                         <li className='list-kho-li' id={`don-${item.ngaymua}-${item.hinhthucthuloai}-${item.nguoiban}-${item.dienthoai}-${item.gia}`}>
                                            {/* name - phone */}
                                            <div className='name-phone'>
                                                
                                                <img src={tronxanh} alt='tron xanh'/>
                                                {/* name */}
                                                <span> {item.ngaymua} _ {item.nguoiban} _ {item.dienthoai} </span>
                                            </div>

                                            {/* thông tin máy - giá */}
                                            <div className='infor-phone'>
                                                <table class="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td className='name'>
                                                                {item.name} _ {item.somay !== null ? item.somay : "..."} _ {item.seri !== null ? item.seri : "..."} <i class="fa-solid fa-pen-to-square"></i>
                                                            </td>
                                                            <td rowspan="3" className='name'>
                                                                <li>- Thu : - {this.formatNumber(item?.gia)} <span 
                                                                onClick={() => this.gotolink(`thuchi/as/THU%20CHI%20THÁNG%20${CommonUtils.getCurrentMonth()}#tm-${item.ngaymua}-${item.name} _ ${item.somay !== null ? item.somay : "..."} _ ${item.seri !== null ? item.seri : "..."}`)}
                                                                 className='text-name'>( {item?.hinhthucthuloai} : {item?.hinhthucthungay} )</span></li>
                                                                <li><Linklien 
                                                                    donmay={item.id}
                                                                    reload={this.state.reloadTrigger}
                                                                /></li>
                                                                {/* <li>- Thu đổi iphone 13 Pro Max</li> */}
                                                                {/* <li>- linh kiện : 
                                                                    <li> + màn : 200 000 ( AS : 11.7 )</li>
                                                                </li>
                                                                <li>- icloud : 5 000 000 ( AS : 11.7 )</li>
                                                                <li>- SỈ DẮT MỐI : 1 000 000 ( AS : 10.7 )</li> */}
                                                                <div className='listion'>- <i class="fa-regular fa-square-plus " ></i>
                                                                    <ul className='onlistion'>
                                                                        <li onClick={() => this.onlinhkien(item.id)}>- mua linh kiện</li>
                                                                        <li>- icloud</li>
                                                                        <li>- sỉ dắt mối</li>
                                                                    </ul>

                                                                    
                                                                </div>
                                                                
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>20 000 000</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <li>- màu : <span>đen</span>  , vỏ : <span>cũ</span></li>
                                                                <li>- dung lượng : <span>256</span>GB</li>
                                                                <li>- ram : <span>8</span>GB</li>
                                                                <li>- pin : <span>4300</span> mAh</li>
                                                                <li>- face ID : <span>đầy đủ</span></li>
                                                                <li>- touch ID : <span>đầy đủ</span></li>
                                                                <li>- icloud : <span>sạch</span></li>
                                                                <li>- mainboard : <span>zin</span></li>
                                                                <li>- màn : <span>zin</span></li>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                
                                            </div>
                                        </li>
                                    )
                                })}

                               {this.state.linkien === true && 
                                <ModalLinhkien 
                                    id = {this.state.modallinhkienid}
                                    onlinhkien = {this.onlinhkien}
                                    getalldon = {this.getalldon}
                                    triggerReload={this.triggerReload} // 👈 truyền callback
                                />
                                }

                                
                            </ul>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DonMay));
