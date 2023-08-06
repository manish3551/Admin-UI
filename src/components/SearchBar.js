import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";

const SearchBar = ({ users, handleUsers, fetchUser }) => {
  const [searchitem, setSearchitem] = useState("");
  const [timer, setTimer] = useState(500);

  const handleDebounceSearch = (e, time) => {
    if (timer) {
      clearTimeout(timer);
    }
    const debounceSearch = setTimeout(() => {
      const searchedUser = users.filter((data) => {
        return (
          data.name.toLowerCase().includes(searchitem.toLowerCase()) ||
          data.email.toLowerCase().includes(searchitem.toLowerCase()) ||
          data.role.toLowerCase().includes(searchitem.toLowerCase())
        );
      });
      if (e.target.value === "") {
        handleUsers(fetchUser());
      }
      handleUsers(searchedUser);
    }, timer);
    setTimer(debounceSearch);
  };

  const handleSearch = (e) => {
    setSearchitem(e.target.value);
    handleDebounceSearch(e, timer);
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            width: "90%"
          }}
        >
          <TextField
            fullWidth
            // id="search-bar"
            value={searchitem}
            placeholder="Search by name, email or role"
            onChange={(e) => handleSearch(e)}
          />
        </Box>
      </Grid>
    </>
  );
};

export default SearchBar;
