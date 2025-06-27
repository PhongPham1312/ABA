import React , {useCallback} from "react";  
import { Button } from "../../components";
import icons from "../../untils/icons"
import {useNavigate} from 'react-router-dom'
import {path} from '../../untils/constant'

const {FaHome , FaUserCircle, IoEllipsisVerticalCircle } = icons


const Header = () => {
    const navigate = useNavigate()
    const goLogin = useCallback(() =>{
        navigate(path.LOGIN)
    }, [])
    return (
        <div className="Header w-70 p-2">
            <div className="flex justify-center text-xs" > <FaHome className="text-base mx-1"/> TRANG CHỦ</div>
           {/* <div>
             <Button text={'Đăng nhập'} 
             textColor='text-white' 
             bgColor='bg-blue-500' 
             onClick={goLogin} />
           </div> */}
          <span className=" flex justify-center">
            <span><FaUserCircle className="text-[21px] translate-y-[2px] cursor-pointer" 
                onClick={goLogin}/></span>
            {/* <span>Phạm Thanh Phong !</span> */}
            <IoEllipsisVerticalCircle className="mx-1 text-[25px] cursor-pointer"/>
            </span>
        </div>
    )
}   

export default Header