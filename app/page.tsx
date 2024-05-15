import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

const Home = () => {
  return (
    <>
      <Header></Header>
      <div className="px-5 pt-6">
        <Search></Search>
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
    </>
  );
};

export default Home;
