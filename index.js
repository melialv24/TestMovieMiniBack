import fetch from 'node-fetch';
import { gql, ApolloServer  } from "apollo-server"
const BASE_URL = "https://api.themoviedb.org/3/"
const API_KEY = "d9dfcdac6317f23e3fa30fe7c92c08df"

/** Declare the types of the data  */
const typeDefinitions = gql`
    
    type SpokenLanguages {
        iso_639_1: String,
        name: String
    }

    type ProductionCountries {
        iso_3166_1: String,
        name: String
    }

    type ProductionCompanies {
        id: ID,
        logo_path: String,
        name: String,
        origin_country: String
    }

    type Genres {
        id: ID,
        name: String
    }

    type Results {
        poster_path: String
        adult: Boolean
        overview: String
        release_date: String 
        genre_ids:[Int]
        id: ID
        original_title: String
        original_language: String
        title: String 
        backdrop_path: String
        vote_count: Int
        video: Boolean 
    }

    type Discover {
        page: Int
        results: [Results]
    }

    type Detail {
        adult: Boolean,
        poster_path: String,
        backdrop_path: String,
        budget: Int,
        genres: [Genres],
        homepage: String,
        id: ID,
        original_language: String,
        original_title: String,
        overview: String,
        production_companies: [ProductionCompanies],
        production_countries: [ProductionCountries],
        release_date: String,
        revenue: Int,
        spoken_languages: [SpokenLanguages],
        status: String,
        title: String,
        video: Boolean,
        vote_count: Int
    }

    type Query {
        detailsMovies(id: ID!): Detail
        discoverMovies: Discover
    }
`

/** Get the detailed information */
const fetchMoviesDetails = (_, { id }) => {
    return fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`)
        .then(res => res.json())
        .then(res => res )
}

/** Get the most popular movies */
const fetchMoviesDiscover = () => {
    return fetch(`${BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`)
        .then(res => res.json())
        .then(res => res )
}

/** Declare the resolvers */
const resolvers = {
    Query: {
        detailsMovies: fetchMoviesDetails,
        discoverMovies: fetchMoviesDiscover
    }
}

/** Create the server */
const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

/** Initialize the server */
server.listen().then(({url}) => {
    console.log(`server ready at ${url}`)
})

