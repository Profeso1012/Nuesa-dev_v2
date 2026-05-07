import DepartmentPageLayout from '../../components/DepartmentPageLayout';

const ABOUT_PARAGRAPHS = [
  "The Department of Electronics and Computer Engineering sits at the intersection of hardware and software, preparing engineers for the digital age. The curriculum encompasses electronic circuit design, digital systems, embedded systems, telecommunications, signal processing, and computer engineering fundamentals.",
  "Students gain experience with microcontrollers, FPGAs, PCB design, and software development, completing hands-on projects that reflect the demands of industry. From consumer electronics and telecommunications infrastructure to IoT devices and intelligent systems, our graduates are equipped to drive technological innovation across every sector.",
  "In a rapidly evolving technology landscape, the department continuously updates its programmes to include emerging areas such as machine learning hardware, cybersecurity, and wireless communications—ensuring that LASU engineers remain at the cutting edge of the global digital economy.",
];

export default function ElectronicsComputerDepartment() {
  return (
    <DepartmentPageLayout
      deptKey="electronics-computer"
      deptName="Electronics & Computer Engineering"
      subtitle="Powering the digital revolution through intelligent systems"
      aboutImage="https://picsum.photos/id/1054/800/600"
      aboutParagraphs={ABOUT_PARAGRAPHS}
    />
  );
}
