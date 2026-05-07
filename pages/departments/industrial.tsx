import DepartmentPageLayout from '../../components/DepartmentPageLayout';

const ABOUT_PARAGRAPHS = [
  "The Department of Industrial Engineering focuses on the design, optimisation, and management of integrated systems of people, materials, information, and energy. The curriculum covers operations research, production planning, ergonomics, quality management, supply chain management, and systems engineering.",
  "Students learn to eliminate waste, improve efficiency, and increase productivity across diverse industries—from manufacturing and logistics to healthcare and financial services. Through case studies, simulation tools, and industry-sponsored projects, graduates develop the analytical and managerial skills to transform complex operations.",
  "Industrial engineers are the backbone of efficient enterprises. The department prepares graduates to take leadership roles in Nigeria's growing manufacturing, services, and technology sectors, contributing to improved productivity and competitiveness at both the organisational and national level.",
];

export default function IndustrialDepartment() {
  return (
    <DepartmentPageLayout
      deptKey="industrial"
      deptName="Industrial Engineering"
      subtitle="Optimising systems and processes for a more productive future"
      aboutImage="https://picsum.photos/id/1040/800/600"
      aboutParagraphs={ABOUT_PARAGRAPHS}
    />
  );
}
