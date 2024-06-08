type NameIconProps = {
  name: string;
  className: string;
};

const NameIcon = ({ name, className }: NameIconProps) => {
  return (
    <div className={`rounded-icon-name ${className}`}>
      <span>{name}</span>
    </div>
  );
};

export default NameIcon;
