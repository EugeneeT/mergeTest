import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5001;


//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes go here
// app.use('/', userRoutes)

//Global Error Handler for entire project, position is important. 
//Global error should come after routes
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        }
    })
});

//create mongoose connection, connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB Connected!');
}).catch((error) => {
    console.log(error);
})
app.listen(PORT, () => {
    console.log(`The server is listening at port ${PORT}`);
})