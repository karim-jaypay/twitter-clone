import UserMessage from "../models/UserMessage.js";
import AccountsActivation from "../models/accountsActivation.js";

import { sendMail, signupTemplate } from "../helpers/sendgrid.js";

import JoiBase from "joi";
import JoiDate from "@joi/date";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { getToken, COOKIE_OPTIONS, getRefreshToken } from "../authenticate.js";

const Joi = JoiBase.extend(JoiDate);

export const createUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().required(),
    birthDate: Joi.date().format("YYYY-MM-DD").required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let user = req.body;
  const newUser = new UserMessage(user);

  try {
    const register = await UserMessage.findOne({ email: user.email });
    // if user registers for first time
    if (!register) {
      newUser.save();
      return res.status(200).json(newUser);
    }

    if (register) {
      // if user has completed all registration processes and activated his account else if he is not yet active
      if (register.username) {
        if (register.active === 1) {
          return res.status(404).send("Account already created");
        } else {
          // create token
          const token = crypto.randomBytes(48).toString("hex");
          // overwrite the token in accountActivation model
          await AccountsActivation.findByIdAndUpdate(register._id, {
            token: token,
          });
          // send activation email to user
          /* await sendMail.send(
            signupTemplate({
              name: register.name,
              email: register.email,
              activationCode: token,
            })
          ); */
          return res.status(200).json({
            code: "activation",
            message: "Another activation code has been sent to your email!",
          });
        }
      }
      // if user has completed his first registration process
      const overwriteUserFields = register;
      overwriteUserFields.name = user.name;
      overwriteUserFields.email = user.email;
      overwriteUserFields.birthDate = user.birthDate;
      overwriteUserFields.save();
      return res.status(200).send(overwriteUserFields);
    }
  } catch (error) {
    res.status(409).send(error.message);
  }
};

export const secregisterUser = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.send(error.details[0].message);
  const userFromBody = req.body;

  try {
    // check if username is taken from another user
    const checkUsernameIfTaken = await UserMessage.findOne({
      username: userFromBody.username,
    });
    if (checkUsernameIfTaken)
      return res.status(404).send("Username already taken");

    // get user by email and update his fields
    const getUserByMail = await UserMessage.findOne({
      email: userFromBody.email,
    });
    if (!getUserByMail) {
      return res.status(404).send("User not found");
    } else {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(userFromBody.password, salt);

      // update user info
      getUserByMail.username = userFromBody.username;
      getUserByMail.password = password;
      getUserByMail.save();

      // fill user id and token in collection
      const token = crypto.randomBytes(48).toString("hex");
      const sendActivationToken = await AccountsActivation.findOne({
        user_id: getUserByMail._id,
      });
      if (sendActivationToken) {
        sendActivationToken.token = token;
        sendActivationToken.updatedAt = new Date();
        sendActivationToken.save();
      } else {
        const userActivationFields = new AccountsActivation({
          user_id: getUserByMail._id,
          token: token,
        });
        userActivationFields.save();
      }
      await sendMail.send(
        signupTemplate({
          name: getUserByMail.name,
          email: getUserByMail.email,
          activationCode: token,
        })
      );
      return res.status(200).json(getUserByMail);
    }

    // const token = getToken({ _id: user._id });
    // const refreshToken = getRefreshToken({ _id: user._id });

    // user.refreshToken.push({ refreshToken });

    // now update it in MongoDB

    // user.save((err, user) => {
    //   if (err) {
    //     res.statusCode = 500;
    //     res.send(err);
    //   } else {
    //    // res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    //    // res.send({ success: true, token });
    //   }
  } catch (error) {
    // try
    res.status(409).send(error.message);
  }
};

export const Logout = async (req, res) => {
  /*-- get token from cookie --*/
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  try {
    await UserMessage.findById(req.user._id).then(
      (user) => {
        const tokenIndex = user.refreshToken.findIndex(
          (item) => item.refreshToken === refreshToken
        );

        if (tokenIndex !== -1) {
          user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
        }

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.clearCookie("refreshToken", COOKIE_OPTIONS);
            res.send({ success: true });
          }
        });
      },
      (err) => console.log(err)
    );
  } catch (err) {
    console.log(err);
  }
};
