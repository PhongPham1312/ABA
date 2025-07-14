import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Khomanage.scss'
import tronxanh from '../../../assets/images/tronxanh.png'
import { listnamelink } from '../../../utils/constant';

class KhoManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '...',
            phone: '...',
            form: '...',
            modal: false
        }
    }


    componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })
         
    }

    handleOnModal = (type) => {
        this.setState({
            modal : !this.state.modal,
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

    
    // xử lý nhập
    handleInputChange = (e, refName) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.resizeInput(this[refName]);
        });
    }

    resizeInput = (ref) => {
        if (ref && ref.current) {
            const text = ref.current.value || ref.current.placeholder || '';
            const span = document.createElement('span');
            span.style.visibility = 'hidden';
            span.style.whiteSpace = 'pre';
            span.style.font = getComputedStyle(ref.current).font;
            span.textContent = text;

            document.body.appendChild(span);
            ref.current.style.width = (span.offsetWidth + 15) + 'px';
            document.body.removeChild(span);
        }
    }

    // kieem tra url
    kiemTraChuoi = (chuoiCha, chuoiCon) => {
        return chuoiCha.includes(chuoiCon);
    };

    render() {
        console.log(this.props.match.params?.id)
        let url = this.kiemTraChuoi(this.props.match?.url, 'kho-phone-mount' ) ? true : false;
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                     {/* link name */}
                        <div className='m-2'>
                            <i class="fa-solid fa-arrow-left" onClick={() => this.gotolink(`kho-manage-month/${this.props.match.params?.id}`)}
                            ></i> {this.state.linkName}  {this.props.match?.params?.id}
                            </div>
                    
                    {/* list user option */}
                    <div className='user-container kho-container'>
                        <ul>
                            <li className={url === true ? 'li1' : ''} >KHO HÀNG</li>
                            <li onClick={() => this.gotolink(`kho-sua-thay-mount/${this.props.match.params?.id}`)} className=''>SỬA , THAY</li>
                            <li onClick={() => this.gotolink(`kho-xac-mount/${this.props.match.params?.id}`)} className=''>XÁC</li>
                            <li onClick={() => this.gotolink(`kho-cam-mount/${this.props.match.params?.id}`)} >CẦM</li>
                            <li onClick={() => this.gotolink(`kho-don-mount/${this.props.match.params?.id}`)} >DỌN</li>
                        </ul>
                    </div>

                    {/* list kho */}
                    <div className='list-user'>
                        <div>
                            <button className="btn-add-user" onClick={this.handleOnModal}>
                                <i className="fas fa-plus"></i> 
                            </button>
                        </div>

                        <div className='list-kho'>
                            <ul>

                                <li className='list-kho-li'>
                                    {/* name - phone */}
                                    <div className='name-phone'>
                                        <img src={tronxanh} alt='tron xanh'/>
                                        {/* name */}
                                        <span> ... _ ... </span>
                                    </div>

                                    {/* thông tin máy - giá */}
                                    <div className='infor-phone'>
                                        <table class="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>Galaxy Tab E Black _ SM-T78L _ R54J5038DW</td>
                                                    <td rowspan="3">20 000 000 ( ĐOÀN THU : 18 000 000 ( CK ) + 2 000 000 : ( AS : 20.7 ) )</td>
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

                                <li className='list-kho-li'>
                                    {/* name - phone */}
                                    <div className='name-phone'>
                                        <img src={tronxanh} alt='tron xanh'/>
                                        {/* name */}
                                        <span> ... _ ... </span>
                                    </div>

                                    {/* thông tin máy - giá */}
                                    <div className='infor-phone'>
                                        <table class="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>Galaxy Tab E Black _ SM-T78L _ R54J5038DW</td>
                                                    <td rowspan="3">20 000 000 ( ĐOÀN THU : 18 000 000 ( CK ) + 2 000 000 : ( AS : 20.7 ) )</td>
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

                                <li className='list-kho-li'>
                                    {/* name - phone */}
                                    <div className='name-phone'>
                                        <img src={tronxanh} alt='tron xanh'/>
                                        {/* name */}
                                        <span> ... _ ... </span>
                                    </div>

                                    {/* thông tin máy - giá */}
                                    <div className='infor-phone'>
                                        <table class="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>Galaxy Tab E Black _ SM-T78L _ R54J5038DW</td>
                                                    <td rowspan="3">20 000 000 ( ĐOÀN THU : 18 000 000 ( CK ) + 2 000 000 : ( AS : 20.7 ) )</td>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(KhoManage));
