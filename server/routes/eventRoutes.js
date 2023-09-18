
const { response } = require("express")
const { Event } = require("../config/config")
module.exports = {
  create: async function (data) {
    try {

      const response = await Event.create(data)
      if (response) {
        return response
      } else {
        return "Data Base Error"
      }
    } catch (error) {
      throw error
    }
  },
  view: async function () {
    try {
      const response = await Event.findAll();
      if (response) {
        return response;
      } else {
        return "Database Error";
      }
    } catch (error) {
      throw error;
    }
  },

  update: async function (eventId, updatedEventData) {
    try {
      const event = await Event.findByPk(eventId);

      if (!event) {
        throw new Error("Event not found");
      }

      await event.update(updatedEventData);

      return event;
    } catch (error) {
      throw error;
    }
  }

}
