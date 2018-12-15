import React, { Component } from "react";
import PropTypes from "prop-types";

import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    // map through each post, returning PostItem components for each post
    return posts.map(post => <PostItem key={post._id} post={post} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
