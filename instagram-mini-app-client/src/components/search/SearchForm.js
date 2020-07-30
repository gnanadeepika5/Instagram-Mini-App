// import React from "react";
// import { MDBContainer, MDBIcon } from "mdbreact";
// import searchcss from './searchPage.css';

// const SearchPage = () => {
//   return (
//     <MDBContainer>
//     <div className="input-group md-form form-sm form-2 pl-0">
//         <input className="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search" />
//         <div className="input-group-append">
//           <span className="input-group-text red lighten-3" id="basic-text1">
//             <MDBIcon icon="search" className="text-grey" />
//           </span>
//         </div>
//       </div>
//       </MDBContainer>
//   );
// }

// export default SearchPage;

import React, { Component } from 'react';
import classnames from 'classnames';
import TextAreaFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchPosts } from '../../action/searchActions';
import  SearchFeed  from './SearchFeed';
class SearchForm extends Component {
  constructor(){
    super();
    this.state = {
      searchText:'',
      errors: {}
    }
  
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
  onChange(e){
    this.setState({[e.target.name] : e.target.value})
  }
  onSubmit(e){  
    e.preventDefault();

    const searchText = this.state.searchText
    this.props.searchPosts(searchText, this.props.history);
    this.setState({searchText: ''});
  }
  

  render(){
    const {errors} = this.state;
    console.log("trying search "+this.props.search);
    console.dir(this.props.search);
    
    return(
      <div>
       
        <div className="mb-3">
          <div className="card card-info">
            <div className="card-body">
            {/* <form action="search.html"> */}
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextAreaFieldGroup type="text" 
                       name="searchText" 
                       className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name,
                        
                      })} 
                      // className="form-control form-control-lg"
                       placeholder="Search and Explore!!!" 
                       value={this.state.searchText}
                       onChange={this.onChange}
                       error={errors.searchText}

                  />
                  
                  
                </div>
                <button type="submit" className="btn btn-info" ><i class="fa fa-search" aria-hidden="true"></i>
                  Go Search
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>
          {(this.props.search )? (
          <SearchFeed 
           posts={this.props.search.posts[0]}>

        </SearchFeed>) : (null)}
          
        
        </div>
      </div>
    );
  }

}
SearchForm.propTypes ={
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  searchText: PropTypes.string.isRequired,
  searchPosts: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search,
  errors: state.errors
});

export default connect( mapStateToProps, { searchPosts }) (SearchForm);