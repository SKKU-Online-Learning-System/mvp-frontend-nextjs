type Props = {
  text: string;
};

export function TagIcon({ text }: Props) {
  return (
    <div className='flex w-fit items-center justify-center rounded-md bg-green-800 px-2 py-1 text-white'>
      {text}
    </div>
  );
}
