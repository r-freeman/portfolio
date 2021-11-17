import styles from '../styles/Home.module.scss';
import ExternalLink from './ExternalLink';

export default function Projects({projectData}) {
    return (
        <section>
            <h2 className={styles.description}>
                Projects
            </h2>
            <div className={styles.grid}>
                {projectData.map((project, idx) => (
                    <a href={project.href}
                       className={styles.card}
                       key={idx}>
                        <h3>{project.name}<ExternalLink/></h3>
                        <p>{project.description}</p>
                    </a>
                ))}
            </div>
        </section>
    )
};
