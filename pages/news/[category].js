const articleListByCategory = ({ articles, category }) => {
  return (
    <>
      <h2>showing news for category {category}</h2>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>
            {article.id} {article.title}
          </h2>
          <h2>{article.description}</h2>
          <hr />
        </div>
      ))}
    </>
  );
};

export default articleListByCategory;

export async function getServerSideProps(context) {
  const { params } = context;
  const { category } = params;
  const res = await fetch(`http://localhost:4000/news?category=${category}`);
  const data = await res.json();

  return {
    props: {
      articles: data,
      category,
    },
  };
}
