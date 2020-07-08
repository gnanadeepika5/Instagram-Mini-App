const express = require('express');
const passport = require('passport');
const User = require('../../models/User');
const Logout = require('../../models/Logout');
const isEmpty = require('../../validations/isEmpty');
//const bcrypt = require('bcryptjs');
const crypto = require('crypto');
// const { json } = require('body-parser');
const tokenValidator = require('../../config/tokenValidator');

const router = express.Router();

// @route   post api/logout/
// @desc    logout a user by user id
// @access  private 
router.get('/test', (req,res)=>res.json({msg:'success'})); 

router.post('/', passport.authenticate('jwt', {session:false}),tokenValidator, function(req, res){
  const userID = req.user.id;
  console.log(`userID is ${userID}`);
  User.findOne({_id: req.user.id}) 
      .then(user=>{
        if(!user)
        {
          return res.json({NoUserFound:'No User found with that user id.'});
        }
        else
        {
            //console.log(`user exists`);
           // console.log(`userid coming from user token is ${userId}`);
            Logout.findOne({user: userID})
                  .then(logoutUser =>{
                    //console.log(` user id inside logout finding is ${req.user.id}`);
                    if(!logoutUser)
                    {
                     // console.log(`there is no logoutUser with this user yet that means no token saved to db yet`);
                      //create logoutUser
                      const newlogoutUser =new Logout({
                        user: req.user.id,
                        email: req.user.email
                      })

                      //create logouttoken and store user's token in here
                      const newLogoutToken = {

                        token: req.headers['authorization'],
                        TokenExpirationTime: req.authInfo.TokenExpirationTime
                         
                      }
                          newLogoutToken.token = crypto.createHash('sha256').update(newLogoutToken.token).digest('base64');
                      
                      newlogoutUser.LogoutTokenList = [newLogoutToken];
                      
                      // append the new LogoutToken to the LogoutToken array by using unshift() method.And this will also returns the new length // after appending new LogoutToken everytime.To append back of array use push() method
                      // logoutUser.LogoutToken.unshift(newLogoutToken);
                      // save in db
                      newlogoutUser.save()
                                .then(newlogoutUser=>{
                                  //console.log(`newlogoutuser saved is ${newlogoutUser}`);
                                            res.json({msg:'log out success'});
                                          })
                                .catch(err=>console.log(err));
                    }
                    //user exists already just add a coming token as new token in db
                    else
                    {
                      const newLogoutToken={
                        token: req.headers['authorization'],
                        TokenExpirationTime: req.authInfo.TokenExpirationTime
                      }
                          newLogoutToken.token = crypto.createHash('sha256').update(newLogoutToken.token).digest('base64');
                      //append the new LogoitToken to the LogoutToken array by using unshift() method.And this will also returns the new length after appending new LogoutToken everytime.To append back of array use push() method
                      AllTokens = logoutUser.LogoutTokenList
                     TokenFromRequest = req.headers['authorization'];
                              console.log(`token coming from request is ${TokenFromRequest}`);
                          
                              var tokenHash = crypto.createHash('sha256').update(TokenFromRequest).digest('base64');
                              var foundToken = false;
                                              
                                for(const TokenItem of AllTokens)
                                {
                                  console.log(`token item is ${TokenItem}`);
                                  console.log('/n');
                                  if(tokenHash === TokenItem.token) {
                                    foundToken = true;
                                  }
                                }         
                                if(!foundToken) 
                                {
                                              logoutUser.LogoutTokenList.unshift(newLogoutToken);
                                }
                      logoutUser.save()
                                .then(logoutUser =>{ 
                        //clean up code for token list
                      const currentTime = (new Date().getTime())/1000;//current time in seconds
                       //console.log(`current time is ${currentTime}`);
                      AllTokens = new Array();
                      var removeIndex;
                         AllTokens= logoutUser.LogoutTokenList;
                        AllTokensLength = (AllTokens).length;
    
                          filteredTokens=logoutUser.LogoutTokenList.filter(tokenItem=> (currentTime < tokenItem.TokenExpirationTime))
                          logoutUser.LogoutTokenList = filteredTokens;
                        //save
                      logoutUser.save()  
                             .then(logoutUser=>
                                 {
                                  res.json({msg:'log out success'});
                                                                                     
                                         })
                                  .catch(err=>console.log(err));
                               })
                               .catch(err => console.log(err));                             
                            }                            
                  })
                  .catch(err => console.log(err));                             
        }
      })
      .catch(err=>console.log(err));
});
module.exports = router;