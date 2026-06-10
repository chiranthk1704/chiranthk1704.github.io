import hero from "../content/hero.json";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {hero.name}
        </p>
        <p className="text-secondary">{hero.location}</p>
      </div>
    </footer>
  );
}
