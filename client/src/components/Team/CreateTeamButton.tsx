import React, { useState, FC, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { FiUserPlus } from "react-icons/fi";
import Select from "react-select";
import { OptionProps } from "react-select";
import ax from "@/conf/ax";
import toast from "react-hot-toast";

interface CreateTeamButtonProps {
  newFetch: () => void;
}

interface LeaderOption {
  documentId: string;
  value: string;
  username: string;
  image: string;
  id: string;
}

const CustomOption: FC<OptionProps<LeaderOption>> = (props) => {
  const { data, innerRef, innerProps }: any = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
    >
      <img
        src={data.image}
        alt={data.label}
        className="w-6 h-6 rounded-full mr-2"
      />
      <span>{data.username}</span>
    </div>
  );
};

export function CreateTeamButton({ newFetch }: CreateTeamButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>("");
  const [selectedLeader, setSelectedLeader] = useState<LeaderOption | null>(
    null
  );
  const [note, setNote] = useState<string>("");
  const [user, setUser] = useState<LeaderOption[]>([]);

  const handleOpen = () => setOpen(!open);

  const fetchUserNoRole = async () => {
    try {
      const resultUser = await ax.get(
        "/users?populate=role&filters[role][name]=Authenticated"
      );
      // console.log("use",resultUser.data);
      const usersData = resultUser.data.map((user: any) => ({
        documentId: user.id,
        username: user.username,
        image: "https://thumbs.dreamstime.com/z/laptop-computer-user-icon-vector-isolated-white-person-work-online-pictogram-business-worker-analyst-student-coder-customer-316853739.jpg",
        id: user.id,
      }));
      console.log("use", usersData);
      setUser(usersData);
    } catch (e) {
      console.log("Error fetching user data:", e);
    }
  };

  useEffect(() => {
    fetchUserNoRole();
  }, []);

  const handleCreateTeam = async () => {
    const teamData = {
      teamName,
      leader: selectedLeader?.value,
      note,
      leaderId: selectedLeader?.id,
    };

    try {
      const responseCreateTeam = await ax.post("/teams", {
        data: { TeamName: teamData.teamName , manager: teamData.leaderId},
      });
      console.log("use",teamData.leaderId)
      const responseAssignRole = await ax.put("/assign_role", {
        data: {
          teamId: Number(responseCreateTeam.data.data.id),
          userId: Number(teamData.leaderId),
          roleId: 4,
        },
      });

      console.log("Team created successfully:", responseCreateTeam.data);
      console.log("Assign Role successfully:", responseAssignRole.data);
      toast.success("สร้างทีมเสร็จสิ้น!");
      newFetch();
      setOpen(false);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <>
      <Button
        size="md"
        className="flex items-center gap-3 mb-3 md:mb-6"
        variant="gradient"
        color="light-blue"
        onClick={handleOpen}
      >
        <FiUserPlus className="w-4 h-4" />
        Create Team
      </Button>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              Create Team
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 cursor-pointer"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <div className="grid gap-6">
            <Typography color="blue-gray" variant="h6">
              Team Name
            </Typography>
            <Input
              label="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />

            <Typography color="blue-gray" variant="h6">
              Leader
            </Typography>
            <Select
              options={user.map((userData) => ({
                label: userData.username,
                value: userData.value,
                image: userData.image,
                username: userData.username,
                id: userData.id,
              }))}
              required
              placeholder="Select Leader"
              components={{ Option: CustomOption }}
              value={selectedLeader}
              onChange={setSelectedLeader}
            />

            <Typography color="blue-gray" variant="h6">
              Note
            </Typography>
            <Textarea
              label="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            Cancel
          </Button>
          <Button variant="gradient" color="blue" onClick={handleCreateTeam}>
            Create Team
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
