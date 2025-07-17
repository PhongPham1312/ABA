import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Khomanage.scss'
import tronxanh from '../../../assets/images/tronxanh.png'
import { listnamelink } from '../../../utils/constant';

class XacManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '...',
            phone: '...',
            form: '...',
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
            typeModal: type
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
        let url = this.kiemTraChuoi(this.props.match?.url, 'kho-xac-mount' ) ? true : false;
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
                            <li onClick={() => this.gotolink(`kho-phone-mount/${this.props.match.params?.id}`)} >KHO HÀNG</li>
                            <li onClick={() => this.gotolink(`kho-sua-thay-mount/${this.props.match.params?.id}`)} className=''>SỬA , THAY</li>
                            <li className={url === true ? 'li1' : ''} >XÁC</li>
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
                                <li>
                                    {/* name - phone */}
                                    <div className='name-phone'>
                                        <img src={tronxanh} alt='tron xanh'/>
                                        {/* name */}
                                        <span> ... _ ... ( .. : ... )</span>
                                        fiìihfffo
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(XacManage));
