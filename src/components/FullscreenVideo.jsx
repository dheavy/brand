/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for a fullscreen video.
 */

import ImmutablePropTypes from 'react-immutable-proptypes';
import React, {PropTypes} from 'react';

const poster = posters => {
  if (posters.size === 0) {
    throw Error('Posters are missing!');
  }

  const minIndex = 0;
  const maxIndex = posters.size - 1;
  const randIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

  return `images/mp-poster-${posters.get(randIndex)}.png`;
}

const size = (width, height, ratio) => {
  const div = width / height;

  // Landscape.
  if (width > height) {
    // Window width exceeds/equals video width.
    if (div > ratio) {
      return {width: '100%', height: 'auto'}
    } else {
      return {height: '100%', width: 'auto'}
    }
  }
}

const videosrc = (video, format) => `videos/${video}.${format}`;
const videotype = format => `video/${format}`

let videoPoster;

const FullscreenVideo = props => {
  videoPoster = videoPoster || poster(props.posters);

  return (
    <video
      loop
      muted
      autoPlay={props.play}
      className="fullscreen"
      poster={videoPoster}
      style={size(props.width, props.height, props.aspectRatio)}
    >
      {!props.isMobile &&
        <VideoSrc src={props.video} format={'mp4'} />
      }

      {!props.isMobile &&
        <VideoSrc src={props.video} format={'webm'} />
      }
    </video>
  );
};

FullscreenVideo.propTypes = {
  posters: ImmutablePropTypes.list.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  video: PropTypes.string.isRequired,
  play: PropTypes.bool,
  isMobile: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

const VideoSrc = props => {
  return (
    <source src={videosrc(props.src, props.format)} type={videotype(props.format)} />
  );
};

VideoSrc.propTypes = {
  src: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired
};

export default FullscreenVideo;
