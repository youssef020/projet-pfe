const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const User = require('./models/user-model')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
import route_article from './route/article-route.js'
import route_contact from './route/contact-route.js'
import route_expense from './route/expense-route.js'
import route_message from './route/message-route.js'
import route_reponse from './route/reponse-route.js'
import routes from './route/user-route.js'
import route from './route/route.js';
import route_supplier from './route/supplier-route.js'

app.use(express.json())
require("dotenv").config();
const crypto = require('crypto')

const nodemailer = require('nodemailer')

var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'facter.projet@gmail.com',
		pass: 'shcfooryykzgwlgr'
	},
	tls: {
		rejectUnauthorized: false
	}
})

app.use(cors())

mongoose.connect(process.env.DATABASE)

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	const password=req.body.password;
	const email=req.body.email;

	if (!password || password.length <6) {
		
		res.json({ status: 'error', error: 'password is required should be 6 characters long ' })
		}

		const exist = await User.findOne({ email })
    if (exist) res.json({ status: 'error', error: 'Duplicated email' }) ;


	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		
		
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		

		var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
		var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
		sendSmtpEmail = {
		  sender: { email: "no-reply@gmail.com" },
		  to: [
			{
			  email: req.body.email,
			  name: req.body.name,
			},
		  ],
		  subject: "WELCOME TO OUR APPLICATION",
		  textContent: "<h1>a7la mane3i w a7la PFE</h1>",
		};
		apiInstance.sendTransacEmail(sendSmtpEmail).then(
		  function () {
			console.log("API called successfully");
		  },
		  function (error) {
			console.error(error);
		  }
		);


		var mailOptions = {
			from: 'Facter <facter.projet@gmail.com>',
			to: req.body.email,
			subject: 'WELCOME TO OUR APPLICATION',
			html:`<h1>WELCOME ${req.body.name} !!!!!</h1>`
		}
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error)
			}
			else {
				console.log("Email sent")
			}
		})
		res.json({ status: 'ok' })
	} catch (err) {
		console.log(err)
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email:user.email,
				role: user.role,
			},
			process.env.JWTPRIVATEKEY
		)

		return res.json({ status: 'ok', user: token, userId:user._id })
	} else {
		return res.json({ status: 'error', user: false })
	}
})


app.post('/api/reset-password', (req, res) => {
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err)
		}
		const token = buffer.toString("hex")
		
		User.findOne({ email: req.body.email })
			.then(user => {
				if (!user) {
					return res.status(422).json({ error: "User dont exists with that email" })
				}
				user.resetToken = token
				user.save().then((result) => {
					var mailOptions = {
						from: 'Facter <facter.projet@gmail.com>',
						to: req.body.email,
						subject: 'password reset',
						html: `
					<p>You requested for password reset</p>
					<h5>click in this <a href=http://localhost:3000/reset-password/${token}">link</a> to reset password</h5>
					`
					}
					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error)
						}
						else {
							console.log("Reset password email sent")
						}
					})
					res.json({ message: "check your email" })
				})

			})
	})
})

app.post('/api/new-password',(req,res)=>{
    const newPassword = req.body.password
    User.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})

app.use('/invoices', route);
app.use('/articles', route_article);
app.use('/expenses', route_expense);
app.use('/suppliers', route_supplier);
app.use('/contacts', route_contact);
app.use('/messages', route_message);
app.use('/reponses', route_reponse);
app.use('/users',    routes);









app.listen(8000, () => {
	console.log("Server in running on port 8000")
})