import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return(
    <div className="background-image-section">
      <SignIn />;
    </div>
  ) 
}