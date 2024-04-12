import MaskedInput from "react-text-mask";
import styled from "styled-components";
import { mytoken } from "./styles/style";

export const StyledMaskedInput = styled(MaskedInput)`
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    height: 20px;
    padding-left: 5px;
    padding: '0 10px 0 10px';
  &:hover {
    border-color: ${mytoken.colorPrimary};
    outline: none;
  }
  &:focus {
    border-color: ${mytoken.colorPrimary};
    border-width: 1px;
    outline: none;
  }`;