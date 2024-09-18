import type {MDXComponents} from 'mdx/types'
import {createSlug} from './lib/createSlug'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h2: ({children}) => <h2>{children}<a className='ml-1' href={`#${createSlug(children)}`}>#</a></h2>,
        // Allows customizing built-in components, e.g. to add styling.
        // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
        ...components,
    }
}