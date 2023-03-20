import styles from "@/styles/Card.module.css";

export default function Card({ product }) {
  console.log(product);
  return (
    <a href={product.link} className={styles.card}>
      <span className={styles.brand}>{product.brand}</span>
      <img src={product.photo} className={styles.image} />
      <span className={styles.name}>{product.name}</span>
      <span className={styles.price}>{product.price},00 €</span>
    </a>
  );
}
