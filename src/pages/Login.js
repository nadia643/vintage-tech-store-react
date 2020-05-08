import React, { useState, useContext } from "react";

// strapi function
import loginUser from "../strapi/loginUser";
import registerUser from "../strapi/registerUser";

// handle user
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/user";

export default function Login() {
  const history = useHistory();

  // setup user context
  const {userLogin} = useContext(UserContext);
  
  // state values 
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [ username, setUsername] = useState("default");
  const [ isMember, setIsMember] = useState(true);

  let isEmpty = !email || !password || !username;

  const toggleMember = () => {
    setIsMember((prevMember) => {
      console.log(prevMember);
      let isMember = !prevMember;
      isMember ? setUsername("default") : setUsername("");
      return isMember;
      
    })
  }

  const handleSubmit = async (e) => {
    // alert
    e.preventDefault();
    let response;
    if(isMember) {
      response = await loginUser({ email, password })
    }
    else {
      response = await registerUser({ email, password, username })
    }
    if(response) {
      console.log(response);
      const { jwt:token, user:{username}} = response.data 
      const newUser = { token, username };
      userLogin(newUser);
      history.push("/products");
      
    }
    else {
      /// show alert
    }
  };


  return (
    <section className="form-section">
      <h2 className="section-title">{ isMember ? "sign in" : "register" }</h2>
      <form className="login-form">

        {/*  single input */}
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} />
        </div>
        {/*  end of single input */}

                {/*  single input */}
                <div className="form-control">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} />
        </div>
        {/*  end of single input */}

        {/*  single input */}
        {/* only shows if is "is not a member" */}
        {!isMember && (
          <div className="form-control">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} />
        </div>
        )}
        
        {/*  end of single input */}


        {/* empty form text */}
        {isEmpty && <p className="form-empty">Please fill out all form fields</p>}

        {/* submit btn  */}
        {!isEmpty && (
          <button 
            type="submit" 
            className="btn btn-block btn-primmary" 
            onClick={handleSubmit}
            >
              Submit
              </button>
        )}
        {/* register link */}
        <p className="register-link">
          {isMember ? "need to register" : "already a member"}
          <button type="button" onClick={toggleMember}>
            Click here
          </button>
        </p>
      </form>
    </section>
  );
}
