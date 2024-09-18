
import { Carousel } from "flowbite-react";

export function SliderComponent() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 md:w-[60%] w-full">
      <Carousel pauseOnHover className="rounded-none">
        <img src="https://th.bing.com/th/id/OIP.4ZcriGHUAgM31GqKCvdXiAHaDt?rs=1&pid=ImgDetMain" alt="..."/>
        <img src="https://th.bing.com/th/id/OIP.6Ic6IVZxEtg3yJmpeR2BDQHaEK?w=1600&h=900&rs=1&pid=ImgDetMain" alt="..." />
        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-facebook-event-cover-design-template-f56f4e60c239332e8cd82ae313849c52_screen.jpg?ts=1612672578" alt="..." />
        <img src="https://th.bing.com/th/id/OIP.4Vd25rxBDIY8bJKDiyCyDQHaD4?w=696&h=365&rs=1&pid=ImgDetMain" alt="..." />
        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-flyer-design-template-dbbbded4fd22a796985d53653dee0e34_screen.jpg?ts=1630487280" alt="..." />
      </Carousel>
    </div>
  );
}
