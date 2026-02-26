import { Code, Linkedin, Github, User, Link } from 'lucide-react';

export const DeveloperCard = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Developed by Naveen Arul</h3>
    
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <a 
                  href="https://linkedin.com/in/naveen2408" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                
                <a 
                  href="https://github.com/Naveen-Arul" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                
                <a 
                  href="https://leetcode.com/u/NaveenA_kec/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Code className="w-4 h-4" />
                  <span>LeetCode</span>
                </a>
                
                <a 
                  href="https://naveenarul.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Link className="w-4 h-4" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};