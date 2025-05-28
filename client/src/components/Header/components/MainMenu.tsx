import DehazeIcon from "@mui/icons-material/Dehaze";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from "@mui/icons-material/Person";
import {
  Drawer,
  IconButton,
  IconButtonOwnProps,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "@hooks";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export const MainMenu = (props: IconButtonOwnProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const user = useAppSelector((s) => s.user);
  const { t } = useTranslation();

  return user ? (
    <>
      <IconButton {...props} size="medium" onClick={() => setOpen(true)}>
        <DehazeIcon />
      </IconButton>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItemButton
            component={Link}
            to="users"
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={t("header.menu.users")} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="games"
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <ExtensionIcon />
            </ListItemIcon>
            <ListItemText primary={t("header.menu.games")} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  ) : (
    <IconButton size="medium" sx={{ visibility: "hidden" }}>
      <DehazeIcon />
    </IconButton>
  );
};
