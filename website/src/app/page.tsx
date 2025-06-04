import Head from "next/head";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0">
      
        <source src="/vid/demo.mp4" type="video/mp4" />
      </video>
      {/* Overlay cho phan content noi bat hon */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Main content */}
      
    </div>
  );
}