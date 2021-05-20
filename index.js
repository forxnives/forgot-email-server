const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const {fetchGet, fetchPut, fetchPost} = require('./FetchUtils')
const generator = require('generate-password')
const app = express();
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
const route = express.Router();

const port = process.env.PORT || 5000;

const cors = require('cors');


app.use(cors({
    origin : "http://localhost:3000",
    credentials: true,
  }))

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'speurbudgettracker@gmail.com',
        pass: 'adminadmin8',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});





route.post('/', (req, res) => {


    try {
    
        const {userEmail} = req.body;
    

        fetchPost('login', {
            email: 'admin@speurgroup.com',
            password: 'admin'
          }).then(response=> {
            console.log(response)
            if (!response.jwt){
              throw new Error(response.message ? response.message : 'Error')
            }
      
            const {jwt} = response





            fetchGet(`/users`, jwt).then(response => {
              
              const userInfo = response.users.filter(user => (user.email.toLowerCase().includes(userEmail.toLowerCase())))
              
              if (!userInfo.length){
                throw new Error ('Email not in database')
              }
              
              
              const password = generator.generate({
                length: 10,
                numbers: true
              });
        

        
        
              const body = {
                name: userInfo[0].name,
                email: userInfo[0].email,
                password
              }
              
              
          //     // put request user with new password
              fetchPut(`/users/${userInfo[0].id}`, body, jwt).then(response=> {
              
                console.log(response)
           
              
              }).catch(err=> { throw new Error(err)})
          //   }).catch(err=>alert(err))
          const mailData = {
              from: 'speurbudgettracker@gmail.com',
              to: userEmail,
              subject: 'Password Reset',
              text: `Your Budget Tracker password has been reset to ${password}`,
              html: '',
          };
      
          transporter.sendMail(mailData, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              res.status(200).send({ message: "Mail send", message_id: info.messageId });
          });
            
        
        
            }).catch(err=>{throw new Error(err)})



        }).catch(err=> {throw new Error(err)})




    } catch (err) {
        console.log(err)

    }





      
  
    //   //get request to users
        





});
