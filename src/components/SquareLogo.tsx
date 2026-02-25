import React from 'react'
import './SquareLogo.css'

const SquareLogo: React.FC = () => {
  return (
    <svg
      className="square-logo"
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main Square shape */}
      <path
        d="M90 0C40.3 0 0 40.3 0 90C0 139.7 40.3 180 90 180C139.7 180 180 139.7 180 90C180 40.3 139.7 0 90 0Z"
        fill="#00E013"
      />

      {/* Square icon in center */}
      <g transform="translate(40, 40)">
        {/* Outer square */}
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="8"
          stroke="#2c2c2c"
          strokeWidth="8"
          fill="transparent"
        />

        {/* Inner square with rounded corner */}
        <path
          d="M 30 30 L 70 30 L 70 50 Q 70 70 50 70 L 30 70 Z"
          fill="#2c2c2c"
        />
      </g>
    </svg>
  )
}

export default SquareLogo
