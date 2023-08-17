import { Layout, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getPostDetail,
  getPostComments,
  getCommentReactions,
  getCommentReplies,
} from '../services/PostService';
import moment from 'moment';
import { TokenContext, TokenTypeState } from '../context/TokenContext';

interface OverallDataType {
  created_time: string;
  message: string;
  id: string;
}

interface CommentDataType {
  created_time: string;
  message: string;
  id: string;
  reactions: number;
  replies: number;
}

const columns: ColumnsType<CommentDataType> = [
  {
    title: 'Comment Time',
    dataIndex: 'created_time',
    key: 'created_time',
    sorter: {
      compare: (a, b) =>
        new Date(a.created_time).getTime() - new Date(b.created_time).getTime(),
      multiple: 1,
    },
    sortDirections: ['descend', 'ascend'],
    render: (createdTime) => moment(createdTime).format('DD/MM/YYYY hh:mm:ss'),
  },
  {
    title: 'Comment',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: 'Reactions',
    dataIndex: 'reactions',
    key: 'reactions',
    sorter: {
      compare: (a, b) => a.reactions - b.reactions,
      multiple: 2,
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Replies',
    dataIndex: 'replies',
    key: 'replies',
    sorter: {
      compare: (a, b) => a.replies - b.replies,
      multiple: 2,
    },
    sortDirections: ['descend', 'ascend'],
  },
];

export const DetailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const detailId = searchParams.get('detailId') || '';
  const { token } = React.useContext(TokenContext) as TokenTypeState;
  const [overallData, setOverallData] = React.useState<OverallDataType>({
    created_time: '',
    message: '',
    id: '',
  });
  const [detailData, setDetailData] = React.useState<CommentDataType[]>([]);
  const [loading, setLoading] = React.useState(false);

  const getOverallData = async (id: string, accessToken: string) => {
    const postDetailData = await getPostDetail(id, accessToken);
    setOverallData(postDetailData);
  };

  const getPostCommentsDetail = async (id: string, accessToken: string) => {
    const resultData = new Array<CommentDataType>();
    const comments = await getPostComments(id, accessToken);

    if (comments && comments.length !== 0) {
      await Promise.all(
        comments.map(async (comment: CommentDataType) => {
          const [commentReactions, commentReplies] = await Promise.all([
            getCommentReactions(comment.id, accessToken),
            getCommentReplies(comment.id, accessToken),
          ]);
          comment.reactions = commentReactions.summary?.total_count;
          comment.replies = commentReplies.summary?.total_count;
          resultData.push(comment);
        })
      );
    }
    setDetailData(resultData);
  };

  React.useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      await getOverallData(detailId, token);
      await getPostCommentsDetail(detailId, token);
      setLoading(false);
    };

    getAllData();
  }, [detailId, token]);

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 24px 16px 24px',
        }}
      >
        <Typography.Text style={{ marginBottom: 16 }}>
          Created at{' '}
          {moment(overallData.created_time).format('DD/MM/YYYY hh:mm:ss')}
        </Typography.Text>
        <Typography.Text>{overallData.message}</Typography.Text>
      </div>

      <Layout.Content>
        <Table
          loading={loading}
          dataSource={detailData}
          columns={columns}
          rowKey={(detail) => detail.id}
        />
      </Layout.Content>
    </Layout>
  );
};
