import React from "react";
import requester from "../utils/requester";

const CreateUser = 
({ user, setUser,loginUser, userLogin, setUserLogin }) => {

  
  const addNewUser = async () => {
    await requester.put("/signup", {
      name: user.name,
      password: user.password
    });
    
    setUser({
      name: '',
      password: ''
    });
   
  };


  return (
    <>
      <div>
        signup
        <input
          value={user.name}
          type="text"
          onChange={(e) =>
            setUser({...user,
              name: e.target.value,
            })
          }
        />
        name
        <input
        value={user.password}
          type="text"
          onChange={(e) =>
            setUser({...user,
              password: e.target.value,
            })
          }
        />
        password
        <button onClick={addNewUser}>signup</button>
      </div>

      <div>
        login
        <input 
          type="text" 
          value={userLogin.name}
          onChange={ e => {
            setUserLogin({
              ...userLogin,
              name: e.target.value
            })
          }}
        />
        name
        <input 
          type="text" 
          value={userLogin.password}
          onChange={e => {
            setUserLogin({
              ...userLogin,
              password: e.target.value
            })
          }}
        />
        password
        <button onClick={loginUser}>login</button>
      </div>
    </>
  );
};

export default CreateUser;
