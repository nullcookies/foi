import React, { Component } from 'react';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';

import styleUtils from 'services/style-utils';

import PostMedia from '../media';

import VideoPlayer from './video-player';

const VideoBox = styled.div`
  .video-container {
    max-width: 100%;
    margin: 0 auto .5rem;
    display: block;
    outline: none;
    ${styleUtils.sizes.map((size, i) => styleUtils.media[size.device]`
      margin-bottom: ${styleUtils.margins[i]}rem;
    `)}
  }
  &.type-video_note {
    .video-container {
      max-width: 320px;
      ${styleUtils.sizes.map((size, i) => styleUtils.media[size.device]`
        margin-top: ${styleUtils.margins[i]}rem;
      `)}
      .video-js,
      video {
        border-radius: 100%;
      }
    }
  }
  .caption {
    margin: 0 .5rem .5rem;
    color: #666;
    font-size: .8em;
    ${styleUtils.sizes.map((size, i) => styleUtils.media[size.device]`
      margin-left: ${styleUtils.margins[i]}rem;
      margin-right: ${styleUtils.margins[i]}rem;
      margin-bottom: ${styleUtils.margins[i]}rem;
    `)}
  }
`;

function gcd (a, b) {
  return (b == 0) ? a : gcd (b, a%b);
}

class PostVideo extends PostMedia {

  constructor(props) {
    super(props);
    this.uniqueId = uniqueId();
  }

  isVideoNote () {
    return this.props.type == 'video_note';
  }

  getAspectRatio () {
    const file = this.getFile();
    if(file !== undefined) {
      const w = file.width || 1;
      const h = file.height || 1;
      const r = gcd(w, h);
      return [
        w/r,
        h/r
      ];
    }
  }

  getVideoSrc () {
    return [{
      src: this.getFileUrl(),
      type: this.getMime()
    }]
  }

  render() {
    const { type, caption } = this.props;
    const src = this.getVideoSrc();
    const ar = this.getAspectRatio();
    return (
      <VideoBox className={`type-${ type }`}>
        <div className="video-container">
          <VideoPlayer
            id={`video-${this.props.id}-${this.uniqueId}`}
            aspectRatio={`${ar[0]}:${ar[1]}`}
            controls={type == 'video_note' ? false : true}
            loop={type == 'video_note' ? true : false}
            sources={src}
            />
        </div>
        {typeof caption == 'string' &&
          <div className="caption-container">
            <p className="caption">{caption}</p>
          </div>
        }
      </VideoBox>
    )
  }

}

export default PostVideo;
