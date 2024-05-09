import * as React from "react";
const EventIcon = (props) => (
  <svg
    fill={props.color}
    width="20px"
    height="20px"
    viewBox="0 0 36 36"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <title>{"event-outline-badged"}</title>
    <path
      className="clr-i-outline--badged clr-i-outline-path-1--badged"
      d="M10.81,20.5l5.36,5.36L26.22,15.81a1,1,0,0,0-1.41-1.41L16.17,23l-3.94-3.94a1,1,0,0,0-1.41,1.41Z"
    />
    <path
      className="clr-i-outline--badged clr-i-outline-path-2--badged"
      d="M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z"
    />
    <path
      className="clr-i-outline--badged clr-i-outline-path-3--badged"
      d="M32,13.22V30H4V8H7V6H3.75A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V12.34A7.45,7.45,0,0,1,32,13.22Z"
    />
    <path
      className="clr-i-outline--badged clr-i-outline-path-4--badged"
      d="M22.5,6H13V8h9.78A7.49,7.49,0,0,1,22.5,6Z"
    />
    <circle
      className="clr-i-outline--badged clr-i-outline-path-5--badged clr-i-badge"
      cx={30}
      cy={6}
      r={5}
    />
    <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
  </svg>
);
export default EventIcon;
