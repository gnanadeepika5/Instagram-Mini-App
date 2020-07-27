import React, { Component } from 'react';
import MessageItem from './MessageItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../common/LodingGif';
import { getMessages } from '../../action/messageActions';

class MessageFeed extends Component {

  componentDidMount(){
    const toUserId = this.props.toUserId;
    this.props.getMessages(toUserId);
    console.dir(this.props);
  }
  render(){
         //console.dir(this.props);

    //console.log("this.props.get messages in render is " + this.props.getMessages);

    //const user = this.state.auth.user.id;
    const {messages, loading } = this.props.message;
    var finalmessages = {messages}.messages;
    // console.log("printing here " + finalmessages);
    // console.dir(finalmessages.messages);
    finalmessages = finalmessages.messages;
    //console.log("printing here2 " + {messages});
    let messageContent;
    if(finalmessages === null || loading || !finalmessages){
      messageContent = <spinner/>
    } else if(finalmessages.length > 0){
      
      messageContent = finalmessages.map(message => <MessageItem key={message._id} message={message}/>);
    }

    return (
      <div className="feed">
        <div className="container">
          {messageContent}
        
        </div>
      </div>



    )
    
  }
}

MessageFeed.propTypes = {
  toUserId: PropTypes.string.isRequired,
  getMessages: PropTypes.func.isRequired

}

const mapStateToProps = (state) => ({
  auth: state.auth,
  message: state.message,
  errors: state.errors
})

export default connect(mapStateToProps, { getMessages })(MessageFeed);

