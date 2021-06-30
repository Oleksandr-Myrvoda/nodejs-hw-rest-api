const passport = require("passport");
const passportJWT = require("passport-jwt");
require("dotenv").config();

const { users: services } = require("../services");

const { ExtractJwt, Strategy } = passportJWT;
const { TOKEN_KEY } = process.env;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_KEY,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await services.getById(payload.id);
      if (!user) {
        throw new Error("User not found");
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
