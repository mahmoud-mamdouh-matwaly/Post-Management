import { Table } from 'antd';
import PropTypes from 'prop-types';

const BaseTable = props => {
  const {
    columns,
    data,
    getCurrentPage,
    handleClickRow,
    totalCount,
    rowKey,
    scrollX = 1024,
    defaultPageSize = 10,
    loading,
    currentPage,
    defaultPage = 1,

    ...rest
  } = props;

  const onChange = pagination => {
    const { current, pageSize } = pagination;
    getCurrentPage({ current, pageSize });
  };

  const handleRow = record => {
    return {
      onClick: event => {
        event.stopPropagation();
        handleClickRow(record);
      },
    };
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        onRow={handleRow}
        rowKey={rowKey}
        scroll={{
          x: scrollX,
        }}
        pagination={{
          total: totalCount,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: defaultPageSize,
          defaultCurrent: defaultPage,
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
  columns: PropTypes.array,
  data: PropTypes.array,
  getCurrentPage: PropTypes.func,
  handleClickRow: PropTypes.func,
  totalCount: PropTypes.number,
  rowKey: PropTypes.string,
  loading: PropTypes.bool,
  scrollX: PropTypes.any,
  defaultPageSize: PropTypes.number,
  currentPage: PropTypes.number,
  defaultPage: PropTypes.number,
};
