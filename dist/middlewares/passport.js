import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, } from "passport-jwt";
import { PrismaClient } from "@prisma/client";
import { PUBLIC_KEY } from "../config/config.js";
const prisma = new PrismaClient();
// Get the public key (from file)
// const publicKey = fs.readFileSync("./public.pem", "utf8");
const publicKey = PUBLIC_KEY.replace(/\\n/g, "\n");
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey, // Use the PUBLIC key for verification!
    algorithms: ["RS256"], // VERY IMPORTANT: Specify the algorithm
};
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: payload.sub },
        });
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (error) {
        console.error("Error in JWT strategy:", error);
        return done(error, false);
    }
});
passport.use(jwtStrategy);
export default passport;
//# sourceMappingURL=passport.js.map