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
  isPortrait?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const CompareSlider = ({
  itemOneName,
  itemOneUrl,
  itemTwoName,
  itemTwoUrl,
  isPortrait = true,
  className,
  ...props
}: CompareSliderProps) => {
  return (
    <ReactCompareSlider
      itemOne={<ReactCompareSliderImage src={itemOneUrl} alt={itemOneName} />}
      itemTwo={<ReactCompareSliderImage src={itemTwoUrl} alt={itemTwoName} />}
      portrait={isPortrait}
      className={twMerge("mt-5", className)}
      {...props}
    />
  );
};

export default CompareSlider;
