import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/LodingGif';
import ProfileItem from '../profiles/ProfileItem';
import { getPost } from '../../action/postActions';
import isEmpty from '../../utils/isEmpty';
import LikeProfileItem from './LikeProfileItem';
import { Link } from 'react-router-dom';

class LikesProfiles extends Component{
  
  componentDidMount(){
    this.props.getPost(this.props.match.params.id);
  }
  render(){

    const { postLikes } = this.props;
    const { loading } = this.props.post;
    let profileItems;
    if(postLikes === null || loading){
      profileItems = <Spinner/>
    }
    else if(!isEmpty(postLikes)){
      profileItems = postLikes.map(postLike => (
        <LikeProfileItem key={postLike._id} postLike = {postLike}/>
      ))
     } 
    else{
      profileItems = 'No one has liked this post yet...';
    }
    return(
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
              <h3 className="text-center">
                {!isEmpty(postLikes) && (<div>Wanderers who have liked this post...</div>)}
              </h3>
              <div className="col-md-12">
                <Link to="/dashboard" className="btn btn-light mb-3">
                  Return <i className="fas fa-home"></i>
                </Link>
                <h4>{profileItems}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
LikesProfiles.propTypes = {
  errors: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post.post,
  postLikes: state.post.post.likes,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { getPost })(LikesProfiles);
   