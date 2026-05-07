import DepartmentPageLayout from '../../components/DepartmentPageLayout';

const ABOUT_PARAGRAPHS = [
  "The Department of Mechanical Engineering stands at the heart of industrial innovation. Rooted in the university's broader mission of excellence, the department emphasises practical training alongside rigorous theory—covering thermodynamics, fluid mechanics, machine design, dynamics, and manufacturing processes.",
  "Students engage with cutting-edge laboratory facilities and industry-relevant projects that bridge academic learning and real-world engineering. From energy systems and robotics to automotive and aerospace components, graduates are equipped to design, analyse, and manufacture the technologies that power modern civilisation.",
  "In line with NUESA LASU's commitment to nation-building, the department nurtures globally competitive engineers who are locally relevant—individuals ready to contribute meaningfully to Nigeria's industrial growth and the global technological landscape.",
];

export default function MechanicalDepartment() {
  return (
    <DepartmentPageLayout
      deptKey="mechanical"
      deptName="Mechanical Engineering"
      subtitle="Building innovation through engineering excellence"
      aboutImage="https://picsum.photos/id/1048/800/600"
      aboutParagraphs={ABOUT_PARAGRAPHS}
    />
  );
}
