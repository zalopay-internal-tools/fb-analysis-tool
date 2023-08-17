import { Button, Input, Row } from 'antd';
import * as React from 'react';
import { TokenContext, TokenTypeState } from '../context/TokenContext';

export const MasterHeader: React.FC = () => {
  const [accessToken, setAccessToken] = React.useState('');
  const { token, setToken } = React.useContext(TokenContext) as TokenTypeState;

  React.useEffect(() => {
    setAccessToken(token);
  }, [token]);

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setAccessToken(event.currentTarget.value);
  };

  const savePageAccessToken = () => {
    setToken(accessToken);
  };

  return (
    <Row style={{ padding: '12px 16px', justifyContent: 'space-between' }}>
      <Input
        type='text'
        placeholder='Input page access token'
        value={accessToken}
        onChange={onInputChange}
        style={{ flex: 3, marginRight: 24 }}
      />
      <Button onClick={savePageAccessToken} style={{ flex: 1 }}>
        Save Page Access Token
      </Button>
    </Row>
  );
};
