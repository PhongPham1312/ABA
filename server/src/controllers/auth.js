import * as authService from "../services/auth"

export const register = async (req , res) => {
    const {email, password} =  req.body
    try {

        if(!email || !password) return res.status(400).json({
            err: 1,
            msg: "Missing require parameter!"
        })

        const response = await authService.registerService(req.body)
        return res.status(200).json(response)

    }
    catch (err) {
        return res.status(500).json({
            err: -1,
            msg: "Fail at auth controller" + err
        })
    }
}