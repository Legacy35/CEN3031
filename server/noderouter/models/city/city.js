/* Import mongoose and define any variables needed to create the schema */
import mongoose from 'mongoose';

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
    Check out - https://mongoosejs.com/docs/guide.html
  */
const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true }, /*Eg: "Florida", not "FL". Can also be a province or territory.*/
  country: { type: String, required: true }, /*Eg: "United States", not "US"*/
  coordinates: { latitude: { type: mongoose.Number }, longitude: { type: mongoose.Number } },
  rank: { type: mongoose.Number },
  climate: { type: mongoose.Number },
});

export default mongoose.model('cities', citySchema);
