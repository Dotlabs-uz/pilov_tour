import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";

const Filter = () => {
  return (
    <div className="flex flex-col gap-4 w-64">
      <p className="font-semibold">Filters</p>

      <Accordion type="multiple" className="w-full">

        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <Slider
              defaultValue={[50]}
              min={50}
              max={200}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>$50</span>
              <span>$200</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent className="flex gap-2 flex-wrap">
            {[0, 1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className="w-10 h-8 flex items-center justify-center border border-[#8DD3BB] rounded-md text-sm hover:bg-[#8DD3BB] hover:text-white"
              >
                {num}+
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="freebies">
          <AccordionTrigger>Freebies</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {[
                "Free breakfast",
                "Free parking",
                "Free internet",
                "Free airport shuttle",
                "Free cancellation",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Checkbox /> {item}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Amenities */}
        <AccordionItem value="amenities">
          <AccordionTrigger>Amenities</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {["24h front desk", "Air-conditioned", "Fitness", "Pool"].map(
                (item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Checkbox /> {item}
                  </label>
                )
              )}
              <button className="text-red-500 text-sm text-left hover:underline">
                +24 more
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filter;
