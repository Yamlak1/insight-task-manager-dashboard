
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate authentication - in real app, this would call an API
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, any credentials work
      toast({
        title: "Success",
        description: "Login successful",
      });
      navigate("/");
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center items-center p-4">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
          <span className="font-bold text-white text-xl">MS</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">MainSync</h1>
        <p className="text-gray-500 text-center max-w-md">
          Maintenance Management Dashboard
        </p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Sign in to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in
                </div>
              )}
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="#" className="text-primary hover:underline">
                Contact administrator
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
      
      <p className="mt-8 text-center text-sm text-gray-500">
        © 2025 MainSync. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
