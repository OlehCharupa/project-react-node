import React from "react";
import LoaderSpinner from "react-loader-spinner";
import styled from "styled-components";

const LoaderDIV = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = () => {
  return (
    <LoaderDIV>
      <LoaderSpinner
        type="ThreeDots"
        color="#ff6b08"
        height={100}
        width={100}
      />
    </LoaderDIV>
  );
};

export default Loader;
