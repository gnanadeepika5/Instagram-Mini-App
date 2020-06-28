const express = require('express');
const Communication = require('../../models/Communication');
const passport = require('passport');
const isEmpty = require('../../validations/isEmpty');
const validateMessage = require('../../validations/messages');

const router = express.Router();


// @route   post api/communication/conversation/:toId
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
                        fromUserId: req.user.id,
                        toUserId,
                        //toUserId:req.params.toId,
                        msg:req.body.msg//later it comes from token
                      }
                      console.log(`to user id just after creating message is ${toUserId}`);
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
                              fromUserId: req.user.id,
                              toUserId:req.params.toId,
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

  //@route  get api/communications/:fromUserId/:toUserId
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
                  //flagRead = true;
                  //res.json(conversation);
                  messagesList = conversation.messages;
                  console.log(`messages list ${messagesList}`);
                  for(i=0;i<messagesList.length;i++)
                  {
                    messageListItem =messagesList[i];
                    messageListItem.flagRead = true;
                  }
                  conversation.save()
                              .then(conversation=>res.json(conversation))
                              .catch(err =>console.log(err));

                  }
                
                }
              })
                .catch(err=>console.log(err));

  
  
})
//@route    delete api/communications/:fromUserId/:toUserId
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

  //@route   delete api/communications/:conversation_id/:message_id  ggg
// @desc    delete a message from a conversation by conversation id, message id
// @access  private 

router.delete('/conversation/:toId/:message_id',passport.authenticate('jwt', {session: false}) , (req, res) => {
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
 
  Communication.findOne({conversationId: conversationId})
               .then(conversation =>{
                 if(!conversation)
                 {
                   return res.json({NoConversationFound:'No conversation found with this id'});
                 }
                 else{
                   if(conversation.fromUserId.toString() === req.user.id || conversation.toUserId.toString() === req.user.id)
                   {
                    // console.log(`from user id in conversation is ${conversation.fromUserId}`);
                    // console.log(` to user is in conversation is ${conversation.toUserId}`);
                    // console.log(`user is coming from token is ${req.user.id}`);

                    if(conversation.messages.filter(message=>message._id.toString() === req.params.message_id).length ===0)
                   {
                     return res.status(400).json({MessageUnavailable: 'No Message with that id is available to be deleted'});
                   }
                   else{
                  
                     //  //code for only the user who senth this message can delete it.
                    //  if(conversation.messages.filter(message=>(message.fromUserId.toString() != req.user.id)))
                    //  {
                    //    return res.json({msg:'UnAuthorized user to delete this message'})
                    //  }
                     const removeIndex = conversation.messages.map(message=>message._id.toString()).indexOf(req.params.message_id);
                     console.log(`remove index is ${removeIndex}`);
                     //splice an array
                     conversation.messages.splice(removeIndex, 1)
                     //save
                     conversation.save()
                                 .then(conversation=>res.json(conversation))
                                 .catch(err=>console.log(err));
                  }
                }
                else{
                  // console.log(`from user id in conversation is ${conversation.fromUserId}`);
                  //   console.log(` to user is in conversation is ${conversation.toUserId}`);
                  //   console.log(`user is coming from token is ${req.user.id}`);
                  return res.json({msg:'UnAuthorized to see this conversation'});
                }


                   }
                 
                 
               })
               .catch(err=>console.log(err));
})

//@route   post api/users/messages/:id
// @desc    delete a message from a user by user id
//checkfrom user is author of message and if deleted should not be shown in from user chat anymore but should show in to user chat still
// @access  private 



  module.exports = router;