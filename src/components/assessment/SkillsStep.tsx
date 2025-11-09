import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AssessmentData } from "@/pages/Assessment";

interface SkillsStepProps {
  formData: AssessmentData;
  updateFormData: (data: Partial<AssessmentData>) => void;
}

const SKILLS = [
  { id: "coding", label: "Coding & Programming" },
  { id: "data-analysis", label: "Data Analysis" },
  { id: "design", label: "Design & Creativity" },
  { id: "writing", label: "Writing & Communication" },
  { id: "public-speaking", label: "Public Speaking" },
  { id: "problem-solving", label: "Problem Solving" },
  { id: "project-management", label: "Project Management" },
  { id: "leadership", label: "Leadership" },
];

const SkillsStep = ({ formData, updateFormData }: SkillsStepProps) => {
  const toggleSkill = (skillId: string) => {
    const newSkills = formData.skills.includes(skillId)
      ? formData.skills.filter((s) => s !== skillId)
      : [...formData.skills, skillId];
    updateFormData({ skills: newSkills });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Skills</h2>
        <p className="text-muted-foreground">
          Select all skills you possess or are developing (choose at least one)
        </p>
      </div>

      <div className="space-y-3">
        {SKILLS.map((skill) => (
          <div key={skill.id} className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
            <Checkbox
              id={skill.id}
              checked={formData.skills.includes(skill.id)}
              onCheckedChange={() => toggleSkill(skill.id)}
            />
            <Label
              htmlFor={skill.id}
              className="flex-1 cursor-pointer font-normal"
            >
              {skill.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsStep;
