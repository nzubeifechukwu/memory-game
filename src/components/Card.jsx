import { useEffect, useState } from "react";

export default function Card() {
  const [gifs, setGifs] = useState(null);

  useEffect(() => {
    async function getGifs() {
      const url =
        "https://api.giphy.com/v1/gifs/translate?api_key=c27QzaQaGY3fRzJSgOrSLw0DlVyPunGz";
      try {
        const response = await fetch(url, { mode: "cors" });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result.data);
        // setGifs(result);
      } catch (error) {
        console.error(error.message);
      }
    }

    getGifs();
  }, []);

  return <></>;
}
