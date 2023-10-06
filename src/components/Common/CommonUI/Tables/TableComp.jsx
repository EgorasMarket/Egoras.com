import React, { useEffect, useState } from "react";
import Paginate from "../Pagination/Paginate";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { ShimmerButton } from "react-shimmer-effects-18";
import Staticdata from "../../../../assets/json/Static";
import NodataComp from "../NodataComp";
import "./TableComp.css";
import { numberWithCommas } from "../../../../assets/js/numberWithCommas";
// ======
// ======
// ======
// ======
export const TablePagination = ({
  TableData,
  tableTitle,
  contentLoading,
  dummyData,
}) => {
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
        {/* <a
          href="/dashboard/transaction"
          className="TableCompWithDiv_title_link"
        >
          <button className="TableCompWithDiv_title_btn">View All</button>
        </a> */}
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
        {contentLoading ? (
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
            <tbody className="stakingTable_body">
              {dummyData.map((data) => {
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
          </table>
        ) : (
          <>
            {currentTransactions.length <= 0 ? (
              <NodataComp />
            ) : (
              <table className="TableCompWithDiv_cont_table">
                <thead className="TableCompWithDiv_cont_head">
                  <tr className="TableCompWithDiv_cont_head_titles">
                    <th className="TableCompWithDiv_cont_head_titles_div TableCompWithDiv_cont_head_titles_div_first">
                      Type
                    </th>
                    <th className="TableCompWithDiv_cont_head_titles_div">
                      Amount
                    </th>
                    <th className="TableCompWithDiv_cont_head_titles_div">
                      From
                    </th>
                    <th className="TableCompWithDiv_cont_head_titles_div">
                      Date
                    </th>

                    <th className="TableCompWithDiv_cont_head_titles_div  TableCompWithDiv_cont_head_titles_div_last">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="stakingTable_body">
                  {currentTransactions.map((data) => {
                    const metaData = JSON.parse(data.meta);
                    // Convert the createdAt date to the desired format
                    const createdAtDate = new Date(data.createdAt);
                    const formattedDate = `${createdAtDate.getDate()}/${
                      createdAtDate.getMonth() + 1
                    }/${createdAtDate.getFullYear()}`;

                    // Extract the part of the email before the "@" symbol
                    const emailParts = data.email.split("@");
                    const maskedEmail = `${emailParts[0].slice(0, 8)}...`;

                    return (
                      <tr className="stakingTable_body_row ">
                        {data.type === "INTERNAL" &&
                        metaData.to_username === "cyntax" ? (
                          <td className="stakingTable_body_row_data stakingTable_body_row_data_first ">
                            <div className="credit">Internal Credit</div>
                          </td>
                        ) : data.type === "INTERNAL" &&
                          metaData.to_username !== "cyntax" ? (
                          <td className="stakingTable_body_row_data stakingTable_body_row_data_first ">
                            <div className="debit">Internal Debit</div>
                          </td>
                        ) : (
                          <td className="stakingTable_body_row_data stakingTable_body_row_data_first ">
                            <div className="normal">{data.type}</div>
                          </td>
                        )}

                        <td className="stakingTable_body_row_data">
                          {metaData.symbol === "NGN" ? "₦" : null}{" "}
                          {numberWithCommas(parseFloat(data.amount).toFixed(2))}{" "}
                          {metaData.symbol !== "NGN" ? "EGC" : null}{" "}
                        </td>
                        <td className="stakingTable_body_row_data">
                          <div className="stakingTable_body_row_email">
                            {maskedEmail}
                          </div>
                        </td>

                        <td className="stakingTable_body_row_data">
                          {formattedDate}
                        </td>
                        <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                          <div className="stakingTable_body_row_data_last_div">
                            {data.status === "SUCCESS" ? (
                              <div className="stakingTable_body_row_status_success">
                                {data.status}
                              </div>
                            ) : data.status === "PENDING" ? (
                              <div className="stakingTable_body_row_status_pending">
                                {data.status}
                              </div>
                            ) : (
                              <>{data.status}</>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      {currentTransactions.length <= 0 ? null : (
        <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
      )}
    </div>
  );
};

export const Table = ({ TableData, tableTitle, contentLoading, dummyData }) => {
  const [smallMenu, setSmallMenu] = useState(false);

  const ToggleSmallMenu = () => {
    setSmallMenu(!smallMenu);
  };
  return (
    <div className="TableCompWithDiv">
      <div className="TableCompWithDiv_title">
        {tableTitle}{" "}
        <a
          href="/dashboard/transaction"
          className="TableCompWithDiv_title_link"
        >
          <button className="TableCompWithDiv_title_btn">View All</button>
        </a>
        {/* <div
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
        </div> */}
      </div>
      <div className="TableCompWithDiv_cont">
        {contentLoading ? (
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
            <tbody className="stakingTable_body">
              {dummyData.map((data) => {
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
          </table>
        ) : (
          <>
            {TableData.length <= 0 ? (
              <NodataComp />
            ) : (
              <table className="TableCompWithDiv_cont_table">
                <thead className="TableCompWithDiv_cont_head">
                  <tr className="TableCompWithDiv_cont_head_titles">
                    <th className="TableCompWithDiv_cont_head_titles_div TableCompWithDiv_cont_head_titles_div_first">
                      Type
                    </th>
                    <th className="TableCompWithDiv_cont_head_titles_div">
                      Amount
                    </th>
                    <th className="TableCompWithDiv_cont_head_titles_div">
                      From
                    </th>
                    <th className="TableCompWithDiv_cont_head_titles_div">
                      Date
                    </th>

                    <th className="TableCompWithDiv_cont_head_titles_div  TableCompWithDiv_cont_head_titles_div_last">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="stakingTable_body">
                  {TableData.map((data) => {
                    const metaData = JSON.parse(data.meta);
                    // Convert the createdAt date to the desired format
                    const createdAtDate = new Date(data.createdAt);
                    const formattedDate = `${createdAtDate.getDate()}/${
                      createdAtDate.getMonth() + 1
                    }/${createdAtDate.getFullYear()}`;

                    // Extract the part of the email before the "@" symbol
                    const emailParts = data.email.split("@");
                    const maskedEmail = `${emailParts[0].slice(0, 8)}...`;

                    return (
                      <tr className="stakingTable_body_row ">
                        {data.type === "INTERNAL" &&
                        metaData.to_username === "cyntax" ? (
                          <td className="stakingTable_body_row_data stakingTable_body_row_data_first ">
                            <div className="credit">Internal Credit</div>
                          </td>
                        ) : data.type === "INTERNAL" &&
                          metaData.to_username !== "cyntax" ? (
                          <td className="stakingTable_body_row_data stakingTable_body_row_data_first ">
                            <div className="debit">Internal Debit</div>
                          </td>
                        ) : (
                          <td className="stakingTable_body_row_data stakingTable_body_row_data_first ">
                            <div className="normal">{data.type}</div>
                          </td>
                        )}

                        <td className="stakingTable_body_row_data">
                          {metaData.symbol === "NGN" ? "₦" : null}{" "}
                          {numberWithCommas(parseFloat(data.amount).toFixed(2))}{" "}
                          {metaData.symbol !== "NGN" ? "EGC" : null}{" "}
                        </td>
                        <td className="stakingTable_body_row_data">
                          <div className="stakingTable_body_row_email">
                            {maskedEmail}
                          </div>
                        </td>

                        <td className="stakingTable_body_row_data">
                          {formattedDate}
                        </td>
                        <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                          <div className="stakingTable_body_row_data_last_div">
                            {data.status === "SUCCESS" ? (
                              <div className="stakingTable_body_row_status_success">
                                {data.status}
                              </div>
                            ) : data.status === "PENDING" ? (
                              <div className="stakingTable_body_row_status_pending">
                                {data.status}
                              </div>
                            ) : (
                              <>{data.status}</>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
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
