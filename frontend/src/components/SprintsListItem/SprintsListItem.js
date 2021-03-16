import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import sprintsOperations from "../../redux/operations/sprintsOperations";
import { connect } from "react-redux";
import deleteSvg from "./images/delete.svg";

const Title = styled.p`
  margin-top: 0;
  margin-bottom: 20px;

  text-align: center;

  font-weight: 500;
  font-size: 16px;
  line-height: 1.25;
  letter-spacing: 0.04em;

  color: #181c27;

  @media (min-width: 768px) {
    margin-bottom: 28px;
    font-size: 18px;
    line-height: 1.22;
  }
`;
const P = styled.p`
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  font-size: 10px;
  line-height: 1.2;
  letter-spacing: 0.04em;

  color: #000000;

  @media (min-width: 768px) {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    font-size: 14px;
    line-height: 1.21;
  }
`;
const SPAN = styled.span`
  display: inline-block;
`;
const Button = styled.button`
  display: block;
  position: absolute;
  bottom: 10px;
  right: 10px;

  content: "";
  width: 20px;
  height: 20px;
  border: 1px solid transparent;
  border-radius: 50%;

  cursor: pointer;

  background-image: url(${deleteSvg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;

  &:hover,
  &:focus {
    border: 1px solid #ff6b08;
  }
`;

const SprintsListItem = ({
  _id,
  title,
  startDate,
  endDate,
  duration,
  OnDeleteSprint,
}) => {
  return (
    <>
      <Title>{title}</Title>
      <P>
        Дата початку<SPAN>{startDate}</SPAN>
      </P>
      <P>
        Дата закінченя<SPAN>{endDate}</SPAN>
      </P>
      <P>
        Тривалість<SPAN>{duration}</SPAN>
      </P>
      <Button
        type="button"
        onClick={() => {
          OnDeleteSprint(_id);
        }}
      ></Button>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const item = state.sprints.items.find(
    (sprint) => sprint._id === ownProps._id
  );
  return { ...item };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  OnDeleteSprint: () => dispatch(sprintsOperations.deleteSprint(ownProps._id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SprintsListItem);

SprintsListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  OnDeleteSprint: PropTypes.func.isRequired,
};
