import React from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button
} from '@material-ui/core'
import MenuIcon from '@material-ui/core/Menu'
import Axios from 'axios'

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  }
}));

export default function StickyHeadTable() {
    const history = useHistory()
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [list, setList] = React.useState([])

    const fetchData = () => {
        Axios.get('http://localhost:3000/api/todo')
            .then(res => {
                // console.log(res.data.data)
                let allData = res.data.data
                setList(allData)
            })
            .catch(err => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        fetchData()
        }, [])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                Todolist
                </Typography>
            </Toolbar>
        </AppBar>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell>
                    Title
                </TableCell>
                <TableCell>
                    Message
                </TableCell>
                <TableCell>
                    Options
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(res => (
                <TableRow hover onClick={() => { history.push(`/view?getId=${res.item._id}`) }} role="checkbox" key={res.item._id}>
                    <TableCell>
                        {res.item.title}
                    </TableCell>
                    <TableCell>
                        {res.item.message}
                    </TableCell>
                    <TableCell>
                        <Button style={styleButton} variant="contained" color="primary">Add</Button>
                        <Button style={styleButton} variant="contained" color="primary">Add</Button>
                        <Button style={styleButton} variant="contained" color="primary">Add</Button>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const styleButton = {
    marginRight : '10px'
}