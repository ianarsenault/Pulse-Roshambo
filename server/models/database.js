let mongoose = require('mongoose')
let Schema = mongoose.Schema

module.exports = (schemaName, schemaObj) => {
    return mongoose.model(schemaName, new Schema(schemaObj))
};