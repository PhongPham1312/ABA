import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './ThuChiNam.scss'
import { listnamelink } from '../../../utils/constant';
import {getSacombankByMonthGrouped,  deleteAS} from  '../../../services/userService'
import { toast } from 'react-toastify';
import Modalthuchi from './THUCHINAM/modalthuchi';
import CommonUtils from '../../../utils/CommonUtils';

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
        let thang = CommonUtils.getCurrentMonth()
        this.setState({
            thang: thang
        })
        await this.getallthuchi()
    }

    getallthuchi = async () => {
        let thang = CommonUtils.getCurrentMonth()
       let res = await getSacombankByMonthGrouped(thang);
            if(res && res.errCode === 0){
                this.setState({
                    listthuchi: res.data
                })
            }
            else 
                this.setState({
            listthuchi: []})
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

    
    // định dạng giá tiền
    formatNumber = (value) => {
        if (!value) return '';

        // Giữ dấu trừ nếu có
        const isNegative = value.trim().startsWith('- ');
        
        // Loại bỏ tất cả ký tự không phải số
        let cleaned = value.replace(/\D/g, '');

        // Thêm dấu trừ lại nếu có
        if (isNegative) {
            cleaned = '-' + cleaned;
        }

        // Format lại số với dấu cách
        return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    deleteSacombank = async (id) => {

        let res = await deleteAS(id)
        if(res?.errCode === 0){
            toast.success('xóa thành công')
            await this.getallthuchi()
        }
        else {
            toast.error('xóa không thành công')
        }
    }


    render() {
        let {listthuchi } = this.state
        console.log(this.props.match)
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>

                     {/* list user option */}
                    <div className='user-container kho-container'>
                        <ul>
                            <li className={this.props.match.path.toLowerCase().includes("as") === true ? 'li1' : ''} >AS</li>
                            <li onClick={() => this.gotolink(`thuchi/tm/${this.props.match?.params?.id}`)} className={this.props.match.path.toLowerCase().includes("tm") === true ? 'li1' : ''} >TM</li>
                        </ul>
                    </div>

                     {/* link name */}
                        <div className='m-2'>
                            <i class="fa-solid fa-arrow-left" onClick={() => this.gotolink(`thuchinam`)}
                            ></i> {this.state.linkName}  {this.props.match?.params?.id}
                            </div>
                    
                    {/* list kho */}
                    <div className='list-user'>
                        <div>
                            <button className="btn-add-user" onClick={() => this.onModalthuchi('THÊM THU CHI')}>
                                <i className="fas fa-plus"></i> 
                            </button>
                        </div>

                        <div className='list-kho list-thuchi'>

                            <div>
                                {Object.entries(listthuchi).map(([ngay, items]) => (
                                    <div key={ngay} className="ngay-group">
                                    <h5 className='m-0 mt-2'>{ngay}.{this.state.thang}</h5>
                                    <ul>
                                        {items.map((item, idx) => (
                                        <li className='thuchi-content' id={`tm-${ngay}.${this.state.thang}-${item.content}`} key={item.id || idx}>
                                            <div className='money'>{this.formatNumber(item.money)}</div>
                                            <div onClick={() => this.gotolink(item.link)} className={item.link !== null ? 'link' : ''}>{item.content}</div>
                                            <i class="fa-solid fa-circle-xmark"></i>
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
