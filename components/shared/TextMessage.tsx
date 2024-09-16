import { Text } from "../ui/text";

interface TextMessageProps {
  className?: string;
  //   message: string;
  formMessage: any;
}

const TextMessage = ({ className, formMessage }: TextMessageProps) => {
  return (
    <Text className={`text-[0.8rem] font-medium text-destructive ${className}`}>
      {formMessage && formMessage.message}
    </Text>
  );
};

export default TextMessage;
