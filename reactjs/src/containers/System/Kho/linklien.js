import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Khomanage.scss'
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { getLinhkienByDonmay , deleteLinhkiendon } from '../../../services/userService';

class LinhkienDonmay extends Component {

    constructor(props){
        super(props);
        this.state = {
           listlinhkien: [],
           listtrue: false,
           
        }
    }


     async componentDidMount() {
        await this.getalllinkienbydonmay(this.props.donmay)
     }

    async componentDidUpdate(prevProps) {
        if (prevProps.reload !== this.props.reload) {
        await this.getalllinkienbydonmay(this.props.donmay); // 👈 gọi lại API hoặc cập nhật lại dữ liệu hiển thị
        }
    }

     gotolink = (link) =>
        {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }


    getalllinkienbydonmay = async (donmay) => {
        let res = await getLinhkienByDonmay(donmay);
        if (res && res?.errCode === 0 && Array.isArray(res.data) && res.data.length > 0) {
            this.setState({
                listlinhkien: res.data,
                listtrue: true
            });
        } else {
                this.setState({ listlinhkien: [],
                listtrue: false
            }); // Không có dữ liệu, reset mảng
        }
    }

    deletelinhkien = async (id) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa linh kiện này không?");
        if (!confirm) return;

        try {
            const res = await deleteLinhkiendon(id);
            if (res && res.errCode === 0) {
                toast.success("Xóa linh kiện thành công!");
                await this.getalllinkienbydonmay(this.props.donmay); // Cập nhật lại list
            } else {
                toast.error("Xóa thất bại!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi xóa linh kiện!");
        }
    }

    formatNumber = (value) => {return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');};

    
    render() {
        let {listlinhkien, listtrue} = this.state
       
        return (
           <div>
    {listtrue === true && (
        <>
            <li>linh kiện :</li>
            {listlinhkien && !isEmpty(listlinhkien) && 
                listlinhkien.map((item, index) => (
                    <li className='linhkien' key={index}>
                        - {item.linhkien} : {this.formatNumber(item.linhkiengia)} ({item.loaitien} : {item.linhkienngay})

                        <i onClick={() => this.deletelinhkien(item.id)} class="fa-solid fa-circle-xmark"></i>
                    </li>
                ))
            }
        </>
    )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinhkienDonmay));
