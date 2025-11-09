import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AssessmentData } from "@/pages/Assessment";

interface PersonalDetailsStepProps {
  formData: AssessmentData;
  updateFormData: (data: Partial<AssessmentData>) => void;
}

const PersonalDetailsStep = ({ formData, updateFormData }: PersonalDetailsStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Personal Details</h2>
        <p className="text-muted-foreground">
          Let's start with some basic information about you
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            min="15"
            max="100"
            placeholder="Enter your age"
            value={formData.age}
            onChange={(e) => updateFormData({ age: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="education">Education Level *</Label>
          <Select
            value={formData.educationLevel}
            onValueChange={(value) => updateFormData({ educationLevel: value })}
          >
            <SelectTrigger id="education">
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
              <SelectItem value="masters">Master's Degree</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
