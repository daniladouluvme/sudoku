import config from "@config";
import { Router } from "express";
import { User } from "@dbmodel/user.model";
import { compareSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { createTransport } from "nodemailer";
import { Verification } from "@dbmodel/verification.model";
import { generateVerificationCode } from "../../../database/utils/generate-verification-code";
import { verifyToken } from "../../../database/utils/verify-token";
import { createCrudRouter } from "../create-crud-router";
import { getUserId } from "../../utils/get-user-id";
import { friendRequestRouter } from "./friend-request-router";
import { friendRouter } from "./friend-router";
import { gameRouter } from "./game.router";
import { gameRequestRouter } from "./game-request.router";

export const userRouter = (): Router => {
  const router = Router();

  router.post("/login", async (req, res): Promise<any> => {
    const { login, password } = req.body;
    const user = await User.findOne({ login });

    if (!user || !compareSync(password, user.password ?? "")) {
      res.status(404).send({ notFound: true });
      return;
    }

    if (!user.emailVerified) {
      return res.status(201).send(user);
    }

    const token = sign(
      { userId: user._id, role: "user" },
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
      .json(user);
  });

  router.post("/register", async (req, res): Promise<any> => {
    try {
      const { login, email, password } = req.body;

      const existByLogin = await User.findOne({ login });
      if (existByLogin) return res.status(409).send({ login: true });

      const existByEmail = await User.findOne({ email });
      if (existByEmail) return res.status(409).send({ email: true });

      const hashedPassword = hashSync(password, 12);
      const user = await User.create({
        login,
        password: hashedPassword,
        email,
        emailVerified: false,
      });

      const verification = await Verification.create({
        user: user._id,
        code: generateVerificationCode(),
        validUntil: new Date(+new Date() + 9e5),
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

      const mailOptions = {
        from: config.email.user,
        to: email,
        subject: "Email Verification",
        text: `Code: ${verification.code}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).send(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(201).send(user);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  router.post("/verifyEmail", async (req, res): Promise<any> => {
    const { userId, code } = req.body;
    const verification = await Verification.findOne({
      user: userId,
      code,
      validUntil: { $gte: new Date() },
    });
    if (!verification) return res.status(404).send();

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { emailVerified: true },
      { new: true }
    );

    const token = sign(
      { userId: user?._id, role: "user" },
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
      .json(user);
  });

  router.post("/logout", (_, res) => {
    res.clearCookie("token");
    res.status(204).send();
  });

  router.post("/verify", verifyToken, async (req, res): Promise<any> => {
    const userId = getUserId(req);
    if (!userId) return res.status(401).send();
    const user = await User.findById(userId);
    res.send(user);
  });

  // Friend requests
  router.use("/friendRequests", friendRequestRouter());

  // Friends
  router.use("/friends", friendRouter());

  // Games
  router.use("/games", gameRouter());

  // Game requests
  router.use("/gameRequests", gameRequestRouter());

  router.use("", createCrudRouter(User));

  return router;
};
