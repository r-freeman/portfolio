const path = require("path");
const dataDirectory = path.join(process.cwd(), "data");

module.exports = {
    env: {dataDirectory},
    reactStrictMode: true,
}
