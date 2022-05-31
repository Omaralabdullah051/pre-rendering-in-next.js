import Link from "next/link";

const NewsArticleList = ({ articles }) => {
  return (
    <>
      <h1>List of News Articles</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <Link href={`news/${article.category}`} passHref>
            <h2>
              {article.id} {article.title}
            </h2>
          </Link>
          <hr />
        </div>
      ))}
    </>
  );
};

export default NewsArticleList;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:4000/news");
  const data = await res.json();

  return {
    props: {
      articles: data,
    },
  };
}
