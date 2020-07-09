// module.exports = function tokenValidator(data) {
//     console.log('hello world');
// }
const crypto = require('crypto');
const Logout = require('../models/Logout')


module.exports = function tokenValidator(req, res, next) {
  TokenFromRequest = req.headers['authorization']
  Logout.findOne({user:req.user.id})
        .then(logoutUser=>{
          if(logoutUser){
            AllTokens = logoutUser.LogoutTokenList;
            var tokenHash = crypto.createHash('sha256').update(TokenFromRequest).digest('base64');
                              var foundToken = false;
                                              
                                for(const TokenItem of AllTokens)
                                {
                                  console.log(`token item is ${TokenItem}`);
                                  console.log('/n');
                                  if(tokenHash === TokenItem.token) {
                                    foundToken = true;
                                    if(foundToken === true)
                                    {
                                      return res.json({msg:'unauthorized user here'})
                                    }
                                  }

                                }
          } else {
            next();
          }
        }
        )
        .catch();
}