import styles from "./Footer.module.css";

type FooterProps = {
  class: string;
};

export function Footer(props: FooterProps) {
  return (
    <footer class={`${props.class} ${styles.container}`}>
      <div class={styles.contactInfo}>
        <div class={styles.contactGroup}>
          <p>Contact phone: +9 911 556 66 55</p>
          <p>Email address: info@example.com</p>
          <p>Post Code: 357182</p>
        </div>
        <div class={styles.contactGroup}>
          <p>
            Company address: Maharashtra Vadodara, Brigade Gateway, Rajaji Nagar
          </p>
          <p>Street: Mall Road</p>
          <p>Building: B-241</p>
        </div>
      </div>
    </footer>
  );
}
