import contentstack from '@contentstack/delivery-sdk';

export async function getPage(live_preview: string, content_type_uid: string, entry_uid: string) {
  const apiKey = "blte766efb491f96715";
  const deliveryToken = "cs620decb0e6bb175e31210ce9";
  const environment = "preview";
  const previewToken = "csa128deacffe0b26386090915";
  const region = "eu";

  let hostname = region === "eu" ? "eu-cdn.contentstack.com" : "cdn.contentstack.com";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("api_key", apiKey);
  headers.append("access_token", deliveryToken);

  if (live_preview !== '') {
    headers.append("preview_token", previewToken);
    headers.append("live_preview", live_preview);
    hostname = region === "eu" ? "eu-rest-preview.contentstack.com" : "rest-preview.contentstack.com";;
  }

  const url = `https://${hostname}/v3/content_types/${content_type_uid}/entries/${entry_uid}?environment=${environment}`

  const res = await fetch(url, {
    method: "GET",
    headers,
  });

  const result = await res.json();
  const { entry } = result

  contentstack.default.Utils.addEditableTags(entry, content_type_uid, true);

  return entry
}