# NC News

This repo contains the front-end development for NC News, which is a simple full-stack project I built to mimic a real-world modern web development. The NC News back-end repo can be found [here](https://github.com/isaacluke/nc-news-project.git). The purpose of this repo is to showcase my frontend understanding.

[Link to the hosted website.](https://nc-news-isaac-hargreaves.netlify.app/)

NC News is designed to behave like a simplified [social news website](https://en.wikipedia.org/wiki/Social_news_website).

## Guide To Run This Project Locally

### Initial Setup

> Clone this repo [here](https://github.com/isaacluke/nc-news-project-fe.git).

Please make sure you have [Node.js](https://nodejs.org/en) installed. Also note that the repo has used [npm](https://www.npmjs.com/) as its package manager.

Please run `npm install` to install all dependencies.

### Dependencies

#### [React](https://react.dev/)

- The user interfaces for this project were built using React due to its robust ecosystem and efficient rendering. 
- The repo uses [React-DOM](https://react.dev/reference/react-dom/components), which serves as the entry point to the DOM and server renderers for React.  
- The repo also uses [React Router](https://reactrouter.com/en/main) to enable faster user experiences, as it allows for the URL to update without making a request for another document from the server. 
- Finally, the repo also uses [React Icons](https://react-icons.github.io/react-icons/) for its icons.


#### [Vite](https://vitejs.dev/)
- This repo uses Vite as its local development server.
    - The [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) dependency is the default Vite plugin for React projects.

#### [ESLint](https://eslint.org/)

- This is linting utility to help find and fix errors in the JavaScript code.

#### [Axios](https://axios-http.com/)
- Used to simplify and more easily handle the HTTP requests.

#### [Day.js](https://day.js.org/)

- Used to manipulate times from the API so that they are more user-friendly.


### Scripts

- To run the project locally, run the command:

    ```
    npm run dev
    ```

    - To run a preview of the project locally, run the command:

         ```
            npm run preview
         ```
- To run linting for the project, run the command:

    ```
    npm run lint
    ```
The script `build` is for hosting.

## Versions Used

| Tool | Version |
| --- | --- | 
| Node | v21.6.1 |
| React | 18.2.0 |
| react-dom | 18.2.0 |
| react-router-dom | 6.23.0 |
| react-icons | 5.2.1 |
| @types/react | 18.2.66 |
| @types/react-dom | 18.2.22 |
| Vite |5.2.0 |
| @vitejs/plugin-react | 4.2.1 |
| Axios | 1.6.8 |
| dayjs | 1.11.11 |
| eslint | 8.57.0 |
| eslint-plugin-react | 7.34.1 |
| eslint-plugin-react-hooks | 4.6.0 |
| eslint-plugin-react-refresh | 0.4.6 |


## URL Paths

Here is a summary of the pages of the website:

| Path | Description | Queries |
| --- | --- | --- |
| / | Home page | None |
| /articles | Page which contains all the articles | **p**: specifies which page of the articles you are on. <br> **limit**: specifies the number of articles shown per page. <br> **topic**: shows articles only of that topic. <br> **sort_by**: allows the articles to be sorted by either date, number of comments or number of votes. <br> **order**: allows the articles to be ordered either ascending or descending |
| /articles/:article_id | Shows the specified article by article_id | **p**: specifies which page of the comments you are on. <br> **limit**: specifies the number of comments shown per page. |
| /topics | A page that lists all of the topics. Click on a topic to be relocated to articles with the specified topic queried | None |
