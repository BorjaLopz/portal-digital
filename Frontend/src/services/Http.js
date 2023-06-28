import { api_url } from "../config.js";

async function Http({
  method = "GET",
  url,
  token,
  body,
  headers = { Accept: "application/json", "Content-Type": "application/json" },
}) {
  if (!url.startsWith("/")) throw new Error("La URL debe comenzar con un /");

  const fullURL = new URL(api_url + url);
  const config = {
    method,
    headers,
  };

  if (token) {
    // config.headers.Authorization = token
    // config.headers.Authorization = `Bearer ${token}`;
    // console.log(token);
    config.headers.Authorization = `${token}`;
  }

  if (body) {
    if (body?.file) {
      const currentFile = {
        lastModified: body.file.lastModified,
        name: body.file.name,
        size: body.file.size,
        type: body.file.type,
      };

      config.file = JSON.stringify(currentFile);
    }
    console.log("body");
    console.log(body);
    config.body = JSON.stringify(body);
    console.log(config);
  }

  try {
    // console.log(fullURL.href);
    const res = await fetch(fullURL.href, config);
    const data = await res.json();
    if (!res.ok) throw data.error;

    return { data, loading: false, error: null };
  } catch (error) {
    return { data: null, loading: false, error };
  }
}

export default Http;
