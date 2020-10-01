const {
    okResponse,
    badRequestError
} = require("../../global_functions");
const User = require("../../models/userModel");

// Add user Controller 
// req : HTTP Request Object
// res : HTTP Response Object

//change this accordingly I had put this only for example
const AddUser = async (req, res) => {
    let data = req.body;
    if (!data.fullName) return badRequestError(res, "Enter FullName");
    if (!data.dob) return badRequestError(res, "Enter Date of birth");

    let user_added = await User.query().skipUndefined().insert(data).returning("*");
    if (!user_added) return badRequestError(res, "User not added");

    return okResponse(res, user_added, "User Added");
}

module.exports = {
    AddUser
}