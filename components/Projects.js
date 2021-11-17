import styles from '../styles/Home.module.scss';
import ExternalLink from './ExternalLink';

export default function Projects({projectData}) {
    return (
        <>
            <p className={styles.description}>
                Projects
            </p>
            <div className={styles.grid}>
                {projectData.map((project, idx) => (
                    <a href={project.href}
                       className={styles.card}
                       key={idx}>
                        <h2>{project.name}<ExternalLink/></h2>
                        <p>{project.description}</p>
                    </a>
                ))}
            </div>
        </>
    )
};
