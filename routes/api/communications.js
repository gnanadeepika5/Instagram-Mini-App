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
               
  //@route   post api/communications/:fromUserID/:toUserId
// @desc    get all messages(chat history) from a conversation by conversation id
// @access  private 
router.get('/conversation/:toid',passport.authenticate('jwt', {session: false}) , (req, res) => {
  const fromUserId = req.user.id;
  
  const toUserId = req.params.toid;
  var conversationId='';
  if(fromUserId < toUserId){
    conversationId = fromUserId+'ADD'+toUserId;
  }
  else{
   conversationId = toUserId+'ADD'+fromUserId;
  }
  
  console.log(`before finding anything yet,from user id is ${fromUserId}, to user id is ${toUserId} and conversation is is ${conversationId}`);
 
  Communication.findOne({conversationId: conversationId})
               .then(conversation =>{
                 
                 if(!conversation)
                 {
                   return res.json({NoConversationFound:'No conversation found with this id'});
                 }
                 else{
                  if(fromUserId != req.user.id)
                  {
                   return res.status(400).json({UnAuthorizedUser:'UnAuthorized user to see this conversation'});
                  }
                  else{
                  res.json(conversation)
                  }
                
                }
              })
                .catch(err=>console.log(err));

  
  
})
    //@route   post api/communications/:fromUserID/:toUserId
// @desc    delete all message from a conversation
// @access  private 
router.delete('/conversation/:toid',passport.authenticate('jwt', {session: false}) , (req, res) => {
  const fromUserId = req.user.id;
  console.log(`printing req.params.toid then, ${req.params.toid}`);
  const toUserId = req.params.toid;
  console.log(`printing toUserId then, ${toUserId}`);
  var conversationId='';
  if(fromUserId < toUserId){
    conversationId = fromUserId+'ADD'+toUserId;
  }
  else{
   conversationId = toUserId+'ADD'+fromUserId;
  }
  
  console.log(`before finding anything yet,from user id is ${fromUserId}, to user id is ${toUserId} and conversation is is ${conversationId}`);
 
  Communication.findOne({conversationId: conversationId})
               .then(conversation =>{
                 
                 if(!conversation)
                 {
                   return res.json({NoConversationFound:'No conversation found with this id'});
                 }
                 else
                 {
                  if(fromUserId != req.user.id)
                  {
                   return res.status(400).json({UnAuthorizedUser:'UnAuthorized user to see this conversation'});
                  }
                  else{
                    messagesList = conversation.messages;
                     //go through messages to delete all of them
                     messagesListLength=(messagesList).length;
                     console.log(`messages length is ${messagesListLength}`);
                     if(messagesListLength>0 )
                      {
                        console.log(`messages list is ${messagesList}`);
                         for(i=0;i<messagesListLength;i++)
                           {
                             messageListItem = messagesList[i];
                             console.log(`message list item is ${messageListItem}`);
                             const removeIndex = messagesList
                                .map(messageListItem => messageListItem._id.toString()) // goes to every comment and get the comment id in string type so that our comment_id passed in params can be found
                                .indexOf(messageListItem);//gets the index of comment_id which found through map() function above
                            console.log(`remove index in messages${removeIndex}`);



                            //  const removeIndex = indexOf(messageListItem);
                            //  console.log(`remove index of ${messageListItem} is ${removeIndex}`);
                                        //                   messagesList[i].remove()
                                        //  .then(()=>console.log(`${messageListItem} got deleted `))
                                        //  .catch(err => console.log(err));
                          //splice the array
                            messagesList.splice(removeIndex, 1);
                            //save
                           conversation.save()
                               .then(conversation=>res.json(conversation))
                               .catch(err =>console.log(err));
                           }
                       }
                       else{
                               return res.json({msg:'there are no messages to delete'});
                           }
                    }
                  }
 })
   .catch(err=>console.log(err));



})
  //@route   post api/users/mssages/:id
// @desc    get a message from a conversation by conversation id, message id
// @access  private 

router.delete('/message/:id',passport.authenticate('jwt', {session: false}) , (req, res) => {

  Communication.findOne()
})


//@route   post api/users/mssages/:id
// @desc    delete a message from a user by user id
//checkfrom user is author of message and if deleted should not be shown in from user chat anymore but should show in to user chat still
// @access  private 
router.delete('/message/:id',passport.authenticate('jwt', {session: false}) , (req, res) => {

   
})




  module.exports = router;