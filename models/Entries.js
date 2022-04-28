const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EntrySchema = require('./Entry').schema;
const { requiredBool, requiredNum, requiredStr } = require('./fieldTypes');

const EntriesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    entries: [EntrySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('entries', EntriesSchema);
