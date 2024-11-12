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

export function ModalLogout({ open, handleOpen }: { open: boolean; handleOpen: () => void }) {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  const handleLogout = () => {
    logout();
    handleOpen(); 
    router.push("/login");
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>คุณต้องการออกจากระบบใช่หรือไม่</DialogHeader>
      <DialogBody>
        หากคุณออกจากระบบ คุณจะถูกเปลี่ยนเส้นทางไปยังหน้าล็อกอิน
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>ยกเลิก</span>
        </Button>
        <Button variant="gradient" color="red" onClick={handleLogout}>
          <span>ยืนยัน</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
