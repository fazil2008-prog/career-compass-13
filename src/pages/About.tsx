import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Target, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-foreground">
              Career Predictor
            </Link>
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Brain className="h-4 w-4" />
              How It Works
            </div>
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Discover Your Perfect Career Path with{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI-Powered Insights
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Our advanced AI analyzes your unique profile to reveal careers where you'll truly excel
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
              The Process
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <Card className="p-6 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                      Complete Your Profile
                    </h3>
                    <p className="text-muted-foreground">
                      Share your personal details, education level, interests, skills, and personality type. 
                      This helps our AI understand what makes you unique.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Step 2 */}
              <Card className="p-6 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                      AI Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Our advanced AI processes hundreds of career profiles and matches them against your 
                      unique combination of skills, interests, and personality traits.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Step 3 */}
              <Card className="p-6 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                      Get Personalized Recommendations
                    </h3>
                    <p className="text-muted-foreground">
                      Receive your top 3 career matches with detailed reasoning, match scores, and 
                      identification of your strengths and skill gaps.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Step 4 */}
              <Card className="p-6 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                      Start Your Journey
                    </h3>
                    <p className="text-muted-foreground">
                      Access curated learning resources including courses, tutorials, and articles to help 
                      you bridge skill gaps and start your career journey.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
              What Makes Us Different
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="p-6 text-center shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  Advanced AI Technology
                </h3>
                <p className="text-sm text-muted-foreground">
                  Powered by Google Gemini AI for accurate, intelligent career matching
                </p>
              </Card>

              <Card className="p-6 text-center shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  Personalized Insights
                </h3>
                <p className="text-sm text-muted-foreground">
                  Every recommendation is tailored specifically to your unique profile
                </p>
              </Card>

              <Card className="p-6 text-center shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  Actionable Resources
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get curated learning paths to bridge skill gaps and achieve your goals
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-3xl border bg-gradient-primary p-8 text-center shadow-xl md:p-12">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-white" />
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Discover Your Path?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Take the free assessment and unlock your career potential today
            </p>
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link to="/assessment">
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
