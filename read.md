# Marven / Kelo

<br>

## Description

Search platform for movies that already exist or coming soon. Storage our favourite movies and watch list.
We also have an map to guide to the nearst cinema; A random movie generator based on the user preferences in case the user don't want to choose
or want to be surprised. The user can filter the title, genre and actor/actriss name;

<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by type of movie, log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can add favorite movie to my list and to my watch list. Or also know cinema directions.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **edit user** - As a user I want to be able to edit my profile. (picture, username, password and favourite movie genre)
- **result** - As a user I want to see the list of movies filter by my preferences.
- **movie listing** - As a user I want to see more details of the movie, be able to read an description and in case it's a coming soon movie be able to see the nearst cinema to watch.

<br>

## Server Routes (Back-end):

| **Method** | **Route**                      | **Description**                                                          | Request - Body                                              |
| ---------- | ------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `GET`      | `/`                            | Main page route. Renders home `index` view.                              |                                                             |
| `GET`      | `/login`                       | Renders `login` form view.                                               |                                                             |
| `POST`     | `/login`                       | Sends Login form data to the server.                                     | { username, password }                                      |
| `GET`      | `/signup`                      | Renders `signup` form view.                                              |                                                             |
| `POST`     | `/signup`                      | Sends Sign Up info to the server and creates user in the DB.             | { username, password }                                      |
| `GET`      | `/private/edit-profile`        | Private route. Renders `edit-profile` form view.                         |                                                             |
| `PUT`      | `/private/edit-profile`        | Private route. Sends edit-profile info to server and updates user in DB. | { username, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/favorites`           | Private route. Render the `favorites` view.                              |                                                             |
| `POST`     | `/private/favorites/`          | Private route. Adds a new favorite for the current user.                 | { genre }                                                   |
| `DELETE`   | `/private/favorites/:moviesID` | Private route. Deletes the existing favorite from the current user.      |                                                             |
| `GET`      | `/movies`                      | Renders `movies-list` view.                                              |                                                             |
| `GET`      | `/movies/details/:id`          | Renders `movies-details` view for the particular movies.                 |                                                             |
| `GET`      | `/movies/random`               | Renders `movie-random`generate a random movie                            |
| `GET`      | `/logout`                      | Be able to logout so I can make sure no one will access my account       |

//Privates controlamos no back-end

## Models

User model

```javascript

userModel;

{
  name: String,
  username: String,
  password: String,
  favorites: [movieID],
  imgUrl: String
  preferences: {
    genreID: [],
    actor: [],
    decada: [], //select-box
  }
}

modelMovie;

{
  movieImg = url,
  title: String,
  cast: [],
  genre: String
  description: String,
  runtime: Number,
}
```
```

<br>

## API's

https://developers.themoviedb.org/3/getting-started/introduction

<br>

## Packages

<br>

## Backlog

[See the Trello board.](https://trello.com/b/oZB45ITh/project2-keven-marcelo)

<br>

## Links

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/marcelomilhomem/Karaoke_party)

[Deploy Link](https://macelo-keven.herokuapp.com/)

<br>

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors

Keven Andrade - [`<kevenm4>`](https://github.com/kevenm4) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/keven-andrade-85a38a235/)

Marcelo Milhomem - [`<marcelomilhomem>`](https://github.com/marcelomilhomem) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/marcelo-milhomem-79696422b/)


axios p buscar o query.. Link do api + ${search/ oq escrever no form}
red.body.nome no form
depois de receber o filme retornar apenas aquilo que me interessa.. com por exmeplo um array filter talvez.

//search movie: https://api.themoviedb.org/3/search/movie?api_key=bdb54a5f51e436feb6807b80aebf0c21&language=en-US&query=iron