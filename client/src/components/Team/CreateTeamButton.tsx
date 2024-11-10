import React from "react";
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
import { FC } from "react";
import { OptionProps } from "react-select";

const leaderOptions:LeaderOption[] = [
  { value: "leader1", label: "Leader 1", image: "https://via.placeholder.com/30" },
  { value: "leader2", label: "Leader 2", image: "https://via.placeholder.com/30" },
  { value: "leader3", label: "Leader 3", image: "https://via.placeholder.com/30" },
];

interface LeaderOption {
  value: string;
  label: string;
  image: string;
}


const CustomOption: FC<OptionProps<LeaderOption>> = (props) =>  {
  const { data, innerRef, innerProps }:any = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
    >
      <img src={data.image} alt={data.label} className="w-6 h-6 rounded-full mr-2" />
      <span>{data.label}</span>
    </div>
  );
};

export function CreateTeamButton() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

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
            <Input label="Team Name" />

            <Typography color="blue-gray" variant="h6">
              Leader
            </Typography>
            <Select
              options={leaderOptions}
              placeholder="Select Leader"
              components={{ Option: CustomOption }}
            />

            <Typography color="blue-gray" variant="h6">
              Note
            </Typography>
            <Textarea label="Note" />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            Cancel
          </Button>
          <Button variant="gradient" color="blue" onClick={handleOpen}>
            Create Team
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
