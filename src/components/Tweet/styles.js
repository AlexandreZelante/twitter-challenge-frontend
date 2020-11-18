import styled, { css } from "styled-components";

export const TweetContainer = styled.div`
  background-color: #fff;
  border: 1px solid rgb(204, 214, 221);
  border-radius: 20px;
  padding: 20px;
  position: relative;

  h2 {
    font-size: 18px;
    /* margin-bottom: 10px; */
  }

  p {
    font-size: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dedede;
    margin-bottom: 10px;
  }

  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  img {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    border-radius: 50%;
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-color: transparent;
    border-style: solid;
  }

  &:before {
    border-width: 1.5em;
    border-right-color: #ccc;
    border-top-color: #ccc;
    border-radius: 0 20px 0 0;
  }

  &:after {
    border-radius: 0.4em;
    border-width: 1.35em;
    border-radius: 0 20px 0 0;
  }

  ${({ sentiment }) => {
    if (sentiment === "positive") {
      return css`
        &:after {
          border-right-color: #0c0;
          border-top-color: #0c0;
        }
      `;
    } else if (sentiment === "negative") {
      return css`
        &:after {
          border-right-color: #ec5555;
          border-top-color: #ec5555;
        }
      `;
    } else {
      return css`
        &:after {
          border-right-color: #e6df09;
          border-top-color: #e6df09;
        }
      `;
    }
  }}
`;
