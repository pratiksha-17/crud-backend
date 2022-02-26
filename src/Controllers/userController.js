const Joi = require('joi');
const jwt = require("jsonwebtoken");
const UserModel  = require("../Models/userModel");
const status = require('../module/status')
const mongoose = require("mongoose");

                /*--------------------------------------------------------------
                    ++++++++++++++++++Add User +++++++++++++++++++++++
                ----------------------------------------------------------------*/

exports.createUser = async (req, res) => {
    try {
    const schema = Joi.object().keys({
        firstName: Joi.string().required().error(new Error( "First name is required ")),
        lastName: Joi.string().required().error(new Error("Last name is required ")),
        mobile: Joi.string().required().error(new Error( "Mobile number is required ")),
        gender: Joi.string().required().error(new Error( "Gender is required ")),
        dob: Joi.string().required().error(new Error("DOB is required ")),
        email: Joi.string().required().error(new Error( "Email is required "))
    });
    
    const result = schema.validate(req.body);
    if (result.error) {
        if (result.error.details && result.error.details[0].message) {
            res.status(status.BAD_REQUEST).json({ message: result.error.details[0].message });
        } else {
            res.status(status.BAD_REQUEST).json({ message: result.error.message });
        }
        return;
    }
    const { firstName, lastName, mobile, gender, dob, email } = req.body;
    const user = await UserModel.findOne({ mobile });
        if (user) {
            res.status(status.BAD_REQUEST).json({ message: "User Already exist" })
            return 
        }
    const data = {firstName, lastName, mobile, gender, dob, email}
    const userModel = new UserModel(data);
    const payload = {
        user: {
          id: userModel.id
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 5256000,
      });
      userModel.token = token;
      let savedData = await userModel.save()
      if (savedData) {
        return res.status(status.SUCCESS_STATUS).json({ message: "All the Details are saved", response: savedData })
      }else {
        res.status(status.BAD_REQUEST).json({ message: "Unable to save user details" })
      }
    } catch (err) {
        err => { console.log(err).res.status(status.BAD_REQUEST).json({ err}) }
    }
  };


                  /*--------------------------------------------------------------
                    ++++++++++++++++++Get all +++++++++++++++++++++++
                ----------------------------------------------------------------*/


exports.get_user = async (req, res) => {
    try {
        var data = await UserModel.find().sort({ _id: -1 })
        if (data) {
            res.status(status.SUCCESS_STATUS).json({ message: "User Detils", response: data })
        } else {
            res.status(status.SERVER_ERROR).json({ message: "Data not found" })
        }
    } catch (err) {
        (err => responses.sendError(err.message, res), console.log(err))
    }
}

exports.delete_user = async (req, res) => {
    try {
        var { _id } = req.body
        const isValid = mongoose.Types.ObjectId.isValid(_id);
        if (!isValid) {
            return res.status(401).json({ message: "Enter a valid user id" })
        }
        var data = await UserModel.findByIdAndRemove(_id)

        if (data) {
            console.log(data)
            res.status(200).json({ message: "Deleted Successfuly" })
        } else {
            res.status(400).json({ message: "User is not deleted" })
        }
    } catch (error) {
        err => { console.log(err).sendError(err.message, res) }
    }
}


exports.editUserDetails = async (req, res) => {
    try {
            var updateData = req.body
            var data = await UserModel.findByIdAndUpdate({_id : req.body._id},{$set : updateData},{new:true})
            if (data) {
                console.log(data)
                res.status(200).json({ message: "Details Updated ", response: { data } })
            } else {
                res.status(400).json({ message: "Data not found" })
            }
        
    } catch (error) {
        err => { console.log(err).sendError(err.message, res) }
    }
}