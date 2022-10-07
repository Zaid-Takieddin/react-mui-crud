import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Table,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePagination, useTable } from "react-table";
import { useAuth } from "../context/auth-context";

const PersonsTable = ({ columns, tableData }) => {
  const navigate = useNavigate();
  const { data } = useAuth();
  const {
    getTableProps,
    getTableBodyProps,
    page,
    headerGroups,
    prepareRow,
    pageCount,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data: tableData,
    },
    usePagination
  );

  // const { mutate: deleteUser } = useDeleteUser();

  // const handleDelete = (row) => {
  //   deleteUser(row.original.id);
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{ padding: "30px 0 0 0", alignSelf: "flex-end", margin: "0 400px" }}
      >
        <Button
          sx={{ justifyItems: "flex-end" }}
          onClick={() => {
            navigate("/persons/add");
          }}
          variant="contained"
        >
          Add User
        </Button>
      </Box>
      <Table
        {...getTableProps()}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
        size="small"
      >
        <TableHead sx={{ backgroundColor: "#000" }}>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps()}
                  sx={{
                    color: "#FFF",
                    fontWeight: "700",
                    borderBottom: "none",
                    width: "100px",
                  }}
                  variant="head"
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} hover={true}>
                {row.cells.map((cell) => (
                  <TableCell
                    {...cell.getCellProps()}
                    sx={{
                      color: "white",
                      borderBottom: "none",
                      width: "70px",
                    }}
                    variant="body"
                    align="center"
                  >
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={previousPage} disabled={!canPreviousPage}>
          Prev
        </Button>
        <Typography component="span" sx={{ color: "white" }}>
          {state.pageIndex + 1} of {pageCount}
        </Typography>
        <Button onClick={nextPage} disabled={!canNextPage}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PersonsTable;
