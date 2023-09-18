const { create, view, update } = require("../routes/equipRoutes"); // Correct the import names

module.exports = {
  createEquip: function (req, res) {
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

  viewEquip: function (req, res) {
    const body = req.body;
    view(body).then(result => {
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

  updateEquip: function (req, res) {
    const body = req.body;
    const sport = req.params.selectedSport;
    update(sport, body).then(result => {
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
