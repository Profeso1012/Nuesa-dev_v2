import DepartmentPageLayout from '../../components/DepartmentPageLayout';

const ABOUT_PARAGRAPHS = [
  "The Department of Chemical Engineering focuses on the science and engineering of transforming raw materials and energy into useful products through chemical processes. The curriculum spans reaction engineering, thermodynamics, mass and heat transfer, process design, and environmental engineering.",
  "Students develop strong analytical and problem-solving skills through laboratory experiments and plant design projects, learning to optimise chemical processes for safety, efficiency, and sustainability. Industries from petroleum and petrochemicals to pharmaceuticals and food processing depend on the expertise cultivated in this department.",
  "With a strong emphasis on environmental responsibility and sustainable development, the department prepares graduates who can drive innovation in Nigeria's energy sector and beyond, contributing to cleaner, more efficient industrial processes that benefit communities and the broader economy.",
];

export default function ChemicalDepartment() {
  return (
    <DepartmentPageLayout
      deptKey="chemical"
      deptName="Chemical Engineering"
      subtitle="Transforming materials and energy through innovative chemical processes"
      aboutImage="/depts/chemical.jpg"
      aboutParagraphs={ABOUT_PARAGRAPHS}
    />
  );
}
