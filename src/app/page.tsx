import Chat from "@/components/Chat/Chat";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-20">
      <section className="w-[500px] m-16">
        <Chat />
      </section>
    </div>
  );
}
