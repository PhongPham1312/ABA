import db from "../models"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { where } from "sequelize"
import {v4} from 'uuid'
require('dotenv').config()

const  hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const registerService = ({email, password}) => new Promise(async (resolve, reject) => {
    try {
        console.log(hashPassword(password))

        const response  = await db.User.findOrCreate({
            where : {email},
            defaults : {
                email,
                password: hashPassword(password),
                id: v4()
            }
        })
        const token  =  response[1] && jwt.sign({id: response[0].id, email:response[0].email} , process.env.SECRET_KEY, {expiresIn: '2d'})
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Register is successfully !' :  'Email has been already used !',
            token: token || null
        })

    }catch(e){
        reject(e);
    }
})