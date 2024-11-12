import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AuthContext } from "@/contexts/Auth.context";
import { useRouter } from "next/navigation";
import ax from "@/conf/ax";
import toast from "react-hot-toast";

interface DeleteTeamButtonProps {
  newFetch: () => void;
  teamId?: string | null;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export function ModalDelateTeam({
  newFetch,
  teamId,
  open,
  handleOpen,
  handleClose,
}: DeleteTeamButtonProps) {

  const handleDeleteTeam = async () => {
    if (teamId == null) return;
    try {
      const result = await ax.delete(`teams/${teamId}`);
    //   console.log("del",teamId);
    //   console.log("del",result);      
      toast.success("ลบทีมสำเร็จ");
      newFetch();
      handleClose();
    } catch (error) {
      console.error("Error deleting team:", error);
      toast.error("Error deleting team");
    }
  };

  return (
    <>
      {/* <Button variant="gradient" color="red" onClick={handleOpen}>
        Delete Team
      </Button> */}

      <Dialog open={open} handler={handleClose}>
        <DialogHeader>ยืนยันการลบทีม</DialogHeader>
        <DialogBody>
         คุณแน่ใจหรือไม่ว่าต้องการลบทีมนี้?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>ยกเลิก</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDeleteTeam}>
            <span>ตกลง</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
