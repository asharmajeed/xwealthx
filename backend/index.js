const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./models/dbConnect');
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: "*", // Replace with your frontend origin
    // credentials: true, // Allow credentials (cookies, auth)
  };

app.use(cors(corsOptions));
app.use('/auth/', authRoutes); // <- NEW LINE

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})