import React, { useState, useEffect, useContext } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { NavLink } from 'react-router-dom';
import { addData } from './context/ContextProvider';
import { updateData } from './context/ContextProvider';
import { deleteData } from './context/ContextProvider';

const Home = () => {

  const [getuserdata, setuserdata] = useState([]);

  const {udata,setUdata} = useContext(addData);
  const {updata,setUpdata} = useContext(updateData);
  const {deldata,setdeldata} = useContext(deleteData);
  

  console.log(getuserdata);

  const getdata = async (e) => {

    //data from backend to frontend 
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }

    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    }
    else {
      setuserdata(data);
      console.log("get data");
    }

  }

  useEffect(() => {
    getdata();
  },[]);

  const deleteuser = async (id) => {

    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    }
    else {
      console.log("user deleted");
      setdeldata(deletedata);
      getdata();
    }


  }



  return (
    <>
    {
      udata?
      <><div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Success!</strong> User added Successfully
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
      </> :""
    }

    {
      updata?
      <><div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Success!</strong> User updated Successfully
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
      </> :""
    }
    {
      deldata?
      <><div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Success!</strong> User deleted Successfully
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
      </> :""
    }
      
      <div className='mt-5'>
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
          </div>

          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope='col'></th>

              </tr>
            </thead>
            <tbody>

              {
                getuserdata.map((element, id) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{id + 1}</th>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.work}</td>
                        <td>{element.mobile}</td>
                        <td className='d-flex justify-content-between'>
                          <NavLink to={`view/${element._id}`}><button className='btn btn-success'>< VisibilityIcon /></button></NavLink>
                          <NavLink to={`edit/${element._id}`}><button className='btn btn-primary'><DriveFileRenameOutlineRoundedIcon /></button></NavLink>
                          <button className='btn btn-danger' onClick={() => deleteuser(element._id)}><DeleteForeverRoundedIcon /></button>
                        </td>
                      </tr>
                    </>
                  )
                })
              }



            </tbody>
          </table>



        </div>
      </div>
    </>
  )
}

export default Home