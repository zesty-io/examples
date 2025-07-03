const SDK = require("@zesty-io/sdk");
const dotenv = require('dotenv');
dotenv.config();

const zesty = new SDK(process.env.ZESTY_INSTANCE_ZUID, process.env.ZESTY_API_TOKEN);
module.exports = { zesty };