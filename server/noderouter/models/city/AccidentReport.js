/* Import mongoose and define any variables needed to create the schema */
import mongoose from 'mongoose';

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
    Check out - https://mongoosejs.com/docs/guide.html
  */
const AccidentReportSchema = new mongoose.Schema({
  cityName: {type: String, required: true},
  state: {type: String, required: true}, /*Full name of state, not code*/
  date: {type: Date, required: true},  /*VanillaJS Date*/
  ListOWeathers : [{weather : String}]/*Values of weather must be from Weather enum*/
}
});

export default mongoose.model('accidentReports', AccidentReportSchema);
