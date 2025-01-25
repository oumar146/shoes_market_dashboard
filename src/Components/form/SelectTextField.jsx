import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const  SelectTextField = ({defaultValue ,datas, setData=null , label = "null", size = "100%"}) => {

  return (
    <Box
      sx={{ '& .MuiTextField-root': { m: 1, width: `${size}` } }}
      noValidate
      autoComplete="off"
    >
       { defaultValue && datas &&<TextField
          select
          label={label}
          defaultValue={defaultValue}
          onChange={(e) => setData && setData(e.target.value)}
          required
        >
          {datas.map((data) => (
            <MenuItem key={data.id || data} value={data.name || data}
            >
              {data.name || data}
            </MenuItem>
          ))}
        </TextField>}
    </Box>
  );
}

export default SelectTextField;