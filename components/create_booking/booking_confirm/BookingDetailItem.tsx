import { IconType } from 'react-icons';

interface BookingDetailItemProps {
  icon: IconType;
  iconBg: string;
  iconColor: string;
  title: string;
  value: string;
}

export default function BookingDetailItem({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
}: BookingDetailItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className={`${iconBg} p-2 rounded-full`}>
        <Icon className={iconColor} />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
}