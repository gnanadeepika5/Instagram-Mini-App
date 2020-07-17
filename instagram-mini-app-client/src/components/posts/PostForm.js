import React, {Component} from 'react';

import TextFieldGroup from '../common/TextFieldGroup';

class PostForm extends Component{
  constructor(){
    super();
    this.state = {
      imageOrVideo: '',
      text: '',
      errors: {}
    };

    this.onChange = this.onchange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e){
    e.preventDefault();

    const newPost = {
      imageOrVideo: this.state.imageOrVideo,
      text: this.state.text,
      // name: user.name,
      // handle: user.handle,
      // avatar: user.avatar
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
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                      <TextFieldGroup
                          placeholder="Paste the url of your image/video"
                          name="imageOrVideo"
                          value={this.state.imageOrVideo}
                          onChange={this.onChange}
                          error={errors.imageOrVideo}
                        />
                      </div>
                      <div className="form-group">  
                        <TextFieldGroup
                          placeholder="add title or text for your post"
                          name="text"
                          value={this.state.text}
                          onChange={this.onChange.bind(this)}
                          error={errors.text}
                        />
                      </div>
                      <button type="submit" className="btn btn-info btn-block mt-4">
                        Share
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
export default PostForm;
