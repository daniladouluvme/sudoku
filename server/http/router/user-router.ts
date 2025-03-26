import { Router } from "express";
import { User } from "@dbmodel/user.model";
import { compareSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { createTransport } from "nodemailer";
import config from "@config";

export const userRouter = (): Router => {
  const router = Router();

  router.post("/login", async (req, res) => {
    const { login, password } = req.body;
    const result = await User.findOne({ login });

    if (!result || !compareSync(password, result.password ?? "")) {
      res.status(401).send();
      return;
    }

    const token = sign(
      { userId: result.id, role: "user" },
      config.jwtSecretKey,
      {
        expiresIn: "1d",
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 864e5,
        secure: false,
        sameSite: "strict",
      })
      .status(201)
      .json(result);
  });

  router.post("/register", async (req, res): Promise<any> => {
    try {
      const { login, email, password } = req.body;

      const exist = await User.findOne({ $or: [{ login }, { email }] });
      if (exist) return res.status(409).send();

      const hashedPassword = hashSync(password, 12);
      const result = await User.create({
        login,
        password: hashedPassword,
        email,
        emailVerified: false,
      });

      const transporter = createTransport({
        service: config.email.service,
        port: 567,
        secure: false,
        auth: {
          user: config.email.user,
          pass: config.email.pass,
        },
      });

      const emailToken = sign({ email }, config.jwtSecretKey, {
        expiresIn: "1h",
      });

      const mailOptions = {
        from: config.email.user,
        to: email,
        subject: "Email Verification",
        text: `To confirm the email, click on the following link: http://localhost:${config.server.port}/api/users/verification/${emailToken}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log("Email sent: " + info.response);
      });

      const token = sign(
        { userId: result.id, role: "user" },
        config.jwtSecretKey,
        {
          expiresIn: "1d",
        }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 864e5,
          secure: false,
          sameSite: "strict",
        })
        .status(201)
        .json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  router.post("/register", async (req, res): Promise<any> => {
    console.log(req.params);
    res.send(req.params);
  });

  return router;
};
