import type { SetState } from "@/types/globals";
import { toast } from "react-hot-toast";

// download file
export const downloadFile = (
  url: string,
  filename: string,
  setIsDownloading: SetState<boolean>
) => {
  setIsDownloading(true);
  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: "cors",
  })
    .then((response) =>
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = filename;
        alink.click();
        alink.remove();
        setIsDownloading(false);
      })
    )
    .catch((error) => {
      toast.error(error);
      setIsDownloading(false);
    });
};

// generate pokemon from replicate
// loop in server
// * this method crosses vercel's 10s limit for lambda functions (because of 2 responses maybe)
// * so we need to run the generation loop from the frontend
//   const generatePokemon = async (imageUrl: string) => {
//     await new Promise((resolve) => setTimeout(resolve, 200));
//     setIsLoading(true);
//     const res = await fetch("/api/generatePrompt", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ imageUrl }),
//     });

//     let response = (await res.json()) as ResponseData;
//     if (res.status !== 200) {
//       setError(response as any);
//       setIsLoading(false);
//     } else {
//       setGeneratedPrompt(response.output);
//       await new Promise((resolve) => setTimeout(resolve, 200));
//       const res2 = await fetch("/api/generatePokemon", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: response.output }),
//       });

//       let response2 = (await res2.json()) as ResponseData;
//       if (res2.status !== 200) {
//         setError(response2 as any);
//         setIsLoading(false);
//       } else {
//         setGeneratedImage(response2.output);
//         setIsLoading(false);
//       }
//     }

//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1300);
//   };
