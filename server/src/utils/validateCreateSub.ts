import { SubInputType } from "./subInputType";
export const validateCreateSub = (input: SubInputType) => {
  if (input.name.length <= 2) {
    return [
      {
        field: "name",
        message: "name can't be less than 2 word",
      },
    ];
  }
  if (input.title.length <= 2) {
    return [
      {
        field: "title",
        message: "title can't be less than 2 word",
      },
    ];
  }

  return null;
};
