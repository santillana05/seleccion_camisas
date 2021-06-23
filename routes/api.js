var express = require('express');
var router = express.Router();

let passport = require('passport');
let passportJWT = require('passport-jwt');

let extractJWT = passportJWT.ExtractJwt;
let strategyJWT = passportJWT.Strategy;

passport.use(
  new strategyJWT(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (payload, next)=>{
       var user = payload;
       return next(null, user);
    }
  )
)

const jwtAuthMiddleware = passport.authenticate('jwt', {session:false});

const securityRoutes = require('./api/seguridad');
const productosRoutes = require('./api/productosdb');

router.get('/version',(req, res)=>{
    let versionObj = {
        app:"tienda-virtual",
        version: "0.0.1",
        state: "alpha"
    }
    res.status(200).json(versionObj);
});


//-------//

router.use('/security', securityRoutes);
router.use('/productos', jwtAuthMiddleware, productosRoutes);

module.exports = router;