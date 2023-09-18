
const { response } = require("express")
const {Equipment} = require("../config/config")

module.exports = {
create:async function (data){
try{

  const response = await Equipment.create(data)
if(response){
  return response
}else{
  return "Data Base Error"
}
}catch(error){
  throw error
}
},
view: async function (data) {
    try {
      const response = await Equipment.findAll();
      if (response) {
        return response;
      } else {
        return "Database Error";
      }
    } catch (error) {
      throw error;
    }
  },
  update: async function (sport, updatedEquipData) {
    try {
      const event = await Equipment.findByPk(sport);
      
  
      if (!event) {
        throw new Error("Event not found");
      }
  
      await event.update(updatedEquipData);
  
      return event;
    } catch (error) {
      throw error;
    }
  }

}
