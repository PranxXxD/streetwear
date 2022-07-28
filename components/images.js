import { CloudinaryContext, Transformation, Image } from "cloudinary-react";

const TransformImage = ({ crop, image, width, height }) => {
  return (
    <CloudinaryContext cloudName="pranxxxd">
      <Image publicId={image}>
        <Transformation width={width} height={height} crop={crop} />
      </Image>
    </CloudinaryContext>
  );
};

export default TransformImage;
