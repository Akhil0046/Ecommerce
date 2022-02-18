const express = require('express');
const cors = require('cors');
const app = express();
// env config
require('dotenv').config();

const port = process.env.PORT || 3000;

// importing database
require('./db');

// cors middleware
app.use(cors());

// bodyparser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json({
    limit: "20mb"}));

    const auth = require('./router/authRouter');

    app.use('/auth',auth)

app.get('/', (req, res) => {
    res.json({
        app: 'Ecommerce',
        path: '/',
        response:"ok"
    });
});

//error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        error: true,
        message: "Internal Server Error",
        details: err
    })
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
}).on('error', function (err) {
    console.log("Something Went Worng",err);
});