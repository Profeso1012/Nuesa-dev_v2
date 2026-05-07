import DepartmentPageLayout from '../../components/DepartmentPageLayout';

const ABOUT_PARAGRAPHS = [
  "The Department of Aerospace Engineering is dedicated to the scientific and engineering study of flight, aircraft, and space systems. The curriculum combines aerodynamics, propulsion, structural analysis, flight mechanics, and avionics to build engineers capable of pushing the boundaries of what is possible in the sky and beyond.",
  "Students gain hands-on experience through design projects, wind-tunnel studies, and industry collaborations that simulate real aerospace challenges. From commercial aviation to satellite systems and unmanned aerial vehicles, our graduates are trained to tackle the full spectrum of aerospace engineering problems.",
  "Aligned with Nigeria's vision for indigenous aerospace capability, the department produces graduates who are equipped to contribute to national and international aerospace programmes, making LASU a key driver of Africa's future in aviation and space exploration.",
];

export default function AerospaceDepartment() {
  return (
    <DepartmentPageLayout
      deptKey="aerospace"
      deptName="Aerospace Engineering"
      subtitle="Pioneering the frontiers of flight and space exploration"
      aboutImage="/depts/aerospace.jpeg"
      aboutParagraphs={ABOUT_PARAGRAPHS}
    />
  );
}
