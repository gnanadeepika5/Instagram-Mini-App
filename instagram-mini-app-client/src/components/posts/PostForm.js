import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addPost } from '../../action/postActions';
import TextFieldGroup from '../common/TextFieldGroup';

class PostForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      imageOrVideoLink:'',
      isimageOrVideo: '',
      text: '',
      errors: {}
    };

    this.onChange = this.onchange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
  onSubmit(e){
    e.preventDefault();

    const newPost = {
      imageOrVideoLink: this.state.imageOrVideoLink,
      isImageOrVideo: this.state.isImageOrVideo,
      text: this.state.text,
    };
    this.props.addPost(newPost, this.props.history);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }


  render() {
    const { errors } = this.state;

    return (
    <div className="page-content">
        <div className="container">
          <div className="row">
            <div className=".col-12 .col-sm-12 col-md-12 .col-lg-8 .col-xl-6">
              <div className="post-form mb-3">
                <div className="card card-info">
                  <div className="card-header">Share your latest moment.</div>
                  <div className="card-body">
                    <form id="addPost-form" onSubmit={this.onSubmit}>
                      <div className="form-group">
                      <label htmlFor="imageOrVideo" className="dropdown-text">Are you sharing an image or a video? </label>
                          <select id="imageOrVideo" 
                                  className={classnames("form-control form-control-lg", {'is-invalid': errors.isImageOrVideo})} 
                                  name="isImageOrVideo" form="addPost-form" 
                                  value={this.state.isImageOrVideo} 
                                  onChange={this.onChange}>
                          
                          {/* className="form-control dropdown-btn" name="isImageOrVideo" form="addPost-form" value={this.state.isImageOrVideo} onChange={this.onChange}> */}
                            <option>Select one:</option>
                            <option>Image</option>
                            <option>Video</option>
                          </select>
                          
                          {errors.isImageOrVideo && (<div className="invalid-feedback">{errors.isImageOrVideo}</div>)}
                          <br/>
                      <TextFieldGroup
                          placeholder="Paste the url of your image/video"
                          name="imageOrVideoLink"
                          type="text"
                          value={this.state.imageOrVideoLink}
                          onChange={this.onChange}
                          error={errors.imageOrVideoLink}
                        />
                      </div>
                      <div className="form-group">  
                        <TextFieldGroup
                          placeholder="add title or text for your post"
                          name="text"
                          type="text"
                          value={this.state.text}
                          onChange={this.onChange.bind(this)}
                          error={errors.text}
                        />
                      </div>
                      <button type="submit" className="btn btn-info btn-block mt-4">
                        Submit
                      </button>
                      </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, {addPost})(PostForm);