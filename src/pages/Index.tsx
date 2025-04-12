
import { Navigate } from "react-router-dom";

const Index = () => {
  // For this example, we'll redirect to the dashboard page
  // In a real application, you'd check if the user is authenticated and redirect accordingly
  return <Navigate to="/" replace />;
};

export default Index;
