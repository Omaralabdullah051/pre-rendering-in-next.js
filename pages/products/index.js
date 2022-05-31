import Link from "next/link";

const ProductList = ({ products }) => {
  return (
    <>
      <h1>List of Posts</h1>
      {products.map((product) => (
        <div key={product.id}>
          <Link href={`products/${product.id}`} passHref>
            <h2>
              {product.id} {product.title}
            </h2>
          </Link>
          <hr />
        </div>
      ))}
    </>
  );
};

export default ProductList;

export async function getStaticProps() {
  console.log("Generating / Regenerating ProductList");
  const res = await fetch("http://localhost:4000/products");
  const data = await res.json();

  return {
    props: {
      products: data,
    },
    revalidate: 10,
  };
}
