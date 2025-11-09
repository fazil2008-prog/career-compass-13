import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PersonalDetailsStep from "@/components/assessment/PersonalDetailsStep";
import InterestsStep from "@/components/assessment/InterestsStep";
import SkillsStep from "@/components/assessment/SkillsStep";
import PersonalityStep from "@/components/assessment/PersonalityStep";

export interface AssessmentData {
  fullName: string;
  age: string;
  educationLevel: string;
  interests: string[];
  skills: string[];
  personalityType: string;
  hobbies: string[];
  careerGoals: string;
}

const TOTAL_STEPS = 4;

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<AssessmentData>({
    fullName: "",
    age: "",
    educationLevel: "",
    interests: [],
    skills: [],
    personalityType: "",
    hobbies: [],
    careerGoals: "",
  });

  const updateFormData = (data: Partial<AssessmentData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Navigate to results page
      navigate("/results", { state: { formData } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.age && formData.educationLevel;
      case 2:
        return formData.interests.length > 0;
      case 3:
        return formData.skills.length > 0;
      case 4:
        return formData.personalityType;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-foreground">
              Career Predictor
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              Step {currentStep} of {TOTAL_STEPS}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <Card className="p-6 md:p-8 shadow-lg">
            {currentStep === 1 && (
              <PersonalDetailsStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 2 && (
              <InterestsStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 3 && (
              <SkillsStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 4 && (
              <PersonalityStep formData={formData} updateFormData={updateFormData} />
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="shadow-md"
              >
                {currentStep === TOTAL_STEPS ? "Get Results" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Assessment;
