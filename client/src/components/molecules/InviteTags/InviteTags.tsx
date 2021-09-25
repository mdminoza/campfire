/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Select, Spin, Radio } from 'antd';
import 'antd/dist/antd.css';
import debounce from 'lodash/debounce';
import { Container, SelectStyle, SelectionWrapper, BtnStyle } from './elements';
import { Button } from '../../atoms/Button';
import { useUserState } from '../../../hooks/user';
import { UserInterface } from '../../../hooks/user/combined/types';

type Props = {
  setInvite: (selected: Object[], type: string) => void;
  fetchUserList?: (username: string) => void;
  radioVal?: 'Invite Only' | 'Everyone';
  onChangeRadio?: (e: any) => void;
  onDropdownVisibleChange?: (value: boolean) => void;
};

function DebounceSelect({ debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);

  const { fetchoptions, onDropdownVisibleChange } = props;

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: any) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchoptions(value).then((newOptions: any) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, setOptions, fetchoptions]);
  return (
    <Select
      // labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
      onDropdownVisibleChange={onDropdownVisibleChange}
    />
  );
}

async function fetchUserLists(username: any) {
  console.log('fetching user', username);
  return fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((body) =>
      body.results.map(
        (user: {
          name: { first: any; last: any };
          login: { username: any };
        }) => ({
          label: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }),
      ),
    );
}

const Selections = ({ ...props }) => {
  const { Option } = Select;
  const users = Array<any>();
  const { allUsers } = useUserState();
  for (let i = 0; i < allUsers.length; i++) {
    users.push(
      <Option
        key={allUsers[i].username}
        // eslint-disable-next-line react/no-children-prop
        children={allUsers[i].username}
        value={allUsers[i].username}
      />,
    );
  }
  return (
    <Select mode="multiple" placeholder="Select members" {...props}>
      {users}
    </Select>
  );
};

// const InviteTags = ({ setInvite }: Props) => {
//   const [value, setValue] = React.useState([]);
//   const [radioVal, setRadioVal] = React.useState('Everyone');
const InviteTags = ({
  setInvite,
  fetchUserList = () => {},
  onChangeRadio = () => {},
  onDropdownVisibleChange = () => {},
  radioVal = 'Everyone',
}: Props): React.ReactElement => {
  const [value, setValue] = React.useState<any>([]);

  const { allUsers } = useUserState();

  const handleOnChangeRadio = (e: any) => {
    setValue([]);
    onChangeRadio(e);
  };

  const handleOnClick = () => {
    // let selected: [] = [].value;
    setInvite(value, radioVal);
  };

  const handleChange = (selected: any[]) => {
    const temp: any[] = [];
    selected.forEach((val) => {
      const foo = allUsers.find((user) => user.username === val);
      temp.push({
        uid: foo?.id,
        name: `${foo?.firstName} ${foo?.lastName}`,
        profileUrl: foo?.avatar,
      });
    });
    setValue(temp);
  };

  return (
    <Container>
      <SelectionWrapper>
        <Radio.Group onChange={handleOnChangeRadio} value={radioVal}>
          <Radio value="Everyone">EVERYONE</Radio>
          <Radio value="Invite Only">INVITE ONLY</Radio>
        </Radio.Group>
        {radioVal === 'Invite Only' && (
          <Selections onChange={handleChange} />
          // <DebounceSelect
          //   mode="multiple"
          //   value={value}
          //   placeholder="Select users"
          //   fetchoptions={fetchUserLists}
          //   onChange={(newValue: any) => {
          //     setValue(newValue);
          //   }}
          //   style={SelectStyle}
          //   onDropdownVisibleChange={onDropdownVisibleChange}
          // />
        )}
      </SelectionWrapper>
      <Button onClick={handleOnClick} style={BtnStyle}>
        INVITE SELECTED
      </Button>
    </Container>
  );
};

export default InviteTags;
