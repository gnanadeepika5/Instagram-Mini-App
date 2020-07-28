// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// class MessageItem extends Component{
//   render(){
//     const { toUserId, message, auth } = this.props;
//   // if( message.fromUserId === auth.user.id)
//   // {}
//     return(
//       <div className="card card-body mb-3">
        
//             {/* {console.log("message is "+message)}
//             {console.dir(message)}
//             {console.log("message from user id is "+message.fromUserId)} */}
//             {message.fromUserId === auth.user.id  ? (
//               <div className="row">
//               <div className="col-md-2">
//                 <div className="col-md-10">
//                   <p className="lead">{message.msg}
//                   </p>
//                 </div>
//                 <Link to={`/profile/${message.handle}`}>
//                   <img className="rounded-circle d-none d-md-inline comment-avatar float-right"
//                     src={message.avatar}
//                     alt="">
//                   </img>
//                   <span className="text-right text-dark comment-handle">{message.handle}</span>
//                 </Link>
//                 </div>
//                 </div>) : (
//                 <div className="row">
//                 <div className="col-md-2">
//                   <Link to={`/profile/${message.handle}`}>
//                     <img className="rounded-circle d-none d-md-inline comment-avatar"
//                       src={message.avatar}
//                       alt="">
//                     </img>
//                     <span className="text-left text-dark comment-handle">{message.handle}</span>
//                   </Link>
//                   <div className="col-md-10">
//                     <p className="lead">{message.msg}
//                     </p>
//                   </div>
//                 </div>
//                 </div>) }
//           {/* <Link to={`/profile/${message.handle}`}>
//               <img className="rounded-circle d-none d-md-inline comment-avatar"
//                     src={message.avatar}
//                     alt="">
//               </img>
//               <span className="text-left text-dark comment-handle">{message.handle}</span>
//               </Link>
//           </div>
//           <div className="col-md-10">
//           <p className="lead">{message.msg}
//           </p>
//           </div> */}
//         </div>
//     );
//   }
// }

// MessageItem.propTypes = {
//   auth: PropTypes.object.isRequired,
//   toUserId: PropTypes.string.isRequired,
//   message: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//   auth: state.auth
// })

// export default connect(mapStateToProps, null) (MessageItem);






import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class MessageItem extends Component{
  render(){
    const { toUserId, message, auth } = this.props;
  // if( message.fromUserId === auth.user.id)
  // {}
    return(
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
          <Link to={`/profile/${message.handle}`}>
              <img className="rounded-circle d-none d-md-inline comment-avatar"
                    src={message.avatar}
                    alt="">
              </img>
              <span className="text-left text-dark comment-handle">{message.handle}</span>
              </Link>
          </div>
          <div className="col-md-10">
          <p className="lead">{message.msg}
          </p>
          </div>
        </div>
      </div>
    );
  }
}

MessageItem.propTypes = {
  auth: PropTypes.object.isRequired,
  toUserId: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null) (MessageItem);