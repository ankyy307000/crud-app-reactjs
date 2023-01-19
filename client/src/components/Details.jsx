import React , {useState,useEffect} from 'react'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { NavLink, useParams ,useNavigate} from 'react-router-dom';

const Details = () => {

    const {id} = useParams("");

    const navigate = useNavigate()

    const [getuserdata, setuserdata] = useState([]);

    const getdata = async () => {

        const res = await fetch(`/getuser/${id}`, {
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
      }, []);


      const deleteuser = async(id)=>{

        const res2 = await fetch(`/deleteuser/${id}`,{
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
          navigate('/')
        }
    
    
      }



    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 385 }}>welcome Ankit Mishra</h1>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to = {`/edit/${getuserdata._id}`}><button className='btn btn-primary mx-2'><DriveFileRenameOutlineRoundedIcon /></button></NavLink>
                        <button className='btn btn-danger' onClick={()=>deleteuser(getuserdata._id)}><DeleteForeverRoundedIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" alt="profile" style={{ width: 50 }} />
                            <h3 className='mt-3'>Name: <span>{getuserdata.name}</span></h3>
                            <h3 className='mt-3'>Age: <span>{getuserdata.age}</span></h3>
                            <p className='mt-3'><MailOutlineRoundedIcon />Email: <span>{getuserdata.email}</span></p>
                            <p className='mt-3'><WorkRoundedIcon />Occupation: <span>{getuserdata.work}</span></p>
                        </div>

                        <div className="right_view col-lg-6 col-md-6 col-12">
                            <p className='mt-5'><PhoneAndroidRoundedIcon />Phone: <span>{getuserdata.mobile}</span></p>
                            <p className='mt-3'><LocationOnRoundedIcon />Location: <span>{getuserdata.add}</span></p>
                            <p className='mt-3'>Description: <span>{getuserdata.desc}</span></p>
                        </div>
                    </div>




                </CardContent>
            </Card>
        </div>
    )
}

export default Details