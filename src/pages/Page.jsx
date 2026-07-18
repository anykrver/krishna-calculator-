import { Image, ImageKitProvider } from '@imagekit/react';

export default function Page() {
  return (
    <ImageKitProvider urlEndpoint="https://ik.imagekit.io/8rz8msbcp">
      <Image
        src="/default-image.jpg"
        width={400}
        height={300}
        alt="Image"
      />
    </ImageKitProvider>
  );
}
