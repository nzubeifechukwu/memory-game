import { useEffect, useState } from "react";

export default function Card() {
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
        console.log(result.data);
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
  }

  return (
    <>
      <section>
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </section>
      <section>
        {gifs.map((gif) => {
          return (
            <article key={gif.id} onClick={() => handleClick(gif.id)}>
              <img src={gif.images.fixed_height.webp} alt={gif.title} />
              <p>{gif.title}</p>
            </article>
          );
        })}
      </section>
    </>
  );
}
