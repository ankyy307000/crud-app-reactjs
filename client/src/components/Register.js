import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { addData } from './context/ContextProvider';
// import { post } from '../../../server/routes/router'

const Register = () => {

  const {udata,setUdata} = useContext(addData);
  const navigate = useNavigate()

  const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    })


  const Setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval)=>{
      return {
        ...preval,
        [name]:value
      }

    })
  }



  const addinpdata = async(e) => {
    e.preventDefault();

    const {name,email,age,mobile,work,desc,add} = inpval;


    //data from frontend to backend
    const res = await fetch("/register",{
      method : "POST",
      headers :{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name,email,age,mobile,work,add,desc
      })

    });

    const data = await res.json();
    console.log(data);

    if(res.status === 422 || !data){
      alert("error");
      console.log("error");
    }
    else{
      // alert("data added");
      setUdata(data);
      console.log("data added");
      navigate('/')
    }



  }



  return (
    <div className='container'>
      <NavLink to="/">home</NavLink>
      <form className="mt-4">
        <div className='row'>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input type="email" onChange={Setdata} value={inpval.name} class="form-control" name='name' id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Email</label>
            <input type="email" onChange={Setdata} value={inpval.email} class="form-control" name='email' id="exampleInputPassword1" />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Age</label>
            <input type="number" onChange={Setdata} value={inpval.age} class="form-control" name='age' id="exampleInputPassword1" />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Mobile</label>
            <input type="number" onChange={Setdata} value={inpval.mobile} class="form-control" name='mobile' id="exampleInputPassword1" />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Work</label>
            <input type="text"  onChange={Setdata} value={inpval.work} class="form-control" name='work' id="exampleInputPassword1" />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Address</label>
            <input type="text" onChange={Setdata} value={inpval.add} class="form-control" name='add' id="exampleInputPassword1" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Description</label>
            <textarea className="form-control" onChange={Setdata} value={inpval.desc} name='desc' id="" cols="30" rows="5"></textarea>
          </div>

          <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register