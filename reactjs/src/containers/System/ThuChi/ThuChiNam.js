import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './ThuChiNam.scss'
import { listnamelink } from '../../../utils/constant';
import Modalthuchinam from './THUCHINAM/Modalthuchinam';

class ThuChiNam extends Component {

    constructor(props){
        super(props);
        this.state = {
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

    
    // kieem tra url
    kiemTraChuoi = (chuoiCha, chuoiCon) => {
        return chuoiCha.includes(chuoiCon);
    };

    render() {
        return (
            <div className="user-container-ss ">
                <div className='user-container-ss2'>
                     {/* link name */}
                        <div className='m-2'>
                            <i class="fa-solid fa-arrow-left" onClick={() => this.gotolink(`kho-manage-month/${this.props.match.params?.id}`)}
                            ></i> {this.state.linkName}  {this.props.match?.params?.id}
                            </div>
                    
                    {/* list kho */}
                    <div className='list-user'>
                        <div>
                            <button className="btn-add-user" onClick={this.handleOnModal}>
                                <i className="fas fa-plus"></i> 
                            </button>
                        </div>

                        <div className='list-kho'>

                            <Modalthuchinam/>
                            
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThuChiNam));
