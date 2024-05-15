import Header from "./_components/header";
import Search from "./_components/search";

const Home = () => {
  return (
    <>
      <Header></Header>
      <div className="px-5 pt-4">
        <Search></Search>
      </div>
    </>
  );
};

export default Home;
