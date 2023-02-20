import type {Repo} from '@/types'
import fetcher from '@/lib/fetcher'

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME
const GITHUB_GRAPHQL = "https://api.github.com/graphql"

type PinnedReposResponse = {
    data: {
        user: {
            pinnedItems: {
                nodes: Repo[]
            }
        }
    }
}

type TotalReposResponse = {
    data: {
        user: {
            repositories: {
                totalCount: number
            }
        }
    }
}

type TotalFollowersResponse = {
    data: {
        user: {
            followers: {
                totalCount: number
            }
        }
    }
}

type TotalStarsResponse = {
    data: {
        user: {
            repositories: {
                nodes: [
                    {
                        stargazers: {
                            totalCount: number
                        }
                    }
                ]
            }
        }
    }
}

export async function getPinnedRepos() {
    const response = await fetcher(GITHUB_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GITHUB_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            query: `{
              user(login: "${GITHUB_USERNAME}") {
                pinnedItems(first: 6, types: REPOSITORY) {
                  nodes {
                    ... on Repository {
                      name
                      description
                      url
                      stargazerCount
                      forkCount
                      primaryLanguage {
                        name
                        color
                      }
                    }
                  }
                }
              }
            }`
        })
    }) as PinnedReposResponse

    return response.data.user.pinnedItems.nodes
}

export async function getTotalRepos() {
    const response = await fetcher(GITHUB_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GITHUB_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            query: `{
              user(login: "${GITHUB_USERNAME}") {
                repositories {
                  totalCount
                }
              }
            }`
        })
    }) as TotalReposResponse

    return response.data.user.repositories.totalCount
}

export async function getTotalFollowers() {
    const response = await fetcher(GITHUB_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GITHUB_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            query: `{
              user(login: "${GITHUB_USERNAME}") {
                followers {
                  totalCount
                }
              }
            }`
        })
    }) as TotalFollowersResponse

    return response.data.user.followers.totalCount
}

export async function getTotalStars(totalRepos: number) {
    const response = await fetcher(GITHUB_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GITHUB_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            query: `{
              user(login: "${GITHUB_USERNAME}") {
                repositories(first: ${totalRepos}) {
                  nodes {
                    stargazers {
                      totalCount
                    }
                  }
                }
              }
            }`
        })
    }) as TotalStarsResponse

    return response.data.user.repositories.nodes
        .reduce((acc, node) => acc + node.stargazers.totalCount, 0)
}