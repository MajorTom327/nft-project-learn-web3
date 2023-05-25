import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { json } from "@vercel/remix";
import { cors } from "remix-utils";

type LoaderData = {};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { tokenId } = params;

  console.log("Here we are", tokenId);
  const image_url =
    "https://raw.githubusercontent.com/LearnWeb3DAO/NFT-Collection/main/my-app/public/cryptodevs/";
  return cors(
    request,
    json<LoaderData>({
      // As all the images are uploaded on github, we can extract the images from github directly.
      // The api is sending back metadata for a Crypto Dev
      // To make our collection compatible with Opensea, we need to follow some Metadata standards
      // when sending back the response from the api
      // More info can be found here: https://docs.opensea.io/docs/metadata-standards
      name: "Crypto Dev #" + tokenId,
      description: "Crypto Dev is a collection of developers in crypto",
      image: image_url + tokenId + ".svg",
    })
  );
};
