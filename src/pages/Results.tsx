import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, ExternalLink, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  title: string;
  type: string;
  url: string;
}

interface Career {
  careerName: string;
  matchScore: number;
  reasoning: string;
  strengths: string[];
  gaps: string[];
  resources: Resource[];
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const assessmentData = location.state?.formData;
    
    if (!assessmentData) {
      toast({
        variant: "destructive",
        title: "No assessment data",
        description: "Please complete the assessment first.",
      });
      navigate("/assessment");
      return;
    }

    const fetchPredictions = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase.functions.invoke('predict-career', {
          body: { assessmentData }
        });

        if (error) throw error;

        if (data?.careers) {
          setCareers(data.careers);
          
          // Save to database if user is logged in
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            await supabase.from('predictions').insert({
              user_id: user.id,
              full_name: assessmentData.fullName,
              age: assessmentData.age,
              education_level: assessmentData.educationLevel,
              interests: assessmentData.interests,
              skills: assessmentData.skills,
              personality_type: assessmentData.personalityType,
              hobbies: assessmentData.hobbies || [],
              career_goals: assessmentData.careerGoals || null,
              results: data.careers,
            });
          }
        }
      } catch (error: any) {
        console.error('Error fetching predictions:', error);
        toast({
          variant: "destructive",
          title: "Prediction failed",
          description: error.message || "Failed to generate career predictions. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [location.state, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Analyzing your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-foreground">
              Career Predictor
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link to="/assessment">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retake Assessment
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl">
          {/* Success Banner */}
          <div className="mb-8 rounded-2xl border bg-gradient-primary p-8 text-center text-white shadow-xl">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12" />
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">
              Your Career Matches Are Ready!
            </h1>
            <p className="text-lg text-white/90">
              Based on your profile, here are your top 3 career recommendations
            </p>
          </div>

          {/* Career Cards */}
          <div className="space-y-6">
            {careers.map((career, index) => (
              <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow">
                {/* Career Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <Badge variant={index === 0 ? "default" : "secondary"} className="text-sm">
                        #{index + 1} Match
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {career.matchScore}% Match
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {career.careerName}
                    </h2>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>

                {/* Match Score */}
                <div className="mb-6">
                  <Progress value={career.matchScore} className="h-3" />
                </div>

                {/* Reasoning */}
                <div className="mb-6">
                  <h3 className="mb-2 font-semibold text-foreground">Why This Career?</h3>
                  <p className="text-muted-foreground">{career.reasoning}</p>
                </div>

                {/* Strengths & Gaps Grid */}
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  {/* Strengths */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      Your Strengths
                    </h3>
                    <ul className="space-y-2">
                      {career.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gaps */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      Skills to Develop
                    </h3>
                    <ul className="space-y-2">
                      {career.gaps.map((gap, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="mb-3 font-semibold text-foreground">
                    Recommended Learning Resources
                  </h3>
                  <div className="space-y-2">
                    {career.resources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border bg-card p-3 transition-colors hover:bg-accent"
                      >
                        <div>
                          <p className="font-medium text-card-foreground">{resource.title}</p>
                          <p className="text-sm text-muted-foreground">{resource.type}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="outline">
              <Link to="/assessment">Take Assessment Again</Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
