const { Router } = require("express");
const { sendMail } = require("../../controllers/email.js");
const { User } = require("../../db.js");
var bcrypt = require("bcryptjs");
const router = Router();

router.post("/", async (req, res) => {
  const { username, email, admin, password } = req.body;

  try {
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      return res.send(
        "Password must have at least 8 chars 1 Uppercase, 1 lowercase,1 number and 1 special character"
      );
    }

    let salt = bcrypt.genSaltSync(10);
    let pass = bcrypt.hashSync(password, salt);

    if (!/^[a-zA-Z0-9]+$/.test(user)) {
      return res.send("user must only have numbers and letters");
    }

    let [instanceUser, userCreated] = await User.findOrCreate({
      where: { user: user },
      defaults: {
        user: user,
        password: pass,
        email: email,
        admin: admin,
      },
    });

    if (userCreated) {
      try {
        // envío mail confirmación
        let respMail = await sendMail(
          instanceUser.email,
          "Usuario creado",
          "Su usuario en MGF Logística se ha creado con éxito"
        );
        return res
          .status(201)
          .send({ msg: "User created successfully", email: respMail });
      } catch (err){
        console.log(err);
        return res
          .status(404)
          .send({ err: "User Created, Failed to send email" });
      }
    }

    res.status(200).json({ msg: "User already exists, try another name" });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

module.exports = router;
