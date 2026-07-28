function ProjectInfo({ project }) {
    return (
        <div>
            {project.map((p) => (
                <div key={p.id}>
                    <p>
                        {p.name}, {p.description}
                    </p>
                </div>
            ))}
        </div>
    );
}