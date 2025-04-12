
import { Navigate } from "react-router-dom";

const Index = () => {
  // For this example, we'll redirect to the login page
  // In a real application, you'd check if the user is authenticated first
  return <Navigate to="/login" replace />;
};

export default Index;
