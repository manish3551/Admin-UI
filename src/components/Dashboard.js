import React, { useEffect, useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import TableBody from "./TableBody";
import Footer from "./Footer";
import Checkbox from "@mui/material/Checkbox";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectCheckbox, setSelectCheckbox] = useState([]);
  const [selectAllUser, setSelectAllUser] = useState(false);

  const totalPage = Math.ceil(users.length / 10);
  const firstIndex = (currentPage - 1) * 10;
  const lastIndex = firstIndex + 10;
  const dataperPage = users.slice(firstIndex, lastIndex);

  const getUsersInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      setUsers(data);
      setLoading(false);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getUsersInfo();
  }, []);

  const handleUserDelete = (userId) => {
    setLoading(true);
    setUsers((oldUser) => oldUser.filter((user) => user.id !== userId));
    setLoading(false);
  };
  const deleteMultipleUsers = () => {
    selectCheckbox.forEach((id) => handleUserDelete(id));
    setSelectAllUser(false);
  };
  const handleSelectUser = (userId) => {
    let useridArr = [];
    if (selectCheckbox.includes(userId)) {
      useridArr = selectCheckbox.filter((id) => id !== userId);
    } else {
      useridArr = [...selectCheckbox, userId];
    }
    setSelectCheckbox(useridArr);
  };

  const handleselectAllUser = () => {
    if (selectCheckbox.length !== 10) {
      setSelectAllUser(true);
      setSelectCheckbox(dataperPage.map((user) => user.id));
    } else {
      setSelectCheckbox([]);
      setSelectAllUser(false);
    }
  };

  return (
    <>
      <Header></Header>
      <SearchBar
        users={users}
        handleUsers={setUsers}
        fetchUser={getUsersInfo}
      />
      <Box>
        <table>
          <thead>
            <tr>
              <th>
                <Checkbox
                  color="default"
                  checked={selectAllUser}
                  onChange={handleselectAllUser}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{ display: "flex", justifyContent: "space-evenly" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Box
                className="loading"
                position={"absolute"}
                top={"70vh"}
                left={"50vw"}
              >
                <CircularProgress variant="secondary" />
                <h3> Loading Users Info... </h3>
              </Box>
            ) : (
              dataperPage.map((user) => {
                return (
                  <>
                    <TableBody
                      key={user.id}
                      userData={user}
                      userInfoDelete={() => handleUserDelete(user.id)}
                      isChecked={selectCheckbox.includes(user.id)}
                      selectUser={() => handleSelectUser(user.id)}
                    />
                  </>
                );
              })
            )}
          </tbody>
        </table>

        <Footer
          pages={totalPage}
          key={firstIndex}
          handlePage={setCurrentPage}
          onpage={currentPage}
        />

        <button className="btn-Selected" onClick={deleteMultipleUsers}>
          Delete Selected
        </button>
      </Box>
    </>
  );
};

export default Dashboard;
