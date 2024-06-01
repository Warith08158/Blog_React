import React, { useEffect } from "react";

const Users = () => {
  useEffect(() => {
    console.log("thtis is users page");
  }, []);
  return <div>Users</div>;
};

export default Users;
