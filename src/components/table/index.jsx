import { Table } from 'antd';
import PropTypes from 'prop-types';

const BaseTable = props => {
  const { columns, data, rowKey, scrollX = 1024, loading, ...rest } = props;

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        scroll={{
          x: scrollX,
        }}
        pagination={{
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: 10,
          defaultCurrent: 1,
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
  scrollX: PropTypes.any,
};
