import React , {useCallback} from "react";  
import logo from '../../assets/logo.png'
import { Button } from "../../components";
/* import icons from "../../untils/icons" */
import {useNavigate} from 'react-router-dom'
import {path} from '../../untils/constant'

/* const {FaRegUserCircle } = icons */


const Header = () => {
    const navigate = useNavigate()
    const goLogin = useCallback(() =>{
        navigate(path.LOGIN)
    }, [])
    return (
        <div className="Header w-70 ">
            <img src={logo} alt="" className="w-[50px] h-[90%]"/>
           <div>
             <Button text={'Đăng nhập'} 
             textColor='text-white' 
             bgColor='bg-blue-500' 
             onClick={goLogin} />
           </div>
          {/*  <FaRegUserCircle  /> */}
        </div>
    )
}   

export default Header