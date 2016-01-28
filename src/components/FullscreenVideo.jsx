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

const videosrc = (video, format) => `videos/${video}.${format}`;
const videotype = format => `video/${format}`

const FullscreenVideo = props => {
  return (
    <video autoPlay={props.play} loop muted className="fullscreen"
           poster={poster(props.posters)}>
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
  video: PropTypes.string.isRequired,
  play: PropTypes.bool,
  isMobile: PropTypes.bool
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
