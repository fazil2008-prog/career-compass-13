import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to take the assessment.",
        });
        navigate("/auth");
      } else {
        setUser(user);
      }
      setIsCheckingAuth(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate("/auth");
      }
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const updateFormData = (data: Partial<AssessmentData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit and navigate to results
      setIsSubmitting(true);
      try {
        navigate("/results", { state: { formData } });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to submit assessment. Please try again.",
        });
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

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
                disabled={!isStepValid() || isSubmitting}
                className="shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    {currentStep === TOTAL_STEPS ? "Get Results" : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Assessment;
