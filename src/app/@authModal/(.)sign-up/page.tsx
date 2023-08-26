import CloseModal from "@/components/CloseModal";
import SignUp from "@/components/SignUp";

const page = ({}) => {
  return (
    <main className="fixed inset-0 bg-zinc-900/20 z-10">
      <section className="container h-full max-w-lg flex items-center mx-auto">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>

          <SignUp />
        </div>
      </section>
    </main>
  );
};

export default page;
