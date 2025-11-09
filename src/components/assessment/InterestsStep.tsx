import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AssessmentData } from "@/pages/Assessment";

interface InterestsStepProps {
  formData: AssessmentData;
  updateFormData: (data: Partial<AssessmentData>) => void;
}

const INTERESTS = [
  { id: "technology", label: "Technology" },
  { id: "art-design", label: "Art & Design" },
  { id: "business", label: "Business" },
  { id: "medicine", label: "Medicine & Healthcare" },
  { id: "teaching", label: "Teaching & Academia" },
  { id: "social-work", label: "Social Work" },
  { id: "research", label: "Research" },
  { id: "law-policy", label: "Law & Policy" },
];

const InterestsStep = ({ formData, updateFormData }: InterestsStepProps) => {
  const toggleInterest = (interestId: string) => {
    const newInterests = formData.interests.includes(interestId)
      ? formData.interests.filter((i) => i !== interestId)
      : [...formData.interests, interestId];
    updateFormData({ interests: newInterests });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Interests</h2>
        <p className="text-muted-foreground">
          Select all the areas that interest you (choose at least one)
        </p>
      </div>

      <div className="space-y-3">
        {INTERESTS.map((interest) => (
          <div key={interest.id} className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
            <Checkbox
              id={interest.id}
              checked={formData.interests.includes(interest.id)}
              onCheckedChange={() => toggleInterest(interest.id)}
            />
            <Label
              htmlFor={interest.id}
              className="flex-1 cursor-pointer font-normal"
            >
              {interest.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterestsStep;
