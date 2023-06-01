import { Table } from 'antd';
import PropTypes from 'prop-types';

const BaseTable = props => {
  const { columns, data, rowKey, scrollX = 1024, loading, getCurrentPage, currentPage, ...rest } = props;

  const onChange = pagination => {
    const { current } = pagination;
    getCurrentPage(current);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        onChange={onChange}
        scroll={{
          x: scrollX,
        }}
        pagination={{
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: 10,
          defaultCurrent: 1,
          current: currentPage,
        }}
        loading={loading}
        {...rest}
      />
    </>
  );
};
export default BaseTable;

BaseTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  rowKey: PropTypes.string,
  loading: PropTypes.bool,
  scrollX: PropTypes.number,
  getCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
};
