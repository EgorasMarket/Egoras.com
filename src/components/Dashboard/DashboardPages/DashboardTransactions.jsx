import React, { useEffect, useState } from "react";
import { TablePagination } from "../../Common/CommonUI/Tables/TableComp";
import { FETCH_WALLET_TRANSACTIONS } from "../../../services/finance_services";
import Staticdata from "../../../assets/json/Static";
import "../DashboardStyles/dashboardTransactions.css";
import { ShimmerButton } from "react-shimmer-effects-18";

const DashboardTransactions = () => {
  const [contentLoadingTable, setContentLoadingTable] = useState(true);
  const [tableData, setTableData] = useState([]);
  const fetchWalletTransactions = async () => {
    setContentLoadingTable(true);
    const response = await FETCH_WALLET_TRANSACTIONS();
    if (response.success === true) {
      setContentLoadingTable(false);
      setTableData(response.data);
    } else {
      setContentLoadingTable(true);
    }
    console.log(response.data);
    console.log(response);
  };
  useEffect(() => {
    fetchWalletTransactions();
  }, []);
  return (
    <div className="DashboardTransactions_div">
      <div className="DashboardTransactions_div_1">
        <div className="DashboardTransactions_div_1_title">
          Total Transactions
        </div>
        <div className="DashboardTransactions_div_1_amount">
          {contentLoadingTable ? (
            <ShimmerButton size="lg" className="custom_shimmer" />
          ) : (
            <>
              {tableData.length}{" "}
              <span className="DashboardTransactions_div_1_amount_span">
                txns
              </span>
            </>
          )}
        </div>
      </div>
      <div className="DashboardTransactions_div_2">
        <TablePagination
          tableTitle={"All Transactions"}
          TableData={tableData}
          contentLoading={contentLoadingTable}
          dummyData={Staticdata.productsTableData.slice(0, 8)}
          view={false}
        />
      </div>
    </div>
  );
};

export default DashboardTransactions;
