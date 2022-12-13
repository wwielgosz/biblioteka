import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import "./Book.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { DeleteOutline } from "@material-ui/icons";
import {
  Button,
 } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CheckBox from '@mui/icons-material/CheckBox';import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TitleIcon from '@mui/icons-material/Title';



const PF = process.env.REACT_APP_PUBLIC_FOLDER;


const Backbook = () => {
    const [books, setBooks] = useState(); 
  const URL1 = `books`;
  const fetchHandler1 = async () => {
    return await axios.get(URL1).then((res) => res.data);
  };
    useEffect(() => {
      fetchHandler1()
      .then((data) => setBooks(data.books));
    }, []);

  const location = useLocation();
    const path = location.pathname.split("/")[2];
   
  const [like, setLike] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [query, setQuery] = useState("");
  const [query1, setQuery1] = useState("");
  const [users, setUsers] = useState([]);
  const [zmienna, setZmienna] = useState("");
  const [inputs, setInputs] = useState();
const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`/books/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.book));
    };
    fetchHandler();
  }, [id]);



  
  const handleDelete = (zmienna) => {
   if(zmienna === inputs.likes[0]){
   setZmienna(zmienna);
   setLike(!isLiked &&  <Alert severity="info">Czytelnik został zaznaczony</Alert>);
    }
    else {
      setLike(!isLiked &&  <Alert severity="error">To nie ten czytelnik</Alert>);
    }
  };

//  useEffect(() => {
  //  setIsLiked(books.likes.includes(zmienna));
  //}, [zmienna, books.likes]);





  const likeHandler = () => { 
    if (zmienna){
    try {     
      axios.put("/books/" + path + "/like", { userId: zmienna });
   
    } catch (err) {}
    setLike(!isLiked && <Alert severity="success">Książka została <strong>zwrócona</strong> </Alert>);
  }
  else {
    setLike(!isLiked && <Alert severity="error">Zaznacz czytelnika </Alert>);

  }}


 
  
 const [checked, setChecked] = useState(false);
  const history = useNavigate();





  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/users/search?q=${query}`);
      setUsers(res.data);
    };
    fetchData();
  }, [query]);


  useEffect(() => {
    const fetchData1 = async () => {
      const res = await axios.get(`/users/nrkarty?q=${query1}`);
      setUsers(res.data);
    };
    fetchData1();
  }, [query1]);


  const columns = [
 
    { field: 'name', headerName: 'Imię i nazwisko',   headerClassName: 'super-app-theme--header', width: 130
    },
    {
      field: 'nrkarty',
      headerName: 'Numer karty',
      type: 'number',
      align: 'center',
      width: 90,
     },
     
  {
    field: "action",
    headerName: "Zaznacz czytelnika",
    width: 140,
    align: 'center',
    renderCell: (params) => {
      return (
        <>
       
         
          <CheckBox
            className="userListDelete"
            onClick={() => handleDelete(params.row._id)}
          />
          
        </>
      );
    },
  },
   
   ];
  
  return (
    <div className="row">
     
      <div className="column">
       {inputs && (
   <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
  <ListItem>
      <ListItemAvatar>
        <Avatar>
          <TitleIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Tutuł" secondary={inputs.name} />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <PersonIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Autor" secondary={inputs.author} />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AccountTreeIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Gatunek" secondary={inputs.categories} />
    </ListItem>
   
      <Divider variant="inset" component="li" />
   
    </List>
       )}
</div>
<div className="column1">
<div className="app">
         
         <div className="addProductItem">
         <input 
         placeholder="Szukaj imię i nazwisko"
         onChange={(e) => setQuery(e.target.value)}
       />
        </div>
        <div className="addProductItem">
         <input 
         placeholder="Szukaj nr karty..."
         onChange={(e) => setQuery1(e.target.value)}
       />
        </div>
        </div>
        <div style={{ height: 400, width: '80%'}}> 
 <span className="postLikeCounter">{like}</span>
        <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        //checkboxSelection
        getRowId={row=>row._id}
      />
      </div>
       <Button style={{  width: '80%'}} onClick={likeHandler} variant="contained" type="submit">
         Oddaj
        </Button> 
      </div>
      
    </div>
  );
};

export default Backbook;










