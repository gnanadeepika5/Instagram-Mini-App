const express = require('express');
const passport = require('passport');
const User = require('../../models/User');
const Logout = require('../../models/Logout');
const isEmpty = require('../../validations/isEmpty');
// const { json } = require('body-parser');

const router = express.Router();
// @route   post api/logout/:email
// @desc    logout a user by email id
// @access  private 
router.get('/test', (req,res)=>res.json({msg:'success'})); 
router.post('/:email', passport.authenticate('jwt', {session:false}), function(req, res){
  const email = req.params.email;
  User.findOne({email: req.user.email}) 
      .then(user=>{
        if(!user)
        {
          return res.json({NoUserFound:'No User found with that email id.'});
        }
        else
        {
          console.log(`email id from token ${req.user.email} `);
          console.log(`user id from token ${req.user.id} `);
          if(email != req.user.email)
          {
            return res.json({UnAuthorizedUser:'You are not Authorized User'});
          }
          
          else
          {
            console.log(`user exists`);
            console.log(`email coming from user token is ${email}`);
            Logout.findOne({email: email})
                  .then(logoutUser =>{
                    //console.log(` parameter email inside logout finding is ${req.params.email}`);
                    
                    if(!logoutUser)
                    {
                      console.log(`there is no logoutUser with this email yet that means no token saved to db yet`);
                      //create logoutUser
                      const newlogoutUser =new Logout({
                        user: req.user.id,
                        email: req.user.email,
                      })

                      //create logouttoken and store user's token in here
                      const newLogoutToken = {
                        token: req.headers['authorization'].toString(),
                        //TokenExpirationTime: req.TokenExpirationTime.toString() 
                      }
                    //  console.log(`expiration time of token from payload ${TokenExpirationTime}`);
                      //console.log(`expiration time of token from payload and putting it to var ${ExpirationTime}`);

                      //console.log(`new token is ${newLogoutToken}`);
                      
                      newlogoutUser.LogoutTokenList = [newLogoutToken];
                      
                      // //append the new LogoitToken to the LogoutToken array by using unshift() method.And this will also returns the new length after appending new LogoutToken everytime.To append back of array use push() method
                      // logoutUser.LogoutToken.unshift(newLogoutToken);
                      //save in db
                      newlogoutUser.save()
                                .then(newlogoutUser=>{
                                  console.log(`newlogoutuser saved is ${newlogoutUser}`);
                                  Logout.findOne({email: email})
                                  
                                        .then(logoutUser=>
                                          
                                          {
                                            console.log(`email where trying to logout user is ${email}`);
                                            if(logoutUser)
                                            {
                                              if(logoutUser.LogoutTokenList.filter(tokenitem=> tokenitem.token.toString() === req.headers['authorization'].toString().length !=0))
                                              {
                                                return res.json({LoggingOut:'You are successfully logged out.Please login to continue.'})
                                              }


                                            }
                                          })
                                        .catch(err=>onsole.log(err));

                                //res.json(newlogoutUser)
                                })
                                .catch(err => console.log(err));
                    }
                    else
                    {
                      //logout user there so just create token and append to array
                      const newLogoutToken={
                        token: req.headers['authorization'],
                        //TokenExpirationTime: req.TokenExpirationTime
                      }
                      //console.log(`expiration time of token from payload ${TokenExpirationTime}`);
                      //console.log(`expiration time of token from payload and putting it to var ${ExpirationTime}`);
                      //append the new LogoitToken to the LogoutToken array by using unshift() method.And this will also returns the new length after appending new LogoutToken everytime.To append back of array use push() method
                      logoutUser.LogoutTokenList.unshift(newLogoutToken);
                      //save in db
                      logoutUser.save()
                                .then(logoutUser=>
                                  {
                                    console.log(`newlogoutuser saved is ${logoutUser}`);
                                  Logout.findOne({email: email})
                                        .then(logoutUser=>
                                          {
                                            console.log(`email where trying to logout user is ${email}`);
                                            if(logoutUser)
                                            {
                                              if(logoutUser.LogoutTokenList.filter(tokenitem=> tokenitem.token.toString() === req.headers['authorization'].toString().length !=0))
                                              {
                                                return res.json({LoggingOut:'You are successfully logged out.Please login to continue.'})
                                              }


                                            }
                                          })
                                        .catch(err=>onsole.log(err));

                                  //res.json(logoutUser)
                                })
                                .catch(err => console.log(err));
                    }

                  })
                  .catch(err=>console.log(err));
          }
        }
      })
      .catch(err=>console.log(err));

      Logout.findOne({email:email})
            .then(logoutUser=>{
              if(logoutUser)
              {
                if(logoutUser.LogoutTokenList.filter(tokenitem=> tokenitem.token.toString === req.headers['authorization'].toString().length !=0))
                {

                }
              }

            }
              )
            .catch()
  
  
})
module.exports = router;