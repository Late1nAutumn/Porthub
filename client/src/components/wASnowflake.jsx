import React from "react";
var Snowflake = ({ type, height }) => {
  // snowflake (0)
  if (type === 0)
    return (
      <svg
        id="WA-snowflake-svg"
        height={height}
        width={Math.floor((Number(height) * 121) / 142).toString()}
        viewBox="0 0 121 141.8"
      >
        <Path />
      </svg>
    );
  // mask for img(1) or shade(2)
  else
    return (
      <svg height="0" width="0" viewBox="0 0 121 141.8">
        <defs>
          <clipPath id={"WA-mask"+type}>
            <Path mask={true} />
          </clipPath>
        </defs>
      </svg>
    );
};

var Path = ({ mask }) => (
  <path
    className={mask ? "WA-mask-path" : ""}
    fill="white"
    d="M118.3,96l-8.3,1.8l-7-4.5l14.2-6.6l-2.6-5.7l-17.8,8.2l-24.4-15.7c0.1-0.5,0.2-1,0.2-1.6l27.6,6.6l10.6-9 l-10.4-8.8l-27.9,8.4c-0.1-0.4-0.1-0.8-0.3-1.2l24.3-15.7l17.8,8.2l2.6-5.7l-14.2-6.6l7-4.5l8.3,1.8l2.7-12.6l-12.6-2.7l-1.8,8.3 l-7.1,4.5l-0.1-15.9l-6.2,0l0.1,19.9l-23.9,15.4c-0.4-0.4-0.9-0.9-1.4-1.2l19.9-20.3l-2.3-13.7l-12.9,4.4l-7.2,28.2 c-0.6-0.3-1.3-0.5-1.9-0.7v-28.1l16.6-10.5l-3.3-5.3l-13.2,8.4v-8.3l6-6l-9.1-9.1l-9.1,9.1l6,6v8.4l-13.4-8.5l-3.3,5.3l16.8,10.6v28 c-0.6,0.2-1.2,0.3-1.8,0.6l-7.2-28.1l-12.9-4.4l-2.3,13.7l19.8,20.2c-0.5,0.4-1,0.8-1.4,1.2l-23.7-15.3l0.1-19.9l-6.2,0l-0.1,15.9 l-7.1-4.5l-1.8-8.3l-12.6,2.7l2.7,12.6l8.3-1.8l7,4.5l-14.2,6.6l2.6,5.7l17.8-8.2l24.1,15.5c-0.1,0.4-0.2,0.8-0.3,1.2l-27.4-8.2 l-10.4,8.8l10.6,9l27.1-6.5c0,0.5,0.1,1.1,0.2,1.6l-24.1,15.5l-17.8-8.2l-2.6,5.7l14.2,6.6l-7,4.5l-8.3-1.8l-2.7,12.6l12.6,2.7 l1.8-8.3l7.1-4.5l0.1,15.9l6.2,0l-0.1-19.9l23.5-15.1c0.5,0.6,1,1.1,1.6,1.5l-19.5,19.9l2.3,13.7l12.9-4.4l7-27.5 c0.6,0.3,1.2,0.5,1.9,0.7V111l-16.8,10.6l3.3,5.3l13.4-8.5v8.4l-6,6l9.1,9.1l9.1-9.1l-6-6v-8.3l13.2,8.4l3.3-5.3l-16.6-10.5v-27.9 c0.7-0.2,1.4-0.5,2.1-0.8l7,27.3l12.9,4.4l2.3-13.7l-19.4-19.8c0.5-0.4,1-0.9,1.4-1.4l23.6,15.2l-0.1,19.9l6.2,0l0.1-15.9l7.1,4.5 l1.8,8.3l12.6-2.7z"
  />
);

export default Snowflake;
