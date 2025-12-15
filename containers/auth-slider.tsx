import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface AuthSliderProps {
  delay: number;
  images: string[];
}

const AuthSlider: React.FC<AuthSliderProps> = ({ delay, images }) => {
  return (
    <>
      <Carousel
        className="flex items-center justify-center"
        plugins={[Autoplay({ delay })]}
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
      >
        <CarouselContent>
          {images.map((url, i) => (
            <CarouselItem key={i}>
              <Image src={url} alt="photo" width={618} height={816} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default AuthSlider;
