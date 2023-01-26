import fetch from 'node-fetch'
import type {Repo} from '@/types'

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN
const GITHUB_GRAPHQL = "https://api.github.com/graphql"

type Response = {
    data: {
        user: {
            pinnedItems: {
                nodes: Repo[]
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
    }).then(r => r.json()) as Response

    return response.data.user.pinnedItems.nodes
}