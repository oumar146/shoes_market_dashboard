import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { visuallyHidden } from "@mui/utils";
import EditPopUp from "./EditPopUp";
import DeletePopUp from "./DeletePopUp";

// Définir les colonnes de la table
const columns = [
  { id: "name", numeric: false, label: "Nom du produit" },
  { id: "category", numeric: false, label: "Catégorie" },
  { id: "size", numeric: false, label: "Taille" },
  { id: "price", numeric: true, label: "Prix (EUR)" },
  { id: "reference", numeric: false, label: "Référence" },
];

// Composant pour l'en-tête de la table avec tri
const TableHeadComponent = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "sélectionner tous les produits" }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.numeric ? "right" : "left"}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "tri décroissant" : "tri croissant"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

// Composant de la barre d'outils pour les actions (modifier, supprimer, filtrer)
const ToolbarComponent = ({
  handleDelete,
  handleEdit,
  numSelected,
  selected,
  data,
}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: numSelected > 0 && alpha("#1976d2", 0.2),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} sélectionné(s)
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle">
          Liste des produits
        </Typography>
      )}
      {numSelected > 0 ? (
        <div className="flex">
        { numSelected <= 1 &&<Tooltip
          style={{ backgroundColor: "transparent" }}
          onMouseDown={(e) => {
            e.target.style.background = "transparent";
          }}
          onMouseUp={(e) => {
            e.target.style.background = "transparent";
          }}
          title="Modifier"
        >
          <IconButton
            onClick={() => {
              handleEdit(selected);
            }}
          >
           <EditPopUp
              title="Modifier un produit"
              icon={<EditIcon />}
              data={data.filter((product) =>
                selected.includes(product.product_id)
              )}
            />
          </IconButton>
        </Tooltip>}
        <Tooltip title="Supprimer">
          <IconButton
            onClick={() => {
              handleDelete(selected);
            }}
          >
            <DeletePopUp
              title="Supprimer un produit"
              icon={<DeleteIcon />}
              data={data.filter((product) =>
                selected.includes(product.product_id)
              )}
            />
          </IconButton>
        </Tooltip>
        </div>
        
      ) : (
        <Tooltip title="Filtrer la liste">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

// Composant principal pour afficher la liste des produits
const ProductsList = ({ handleDelete, handleEdit, data }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Gérer le tri des colonnes
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sélectionner ou désélectionner tous les éléments
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id || n.product_id));
    } else {
      setSelected([]);
    }
  };

  // Sélectionner/désélectionner un élément
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // Changer de page
  const handleChangePage = (event, newPage) => setPage(newPage);

  // Changer le nombre de lignes par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Trier les lignes visibles
  const visibleRows = React.useMemo(() => {
    return data
      .sort((a, b) =>
        order === "asc" ? a[orderBy] > b[orderBy] : a[orderBy] < b[orderBy]
      )
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, data]);

  // Copier la référence du produit
  const handleCopy = (reference) => {
    navigator.clipboard.writeText(reference);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <ToolbarComponent
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          numSelected={selected.length}
          selected={selected}
          data={data}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHeadComponent
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(
                  row.id || row.product_id
                );
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) =>
                      handleClick(event, row.id || row.product_id)
                    }
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.reference}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name || row.product_name}
                    </TableCell>
                    <TableCell align="right">{row.category_name}</TableCell>
                    <TableCell align="right">{row.size}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      {row.reference}
                      <Tooltip title="Copier">
                        <IconButton onClick={() => handleCopy(row.reference)}>
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={data.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage} // Assurez-vous que cette fonction est bien définie
  onRowsPerPageChange={handleChangeRowsPerPage} // Fonction définie dans votre code
/>

      </Paper>
    </Box>
  );
};

export default ProductsList;
