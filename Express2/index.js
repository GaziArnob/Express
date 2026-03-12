const express = require("express");
const router = express.Router();
const path = require("path");
const logger = require("morgan");
const multer = require("multer");

const upload = multer({dest: "./public/uploads"});

const app = express();

const port = 5001;

//built in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/static",express.static(path.join(__dirname,"public")));

//application level middleware
const loggerMidddleWare = (req, res ,next) =>{
    console.log(`${new Date()} --- request [${req.method}] [${req.url}]`);
    next();

};
app.use(loggerMidddleWare);

//third party middleware

app.use(logger("combined"));

app.use("/api/users",router);

const fakeAuth = (req,res,next) =>{
    const authStatus = true;
    if(authStatus){
        console.log("User authstatus :" , authStatus);
        next();
    }else{
        req.status(401);
        throw new Error("user is not authorized");
    }
}


const getUsers = (req,res) =>{
    res.json({message: "Get all users"});

}

const createUsers = (req,res) =>{
    console.log("this is the request body recevied from clint :" , req.body);
    res.json({message:"create new users"});
}

router.use(fakeAuth);

router.route("/").get(getUsers).post(createUsers);

//error handler middleware

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    switch (statusCode) {
        case 401:
            res.json({
                title: "Unauthorized",
                message: err.message,
            });
            break;

        case 404:
            res.json({
                title: "Not Found",
                message: err.message,
            });
            break;

        case 500:
            res.json({
                title: "Server Error",
                message: err.message,
            });
            break;

        default:
            res.json({
                title: "Error",
                message: err.message,
            });
            break;
    }
};

app.post("/upload", upload.single("image"),(req, res, next) => {
    console.log(req.file,req.body);
    req.send(req ,file);
},
(err,req,res,next) =>{

   res.status(400).send({err:err.message})

    
})

app.use((req, res, next) => {
    res.status(404);
    next(new Error("Route not found"));
});

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});

