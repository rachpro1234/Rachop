import { Bug } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Bug size={32} />
      <h1>Ooops</h1>
      <p>the url you entered is not valid</p>
    </div>
  );
}
