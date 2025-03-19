import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.css";
import CardList from "./components/CardList";
import { useState } from "react";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

function App() {
  const [score, setScore] = useState({ set: new Set(), best: 0 });
  const handleClick = (id) => {
    if (score.set.has(id)) {
      setScore({ set: new Set(), best: Math.max(score.set.size, score.best) });
    } else {
      setScore({
        best: Math.max(score.set.size + 1, score.best),
        set: new Set([...score.set, id]),
      });
    }
  };

  return (
    <ApolloProvider client={client} className="App">
      <h1>Memory Card Game</h1>
      <h2>
        Try to remember all the characters! Click the cards to keep track of
        your score.
      </h2>
      <div className="score">
        <h2>Current Score: {score.set.size}</h2>
        <h2>Best Score: {score.best}</h2>
      </div>
      <CardList anime="frieren" onClick={handleClick} />
      <footer className="footer">
        images taken from{" "}
        <a href="https://anilist.co/" target="_blank">
          anilist
        </a>
        api
      </footer>
    </ApolloProvider>
  );
}

export default App;
