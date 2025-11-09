import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { AssessmentData } from "@/pages/Assessment";

interface PersonalityStepProps {
  formData: AssessmentData;
  updateFormData: (data: Partial<AssessmentData>) => void;
}

const PERSONALITY_TYPES = [
  { id: "analytical", label: "Analytical", description: "Logical, detail-oriented thinker" },
  { id: "creative", label: "Creative", description: "Imaginative and innovative" },
  { id: "leadership", label: "Leadership", description: "Natural leader and motivator" },
  { id: "supportive", label: "Supportive", description: "Empathetic team player" },
  { id: "entrepreneurial", label: "Entrepreneurial", description: "Risk-taker and innovator" },
  { id: "detail-oriented", label: "Detail-Oriented", description: "Precise and methodical" },
];

const PersonalityStep = ({ formData, updateFormData }: PersonalityStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Personality & Goals</h2>
        <p className="text-muted-foreground">
          Help us understand your personality and aspirations
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Personality Type *</Label>
          <RadioGroup
            value={formData.personalityType}
            onValueChange={(value) => updateFormData({ personalityType: value })}
          >
            {PERSONALITY_TYPES.map((type) => (
              <div
                key={type.id}
                className="flex items-start space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              >
                <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={type.id} className="cursor-pointer font-medium">
                    {type.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="careerGoals">Career Goals (Optional)</Label>
          <Textarea
            id="careerGoals"
            placeholder="Tell us about your career aspirations or what you hope to achieve..."
            value={formData.careerGoals}
            onChange={(e) => updateFormData({ careerGoals: e.target.value })}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalityStep;
