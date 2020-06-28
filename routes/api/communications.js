const express = require('express');
const Communication = require('../../models/Communication');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const isEmpty = require('../../validations/isEmpty');
const validateMessage = require('../../validations/messages');
const router = express.Router();

// @route   post api/communication/conversation/:fromId/:toId
// @desc    post a message to a user by user id
// @access  private 
router.post('/conversation/:toId',passport.authenticate('jwt', {session: false}) , (req, res) => {
  //validation
  const {errors, isValid} = validateMessage(req.body);
    if(!isValid){
      return res.json(errors);
    }
  const fromUserId = req.user.id;
  const toUserId = req.params.toId;
  var conversationId='';
  if(fromUserId < toUserId){
    conversationId = fromUserId+'ADD'+toUserId;
  }
  else{
   conversationId = toUserId+'ADD'+fromUserId;
  }
  
  console.log(`before finding anything yet,from user id is ${fromUserId}, to user id is ${toUserId} and conversation is is ${conversationId}`);
 
  User.findOne({_id:req.params.toId})
      .then(user => {
        if(!user){
          return res.status(400).json({errors: 'user not found. Check the user id.'})
        }
        Communication.findOne({conversationId: conversationId})
                     .then(conversation=>{
                       console.log(`conversationId is ${conversationId}`);
                       if(conversation)
                       {
                       //conversation is there
                       //Add a message
                       const newMessage = {
                        
                        msg:req.body.msg//later it comes from token
                      }
                      conversation.messages.unshift(newMessage);
                      conversation.save()
                          .then(conversation, res.json(conversation))
                          .catch(err => console.log(err)); 
                       }  
                       else{
                         //create a new conversation
                          const newConversation = new Communication({
                               conversationId,
                             fromUserId: fromUserId,//comes from token
                             toUserId: toUserId
                             // msg:req.body.msg
                             //create message
                          })
                             const newMessage = {
                        
                              msg:req.body.msg//later it comes from token
                            }
                            newConversation.messages = [newMessage];
                            // messages.unshift(newMessage);
                            newConversation.save()
                                .then(newConversation, res.json(newConversation))
                                .catch(err => console.log(err)); 

                       }
                       }) 
                       .catch(err=>console.log(err));
                        
                     })
                     .catch(err=>console.log(err));
  });

//@route   post api/users/messages/:id
// @desc    post a message to a user by user id
// @access  private 
router.post('/messages/:id',passport.authenticate('jwt', {session: false}) , (req, res) => {
});
  module.exports = router;