import { TrashIcon } from "@heroicons/react/outline";
export default function DeleteButton({ OnClick }: { OnClick: () => void }) {
  return (
    <button
      className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-300 border border-transparent shadow-sm hover:bg-red-500 focus:outline-none"
      onClick={OnClick}
    >
      <TrashIcon className="w-4 h-4" />
      Delete Submission
    </button>
  );
}
