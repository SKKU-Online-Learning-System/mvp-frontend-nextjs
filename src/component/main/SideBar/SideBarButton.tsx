type Props = {
  icon: React.ElementType;
  text: string;
};

export function SideBarButton({ icon: Icon, text }: Props) {
  return (
    <div className="flew-row flex cursor-pointer items-end pl-12 max-sm:pl-6">
      <Icon size="24" />
      <span className="ml-4 text-[1.05rem] font-semibold">{text}</span>
    </div>
  );
}
