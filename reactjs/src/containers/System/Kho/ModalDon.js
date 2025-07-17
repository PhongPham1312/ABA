import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Khomanage.scss'
import { toast } from 'react-toastify';
import { createDon } from '../../../services/donService';
import { getAllCustomer , getAllMay , addCustomer, getAllUser,
     createMay , createTM} from '../../../services/userService';
import { createAS } from '../../../services/sacombank';
import CreatableSelect from 'react-select/creatable';

class ModalDon extends Component {

    constructor(props){
        super(props);
        this.state = {
            ngaymua: '', nguoiban: '', dienthoai: '', name: '', somay: '',
            seri: '', gia: '', giahien: '', listCustomer : [], selectphone : '',
            listmay: [], selectmay: '', maynew:'',  listthu: [], selectthu: '',
            hinhthucthu: '', newnguoiban: '', listloaithu: [], selectloaithu: '',
            loaithutien: ''
        }
    }
    async componentDidMount() {
        this.getTodayFormatted() // định dạng ngày tháng
        await this.getallcustomer(); // DANH SÁCH KHÁCH HÀNG
        await this.getallmay() // DANH SÁCH TÊN MÁY
        this.setState({
                listthu: [ // LIST HÌNH THỨC THU
                    { value: "1", label: 'Khách bán điện thoại' },
                    { value: "2", label: 'Khách đổi bù tiền' },
                    { value: "3", label: 'Khách đổi hoàn tiền' } // giá trị nên khác nhau
                ],
                listloaithu: [
                    {value: "1", label: 'AS'},
                    {value: "2", label: 'TM'},
                ]
            });
    }

    // KIỂM TRA SỐ ĐIỆN THOẠI TRONG DANH SÁCH NGƯỜI DÙNG
    checkPhoneExistInUser = async (dienthoai) => {
        let res = await getAllUser(); // LẤY DANH SÁCH NGƯỜI DÙNG
        if (res && res.data) {
            return res.data.some(
                user => user.phone?.toLowerCase() === dienthoai.toLowerCase() // kiểm tra số điện thoại
            );
        }
        return false;
    };

    // lấy danh sách máy
    getallmay = async () => {
        const res = await getAllMay();

        if (res?.giaList && Array.isArray(res.giaList)) {
            const result2 = res.giaList.map(item => ({
            label: item.name,
            value: item.id
            }));

            this.setState({ listmay: result2 });
        } else {
            this.setState({ listmay: [] }); // nếu không có dữ liệu, reset về mảng rỗng
        }
    };

    // lấy danh sách người dùng
    getallcustomer = async () => {
        const res = await getAllCustomer();

        if (res?.customers && Array.isArray(res.customers)) {
            const result2 = res.customers.map(item => ({
            name: this.getLastName(item.name).toUpperCase(),
            value: item.id,
            label: item.phone
            }));

            this.setState({ listCustomer: result2 });
        } else {
            this.setState({ listCustomer: [] });
        }
    };

    checkvalue = () => {
        /* window.confirm("Bạn có chắc chắn muốn ẩn người dùng này không?") */
        let {newnguoiban , dienthoai, hinhthucthu, gia , maynew } = this.state
        if (!newnguoiban?.trim()) {
            window.confirm("Thiếu tên người bán!");
            return false;
        }
        if (!dienthoai?.trim()) {
            window.confirm("Thiếu điện thoại người bán!");
            return false;
        }
         if (!maynew?.trim()) {
            window.confirm("Thiếu tên tên máy !");
            return false;
        }
        if (!hinhthucthu?.trim()) {
            window.confirm("Thiếu hình thức thu!");
            return false;
        }

        if (!gia?.trim()) {
            window.confirm("Thiếu giá thu!");
            return false;
        }
        return true
    }

    //hàm add
    handleAdd = async() => {
        let {ngaymua, dienthoai, maynew , seri,loaithutien,
             somay, gia, hinhthucthu, listmay, listCustomer, newnguoiban } = this.state
            
        if(this.checkvalue() === true ){
            let res = await createDon({
                ngaymua: ngaymua,
                nguoiban: newnguoiban,
                dienthoai: dienthoai,
                name: maynew,
                seri: seri,
                somay: somay,
                gia : gia,
                hinhthucthu: hinhthucthu,
                hinhthucthuloai: loaithutien,
                hinhthucthungay: ngaymua,
                donmonth: this.props.match?.params?.id
            })

            if(res?.errCode === 0){
               toast.success("Thêm máy dọn mới thành công !")
               await this.props.getAllDon();
                const isMayExist = listmay.some(m => m.label.toLowerCase() === maynew.toLowerCase());
                const isCustomerExist = listCustomer.some(m => m.label.toLowerCase() === dienthoai.toLowerCase());
                if (!isMayExist && maynew) await createMay({ name: maynew });
                if (!isCustomerExist && dienthoai) await addCustomer({ name: newnguoiban, 
                    phone: dienthoai });
                }
                if(loaithutien === 'AS'){
                    let res2 = await createAS({
                        content : `thu 1P _ ${newnguoiban} _ ${dienthoai} _ ${maynew} _ ${somay} _ ${seri}`,
                        money: gia,
                        ngay: ngaymua,
                        type: 1,
                        link: `http://localhost:3000/system/kho-don-mount/2#don-${ngaymua}-${loaithutien}-${newnguoiban}-${dienthoai}`
                    })
                }

                if(loaithutien === 'TM'){
                    let res2 = await createTM({
                        content : `thu 1P _ ${newnguoiban} _ ${dienthoai} _ ${maynew} _ ${somay} _ ${seri}`,
                        money: gia,
                        ngay: ngaymua,
                        type: 1,
                        link: `http://localhost:3000/system/kho-don-mount/2#don-${ngaymua}-${loaithutien}-${newnguoiban}-${dienthoai}-${gia}`
                    })
                }
                this.props.handleOnModal('')
        }
        
    }

    // định dạng giá tiền
    formatNumber = (value) => {return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');};

    // onchang input
    handleInputChange = (e) => {
        const { name, value } = e.target; // lấy name value
        const updates = { [name]: value }; // lấy từng state = value
        if (name === 'gia') {
            updates.giahien = this.formatNumber(value); // giá hiện
            updates.gia = updates.giahien.replace(/\s/g, '')
        }
        if(name === 'nguoiban') {
            updates.newnguoiban = value
            updates.nguoiban = updates.nguoiban.toUpperCase()
        }
        this.setState(updates);
    };

    // get ngày tháng
    getTodayFormatted = () => {
        const today = new Date();
        const day = today.getDate();        // Lấy ngày (1–31)
        const month = today.getMonth() + 1; // Lấy tháng (0–11) nên phải +1
        this.setState({ngaymua: `${day}.${month}`})
    };

    // onchange trong select
    handleChangeSelect = (selected, type) => { // selec và loại
        if (type === 'name') {
            this.setState({
                selectmay: selected, // select hiện tại gắn value
                maynew: selected ? selected.label : '', // gắn điện thoại
            });
        }
        if (type === 'dienthoai') {
            this.setState({
                selectphone: selected, // select hiện tại gắn value
                dienthoai: selected ? selected.label : '', // gắn điện thoại
                nguoiban : selected ? selected.name : '', // gắn tên người bán 
                newnguoiban: selected?.name ? selected.name : this.state.newnguoiban // gắn tên người bán 
            });
        }
        if (type === 'hinhthucthu') {
            this.setState({
                selectthu: selected, // select hiện tại gắn value
                hinhthucthu: selected ? selected.value : ''
            });
        }

        if (type === 'loaithuchi') {
            this.setState({
                selectloaithu: selected, // select hiện tại gắn value
                loaithutien: selected ? selected.label : ''
            });
        }
    };

    // get name
    getLastName = (fullName) => {
        if (!fullName) return '';
        const parts = fullName.trim().split(/\s+/);
        return parts[parts.length - 1];
    };

    render() {
        return (
            <div className='modal-donmay'>
                <div className='modal-donmay-content'>
                    <div className='close'><i class="fa-solid fa-circle-xmark"  onClick={() => this.props.handleOnModal('')}></i></div>
                    <div className='modal-donmay-name'>
                        {this.props.typemodal}
                    </div>
                    
                    <div className='list-input'>
                        {/* ngày thu */}
                        <div className='ngaydon ngaydon0'>
                            <label>Ngày</label>
                            <input type='text'
                                value={this.state.ngaymua}
                                name='ngaymua'
                                onChange={this.handleInputChange}
                             placeholder='ngày thu máy'/>
                        </div>
                        {/* tên */}
                        <div className='ngaydon ngaydon1'>
                            <label>Tên Khách</label>
                            <input type='text'
                                value={this.state.newnguoiban}
                                name='nguoiban'
                                onChange={this.handleInputChange}
                             placeholder='tên khách'/>
                        </div>
                        {/* phone */}
                        <div className='ngaydon ngaydon2'>
                            <label>Điện thoại</label>
                            <CreatableSelect
                                value={this.state.selectphone}
                                name='dienthoai'
                                onChange={(selected) => this.handleChangeSelect(selected, 'dienthoai')}
                                options={this.state.listCustomer}
                                isClearable
                                placeholder='điện thoại'
                            />
                        </div>
                    </div>

                    {/* thông tin máy */}
                    <div className='list-input'>

                        {/* TÊN MÁY */}
                        <div className='ngaydon '>
                            <label>Tên máy</label>
                            <CreatableSelect
                                value={this.state.selectmay}
                                name='name'
                                onChange={(selected) => this.handleChangeSelect(selected, 'name')}
                                options={this.state.listmay}
                                isClearable
                                placeholder='tên máy'
                            />
                        </div>

                        {/* số máy */}
                        <div className='ngaydon '>
                            <label>Số máy</label>
                            <input type='text'
                            value={this.state.somay}
                            name='somay'
                            onChange={this.handleInputChange}
                             placeholder='số máy'/>
                        </div>

                        {/* sê ri */}
                        <div className='ngaydon '>
                            <label>Số sê-ri</label>
                            <input type='text'
                            value={this.state.seri}
                            name='seri'
                            onChange={this.handleInputChange}
                             placeholder='số sê-ri'/>
                        </div>

                        {/* giá thu */}
                        <div className='ngaydon '>
                            <label>Giá thu</label>
                            <input type='text'
                                value={this.state.giahien}
                                name='gia'
                                onChange={this.handleInputChange}
                             placeholder='giá thu'/>
                        </div>

                        {/* loại thu */}
                        <div className='ngaydon '>
                            <label>Loại thu chi</label>
                            <CreatableSelect
                                value={this.state.selectloaithu}
                                name='hinhthucthu'
                                onChange={(selected) => this.handleChangeSelect(selected, 'loaithuchi')}
                                options={this.state.listloaithu}
                                isClearable
                                placeholder='loại thu chi'
                            />
                        </div>

                        {/* hình thức thu */}
                        <div className='ngaydon '>
                            <label>Hình thức thu</label>
                            <CreatableSelect
                                value={this.state.selectthu}
                                name='hinhthucthu'
                                onChange={(selected) => this.handleChangeSelect(selected, 'hinhthucthu')}
                                options={this.state.listthu}
                                isClearable
                                placeholder='hình thức thu'
                            />

                        </div>

                    </div>

                    {/* btn save */}
                        <div className='btn-don'>
                            <div className='btn-don-content'
                            onClick={this.handleAdd}
                            >Lưu</div>
                        </div>

                </div>
            </div>
        )
          
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalDon));
