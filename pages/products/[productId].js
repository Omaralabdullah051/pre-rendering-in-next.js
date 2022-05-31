import { useRouter } from "next/router";

const Product = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h2>Loading....</h2>;
  }

  return (
    <>
      <h2>
        {product.id} {product.title}
        {product.price}
      </h2>
      <p>{product.description}</p>
    </>
  );
};
export default Product;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { productId: "1" },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(`http://localhost:4000/products/${params.productId}`);
  const data = await res.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  console.log(`Generating Page for /products/${params.productId}`);

  return {
    props: {
      product: data,
    },
  };
}
