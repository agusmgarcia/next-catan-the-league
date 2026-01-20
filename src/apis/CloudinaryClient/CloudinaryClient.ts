import {
  type GetBlurImageRequest,
  type GetBlurImageResponse,
  type UploadImageRequest,
  type UploadImageResponse,
} from "./CloudinaryClient.types";

export default class CloudinaryClient {
  static readonly INSTANCE: CloudinaryClient = new CloudinaryClient();

  private constructor() {}

  getBlurImage({ url }: GetBlurImageRequest): GetBlurImageResponse {
    return url.replace(
      "/upload/",
      "/upload/w_200,e_blur:1000,f_auto,q_auto:low/",
    );
  }

  async uploadImage(
    { url }: UploadImageRequest,
    signal: AbortSignal,
  ): Promise<UploadImageResponse> {
    const file = url.startsWith("blob:")
      ? await fetch(url, { signal }).then((response) => response.blob())
      : url;

    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", "catan-the-league");

    return await fetch(
      `https://api.cloudinary.com/v1_1/dkzns8hvq/image/upload`,
      {
        body,
        method: "POST",
        signal,
      },
    )
      .then((response) => response.json())
      .then((data) => data.secure_url)
      .then((url) => url.replace("/upload/", "/upload/f_auto,q_auto/"));
  }
}
