import { Lecturer } from '../lib/departmentUtils';

interface Props {
  items: Lecturer[];
}

const PLACEHOLDER: Lecturer = {
  id: '__placeholder__',
  name: 'Lecturer Name',
  specialization: 'Specialization',
  image_url: '/person.png',
  courses: [],
};

function buildList(items: Lecturer[]): Lecturer[] {
  const filled = [...items];
  while (filled.length < 3) filled.push({ ...PLACEHOLDER, id: `__ph_${filled.length}` });
  return filled.slice(0, 3);
}

const isPlaceholder = (item: Lecturer) => item.id.startsWith('__');

export default function LecturerCarousel({ items }: Props) {
  const list = buildList(items);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {list.map((item) => {
        const ph = isPlaceholder(item);
        return (
          <div key={item.id} className="flex items-center gap-5 px-4 py-2">
            <img
              src={item.image_url || '/person.png'}
              alt={item.name}
              loading="lazy"
              className={`w-56 h-56 rounded-full object-cover flex-shrink-0 ${ph ? 'opacity-30' : ''}`}
              onError={(e) => { (e.target as HTMLImageElement).src = '/person.png'; }}
            />
            <div>
              <h3 className={`text-xl font-medium ${ph ? 'text-gray-300' : 'text-[#212121]'}`}>{item.name}</h3>
              <p className={`text-base mt-1 ${ph ? 'text-gray-300' : 'text-[#555]'}`}>{item.specialization}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
