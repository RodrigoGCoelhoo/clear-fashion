const app = require("./api.js");

const PORT = 8092;

// const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
