const http = require("http");
const { PORT } = require("./config");
const { requestRouting } = require("./routing/routing");
const requestListener = (req, res) => {
    requestRouting(req, res);
};

const server = http.createServer(requestListener);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
