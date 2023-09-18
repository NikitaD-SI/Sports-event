const {
    create, view, update
  } = require("../routes/eventRoutes");

  
  module.exports = {
    createEvent: function (req, res) {
      const body = req.body;
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
  
    viewEvent : function (req,res){
     view().then(result=>{
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
    },
    updateEvent : function (req,res){
        const body = req.body;
        const eventId= req.body.id
     update(eventId,body).then(result=>{
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
  