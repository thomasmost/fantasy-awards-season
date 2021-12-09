import styled from "@emotion/styled";

const Svg = styled.svg`
  margin-top: 100px;
`;

export const LoadingGraphic = () => (
  <Svg
    width="400"
    height="400"
    viewBox="0 0 45 45"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#86c6ee"
  >
    <g fill="none" fillRule="evenodd" transform="translate(1 1)">
      <circle cx="22" cy="22" r="6" strokeOpacity="0">
        <animate
          attributeName="r"
          begin="1.5s"
          dur="3s"
          values="6;22"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="1.5s"
          dur="3s"
          values="1;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="strokeWidth"
          begin="1.5s"
          dur="3s"
          values="2;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="22" cy="22" r="6" strokeOpacity="0">
        <animate
          attributeName="r"
          begin="3s"
          dur="3s"
          values="6;22"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="3s"
          dur="3s"
          values="1;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="strokeWidth"
          begin="3s"
          dur="3s"
          values="2;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="22" cy="22" r="8">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.5s"
          values="6;1;2;3;4;5;6"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </Svg>
);
