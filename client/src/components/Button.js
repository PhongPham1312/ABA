import React ,{memo} from "react";
const Button = ({text, textColor, bgColor , onClick}) => {
    return (
        <button type="button" 
        onClick={onClick}
        className={`py-2 px-4 ${textColor} ${bgColor} 
        outline-none rounded-md`}>
            <div>{text} </div>
        </button>
    )   
}

export default memo(Button)