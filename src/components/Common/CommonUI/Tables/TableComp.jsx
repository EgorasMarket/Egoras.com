import React, { useEffect, useState } from "react";
import Paginate from "../Pagination/Paginate";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { ShimmerButton } from "react-shimmer-effects-18";

import "./TableComp.css";
// ======
// ======
// ======
// ======
export const TablePagination = ({ TableData, tableTitle, contentLoading }) => {
  const [smallMenu, setSmallMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 8;

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(TableData.length / PER_PAGE);
  const currentTransactions = TableData.slice(offset, offset + PER_PAGE);
  console.log(currentTransactions);

  const ToggleSmallMenu = () => {
    setSmallMenu(!smallMenu);
  };
  return (
    <div className="TableCompWithDiv">
      <div className="TableCompWithDiv_title">
        {tableTitle}{" "}
        <div
          className="TableCompWithDiv_title_drop_down"
          onClick={ToggleSmallMenu}
        >
          <MoreVertOutlinedIcon />
          {smallMenu ? (
            <div className="TableCompWithDiv_title_drop_down_div">
              <div className="TableCompWithDiv_title_drop_down_div_1">
                Products
              </div>
              <div className="TableCompWithDiv_title_drop_down_div_1">Swap</div>
              <div className="TableCompWithDiv_title_drop_down_div_1">
                Funding
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="TableCompWithDiv_cont">
        {currentTransactions.length <= 0 ? (
          <>
            <table className="TableCompWithDiv_cont_table">
              <thead className="TableCompWithDiv_cont_head">
                <tr className="TableCompWithDiv_cont_head_titles">
                  <th className="TableCompWithDiv_cont_head_titles_div TableCompWithDiv_cont_head_titles_div_first">
                    Product Name
                  </th>
                  <th className="TableCompWithDiv_cont_head_titles_div">
                    Amount
                  </th>
                  <th className="TableCompWithDiv_cont_head_titles_div">
                    Product Brand
                  </th>
                  <th className="TableCompWithDiv_cont_head_titles_div">
                    Date
                  </th>

                  <th className="TableCompWithDiv_cont_head_titles_div  TableCompWithDiv_cont_head_titles_div_last">
                    Status
                  </th>
                </tr>
              </thead>
            </table>
            <div className="noTransactionData_div">
              <div className="noTransactionData_div_cont">
                No Transactions at the moment
              </div>
            </div>
          </>
        ) : (
          <table className="TableCompWithDiv_cont_table">
            <thead className="TableCompWithDiv_cont_head">
              <tr className="TableCompWithDiv_cont_head_titles">
                <th className="TableCompWithDiv_cont_head_titles_div TableCompWithDiv_cont_head_titles_div_first">
                  Product Name
                </th>
                <th className="TableCompWithDiv_cont_head_titles_div">
                  Amount
                </th>
                <th className="TableCompWithDiv_cont_head_titles_div">
                  Product Brand
                </th>
                <th className="TableCompWithDiv_cont_head_titles_div">Date</th>

                <th className="TableCompWithDiv_cont_head_titles_div  TableCompWithDiv_cont_head_titles_div_last">
                  Status
                </th>
              </tr>
            </thead>

            {contentLoading ? (
              <tbody className="stakingTable_body">
                {currentTransactions.map((data) => {
                  return (
                    <tr className="stakingTable_body_row ">
                      <td className="stakingTable_body_row_data stakingTable_body_row_data_first  ">
                        <ShimmerButton size="md" className="custom_shimmer" />
                      </td>
                      <td className="stakingTable_body_row_data">
                        <ShimmerButton size="md" className="custom_shimmer" />
                      </td>
                      <td className="stakingTable_body_row_data">
                        <ShimmerButton size="md" className="custom_shimmer" />
                      </td>

                      <td className="stakingTable_body_row_data">
                        <ShimmerButton size="md" className="custom_shimmer" />
                      </td>
                      <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                        <ShimmerButton size="md" className="custom_shimmer" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody className="stakingTable_body">
                {currentTransactions.map((data) => {
                  return (
                    <tr className="stakingTable_body_row ">
                      <td className="stakingTable_body_row_data stakingTable_body_row_data_first  ">
                        {" "}
                        {data.prodName}
                      </td>
                      <td className="stakingTable_body_row_data">
                        {data.amount}
                      </td>
                      <td className="stakingTable_body_row_data">
                        {data.prodBrand}
                      </td>

                      <td className="stakingTable_body_row_data">
                        {data.Date}
                      </td>
                      <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                        {data.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        )}
      </div>
      {currentTransactions.length <= 0 ? null : (
        <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
      )}
    </div>
  );
};

export const Table = ({ TableData, tableTitle, contentLoading }) => {
  const [smallMenu, setSmallMenu] = useState(false);

  const ToggleSmallMenu = () => {
    setSmallMenu(!smallMenu);
  };
  return (
    <div className="TableCompWithDiv">
      <div className="TableCompWithDiv_title">
        {tableTitle}{" "}
        <div
          className="TableCompWithDiv_title_drop_down"
          onClick={ToggleSmallMenu}
        >
          <MoreVertOutlinedIcon />
          {smallMenu ? (
            <div className="TableCompWithDiv_title_drop_down_div">
              <div className="TableCompWithDiv_title_drop_down_div_1">
                Products
              </div>
              <div className="TableCompWithDiv_title_drop_down_div_1">Swap</div>
              <div className="TableCompWithDiv_title_drop_down_div_1">
                Funding
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="TableCompWithDiv_cont">
        {TableData.length <= 0 ? (
          <>
            <table className="TableCompWithDiv_cont_table">
              <thead className="TableCompWithDiv_cont_head">
                <tr className="TableCompWithDiv_cont_head_titles">
                  <th className="TableCompWithDiv_cont_head_titles_div TableCompWithDiv_cont_head_titles_div_first">
                    Product Name
                  </th>
                  <th className="TableCompWithDiv_cont_head_titles_div">
                    Amount
                  </th>
                  <th className="TableCompWithDiv_cont_head_titles_div">
                    Product Brand
                  </th>
                  <th className="TableCompWithDiv_cont_head_titles_div">
                    Date
                  </th>

                  <th className="TableCompWithDiv_cont_head_titles_div  TableCompWithDiv_cont_head_titles_div_last">
                    Status
                  </th>
                </tr>
              </thead>
            </table>
            <div className="noTransactionData_div">
              <div className="noTransactionData_div_cont">
                No Transactions at the moment
              </div>
            </div>
          </>
        ) : (
          <table className="TableCompWithDiv_cont_table">
            <thead className="TableCompWithDiv_cont_head">
              <tr className="TableCompWithDiv_cont_head_titles">
                <th className="TableCompWithDiv_cont_head_titles_div TableCompWithDiv_cont_head_titles_div_first">
                  Product Name
                </th>
                <th className="TableCompWithDiv_cont_head_titles_div">
                  Amount
                </th>
                <th className="TableCompWithDiv_cont_head_titles_div">
                  Product Brand
                </th>
                <th className="TableCompWithDiv_cont_head_titles_div">Date</th>

                <th className="TableCompWithDiv_cont_head_titles_div  TableCompWithDiv_cont_head_titles_div_last">
                  Status
                </th>
              </tr>
            </thead>

            {contentLoading ? (
              <tbody className="stakingTable_body">
                {TableData.map((data) => {
                  return (
                    <tr className="stakingTable_body_row ">
                      <td className="stakingTable_body_row_data stakingTable_body_row_data_first  ">
                        <ShimmerButton size="md" className="custom_shimmer" />
                      </td>
                      <td className="stakingTable_body_row_data">
                        <ShimmerButton size="md" className="custom_shimmer" />
                      </td>
                      <td className="stakingTable_body_row_data">
                        <ShimmerButton size="md" className="custom_shimmer" />
                      </td>

                      <td className="stakingTable_body_row_data">
                        <ShimmerButton size="md" className="custom_shimmer" />
                      </td>
                      <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                        <ShimmerButton size="md" className="custom_shimmer" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody className="stakingTable_body">
                {TableData.map((data) => {
                  return (
                    <tr className="stakingTable_body_row ">
                      <td className="stakingTable_body_row_data stakingTable_body_row_data_first  ">
                        {" "}
                        {data.prodName}
                      </td>
                      <td className="stakingTable_body_row_data">
                        {data.amount}
                      </td>
                      <td className="stakingTable_body_row_data">
                        {data.prodBrand}
                      </td>

                      <td className="stakingTable_body_row_data">
                        {data.Date}
                      </td>
                      <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                        {data.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        )}
      </div>
    </div>
  );
};
//   const date = new Date(data.createdAt);
//   const day = date.getUTCDate().toString().padStart(2, "0");
//   const month = (date.getUTCMonth() + 1)
//     .toString()
//     .padStart(2, "0");
//   const year = date.getUTCFullYear();
//   const formattedDate = `${day}/${month}/${year}`;
//   console.log(formattedDate);
//   const dateString = formattedDate;
//   const date2 = new Date(dateString);
//   const formattedDated = date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "2-digit",
//   });
