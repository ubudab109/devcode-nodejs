const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended : true }));

app.get("/", (req, res) => {
    res.json({
        message: "Welcomes",
    });
});

require("./routes/activitygroup.routes")(app);
require("./routes/todoitems.routes")(app);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log("Running on PORT" + PORT);
});

