import "../styles/loading.css";

export default function Spinner({ label = "Loading" }) {
    return (
        <div className="spinnerWrap" role="status" aria-label={label}>
            <div className="spinner" />
        </div>
    );
}

export function MovieGridSkeleton({ count = 8 }) {
    return (
        <section className="MovieGrid" aria-busy="true">
            {Array.from({ length: count }, (_, i) => (
                <div className="MovieCard skeletonCard" key={i}>
                    <div className="skeleton skeletonPoster" />
                    <div className="skeleton skeletonLine wide" />
                    <div className="skeleton skeletonLine" />
                    <div className="skeleton skeletonLine" />
                </div>
            ))}
        </section>
    );
}
