import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <main>
            <div className="emptyState">
                <h1>Page not found</h1>
                <p>That page doesn&apos;t exist.</p>
                <Link to="/" style={{ color: "var(--base-color)", textDecoration: "underline" }}>Back to home</Link>
            </div>
        </main>
    )
}

export default ErrorPage;
