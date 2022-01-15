import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';
import { theme } from '../../../constants';

export const StyledCheckbox: React.FunctionComponent<CheckboxProps> = styled(
  Checkbox,
)`
  &&& {
    transform: scale(2.3);
  }
`;

export const CheckboxContainer = styled.div`
  &&& {
    display: inline-block;
    vertical-align: middle;
    display: block;
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${theme.colors.orange1};
    }
    .ant-checkbox-checked {
      border: 0;
      display: block;
    }
    .ant-checkbox {
      display: block;
      padding-left: 5px;
    }
    .ant-checkbox-inner {
      background-color: #e9e9e9;
      border-radius: 2px;
      border: 0;
    }
    .ant-checkbox-checked::after {
      border-radius: 0;
      border: 0;
    }
  }
`;

export const Wrapper = styled.div`
  &&& {
    background: pink;
    height: 50vh;
  }
`;
