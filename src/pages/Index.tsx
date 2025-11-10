import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-foreground">
              Career Predictor
            </Link>
            <Button asChild variant="ghost">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-fade-in">
              <Sparkles className="h-4 w-4" />
              AI-Powered Career Discovery
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
              Discover Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Perfect Career Path
              </span>
            </h1>

            {/* Description */}
            <p className="mb-10 text-lg text-muted-foreground md:text-xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              Let AI analyze your skills, interests, and personality to reveal the careers
              where you'll truly thrive. Get personalized recommendations in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Button asChild size="lg" className="group shadow-lg hover:shadow-glow transition-all">
                <Link to="/assessment">
                  Start Your Assessment
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Why Choose Our Career Predictor?
              </h2>
              <p className="text-lg text-muted-foreground">
                Advanced AI technology meets comprehensive career insights
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group rounded-2xl border bg-card p-6 shadow-md transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  AI-Powered Analysis
                </h3>
                <p className="text-muted-foreground">
                  Our advanced AI analyzes hundreds of factors to match you with careers
                  that align with your unique profile.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group rounded-2xl border bg-card p-6 shadow-md transition-all hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  Personalized Matches
                </h3>
                <p className="text-muted-foreground">
                  Get top 3 career recommendations tailored specifically to your skills,
                  interests, and personality traits.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group rounded-2xl border bg-card p-6 shadow-md transition-all hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  Actionable Insights
                </h3>
                <p className="text-muted-foreground">
                  Receive detailed skill gap analysis and curated learning resources to
                  start your journey immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-3xl border bg-gradient-primary p-8 text-center shadow-xl md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Find Your Calling?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Join thousands of students who've discovered their perfect career path
            </p>
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link to="/assessment">
                Take the Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
