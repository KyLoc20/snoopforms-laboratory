import { TailSpin } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="select-none h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main>
          <div className="flex justify-center">
            <TailSpin color="#1f2937" height={30} width={30} />
          </div>
          <p className="mt-5 text-sm text-ui-gray-dark">Loading...</p>
        </main>
      </div>
    </div>
  );
}
