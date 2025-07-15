import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './ThuChiNam.scss'
import { listnamelink } from '../../../utils/constant';
import Modalthuchi from './THUCHINAM/Modalthuchinam';
import { getAllthuchinam ,deletethuchi } from '../../../services/thuchinam';
import {getSacombankByMonthGrouped} from  '../../../services/userService'
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';

class ThuChi extends Component {

    constructor(props){
        super(props);
        this.state = {
            onModal: false,
            typeHeading:'',
            listthuchi: [],
            thang: ''
        }
    }


    async componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })
        let thang = this.getCurrentMonth()
        this.setState({
            thang: thang
        })
        await this.getallthuchi(thang)
    }

    getCurrentMonth = () => {
        const today = new Date();
        return today.getMonth() + 1; // Tháng trong JS tính từ 0 đến 11 nên +1
    };

    getallthuchi = async (thang) => {
       let res = await getSacombankByMonthGrouped(thang);
            console.log(res)
            if(res && res.errCode === 0){
                this.setState({
                    listthuchi: res.data
                })
            }
            else 
                this.setState({
            listthuchi: []})
    }

    deletethuchi = async(id) => {
        let res = await deletethuchi(id);
       if(res && res.errCode === 0){
            toast.success('xóa thành công')
            await this.getallthuchi()
        }
        else toast.error("xóa thất bại")
    }

    onModalthuchi = (type) => {
        this.setState({
            onModal: !this.state.onModal,
            typeHeading: type
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

    // kieem tra url
    kiemTraChuoi = (chuoiCha, chuoiCon) => {
        return chuoiCha.includes(chuoiCon);
    };

    // định dạng giá tiền
    formatNumber = (value) => {
        if (!value) return '';

        // Giữ dấu trừ nếu có
        const isNegative = value.trim().startsWith('-');
        
        // Loại bỏ tất cả ký tự không phải số
        let cleaned = value.replace(/\D/g, '');

        // Thêm dấu trừ lại nếu có
        if (isNegative) {
            cleaned = '-' + cleaned;
        }

        // Format lại số với dấu cách
        return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };


    render() {
        let {listthuchi } = this.state
        console.log(this.props.match.path)
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>

                     {/* list user option */}
                    <div className='user-container kho-container'>
                        <ul>
                            <li onClick={this.onAS} className={this.props.match.path.toLowerCase().includes("as") === true ? 'li1' : ''} >AS</li>
                            <li onClick={this.onTM} className={this.props.match.path.toLowerCase().includes("tm") === true ? 'li1' : ''} >TM</li>
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
                            <button className="btn-add-user" onClick={() => this.onModalthuchi('THÊM THU CHI NĂM')}>
                                <i className="fas fa-plus"></i> 
                            </button>
                        </div>

                        <div className='list-kho list-thuchi'>


                            {/* list */}
                            {/* {listthuchi && !isEmpty(listthuchi) && listthuchi.map((item, index) => {
                                return (
                                    <li onClick={() => this.gotolink(`thuchithang/${item.id}`)}
                                     className='thuchi-item'><span><i class="fa-solid fa-folder"></i> {item.name}</span> <i
                                    onClick={()=> this.deletethuchi(item.id)}
                                     class="fa-solid fa-circle-xmark"></i></li>
                                )
                            })} */}

                            <div>
                                {Object.entries(listthuchi).map(([ngay, items]) => (
                                    <div key={ngay} className="ngay-group">
                                    <h5>{ngay}.{this.state.thang}</h5>
                                    <ul>
                                        {items.map((item, idx) => (
                                        <li className='thuchi-content' key={item.id || idx}>
                                            <div className='money'>{this.formatNumber(item.money)}</div>
                                            <div onClick={() => this.gotolink(item.link)} className={item.link !== null ? 'link' : ''}>{item.content}</div>
                                        </li>
                                        ))}
                                    </ul>
                                    </div>
                                ))}
                                </div>


                            {this.state.onModal === true &&
                                <Modalthuchi
                                heading= {this.state.typeHeading}
                                onModal = {this.onModalthuchi} 
                                getallthuchi = {this.getallthuchi}
                                />
                            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThuChi));
