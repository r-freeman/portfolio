import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import GitHub from '../components/GitHub';
import {getCustomData} from '../lib/custom';
import Projects from '../components/Projects';

export default function Home({projectData}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Ryan Freeman | Full Stack Developer in Dublin, Ireland</title>
                <meta name="author" content="Ryan Freeman"/>
                <meta name="description" content="Full Stack Developer in Dublin, Ireland"/>
                <meta name="keywords" content="React, JavaScript, Developer"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://ryanfreeman.dev"/>
                <meta property="og:site_name" content="Ryan Freeman"/>
                <meta property="og:title" content="Ryan Freeman | Full Stack Developer in Dublin, Ireland"/>
                <meta property="og:description" content="Full Stack Developer in Dublin, Ireland"/>
                <link rel="icon"
                      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>"/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Ryan Freeman{' '}<span>Full Stack Developer</span>
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
