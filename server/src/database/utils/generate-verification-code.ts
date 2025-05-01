import { random, range } from "lodash";

export const generateVerificationCode = () => {
  return range(6)
    .map(() => random(0, 9))
    .join("");
};
