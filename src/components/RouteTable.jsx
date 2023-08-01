import { selectRoute } from "../reducers/routeReducer";
import "../utils/styles.scss";
import { Table } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const columns = [
  {
    title: "Маршрут",
    dataIndex: "routeName",
    key: "routeName",
  },
];

const RouteTable = () => {
  const selectedRouteId = useSelector((state) => state.route.selectedRouteId);
  const routes = [
    { id: 1, routeName: "Маршрут №1" },
    { id: 2, routeName: "Маршрут №2" },
    { id: 3, routeName: "Маршрут №3" },
  ];

  const dispatch = useDispatch();

  const handleRowClick = (routeId) => {
    dispatch(selectRoute(routeId));
  };
  
  return (
    <div className="route-table-container">
      <Table
        dataSource={routes}
        columns={columns}
        onRow={(record) => ({
          onClick: () => handleRowClick(record.id),
          className: `route-item ${record.id === selectedRouteId ? 'selected' : ''}`,
        })}
        rowKey="id"
      />
    </div>
  );
};

export default RouteTable;