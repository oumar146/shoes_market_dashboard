import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import DeletePopUp from "./DeletePopUp";
import EditPopUp from "./EditPopUp";
import AddPopUp from "./AddPopUp";

function EditToolbar({ setIsAddModalOpen }) {
  const handleClick = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div>
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    </div>
  );
}

function ProductsList({ refresh, setRefresh, rows, setRows, data }) {
  React.useEffect(() => {
    setRows(data.map((item) => ({ ...item, id: item.id || item.product_id })));
  }, [data, setRows]);

  const [rowModesModel, setRowModesModel] = useState({});
  const [selectedRows, setSelectedRows] = useState([]); // Pour passer les données à DeletePopUp
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    const rowToEdit = rows.find((row) => row.id === id);
    setSelectedRows(rowToEdit);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => () => {
    const rowToDelete = rows.find((row) => row.id === id);
    setSelectedRows([rowToDelete]);
    setIsDeleteModalOpen(true);
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "product_name", headerName: "Nom", width: 200, editable: true },
    {
      field: "price",
      headerName: "Prix",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "gender_name",
      headerName: "Genre",
      width: 200,
      editable: true,
    },
    {
      field: "category_name",
      headerName: "Catégorie",
      width: 220,
      editable: true,
    },
    { field: "reference", headerName: "Référence", width: 220 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        slots={{ toolbar: EditToolbar }}
        slotProps={{ toolbar: { setIsAddModalOpen } }}
      />
      {isDeleteModalOpen && data && (
        <DeletePopUp
          data={selectedRows[0]}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}

      {isEditModalOpen && data && selectedRows && (
        <EditPopUp
          data={selectedRows}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}

      {isAddModalOpen && (
        <AddPopUp
          data={selectedRows}
          isEditModalOpen={isAddModalOpen}
          setIsEditModalOpen={setIsAddModalOpen}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </Box>
  );
}

export default ProductsList;
