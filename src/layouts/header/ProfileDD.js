import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import userimg from "../../../assets/images/users/user2.jpg";
import {
  Box,
  Menu,
  Typography,
  Link,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import mongoose from "mongoose";
import Admin from "../../../models/Admin";
const ProfileDD = ({ logout, admins }) => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Image
            src={userimg}
            alt={userimg}
            width="30"
            height="30"
            className="roundedCircle"
          />
          {admins &&
            admins.map((admin) => (
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex",
                  },
                  alignItems: "center",
                }}
              >
                <Typography
                  color="textSecondary"
                  variant="h5"
                  fontWeight="400"
                  sx={{ ml: 1 }}
                >
                  Hi,
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight="700"
                  sx={{
                    ml: 1,
                  }}
                >
                  {admin.email}
                </Typography>
                <FeatherIcon icon="chevron-down" width="20" height="20" />
              </Box>
            ))}
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              <ListItemButton>
                <Link href={"../../../admin/editprofile"}>Edit Profile</Link>
              </ListItemButton>
              <ListItemButton>
                <Link href={"../../../admin/profile"}>Profile</Link>
              </ListItemButton>
              <ListItemButton>
                <Link href={"../../../admin/changepwd"}>Change Password</Link>
              </ListItemButton>
              <ListItemButton>
                <Link href={"../../../admin/mysettings"}>
                  <a>
                    <li className="py-2 hover:text-red-400 text-black text-sm font-medium">
                      My Settings
                    </li>
                  </a>
                </Link>
              </ListItemButton>
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Link href={"../../../admin/adminlogin"}>
              <Button
                onClick={logout}
                fullWidth
                variant="outlined"
                color="primary"
              >
                Logout
              </Button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

// fetching the data from the mongodb
export async function getServerSideProps(context) {
  let error = null;

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // fetch the single item with the unique slug
  let admins = await Admin.findOne({ email: context.query.email });

  return {
    props: { admins: JSON.parse(JSON.stringify(admins)) }, // will be passed to the page component as props
  };
}

export default ProfileDD;
