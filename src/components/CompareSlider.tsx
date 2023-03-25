import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { twMerge } from "tailwind-merge";

type CompareSliderProps = {
  itemOneName: string;
  itemOneUrl: string;
  itemTwoName: string;
  itemTwoUrl: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CompareSlider = ({
  itemOneName,
  itemOneUrl,
  itemTwoName,
  itemTwoUrl,
  className,
  ...props
}: CompareSliderProps) => {
  return (
    <ReactCompareSlider
      itemOne={<ReactCompareSliderImage src={itemOneUrl} alt={itemOneName} />}
      itemTwo={<ReactCompareSliderImage src={itemTwoName} alt={itemTwoUrl} />}
      portrait
      className={twMerge("mt-5 flex h-96 w-[600px]", className)}
      {...props}
    />
  );
};

export default CompareSlider;
