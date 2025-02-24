import { Dispatch, SetStateAction } from "react";

type Props = {
  label: string;
  placeholder: string;
  setData: Dispatch<SetStateAction<string>>;
  data: string;
};

export function InputBox({ label, placeholder, setData, data }: Props) {
  return (
    <div className="flex h-20 w-full flex-col justify-between rounded-xl border-[1.5px] border-gray-300 px-4 py-3 focus-within:border-green-700">
      <p className="text-[0.9rem] text-gray-500">{label}</p>
      <input
        type="text"
        className="w-full border-0 outline-none"
        placeholder={placeholder}
        onChange={(e) => {
          setData(e.target.value);
        }}
        value={data}
      />
    </div>
  );
}
