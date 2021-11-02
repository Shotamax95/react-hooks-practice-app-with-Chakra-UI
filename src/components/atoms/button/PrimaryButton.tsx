import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

// make children as props when I'd like to pass just a word
type Props = {
  children: ReactNode;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children } = props;

  return (
    <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }}>
      {children}
    </Button>
  );
});
