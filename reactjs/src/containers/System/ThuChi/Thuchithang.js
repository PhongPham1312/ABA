import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './ThuChiNam.scss'
import { listnamelink } from '../../../utils/constant';
import Modalthuchithang from './THUCHINAM/Modalthuchithang';
import { getAllthuchithangbyparent , deletethuchithang } from '../../../services/thuchithang';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';

class Thuchithang extends Component {

    constructor(props){
        super(props);
        this.state = {
            onModal: false,
            typeHeading:'',
            listthuchi: []
        }
    }


    async componentDidMount() {
        this.setState({
            linkName: this.timTenTheoLink()
        })
        await this.getallthuchi()
         
    }

    getallthuchi = async () => {
        let res = await getAllthuchithangbyparent(this.props.match.params.id);
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
        let res = await deletethuchithang(id);
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

    render() {
        let {listthuchi} = this.state
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>

                    
                
                     {/* link name */}
                        <div className='m-2'>
                            <i class="fa-solid fa-arrow-left" onClick={() => this.gotolink(`thuchinam`)}
                            ></i> {this.state.linkName}
                            </div>
                    
                    {/* list kho */}
                    <div className='list-user'>
                        <div>
                            <button className="btn-add-user" onClick={() => this.onModalthuchi('THÊM THU CHI THÁNG')}>
                                <i className="fas fa-plus"></i> 
                            </button>
                        </div>

                        <div className='list-kho list-thuchi'>


                            {/* list */}
                            {listthuchi && !isEmpty(listthuchi) && listthuchi.map((item, index) => {
                                return (
                                    <li
                                    onClick={() => this.gotolink(`thuchi/as/${item.name}`)}
                                     className='thuchi-item'><span><i class="fa-solid fa-folder"></i> {item.name}</span> <i
                                    onClick={()=> this.deletethuchi(item.id)}
                                     class="fa-solid fa-circle-xmark"></i></li>
                                )
                            })}


                            {this.state.onModal === true &&
                                <Modalthuchithang
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Thuchithang));
