import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AuthContext } from "@/contexts/Auth.context";
import { useRouter } from "next/navigation";

export function ModalDelateTeam() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Are you sure you want to log out?</DialogHeader>
      <DialogBody>
        If you log out, you will be redirected to the login page.
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="red" onClick={handleLogout}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
