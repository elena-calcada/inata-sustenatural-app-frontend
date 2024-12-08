import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ICardProps {
  href: string;
  hrefEdit: string;
  title: string;
  tourId: string;
  onDelete: (id: string) => void;
}

export function CardTour({
  href,
  hrefEdit,
  title,
  tourId,
  onDelete,
}: ICardProps) {
  return (
    <div className="w-full bg-blueColor-backgroundCard shadow-md flex items-center gap-4 rounded-lg">
      <div className="w-full flex items-center justify-between border-l-[10px] border-blueColor-dark rounded-s-lg px-6 py-3">
        <Link
          to={href}
          className="text-[14px] font-montserrat font-bold text-blueColor-dark hover:text-blueColor-base transition-all"
        >
          {title}
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to={hrefEdit}
            className="text-blueColor-dark hover:scale-[1.1] transition-all"
          >
            <Edit size={24} />
          </Link>
          <button
            onClick={() => onDelete(tourId)}
            className="text-redAlert hover:scale-[1.1] transition-all"
          >
            <Trash2 width={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
