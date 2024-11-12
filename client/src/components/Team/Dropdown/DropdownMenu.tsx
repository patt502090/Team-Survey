interface DropdownMenuProps {
  isOpen: boolean;
  onKick: () => void;
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  onKick,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-8 right-2 bg-white shadow-lg rounded-md w-48 py-2">
      <button
        onClick={onKick}
        className="text-red-600 hover:bg-gray-100 w-full text-left px-4 py-2"
      >
        เตะออกจากทีม
      </button>
      <button
        onClick={onClose}
        className="text-gray-600 hover:bg-gray-100 w-full text-left px-4 py-2"
      >
        ยกเลิก
      </button>
    </div>
  );
};

export default DropdownMenu;
