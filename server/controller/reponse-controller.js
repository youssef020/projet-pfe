import Reponse from '../models/reponse-model.js'

const nodemailer = require('nodemailer')

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

var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";
export const getReponses = async (request, response) => {

    try {
        let reponse = await Reponse.find();
        response.status(200).json(reponse);
    } catch (error) {
        response.status(404).json({ message: error.message })
    }

}

export const addReponses = async (request, response) => {
    const reponse = request.body;
    const newReponse = new Reponse(reponse);
    try {
        await newReponse.save();
        response.status(201).json(newReponse);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

export const addMail = async (request, response) => {
    const reponse = request.body;
    const newReponse = new Reponse(reponse);
    try {
        await newReponse.save();
        var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
		var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
		sendSmtpEmail = {
		  sender: { email: "facter.projet@gmail.com" },
		  to: [
			{
			  email: request.body.email,
			  reponse: request.body.reponse,
			},
		  ],
		  subject: "Promotion",
		  textContent: "<h1>-10%</h1>",
		};
		apiInstance.sendTransacEmail(sendSmtpEmail).then(
		  function () {
			console.log("API called successfully");
		  },
		  function (error) {
			console.error(error);
		  }
		);
        response.status(201).json(newReponse);
        
        

    } catch (error) {
        // response.status(409).json({ message: error.message });
        console.log(error)
    }
}




// try{
//      await newReponse.save();
//     response.status(201).json(newReponse);
//     var mailOptions = {
//         from: 'Facter <facter.projet@gmail.com>',
//         to: request.body.email,
//         subject: 'Reponse',
//         html:request.body.reponse
//     }
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error)
//         }
//         else {
//             console.log("Email sent")
//         }
//     })
// } catch (error){
//     console.log(error);     
// }



export const getReponseById = async (request, response) => {
    try {
        const reponse = await Reponse.findById(request.params.id);
        response.status(200).json(reponse);
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

export const editReponse = async (request, response) => {
    let reponse = await Reponse.findById(request.params.id);
    reponse = request.body;

    const editReponse = new Reponse(reponse);
    try {
        await Reponse.updateOne({ _id: request.params.id }, editReponse);
        response.status(201).json(editReponse);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

export const deleteReponse = async (request, response) => {
    try {
        await Reponse.deleteOne({ _id: request.params.id });
        response.status(201).json("Reponse deleted Successfully");
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

