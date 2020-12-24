const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: '42cleanoasis@gmail.com',
        clientId: '108634353751-1f9eiil97p6lad29bnqd9djh77hrgal9.apps.googleusercontent.com',
        clientSecret: 'kj1jDDot7mUio_ebFdwOnSMN',
        refreshToken: '1//04YPKWE2thn9MCgYIARAAGAQSNwF-L9Irkwn3wk9QWchulTDq7qJsOkXyPyyb3gMMdyfDPM0Ldx5QkURARib043NefsuyAiSC9mM',
        accessToken: 'ya29.a0AfH6SMDOogEYQL8xCt7PlPVZbR7ShaTvzEIv63TQ23sPAJu4UbZRIRl9M05ZLY1coL1q9WmKAYpXoDKR0A5Pl_j7gIfZ4_smxrf0BwLLWypoiKzplQ_Tdr5SwTd08-ixuezJCzYUosi9uRGs2c8vrNba6mf55ZPJ1St0ZxcPGoY',
        expires: 3600
    }
});
let mailOptions = {
    from:{
        name: '42 Clean Oasis',
        address: '42cleanoasis@gmail.com'
    },
    to:{
        address: 'jlee@student.42seoul.kr'
    },
    subject: "Ding Dong!",
    html: "<p>Please clean up your drinks.</p>"
};
transporter.sendMail(mailOptions, (error, info) => {
    console.log(error, info)
});