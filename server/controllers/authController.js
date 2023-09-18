const {
  create, login,
} = require("../routes/service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: function (req, res) {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body).then(results => {
      return res.status(200).json({
        success: 1,
        data: results
      });
    }).catch(err => {
      return res.status(500).json({
        success: 0,
        message: "Something Went Wrong"
      });
    })
  },

  loginUser : function (req,res){
    const body = req.body;
   login(body).then(result=>{
    return res.status(200).json({
      success: 1,
      data: result
    });
   }).catch(err => {
    return res.status(500).json({
      success: 0,
      message: "Something Went Wrong"
    });
  })
  }
};
