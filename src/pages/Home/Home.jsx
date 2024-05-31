import React from "react";
import FormInput from "../../components/FormInput";

const Home = () => {
  return (
    <section className="px-3 sm:px-10 py-3">
      <h4 className="text-2xl font-bold racking-wide text-gray-950 dark:text-white">
        Read Latest Blog
      </h4>
      <p className="mt-10">Filter by</p>
      <div className="mt-2">
        <FormInput />
      </div>
    </section>
  );
};

export default Home;
