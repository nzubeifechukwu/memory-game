import { useEffect, useState } from "react";

export default function Card() {
  const [gifs, setGifs] = useState([]);

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

  return (
    <section>
      {console.log(gifs[0])}
      {gifs.map((gif) => {
        <article key={gif.title}>
          <img src={gif.images.fixed_height.webp} alt={gif.title} />
          <p>{gif.title}</p>
        </article>;
      })}
      {/* <p>{gifs[0].title}</p> */}
    </section>
  );
}
