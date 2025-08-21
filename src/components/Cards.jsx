import { useEffect, useState } from "react";

export default function Cards() {
  const [gifs, setGifs] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [previousGifIds, setPreviousGifIds] = useState([]);

  useEffect(() => {
    async function getGifs() {
      const url =
        "https://api.giphy.com/v1/gifs/trending?api_key=c27QzaQaGY3fRzJSgOrSLw0DlVyPunGz";
      try {
        const response = await fetch(url, { mode: "cors" });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        setGifs(result.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    getGifs();
  }, []);

  function handleClick(gifId) {
    if (!previousGifIds.includes(gifId)) {
      setScore(score + 1);
      setPreviousGifIds([...previousGifIds, gifId]);
      // Update bestScore and reset score and previousGifIds if a gif is clicked twice in succession
    } else {
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setPreviousGifIds([]);
    }
    // shuffle gifs once any gif is clicked
    setGifs(shuffleGifs(gifs));
  }

  function shuffleGifs(gifsArray) {
    // Loop from last element back to second element
    for (let i = gifsArray.length - 1; i > 0; i--) {
      // generate a random index `j` between 0 and `i` (inclusive)
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at indices `i` and `j`
      [gifsArray[i], gifsArray[j]] = [gifsArray[j], gifsArray[i]];
    }
    return gifsArray;
  }

  return (
    <>
      <header>
        <h1>Memory Cards</h1>
        <h2>Let's see how much you can remember</h2>
        <p>
          Click on a card to increase your score.
          <br />
          You must remember all cards you've clicked on in each round.
          <br />
          Clicking any card twice in each round resets your <b>score</b> and
          updates your <b>best score</b>.
          <br />
          <b>LET'S PLAY!!!</b>
        </p>
        <section className="scores">
          <h3>Score: {score}</h3>
          <h3>Best Score: {bestScore}</h3>
        </section>
      </header>
      <main className="cards">
        {gifs.map((gif) => (
          <article key={gif.id} onClick={() => handleClick(gif.id)}>
            <img src={gif.images.fixed_height.webp} alt={gif.title} />
            <p>{gif.title}</p>
          </article>
        ))}
      </main>
      <footer>
        <small>
          <a
            href="https://github.com/nzubeifechukwu/memory-game"
            target="_blank"
          >
            Built by Nzube Ifechukwu
          </a>
        </small>
      </footer>
    </>
  );
}
