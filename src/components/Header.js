import Grid from "@mui/material/Grid";

const Header = () => {
  return (
    <div className="header">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <h1>Admin UI</h1>
      </Grid>
    </div>
  );
};

export default Header;
