export const departmentNames: Record<string, string> = {
  'aerospace': 'Aerospace Engineering',
  'mechanical': 'Mechanical Engineering',
  'chemical': 'Chemical Engineering',
  'electronics-computer': 'Electronics & Computer Engineering',
  'civil': 'Civil Engineering',
  'industrial': 'Industrial Engineering',
};

export const departmentAbbrev: Record<string, string> = {
  'aerospace': 'ASE',
  'mechanical': 'ME',
  'chemical': 'CHE',
  'electronics-computer': 'ECE',
  'civil': 'CVE',
  'industrial': 'IE',
};

export const departmentSlugs = [
  'aerospace',
  'mechanical',
  'chemical',
  'electronics-computer',
  'civil',
  'industrial',
];

export interface Lecturer {
  id: string;
  name: string;
  specialization: string;
  image_url: string;
  courses?: Course[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  level: string;
}
