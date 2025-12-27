const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// --- SETTINGS ---
const MY_EMAIL = 'youssefakl9445@gmail.com';
const MY_PASS = 'cwwv hsqg scen erhs'; // Your App Password

// Only one transporter is needed
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MY_EMAIL,
        pass: MY_PASS
    }
});

app.post('/order', (req, res) => {
    const { name, phone, item, price, address, payment } = req.body;

    const mailOptions = {
        from: MY_EMAIL,
        to: MY_EMAIL,
        subject: `NEW ORDER: ${item} (${payment})`,
        text: `
        You have a new order for your brand!

        PRODUCT: ${item}
        PRICE: ${price}
        
        CUSTOMER: ${name}
        PHONE: ${phone}
        ADDRESS: ${address}
        
        PAYMENT METHOD: ${payment}
        
        Note: If they chose Vodafone Cash, call them to provide your wallet number.
        `
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log("Error details:", err);
            return res.status(500).send("Error");
        }
        console.log("Order received and email sent successfully!");
        res.status(200).send("Success");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on port ${PORT}`);
});
