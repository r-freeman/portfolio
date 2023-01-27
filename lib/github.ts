import fetch from 'node-fetch'
import type {Repo} from '@/types'

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN
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

export async function getPinnedRepos() {
    const response = await fetch(GITHUB_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GITHUB_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            query: `{
              user(login: "r-freeman") {
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
    }).then(r => r.json()) as PinnedReposResponse

    return response.data.user.pinnedItems.nodes
}

export async function getTotalRepos() {
    const response = await fetch(GITHUB_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GITHUB_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            query: `{
              user(login: "r-freeman") {
                repositories {
                  totalCount
                }
              }
            }`
        })
    }).then(r => r.json()) as TotalReposResponse

    return response.data.user.repositories.totalCount
}

export async function getTotalFollowers() {
    const response = await fetch(GITHUB_GRAPHQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GITHUB_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            query: `{
              user(login: "r-freeman") {
                followers {
                  totalCount
                }
              }
            }`
        })
    }).then(r => r.json()) as TotalFollowersResponse

    return response.data.user.followers.totalCount
}