import InputUrl from "@/components/InputUrl";  

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-blue-200 p-4">
      <h1>URL Shortener</h1>
      <InputUrl  />
    </div>
  );
}
