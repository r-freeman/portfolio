import Head from 'next/head';
import styles from '../styles/Home.module.css';
import GitHub from '../components/GitHub';
import {getCustomData} from '../lib/custom';
import Projects from '../components/Projects';

export default function Home({projectData}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Ryan Freeman | Full Stack Developer in Dublin, Ireland</title>
                <meta name="author" content="Ryan Freeman"/>
                <meta name="description" content="Full Stack Developer in Dublin"/>
                <link rel="icon"
                      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>"/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Ryan Freeman
                    <span>Full Stack Developer</span>
                </h1>
                <div className={styles.links}>
                    <a href="https://github.com/r-freeman">
                        <GitHub/>
                        <span className={styles.srOnly}>GitHub profile</span>
                    </a>
                </div>
                <Projects
                    projectData={projectData}/>
            </main>
        </div>
    )
}

export async function getStaticProps() {
    const projectData = getCustomData('projects.json');

    return {
        props: {
            projectData
        }
    }
}
