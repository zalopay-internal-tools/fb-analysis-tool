import * as React from 'react';
import { Layout, Table } from 'antd';
import { getPublishedPosts } from '../services/PageService';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { TokenContext, TokenTypeState } from '../context/TokenContext';

const { Content } = Layout;

interface PageDataType {
  created_time: string;
  message: string;
  id: string;
}

const columns: ColumnsType<PageDataType> = [
  {
    title: 'Created Time',
    dataIndex: 'created_time',
    key: 'created_time',
    sorter: (a, b) => a.created_time.localeCompare(b.created_time),
    sortDirections: ['descend', 'ascend'],
    render: (createdTime) => moment(createdTime).format('DD/MM/YYYY HH:mm:ss'),
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: 'Detail',
    dataIndex: 'id',
    key: 'id',
    render: (id) => (
      <Link to={`/detail?detailId=${id}&type=POST`}>View Detail</Link>
    ),
  },
];

export const DashboardPage: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { token } = React.useContext(TokenContext) as TokenTypeState;
  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const resData = await getPublishedPosts(token);
      setData(resData);
      setLoading(false);
    };

    getData();
  }, [token]);

  return (
    <Layout>
      <Content>
        <Table
          loading={loading}
          dataSource={data}
          columns={columns}
          rowKey={(post) => post.id}
        />
      </Content>
    </Layout>
  );
};
