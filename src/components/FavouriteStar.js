import React, { PropTypes } from 'react';

import './FavouriteStar.css';

export class FavouriteStar extends React.Component {
  static propTypes = {
    isFavourite: PropTypes.bool
  }
  constructor() {
    super();
    this.state = {};
  }
  componentWillReceiveProps() {
    this.setState({ isHovered: false });
  }
  handleMouseEnter() {
    this.setState({ isHovered: true });
  }
  handleMouseLeave() {
    this.setState({ isHovered: false });
  }
  render() {
    const { isFavourite } = this.props;
    const { isHovered } = this.state;
    const shouldBeFull = (isFavourite && !isHovered) || (!isFavourite && isHovered);
    const starClass = shouldBeFull ? 'fa-star' : 'fa-star-o';
    const classes = 'FavouriteStar fa fa-lg ' + starClass;
    return (
      <span
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        className={classes} />
    )
  }
}

export default FavouriteStar;