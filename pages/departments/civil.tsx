import DepartmentPageLayout from '../../components/DepartmentPageLayout';

const ABOUT_PARAGRAPHS = [
  "The Department of Civil Engineering trains engineers to plan, design, construct, and maintain the infrastructure that sustains modern society. From bridges and highways to water supply systems and high-rise buildings, the department's curriculum covers structural analysis, geotechnical engineering, hydraulics, transportation engineering, and construction management.",
  "Students work on real-world design challenges and field studies that connect classroom theory with practical application. Through collaborative projects and industry internships, they develop the technical competence and leadership skills required to deliver safe, sustainable, and resilient infrastructure.",
  "As Nigeria's cities continue to grow, the demand for skilled civil engineers has never been higher. The department is committed to producing graduates who can address the nation's infrastructure deficit while upholding global standards of engineering practice, safety, and environmental stewardship.",
];

export default function CivilDepartment() {
  return (
    <DepartmentPageLayout
      deptKey="civil"
      deptName="Civil Engineering"
      subtitle="Building the infrastructure that shapes and sustains our world"
      aboutImage="https://picsum.photos/id/1029/800/600"
      aboutParagraphs={ABOUT_PARAGRAPHS}
    />
  );
}
