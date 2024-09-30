import * as Slot from "@rn-primitives/slot";
import type { SlottableTextProps, TextRef } from "@rn-primitives/types";
import * as React from "react";
import { Text as RNText } from "react-native";
import { cn } from "@/lib/utils";
import i18n from "@/i18n/i18n";
import { useColorScheme } from "@/lib/useColorScheme";

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    const { isDarkColorScheme, setColorScheme } = useColorScheme();
    return (
      <Component
        className={cn(
          "text-base text-foreground web:select-text font-cairoRegular",
          isDarkColorScheme ? "text-white" : "text-black",
          i18n.language === "ar" ? "text-right" : "text-left",
          textClass,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, TextClassContext };
