import UserMessage from "../models/UserMessage.js";
import JoiBase from "joi";
import JoiDate from "@joi/date";
import bcrypt from "bcrypt";

import { getToken, COOKIE_OPTIONS, getRefreshToken } from "../authenticate.js";

const Joi = JoiBase.extend(JoiDate);

export const createUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().required(),
    birth: Joi.date().format("YYYY/MM/DD").required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let user = req.body;
  user = { ...user, active: 0 };
  const newUser = new UserMessage(user);

  try {
    await UserMessage.findOne(
      { username: user.username },
      function (error, user) {
        if (user) {
          res.status(404).send({ error: "Account already created" });
        } else {
          newUser.save();
          res.status(200).json(newUser);
        }
      }
    );
  } catch (error) {
    res.status(409).json({ message: error.message });
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
  const usern = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(usern.password, salt);

    await UserMessage.findOne(
      {
        $or: [
          {
            email: usern.email,
          },
          {
            username: usern.username,
          },
        ],
      },
      function (error, user) {
        if (user) {
          let errors = {};
          if (user.username === usern.username) {
            errors.username = "User Name already exists";
            res.send({ errors });
          } else if (user.email === usern.email) {
            // update the user object found using findOne
            user.username = usern.username;
            user.password = password;

            const token = getToken({ _id: user._id });
            const refreshToken = getRefreshToken({ _id: user._id });

            user.refreshToken.push({ refreshToken });

            // now update it in MongoDB
            user.save((err, user) => {
              if (err) {
                res.statusCode = 500;
                res.send(err);
              } else {
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                res.send({ success: true, token });
              }
            }); //save user function
          } // if email is correct
        } // if user is found
      }
    ); // db find function
  } catch (error) {
    // try
    res.status(409).json({ message: error.message });
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
