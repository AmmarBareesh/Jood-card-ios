//contains all the app layout related constants ex: paddings, margins ...
import { Dimensions } from "react-native";

//1565 , 2790

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
export const categoriesPadding = width * 0.06;
export const borderRadius = 12;
export const subtitleFontSize = 18;


export const labelFontSize = 16;
export const toolBar = {
  titleFontSize: 22
};
export const tabBar = {
  iconWidth: 30,
  iconHeight: 30
};

export default {
  window: {
    width,
    height
  },

  isSmallDevice: width < 375
};

export const BOLD_FONT_LARGE = {
  fontFamily: "Noor-Bold",
  fontSize: 30
}

export const BOLD_FONT_SMALL = {
  fontFamily: "Noor-Bold",
  fontSize: 14
}

export const REGULAR_FONT_LARGE = {
  fontFamily: "Noor-Regular",
  fontSize: 18
}

export const REGULAR_FONT_SMALL = {
  fontFamily: "Noor-Regular",
  fontSize: 14
}

export const REGULAR_FONT_MEDIUM = {
  fontFamily: "Noor-Regular",
  fontSize: 16
}

export const BOLD_FONT_MEDIUM = {
  fontFamily: "Noor-Bold",
  fontSize: 16
}
export const MAIN_COLOR = "#45996A";

export const YELLOWCOLOR = "#F8C43A";

export const PINKCOLOR = "#C70039";

export const GREYCOLOR = "#E4E4E4";

export const GREENCOLOR = "#72B14E";

export const LIGHTRED = "#FF5C5C";

export const ORANGECOLOR = "#FFB65C";